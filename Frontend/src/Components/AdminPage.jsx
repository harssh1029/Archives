import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <>
      <div style={{ width: "75%", margin: "auto", paddingTop: "150px", cursor: 'pointer' }}>
        <h3>Admin Page</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fileUpload">Upload Excel File:</label>
            <input type="file" id="fileUpload" onChange={handleFileChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AdminPage;
