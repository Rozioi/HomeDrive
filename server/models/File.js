import mongoose from 'mongoose';

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
        ref: 'folder', 
        default: null, 
    },
    file_type: {
        type: String,
        required: true,
    },
    file_size: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    collection: 'file'
});

const File = mongoose.model('File', FileSchema);
export default File;
