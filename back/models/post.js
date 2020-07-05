module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // 'id' is set by default.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // PostId -> RetweetId ( { as: 'Retweet' } )
    }, {
        charset: 'utf8mb4',             // For Emoji
        collate: 'utf8mb4_general_ci',  // For other Languages
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);             // The person who wrote the post
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });  // The person who clicked like on the post // post.getLikers
        db.Post.belongsTo(db.Post, { as: 'Retweet' });  // post.addRetweet
    };
    return Post;
};