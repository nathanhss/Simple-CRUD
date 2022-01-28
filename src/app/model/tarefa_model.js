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
            type: Boolean,
            default: false
        },
        elapsedTime:{
            type: String,
            default: "00:00:00"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("tarefas", tarefaSchema);