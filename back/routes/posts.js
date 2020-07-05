const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {                             // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {                     // When not first initialize time, Execute this part
            where.id = { [Op.lt]: parseInt(req.q.lastId, 10) }    // Using Op!, Do not using $lt. that include the SQL Injection Attact
        }                                                               // Bring ten smaller than the last number. // ex) 21, (20, 19, ..., 11,) 10, 9, ..., 2, 1

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
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
                model: User,                        // User who clicked Like
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
                }]
            }],
        });
        // console.log(posts);                         // record on the server side
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;