const { sequelize, Sequelize } = require("../config/database");

const User = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.DataTypes.STRING,
    },
    user_email: {
      type: Sequelize.DataTypes.STRING,
    },
    user_password: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
sequelize.sync({ alter: true });

module.exports = User;
