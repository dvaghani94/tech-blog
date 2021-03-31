// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/config");

// // TODO: YOUR CODE HERE
// class Comment extends Model {}

// Comment.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     body: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },
//     postId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "post",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "comment",
//   }
// );

// module.exports = Comment;

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
