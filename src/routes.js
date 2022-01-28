const express = require("express");

const routes = express.Router();
const TarefasController =  require("./app/controller/tarefas_controller");

//get requests
routes.get("/tarefas", TarefasController.selectAll)
routes.get("/tarefas/:id", TarefasController.selectOne)
routes.get("/tarefas/elapsed/:id", TarefasController.elapsedTarefa)

//post requests
routes.post("/tarefas", TarefasController.insert)

//patch and push requests
routes.patch("/tarefas/:id", TarefasController.updateTarefa)

//delete requests
routes.delete("/tarefas/remove/:id", TarefasController.removeTarefa)

module.exports = routes;