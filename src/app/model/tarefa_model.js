const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        end_time_flag: {
            type: String,
            default: "false"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Tarefas", tarefaSchema);