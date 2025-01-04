import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import FileUploader from "./components/Uploader";
import StoragePage from "./page/StoragePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route path="/upload" element={<FileUploader />}/>
           <Route path="/" element={<StoragePage />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
