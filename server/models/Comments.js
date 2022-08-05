module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentText: {
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Comments
}