import React, { useState } from 'react';
import styles from "../assets/Header.module.scss";
import { NavLink } from "react-router-dom";
import { FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import { FaFolderPlus  } from 'react-icons/fa6';
import { FiFolderPlus } from "react-icons/fi";
import Uploader from "./Uploader";
import Modal from "./Modal";  // Модальное окно

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sanitizeInput = (value: string) => {
        return value.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const [folderName, setFolderName] = useState<string>('');
    const HandleChangeFolderName = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sinitizeName = sanitizeInput(folderName);
        setFolderName(sinitizeName);
    };
    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <header className={styles.header}>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className={styles.modalContent} onSubmit={HandleChangeFolderName}>
                        <h1 className={styles['modal-content-Title']}>Укажите название вашей папки</h1>
                        <input className={styles['modal-input']} value={folderName} onChange={e => setFolderName(e.target.value)} type='text' placeholder='Название папки'/>
                        <button className={styles['modal-submit']} type='submit'>Создать</button>
                </form>
            </Modal>

            <div className={styles.logo}>
                <NavLink to={'/storage'}>
                    <img src='/ava.jpg' alt="Logo"/>
                </NavLink>
            </div>
            <div onClick={toggleModal} className={`${styles.createFolderButton} ${isModalOpen ? styles.active : ''}`}>
                <FiFolderPlus/>
            </div>
            <div className={styles.actions}>


                <button className={styles.uploadButton}>
                    <FaCloudUploadAlt /> Загрузить файлы
                </button>
            </div>
        </header>
    );
};

export default Header;
