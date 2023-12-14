require("dotenv"). config();

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

//rutas

//middleware 404
app.use((req, res)) => {
    res.status(404).send({
        status:"error",
        message: "not found",
    });
};

// middleware de gestion de errores
app.use(error, req, res, next) => {
    console.error (error);

    res.status(error.httpStatus|| 500).send({
        status: "error",
        message: error.message,
        
    });
};
//lanzamos  servidor
app.listen(3000,() => {
    console.log("funcionando");
});