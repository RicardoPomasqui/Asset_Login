const router = require("express").Router();
const pool = require("../db");
const autorizacion = require("../middleware/autorizacion");


router.get("/", autorizacion, async (req, res) => {
    try {

        const user = await pool.query("SELECT user_name FROM users WHERE user_id =$1",
            [req.user]);

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Error en el servidor");
    }
})

module.exports = router;