import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import FileUploader from "./components/Uploader";
import StoragePage from "./page/StoragePage";
import {Provider} from "react-redux";
import store from "./Redux/store";
import FolderPage from "./components/FolderPage";

const App: React.FC = () => {
  return (
    <Router>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/folder/:id" element={<FolderPage />} />
                    <Route path="/upload" element={<FileUploader />}/>
                    <Route path="/" element={<StoragePage />}/>
                </Route>
            </Routes>
        </Provider>
    </Router>
  );
};

export default App;
