const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');


const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('The uploads folder does not exist, so create it.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {                                     // exampleImage.png
            const ext = path.extname(file.originalname);                // -> extract an extension
            const basename = path.basename(file.originalname, ext);     // -> exampleImage
            done(null, basename + '_' + new Date().getTime() + ext);      // -> exampleImage_2020062815001234.png
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },         // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {           // POST /post
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            })));                                                                                   // [[exTag1, true], [exTag2, true]]
            await post.addHashtags(result.map((v) => v[0]));
        }
        if (req.body.image) {                                                   // image: [image1.png, image2.png, ...]
            if (Array.isArray(req.body.image)) {                                // Multiple image uploads are uploaded in array format.
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));      // This method does not include files in DB, but only has address values in image folder. benefit: aws s3 cdn cache!
                await post.addImages(images);
            } else {                                                            // if upload a file, image: image.png <- address
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // Comment Writer
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // Post Writer
                attributes: ['id', 'nickname'],
            }, {
                model: User, // User who clicked Like
                as: 'Likers',
                attributes: ['id'],
            }]
        });
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});

router.get('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{                                                 // for Reject Re-Retweet!
                model: Post,
                as: 'Retweet',
            }]
        });
        if (!post) {
            return res.status(403).send('This post does not exist.');
        }
        // Reject Retweeting my posts again. (ex) myPost -> Other users Retweet myPost.(O) -> Retweet myPost.(X)
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('You cannot retweet your own post.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('The post has already been retweeted.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',                             // allownull: false
        });

        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }],
        });

        res.status(201).json(retweet);
    } catch (error) {
        console.error(error);
        next(error)
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {           // POST /post/113/comment      // The dynamic change of address is called a 'parameter'.
    try {
        const post = await Post.findOne({
           where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('This post does not exist.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        });
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error)
    }
});


router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('This post does not exist.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('This post does not exist.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/5
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;