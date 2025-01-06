const Link = require('../models/Link');
const File = require('../models/File');
const Gtoken = require('../Utils/generateToken');

const LinkController = {
    CreateLink: async (req, res) => {
        const { fileId, ownerId, isPublic } = req.body;

        try {
            const file = await File.findById(fileId);
            if (!file) {
                return res.status(404).json({ message: "Такого файла не существует" });
            }

            const urlToken = Gtoken();
            const fullLink = `http://localhost:8000/cloud/file/${urlToken}`;

            const link = new Link({
                fileId,
                urlToken,
                fullLink,
                ownerId,
                isPublic,
            });

            await link.save();
            return res.status(201).json({
                message: "Ссылка успешно создана",
                link: {
                    id: link._id,
                    url: fullLink,
                    isPublic,
                    createdAt: link.createdAt,
                },
            });
        } catch (error) {
            console.error("Ошибка при создании ссылки:", error);
            return res.status(500).json({
                error: "Ошибка сервера. Попробуйте ещё раз",
                details: error.message,
            });
        }
    },
};

module.exports = LinkController;
