import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'



/**
 * Functional component representing the main content of the application.
 * It includes a Bootstrap Navbar component with navigation links.
 * @returns {JSX.Element} The JSX element representing the main content.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


