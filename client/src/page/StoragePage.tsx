import React, {useEffect, useState} from 'react';
import { FaFolder } from "react-icons/fa";
import FileComponent from "../components/FileComponent";
import styles from '../assets/Storage.module.scss';
import style from '../assets/FileComponent.module.scss';
interface Files {
    _id: string | number;
    file_name: string;
    file_type: string;
}
interface Folder {
    _id: string | number;
    folder_name: string;
}


const StoragePage: React.FC = () => {
    const [files, setFiles ] = useState<Files[] | null>(null);
    const [folder, setFolder ] = useState<Folder[]>([]);
    useEffect(() => {
        setFolder([{_id: 1, folder_name: "Summer 2024"},{_id: 2, folder_name: "Summer 2023"}])
        setFiles([
            {_id: 1, file_name: "list_user.txt", file_type: "txt"},
            {_id: 2, file_name: "Moscow.jpg", file_type: "img"},
            {_id: 3, file_name: "list_user.docs", file_type: "docx"},
            {_id: 4, file_name: "Евгений Онегин.pdf", file_type: "pdf"},
            {_id: 5, file_name: "Node.js for best fraemwork?.mp4", file_type: "mpd"}
        ])
    },[]);
    const handleDelete = (id: string | number) => {
        setFiles((prevFiles) => (prevFiles ? prevFiles.filter((file) => file._id !== id) : []));
    };


    return (
        <div className={styles['storage']}>
            {folder && folder.map((folder) => (<div className={style['storage-item-card']}><div className={style['folder-icon']}><FaFolder /></div><p className={style['storage-item-name']} >{folder.folder_name}</p></div>)) }
            {files && files.map((file) => (<FileComponent onDelete={handleDelete} _id={file._id} file_name={file.file_name} file_type={file.file_type}/>)) }
        </div>
    );
};

export default StoragePage;