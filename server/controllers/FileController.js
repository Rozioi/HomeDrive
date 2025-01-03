const File = require('../models/File');
const fs = require("node:fs");
const path = require('path');
const uploadFiles = async (req, res) => {

    try {
        const filesdata = req.files;
        const userId = req.body.user_id;

        if (!filesdata) {
            return res.status(400).json({message: "Файл не загружен. Проверьте поле 'filedata'."});
        }

        const filePromises = filesdata.map((file) => {
            const newFile = new File({
                file_name: file.originalname,
                stored_name: file.filename,
                file_path: file.path,
                user_id: userId,
                expanded_path: path.extname(file.path),
                file_type: file.mimetype,
                file_size: file.size,
            });

            return newFile.save();

        });
        await Promise.all(filePromises);


        return res.status(200).json({
            message: "Файлы успешно загружены!",
        });
    } catch (e) {
        console.error("Ошибка при загрузке файлов:", e);
        return res.status(500).json({message: "Ошибка сервера. Попробуйте ещё раз."});

    }
};


const FileController = {
    GetAllFile: async (req, res) => {
        try {
            const userId = req.body.user_id;

            if (!userId) {
                return res.status(400).json({message: "Отсуствует user_id"})
            }
            const files = await File.find({user_id: userId})
            if (!files) {
                return res.status(404).json({message: "У вас нет ещё файлов"})
            }
            return res.status(200).json(files);
        } catch (e) {
            return res.status(500).json({message: "Ошибка сервера. Попробуйте ещё раз."});
        }
    },
    GetFileById: async (req, res) => {
        try {
            const fileId = req.params.fileId;
            if (!fileId) {
                return res.status(400).json({message: "Отсуствует file_id"});
            }
            const file = await File.findById(fileId);
            if (!file || file.length <= 0) {
                return res.status(404).json({message: "Данного файла не существует"});
            }
            return res.status(200).json(file);
        } catch (e) {
            return res.status(500).json({message: "Ошибка сервера. Попробуйте ещё раз :", e});
        }
    },

    DownloadFileById: async (req, res) => {
        try {
            const fileId = req.params.fileId;
            if (!fileId) {
                return res.status(400).json({message: "Отсутствует file_id"});
            }

            const file = await File.findById(fileId);
            if (!file) {
                return res.status(404).json({message: "Данного файла не существует"});
            }
            return res.download(file.file_path);
        } catch (e) {
            console.error("Ошибка при загрузке файла:", e);
            return res.status(500).json({message: "Ошибка сервера. Попробуйте ещё раз.", error: e.message});
        }
    },
    DeleteFileById: async (req, res) => {
        try {
        const fileId = req.params.fileId;

        // Шаг 1: Найдем файл в базе данных по ID
        const fileRecord = await File.findById(fileId);

        // Если файл не найден
        if (!fileRecord) {
            return res.status(404).json({ message: "Данного файла не существует" });
        }

        // Шаг 2: Получаем полный путь к файлу
        const filepath = path.resolve(fileRecord.file_path);
        console.log("Путь к файлу:", filepath); // Логируем путь для проверки

        try {
            // Проверяем, существует ли файл, перед тем как попытаться его удалить
            await fs.promises.access(filepath); // Проверка на доступность файла
            console.log("Файл найден и доступен для удаления");

            // Удаляем файл с диска
            await fs.promises.unlink(filepath);
            console.log("Файл успешно удалён с файловой системы");

        } catch (err) {
            console.error("Ошибка при доступе или удалении файла:", err);
            return res.status(500).json({ error: 'Не удалось удалить файл с файловой системы.' });
        }

        // Шаг 4: Удаляем запись из базы данных
        try {
            await File.findByIdAndDelete(fileId);
            return res.status(200).json({ message: 'Файл успешно удалён.' });
        } catch (err) {
            console.error("Ошибка при удалении записи из базы данных:", err);

            // Если не удалось удалить из базы данных, восстанавливаем файл
            try {
                await fs.writeFile(filepath, fileRecord.file_name);
                console.log("Файл был восстановлен");
            } catch (writeErr) {
                console.error('Не удалось восстановить файл:', writeErr);
            }

            return res.status(500).json({ error: 'Не удалось удалить файл из базы данных.' });
        }

    } catch (e) {
        console.error('Ошибка на сервере:', e);  // Логируем ошибку
        return res.status(500).json({ message: "Ошибка сервера. Попробуйте ещё раз" });
    }



    }
};

module.exports = {
    uploadFiles,
    FileController
}