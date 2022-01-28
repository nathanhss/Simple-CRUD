const Tarefas = require("../model/tarefa_model");
const mytimer = require("../utils/elapsedTime_utils")

class TarefasController {

    async insert(req, res) {
        const { username, description, end_time_flag } = req.body
        const tarefa = { username, description, end_time_flag };
        if (username) {
            try {
                const data = await Tarefas.create(tarefa);
                return res.json({ response: "Operation Success! ", data })
            } catch (error) {
                return res.json({ error: error })
            }
        } else {
            return res.json({ error: 'Username is required' })
        }
    }

    async selectAll(req, res) {
        try {
            const data = await Tarefas.find({});
            return res.json(data)
        } catch (error) {
            return res.json({ error: error })
        }
    }

    async selectOne(req, res) {
        try {
            const data = await Tarefas.findOne({ _id: req.params.id })
            if (!data) {
                return res.json({ error: "Tarefa not found" })
            }
            return res.json(data)
        } catch (error) {
            return res.json({ error: error })
        }
    }

    async updateTarefa(req, res) {
        const id = req.params.id
        const { username, description, end_time_flag } = req.body
        try {
            const flag = await Tarefas.updateOne({ _id: id }, { $set: { end_time_flag: end_time_flag } })
            if (flag.matchedCount === 0) {
                return res.json({ error: "Tarefa id not found to update" })
            }
            let tarefa;
            if (end_time_flag == true) {
                const elapsedTime = await mytimer.elapsedTarefa(id)
                tarefa = { username, description, end_time_flag, elapsedTime }
            } else {
                tarefa = { username, description, end_time_flag }
            }

            const data = await Tarefas.updateOne({ _id: id }, tarefa)

            return res.json(data)
        } catch (error) {
            return res.json({ error: error })
        }
    }

    async removeTarefa(req, res) {
        const id = req.params.id
        try {
            const data = await Tarefas.deleteOne({ _id: id })
            if (!data.matchedCount === 0) {
                return res.json({ error: "Tarefa id not found to remove" })
            }
            return res.json({ response: "Operation Success!" })
        } catch (error) {
            return res.json({ error: error })
        }
    }

    async elapsedTarefa(req, res) {
        const id = req.params.id
        try {
            const data = await Tarefas.findOne({ _id: id })
            if (!data) {
                return res.json({ error: "Tarefa id not found" })
            }

            return res.json({ elapsedTime: data.elapsedTime })

        } catch (error) {
            return res.json({ error: error })
        }
    }
}

module.exports = new TarefasController();