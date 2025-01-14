import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

const FolderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const returnBack = () => {
        navigate(-1);
    };
    const handleC = () => {
        return id || "No ID provided";
    };

    return (
        <div>
            <button onClick={returnBack} style={{zIndex: "1"}}>
                ✖
            </button>
            {handleC()}
        </div>
    );
};

export default FolderPage;
