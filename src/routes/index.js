const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRouter = require('./countries.js');
const activitiesRouter = require('./activities.js');
const router = Router();

router.use("/countries",countriesRouter)
router.use("/activities",activitiesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",(req,res) => {
    res.status(200),send("hola")
})


module.exports = router;
