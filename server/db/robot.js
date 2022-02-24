const db = require("./database");
const Sequelize = require("sequelize");

module.exports = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.pinimg.com/originals/39/5a/79/395a796c417f4f165d0b6e6f514dafa6.jpg",
  },
  fuelType: {
    type: Sequelize.ENUM,
    allowNull: false,
    defaultValue: "electric",
    values: ['electric','diesel','gas']
  },
  fuelLevel: {
    type: Sequelize.FLOAT,
    defaultValue: 100,
    validate: {
      notEmpty: true,
      min: 0,
      max: 100,
    },
  },
});
