const { sequelize } = require("../util/db")
const { Model, DataTypes } = require("sequelize")

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            max: 2022,
            min: 1991,
        }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

module.exports = Blog