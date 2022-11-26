const { Country, Activities } = require("../db");
const { Op } = require("sequelize");

const getAllActivities = async () => {
  const activities = await Activities.findAll({
    include: [{ model: Country, atributes: ["name"] }],
  });
  return activities;
};
const addActivity = async (req) => {
  try {
    const { name, dificulty, season, duration } = req;
    const country = req.country;
    const response = await Activities.create({
      name,
      dificulty,
      season,
      duration,
    });
    country?.forEach(async (country) => {
      const paises = await Country.findAll({
        where: { name: { [Op.iLike]: country } },
      });

      await response.addCountry(paises);
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addActivity, getAllActivities };
