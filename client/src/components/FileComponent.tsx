import React, { useState } from 'react';
import { FileIcons } from "../utils/fileIcons";
import { MdDeleteForever , MdDownload , MdIosShare  } from "react-icons/md";

import styles from '../assets/FileComponent.module.scss';
import Modal from "./Modal";
import Tooltip from "./Tooltip";

interface File {
    _id: string | number;
    file_name: string;
    file_type: string;
    onDelete: (id: string|number) => void;
}

const FileComponent: React.FC<File> = ({ _id,onDelete, file_name, file_type }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className={styles['file-container']}>
            <Tooltip text={'Нажмите, чтобы увидеть свойства'}>
                <div
                    onClick={() => setModalOpen(true)}
                    className={styles['storage-item-card']}
                >
                    {<FileIcons file_type={file_type}/>}
                    <p className={styles['storage-item-name']}>{file_name}</p>
                </div>
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className={styles['modal-content']}>
                    <h2>Свойства файла</h2>
                    {<FileIcons file_type={file_type}/>}
                    <p>Название: {file_name}</p>
                    <p>Тип: {file_type}</p>
                    <button onClick={() => console.log('Поделиться')}><MdIosShare/></button>
                    <button onClick={() => console.log('Скачать')}><MdDownload/></button>
                    <button onClick={() => {onDelete(_id); setModalOpen(false)}}><MdDeleteForever/></button>
                </div>
            </Modal>
        </div>
    );
};

export default FileComponent;
