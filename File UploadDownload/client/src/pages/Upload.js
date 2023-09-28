import React, { useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row'
import Header from '../parts/Header';
import Col from 'react-bootstrap/esm/Col';
import Button from "react-bootstrap/Button"
import Dropzone from 'react-dropzone';

/**
 * Renders a form for uploading files.
 * @returns {JSX.Element} The rendered form.
 */
export default function Upload() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);

  const handleTitleChange = (ev) => {
    setTitle(ev.target.value);
  };

  const handleDescChange = (ev) => {
    setDesc(ev.target.value);
  };

  const handleFileSelect = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", desc);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3030/up", {
        method: "POST",
        body: formData,
        // No need to set 'Content-Type' header when using FormData
      });
      // Handle the response
      if(response.ok){
        console.log(response);
      }
      else{
        console.log("not succesful");
      }
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <main>
      <Header />
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder='Write title'
                  value={title}
                  onChange={handleTitleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description </Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder='Write Description'
                  value={desc}
                  onChange={handleDescChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="upload-section">
            <Dropzone onDrop={handleFileSelect}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "drop-zone" })}>
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )}
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
}
