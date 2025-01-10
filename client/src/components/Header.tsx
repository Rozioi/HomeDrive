import React, { useState } from 'react';
import styles from "../assets/Header.module.scss";
import { NavLink } from "react-router-dom";
import { FiFolderPlus } from "react-icons/fi";
import Modal from "./Modal";  // Модальное окно
import { FaCloudArrowUp } from "react-icons/fa6";

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
                <NavLink to={'/'} className={({ isActive }) =>
                    isActive ? `${styles.activeLink}` : ""
                }>
                    <img src='/ava.jpg' alt="Logo"/>
                </NavLink>
            </div>
            <button>
                click
            </button>
            <div className={styles.navigateLink}>
                <NavLink to={'/upload'} className={({ isActive }) =>
                    isActive ? `${styles.activeLink}` : ""
                }>
                    <FaCloudArrowUp />
                </NavLink>
            </div>
            <div onClick={toggleModal} className={`${styles.createFolderButton} ${isModalOpen ? styles.active : ''}`}>
                <FiFolderPlus/>
            </div>
        </header>
    );
};

export default Header;
