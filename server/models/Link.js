import mongoose from "mongoose";

const LinkScheme = new mongoose.Schema({
    fileId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'file' },
    urlToken: { required: true, type: String, unique: true },
    fullLink: { required: true, type: String },
    ownerId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
}, {
    collection: 'Link'
});

LinkScheme.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Link = mongoose.model('Link', LinkScheme);

export default Link;
