import File from '../models/File.js';
import fs from "node:fs";
import path from 'path';
import Link from "../models/Link.js";
export const uploadFiles = async (req, res) => {

    try {
        const filesdata = req.files;
        const {user_id,in_folder} = req.body;

        if (!filesdata) {
            return res.status(400).json({message: "Файл не загружен. Проверьте поле 'filedata'."});
        }

        const filePromises = filesdata.map((file) => {
            const newFile = new File({
                file_name: file.originalname,
                stored_name: file.filename,
                file_path: file.path,
                user_id: user_id,
                in_folder: in_folder,
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


export const FileController = {
    GetAllFile: async (req, res) => {
        try {
            const {userId} = req.query;

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
        const fileRecord = await File.findById(fileId);
        if (!fileRecord) {
            return res.status(404).json({ message: "Данного файла не существует" });
        }
        const filepath = path.resolve(fileRecord.file_path);
        console.log("Путь к файлу:", filepath);

        try {
            await Link.deleteMany({fileId: fileId});
            await fs.promises.access(filepath); // Проверка на доступность файла
            console.log("Файл найден и доступен для удаления");
            await fs.promises.unlink(filepath);
            console.log("Файл успешно удалён с файловой системы");

        } catch (err) {
            console.error("Ошибка при доступе или удалении файла:", err);
            return res.status(500).json({ error: 'Не удалось удалить файл с файловой системы.' });
        }

        try {
            await File.findByIdAndDelete(fileId);
            return res.status(200).json({ message: 'Файл успешно удалён.' });
        } catch (err) {
            console.error("Ошибка при удалении записи из базы данных:", err);

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