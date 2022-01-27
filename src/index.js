const express = require("express");
const db = require("./database/config_database");
const mongoose = require("mongoose");

class App {
    constructor() {
        this.express = express();

        this.database();
        this.middlewares();
        this.routes();

        this.express.listen(3001, () =>
            console.log('Its working')
        );
    }

    database() {
        mongoose.connect(db.uri, { useNewUrlParser: true });
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require("./routes"));
    }
}
module.exports = new App().express;