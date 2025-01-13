import React, {useEffect, useState} from 'react';
import { FaFolder } from "react-icons/fa";
import FileComponent from "../components/FileComponent";
import styles from '../assets/Storage.module.scss';
import style from '../assets/FileComponent.module.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";
interface Files {
    _id: string | number;
    file_name: string;
    expanded_path: string;
}
interface Folder {
    _id: string | number;
    folder_name: string;
}


const StoragePage: React.FC = () => {
    const api = axios.create({
        baseURL: "http://localhost:8000/api"
    })
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [files, setFiles ] = useState<Files[] | null>(null);
    const [folder, setFolder ] = useState<Folder[]>([]);
    useEffect(() => {
        const userId = '677f4a19bc4711237b08a8f7'
        setFolder([{_id: 1, folder_name: "Summer 2024"},{_id: 2, folder_name: "Summer 2023"},{_id: 3, folder_name: "Summer 2024"},{_id: 4, folder_name: "Summer 2023"}]);
        api.get("/files", {params: { userId } })
            .then(res => setFiles(res.data))
            .catch(error => {
                setErrorMessage(error.message);
                // alert(error.message);
            })
        console.log(errorMessage);
    },[]);
    const handleDelete = (id: string | number) => {

        setFiles((prevFiles) => (prevFiles ? prevFiles.filter((file) => file._id !== id) : []));
    };
    const navigate = useNavigate();


    return (
        <div className={styles['storage']}>
            {folder && folder.map((folder) => (<div onClick={() => navigate(`/folder/${folder._id}`)} className={style['storage-item-card']}><div className={style['folder-icon']}><FaFolder /></div><p className={style['storage-item-name']} >{folder.folder_name}</p></div>)) }
            {files && files.map((file) => (<FileComponent onDelete={handleDelete} _id={file._id} file_name={file.file_name} file_type={file.expanded_path}/>)) }
        </div>
    );
};

export default StoragePage;