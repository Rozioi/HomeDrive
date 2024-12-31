const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
    },
    stored_name: {
        type: String,
        required: true,
    },
    file_path: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    expanded_path: {
        type: String,
        required: true,
    },
    in_folder: {
        type: Boolean,
        required: true,
    },
    folder_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'folder', // Ссылка на коллекцию папок
        default: null, // Поле изначально необязательное
    },
    file_type: {
        type: String,
        required: true,
    },
    file_size: {
        type: Number,
        required: true,
    }
}, {
    collection: 'file'
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
