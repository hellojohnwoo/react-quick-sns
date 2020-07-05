const passport = require('passport');
const local = require('./local');
const { User } = require('../models');


module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);    // 1st serverError / 2nd serverSuccess
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id }});
            done(null, user); // req.user
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};