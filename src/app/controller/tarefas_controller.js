const Tarefas = require("../model/tarefa_model");

class TarefasController {

    async insert(req, res) {
        const { username, description, end_time_flag } = req.body
        const tarefa = { username, description, end_time_flag };
        if (username) {
            try {
                const data = await Tarefas.create(tarefa);
                return res.json({ response: "Operation Success! ", data})
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
        const tarefa = { username, description, end_time_flag };
        try {
            const data = await Tarefas.updateOne({ _id: id }, tarefa)

            if (data.matchedCount === 0) {
                return res.json({ error: "Tarefa id not found to update" })
            }

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
            if (data.end_time_flag == 'true') {
                const total = new Date(data.updatedAt).getTime() - new Date(data.createdAt).getTime();
                const hours = new Date(total).getUTCHours().toString().padStart(2, '0')
                const minutes = new Date(total).getUTCMinutes().toString().padStart(2, '0')
                const seconds = new Date(total).getUTCSeconds().toString().padStart(2, '0')
                const elapsed = hours+":"+minutes+":"+seconds
                
                console.log(elapsed)
                return res.json({ response: elapsed })
            } else {
                return res.json({ response: "Tarefa is running" })
            }

        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }


}

module.exports = new TarefasController();