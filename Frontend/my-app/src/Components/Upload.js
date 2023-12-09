import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Upload({ recipeId }) {
  console.log(recipeId);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      // console.log("resp===", resp);
      await axios.put(`http://localhost:3001/recepie/${recipeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  // console.log("image=== ", image);
  return (
    <>
      <Form className="imageUploadContainer">
        <Form.Group controlId="formImage">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" className="btn-dark" onClick={handleUpload}>
          Save Image
        </Button>
      </Form>
      {/* <div>
        <img
          src="http://localhost:3001/api/images/image-1702003746319.webp"
          alt="Your Image"
        />
      </div> */}
    </>
  );
}

export default Upload;
