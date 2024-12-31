import React, {useState} from 'react';
import {FileIcons} from "../utils/fileIcons";
import styles from '../assets/FileComponent.module.scss';
import Modal from "./Modal";

interface File {
    _id: string | number;
    file_name: string;
    file_type: string;
}

const FileComponent: React.FC<File> = ({_id, file_name, file_type}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                {<FileIcons file_type={file_type}/>}
                <p className={styles['storage-item-name']}>{file_name}</p>
            </Modal>
            <div onClick={() => setModalOpen(true)} className={styles['storage-item-card']}>
                {<FileIcons file_type={file_type}/>}
                <p className={styles['storage-item-name']}>{file_name}</p>
            </div>
        </div>
    );
};

export default FileComponent;