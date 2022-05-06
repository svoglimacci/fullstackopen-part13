const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class readingList extends Model {}

readingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list'
})

module.exports = readingList