import React from 'react';
import { useParams } from "react-router-dom";

const FolderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const handleC = () => {
        return id || "No ID provided";
    };

    return (
        <div>
            {handleC()}
        </div>
    );
};

export default FolderPage;
