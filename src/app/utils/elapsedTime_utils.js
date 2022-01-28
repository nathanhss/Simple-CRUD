const Tarefas = require("../model/tarefa_model");

class elapsedTime {

    async elapsedTarefa(id) {
        try {
            const data = await Tarefas.findOne({ _id: id })
            
            if (data.end_time_flag == true && data.elapsedTime == "00:00:00") {
                const total = new Date(data.updatedAt).getTime() - new Date(data.createdAt).getTime()
                const hours = new Date(total).getUTCHours().toString().padStart(2, '0')
                const minutes = new Date(total).getUTCMinutes().toString().padStart(2, '0')
                const seconds = new Date(total).getUTCSeconds().toString().padStart(2, '0')
                const elapsed = hours + ":" + minutes + ":" + seconds

                console.log("vai mandar novo")
                console.log(elapsed)
                return elapsed

            } else  {
                console.log("vai mandar já existente")
                return data.elapsedTime
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = new elapsedTime()