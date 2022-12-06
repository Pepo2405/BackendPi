const { Sequelize, Model, Op } = require("sequelize");
const axios = require("axios");
const { Country, Activities } = require("../db");

const firstLoad = async () => {
  try {
    const countries = await Country.findAll({
      include: [{ model: Activities, atributes: ["name"] }],
    });
    if (!countries.length) {
      console.log("Empty db");
      console.log("Getting Countries from API");
      const response = await axios.get("https://restcountries.com/v3.1/all");
      console.log("llegue 0");

      const parcedInfo = response.data.map((countrie) => {
        const ctlanguages = Object.values(countrie.languages || "");
        const ctCapitals = Object.values(countrie.capital || "");
        // console.log(countrie);

        return {
          ...countrie,
          name: countrie.name.common,
          id: countrie.cioc || countrie.cca3,
          continent_name: countrie.continents[0],
          flag_img: countrie.flags.png,
          coatOfArms: countrie.coatOfArms?.png || countrie.coatOfArms.svg,
          timezones: countrie.timezones[0],
          languages: ctlanguages,
          capital: ctCapitals,
        };
      });
      console.log("llegue create");

      const newCountries = await Country.bulkCreate(parcedInfo);

      return newCountries;
    } else {
      return countries;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getCountryByName = async (name) => {
  try {
    const allUsers = await Country.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    return allUsers;
  } catch (error) {
    throw new Error(error);
  }
};

const getCountryById = async (id) => {
  try {
    const country = await Country.findByPk(id);
    console.log(country);
    if (!country) throw new Error("No se encontro el pais con el id preoveido");
    else return country;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = { firstLoad, getCountryByName, getCountryById };
