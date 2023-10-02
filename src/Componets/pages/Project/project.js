import React, { useState } from 'react';
import './Project.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Project() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const response = await axios.post(
        '/api/v1/manager/uploadMachineFiles',
        formData
      );
      toast.success(response.message);
      console.log('Upload success:', response.data);
    } catch (error) {
      toast.error(error);
      console.error('Upload error:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <b>Upload Machine Files</b>
            <div className="file-upload-contain">
              <input
                id="multiplefileupload"
                type="file"
                accept=".jpg,.gif,.png"
                multiple
                onChange={handleFileChange}
              />
              <button onClick={handleFileUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Project;
