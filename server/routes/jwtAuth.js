const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validarInfo = require("../middleware/validarInfo");
const autorizacion = require("../middleware/autorizacion");


//Ruta para el registro
router.post("/register", validarInfo, async (req, res) => {
        //1 req.body(nombre, email, contrasena)
        const { name, email, password } = req.body;
    try {


        //2 verrificar si el usuario existe
        const user = await pool.query("SELECT *FROM users WHERE user_email=$1", [email]);


        if (user.rows.length !== 0) {
            return res.status(401).json("El usuario ya existe");
        }

        //3 Bcrypt para la contrasena del usuario

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4  Registrar nuevo usuario
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING*",
            [name, email, bcryptPassword]);

        //res.json(newUser.rows[0]);

        //5 Generar el Token JWT
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });


    } catch (err) {
        console.error(error.message);
        res.status(500).send("Error en el servidor");
    }
});

//Ruta para el Login
router.post("/login", validarInfo, async (req, res) => {
    try {

        // 1 req.body
        const { email, password } = req.body;

        // 2 Verificar si el usaurio existe, sino dar una alerta
        const user = await pool.query("SELECT *FROM users WHERE user_email =$1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("El email es incorrecto");
        }

        // 3 Verificar si las contrasenas coninciden

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password); //se retornara un boolean T F

        if (!validPassword) {
            return res.status(401).json("La contraseña es incorrecta");
        }
        //4 Dar el token JWT
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });


    } catch (err) {
        console.error(error.message);
        res.status(500).send("Error en el servidor");
    }
})

router.get("/verificado", autorizacion, async (req, res) => {
    try {

        res.json(true);

    } catch (err) {
        console.error(error.message);
        res.status(500).send("Error en el servidor");
    }


});

module.exports = router;