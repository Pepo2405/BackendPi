const { Router } = require("express");
const router = Router();

const {
  addActivity,
  getAllActivities,
} = require("../controllers/ActivitiesController");

router.get("/", async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).send(activities);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
  const { name, dificulty, season, duration,countries } = req.body;
  console.log("body del request: ",req.body)
    if (!name || !dificulty || !season || !duration)
      throw new Error("Favor de llenar todos los campos");
    const response = await addActivity({
      name,
      dificulty,
      season,
      duration,
      countries
    });
    res.status(200).send(response);
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message);
  }
});

module.exports = router;
