import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Header from "../parts/Header";
import axios from "axios";
import './css/styling.css'
import download from 'downloadjs';
// ... (other imports and code)

/**
 * Renders the main section of a web page.
 * @returns {JSX.Element} The main section of the web page.
 */
export default function Home() {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const serverUrl = 'http://localhost:3030';


  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/getfiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:3030/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  return (
    <main>
      <Header />
      <Container>
        <div className="files-container">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <table className="files-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Download File</th>
              </tr>
            </thead>
            <tbody>
              {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, title, description
                    , file_path, file_mimetype }) => (
                    <tr key={_id}>
                     
                      <td className="s-image" >
                        <img src={`${serverUrl}/${file_path}`} alt="Image"/>
                        </td>
                      <td className="file-title">
                        {title}
                        </td>
                      <td className="file-description">
                        {description}
                        </td>
                      <td>
                        <button
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype)
                          }
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3} style={{ fontWeight: '300' }}>
                    No files found. Please add some.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
