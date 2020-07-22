const express = require('express');
const { Op } = require('sequelize');

const { Post, Hashtag, Image, User } = require('../models');


const router = express.Router();

router.get('/:tag', async (req, res, next) => {                             // GET /hashtag/blahblah
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {                     // When not first initialize time, Execute this part
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }    // Using Op!, Do not using $lt. that include the SQL Injection Attact
        }                                                               // Bring ten smaller than the last number. // ex) 21, (20, 19, ..., 11,) 10, 9, ..., 2, 1

        const posts = await Post.findAll({
            where,
            limit: 10,
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }],
            }],
        });
        // console.log(posts);
        res.status(200).json(posts);                // User who clicked Like
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;