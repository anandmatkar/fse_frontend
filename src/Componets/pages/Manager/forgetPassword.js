import React, { useRef } from "react";
import classes from "./forgetPassword.module.css"
import { useNavigate } from "react-router-dom";

function Reset() {
  const NewPassRef = useRef();
  const navigate = useNavigate();

  const PassResetHandler = (event) => {
    event.preventDefault();
    const enteredNewPass = NewPassRef.current.value;
    console.log(enteredNewPass)
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAvdBD8xZ0WJX9FP_ffZBJ7Cgf9n90HMjg",
      {
        method: "POST",
        body: JSON.stringify({
          requestType : "PASSWORD_RESET",
          email: enteredNewPass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <React.Fragment>
      <div className={classes.h1}>
        <h1>FSE Report</h1>
      </div>
      <div className={classes.auth}>
        <form onSubmit={PassResetHandler}>
          <div className={classes.control}>
            <label>Enter the email with You have Registered !!...</label>
          </div>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              ref={NewPassRef}
              className={classes.input}
            ></input>
          </div>
          <div className={classes.actions}>
            <button className={classes.actions}>Send Link</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Reset;
// import React, { useState } from "react";
// import { Storage } from "../../../firebase";
// import { FirebaseApp } from "firebase/app";
// import { FirebaseStorage } from "firebase/storage";
// import
// function PDFUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const [downloadURL, setDownloadURL] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       alert("Please select a PDF file.");
//       return;
//     }

//     setUploading(true);
//     setUploadError(null);
//     setUploadProgress(0);

//     // Create a reference to the storage bucket and the file path
//     const storageRef = firebase.storage().ref();
//     const fileRef = storageRef.child(selectedFile.name);

//     // Upload the selected file to Firebase Cloud Storage
//     const uploadTask = fileRef.put(selectedFile);

//     // Set up event listeners for the upload progress and completion
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Calculate the upload progress
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         // Handle upload errors
//         setUploading(false);
//         setUploadError(error.message);
//       },
//       () => {
//         // Upload completed successfully, get the download URL
//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//           setUploading(false);
//           setDownloadURL(url);
//         });
//       }
//     );
//   };

//   return (
//     <div>
//       <h2>Upload PDF</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {uploading && <p>Uploading... {uploadProgress.toFixed(2)}%</p>}
//       {uploadError && <p>Error: {uploadError}</p>}
//       {downloadURL && (
//         <div>
//           <p>PDF uploaded successfully!</p>
//           <a href={downloadURL} target="_blank" rel="noopener noreferrer">
//             Download Link
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PDFUpload;

