module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        // 'id' is set by default.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },                   // For Image
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // For other Languages
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}