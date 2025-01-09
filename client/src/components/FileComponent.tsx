import React, {useState} from 'react';
import { FileIcons } from "../utils/fileIcons";
import { MdDeleteForever , MdDownload , MdIosShare  } from "react-icons/md";
import { MdContentCopy } from 'react-icons/md';
import styles from '../assets/FileComponent.module.scss';
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import axios from "axios";
// import axios from "axios";

interface File {
    _id: string | number;
    file_name: string;
    file_type: string;
    onDelete: (id: string|number) => void;
}

interface Link {
    _id: string;
    fullLink: string;
    ownerId: string;
    isPublic: boolean;
    createdAt: string;
}

const FileComponent: React.FC<File> = ({ _id,onDelete, file_name, file_type }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isListLinkOpen,setIsListLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<Link[]>([]);
    const api = axios.create({
        baseURL: 'http://localhost:8000/api'
    })
    const HandleGetListLink = () => {
        api.get(`/link/file/${_id}`)
            .then(res => {setLinks(res.data.links);setIsListLinkOpen(!isListLinkOpen)})
            .catch(error => setErrorMessage(error.message))
    };
    const handleCopyLink = (link: string) => {
        navigator.clipboard.writeText(link).then(() => {
            alert("Ссылка скопирована!");
        }).catch((err) => {
            alert("Не удалось скопировать ссылку: " + err);
        });
    };
    const handleDownload = async () => {
        try {
            const response = await api.get(`/download/${_id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = file_name;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка при скачивании:", error);
            setErrorMessage("Не удалось скачать файл.");
        }
    };
    const handleDeleteFile = async () => {
        api.delete(`/delete/${_id}`)
            .then(() => onDelete(_id))
            .catch(error => setErrorMessage(error.message));
        setModalOpen(false);
    }
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
                    <button onClick={() => HandleGetListLink()}><MdIosShare/></button>
                    <button onClick={() => handleDownload()}><MdDownload/></button>
                    <button onClick={() => handleDeleteFile()}><MdDeleteForever/></button>
                    {isListLinkOpen && (
                        <div className={styles['links-container']}>
                            {links.map((link) => (
                                <div className={styles['link-item']} key={link._id}>
                                    <a
                                        href={link.fullLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles['link-text']}
                                    >
                                        {link.fullLink}
                                    </a>
                                    <button
                                        className={styles['copy-button']}
                                        onClick={() => handleCopyLink(link.fullLink)}
                                    >
                                        <MdContentCopy /> Копировать
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <p>{errorMessage}</p>
                </div>
            </Modal>

        </div>
    );
};

export default FileComponent;
