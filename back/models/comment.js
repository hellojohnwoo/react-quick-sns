module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // 'id' is set by default.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId: 1        <- belongsTo(db.User);
        // PostId: 5        <- belongsTo(db.Post);
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',  // For Emoji
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}