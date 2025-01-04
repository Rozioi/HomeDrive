import React, { useState } from "react";
import axios from "axios";
import styles from '../assets/Uploader.module.scss';

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFileUpload = async (selectedFile: File) => {
        setErrorMessage("");

        if (selectedFile.size > 100 * 1024 * 1024) {
            setErrorMessage("Размер файла не должен превышать 100 MB");
            return;
        }

        setFile(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append('user_id', '67703d523dcdd7ca4c271011');

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
        <div className={styles['file-input-container']}>
            <label htmlFor="file-input" className={styles['file-input-label']}>
                <span>📁 Загрузить файл</span>
            </label>
            <input
                type="file"
                id="file-input"
                className={styles['file-input']}
                onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                        handleFileUpload(file)
                            .then(() => {
                                console.log('Файл успешно загружен.');
                            })
                            .catch((error) => {
                                console.error('Ошибка при загрузке файла:', error);
                                setErrorMessage('Произошла ошибка при загрузке файла');
                            });
                    }
                }}
            />

            {file && <p className={styles['uploaded-file']}>Файл загружен: {file.name}</p>}

            {errorMessage && <div className={styles['error-message']}>{errorMessage}</div>}
        </div>


    );
};

export default FileUploader;
