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
    GetLinksForFile: async (req, res) => {
        const { fileId } = req.params;

        try {
            const links = await Link.find({ fileId });
            if (!links.length) {
                return res.status(404).json({ message: "Ссылки для указанного файла не найдены" });
            }

            return res.status(200).json({ links });
        } catch (error) {
            console.error("Ошибка при получении ссылок для файла:", error);
            return res.status(500).json({
                error: "Ошибка сервера. Попробуйте ещё раз",
                details: error.message,
            });
        }
    },
    GetLinkById: async (req, res) => {
        const { linkId } = req.params;

        try {
            const link = await Link.findById(linkId);
            if (!link) {
                return res.status(404).json({ message: "Ссылка не найдена" });
            }

            return res.status(200).json({ link });
        } catch (error) {
            console.error("Ошибка при получении ссылки:", error);
            return res.status(500).json({
                error: "Ошибка сервера. Попробуйте ещё раз",
                details: error.message,
            });
        }
    },
    DeleteLink: async (req, res) => {
        const { linkId } = req.params;

        try {
            const link = await Link.findByIdAndDelete(linkId);
            if (!link) {
                return res.status(404).json({ message: "Ссылка не найдена" });
            }

            return res.status(200).json({ message: "Ссылка успешно удалена" });
        } catch (error) {
            console.error("Ошибка при удалении ссылки:", error);
            return res.status(500).json({
                error: "Ошибка сервера. Попробуйте ещё раз",
                details: error.message,
            });
        }
    },
    UpdateLink: async (req, res) => {
        const { linkId } = req.params;
        const { isPublic } = req.body;

        try {
            const link = await Link.findByIdAndUpdate(
                linkId,
                { isPublic },
                { new: true }
            );
            if (!link) {
                return res.status(404).json({ message: "Ссылка не найдена" });
            }

            return res.status(200).json({
                message: "Ссылка успешно обновлена",
                link,
            });
        } catch (error) {
            console.error("Ошибка при обновлении ссылки:", error);
            return res.status(500).json({
                error: "Ошибка сервера. Попробуйте ещё раз",
                details: error.message,
            });
        }
    },
};

module.exports = LinkController;
