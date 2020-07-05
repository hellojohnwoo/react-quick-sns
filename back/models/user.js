module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {     // User -> users (table in MySQL)
        // 'id' is set by default.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,   // Required input
            unique: true,       // email is Unique
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),    //  The length increases when you encrypt it.
            allowNull: false,
        },
        // PostId: 1, 2, 3, ... ,20
        // CommentId
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // For other Languages
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });   // in Like table. UserId VS. PostId
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });  // in Follow talbe. FollowingId VS. FollowerId
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };
    return User;
};