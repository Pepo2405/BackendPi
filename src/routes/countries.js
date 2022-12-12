const { Country } = require("../db");
const { Router } = require("express");
const router = Router();
const { firstLoad,getCountryByName,getCountryById} = require("../controllers/CountriesController");

router.get("/", async (req, res) => {
  try {
     const { name } = req.query;
     const paises = await firstLoad();
     if (!name) {
      return res.status(200).send(paises);
    }else{
      const country = await getCountryByName(name);
      if(!country.length)throw new Error("Pais no encontrado")
      return res.status(200).send(country);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/:id",async (req, res) => {
  const { id } = req.params;
  try {
    const country = await getCountryById(id)
    res.status(200).send(country);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
