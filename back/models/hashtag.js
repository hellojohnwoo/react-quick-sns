module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        // 'id' is set by default.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },                   // Hashtag
    }, {
        charset: 'utf8mb4',             // For Emoji
        collate: 'utf8mb4_general_ci',  // For other Languages
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
    return Hashtag;
};