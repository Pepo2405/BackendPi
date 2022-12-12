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
    const { name, dificulty, season, duration,img } = req;
    const countries = req.countries;

    const [response, created] = await Activities.findOrCreate({
      where: { name: name },
      defaults: { dificulty, season, duration,img },
    });

    if (!created) {
      response.dificulty = dificulty;
      response.season = season;
      response.duration = duration;
      response.save();
    }

    countries?.forEach(async (country) => {
      try {
        const paises = await Country.findAll({
          where: { name: { [Op.iLike]: country } },
        });
        await response.addCountry(paises);
        console.log("se agrego");
      } catch (err) {
        throw err;
      }
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addActivity, getAllActivities };
