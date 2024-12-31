import React from "react";
import styles from '../assets/FileComponent.module.scss';
import {
    FaFile,
    FaFileImage,
    FaFileWord,
    FaFilePdf,
    FaFileExcel,
    FaFileZipper,
    FaFileVideo,
    FaFileAudio
} from "react-icons/fa6";
import {BiSolidFileTxt} from "react-icons/bi";

const IconMap: { [key: string]: JSX.Element } = {
    'img': <FaFileImage/>,
    'pdf': <FaFilePdf/>,
    'docx': <FaFileWord/>,
    'txt': <BiSolidFileTxt/>,
    'xlsx': <FaFileExcel/>,
    'zip': <FaFileZipper/>,
    'mp4': <FaFileVideo/>,
    'mp3': <FaFileAudio/>,
};

type Icons = {
    file_type: string;
}

export const FileIcons: React.FC<Icons> = ({file_type}) => {
    const icon = IconMap[file_type] || <FaFile/>;

    return (
        <div className={styles['file-icon']}>
            {icon }
        </div>
    );
}
