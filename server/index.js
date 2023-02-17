const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json()); //req.body
app.use(cors());

//Rutas
app.use("/auth", require("./routes/jwtAuth"));

//ruta pagina principal
app.use("/principal", require("./routes/principal"));

app.listen(5000,()=>{
    console.log("Servidor en el puerto 5000");
})