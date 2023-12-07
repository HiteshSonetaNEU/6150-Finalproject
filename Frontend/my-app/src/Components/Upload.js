import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Upload() {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const resp= await axios.get('http://localhost:3001/',{withCredentials:true})
      console.log("resp===",resp)
      await axios.put('http://localhost:3001/recepie/6567c162c4074b374656f914', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
            withCredentials: true,
          
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
console.log("image=== ",image)
  return (
    <div className="App">
      <Form>
        <Form.Group controlId="formImage">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload Image
        </Button>
      </Form>
    </div>
  );
}

export default Upload;
