import React, { useState } from "react";
import axios from "axios";
import styles from '../assets/Uploader.module.scss'; // Импорт стилей

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFileUpload = async (selectedFile: File) => {
        setErrorMessage(""); // Очистка ошибок

        // Проверка размера файла
        if (selectedFile.size > 100 * 1024 * 1024) {
            setErrorMessage("Размер файла не должен превышать 100 MB");
            return;
        }

        setFile(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);  // Кодируем имя файла
        formData.append('user_id', '67703d523dcdd7ca4c271011'); // Передаем user_id

        try {
            const response = await axios.post("http://localhost:8000/api/add-file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);

        } catch (error) {
            console.error("Ошибка загрузки:", error);
            setErrorMessage("Произошла ошибка при загрузке файла");
        }

    };

    return (
        <div>
            <input
                type="file"
                id="file-input"
                onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                        handleFileUpload(file);
                    }
                }}
                disabled={false}
            />

            {file && <p>Файл загружен: {file.name}</p>}  {/* Показываем имя файла */}

            {errorMessage && <div>{errorMessage}</div>}  {/* Отображаем ошибку */}
        </div>
    );
};

export default FileUploader;
