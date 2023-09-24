import React, { useRef, useState } from "react";
import classes from "./forgetPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reset() {
  const NewPassRef = useRef();
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const toggleForm = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsResetPassword(false);
    setEmail("");
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    setResetSuccess(false);
  };

  const sendResetEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/manager/forgotPassword",
        {
          emailAddress: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Handle success, you may show a message to the user
        console.log("Password reset email sent successfully!");
        setIsResetPassword(true); // Switch to reset password form
      } else {
        // Handle error, display a message to the user
        console.error("Error sending reset email.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/manager/resetPassword",
        {
          requestType: "PASSWORD_RESET",
          email: resetEmail,
          resetCode: resetCode,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Handle success, you may show a message to the user
        console.log("Password reset successful!");
        setResetSuccess(true);
      } else {
        // Handle error, display a message to the user
        console.error("Error resetting password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.h1}>
        <h1>FSE Report</h1>
      </div>
      <div className={classes.auth}>
        {isForgotPassword && !isResetPassword && (
          <form>
            <div className={classes.control}>
              <label>Enter the email you have registered with:</label>
            </div>
            <div className={classes.control}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.actions}>
              <button
                type="button"
                className={classes.actions}
                onClick={sendResetEmail}
              >
                Send Reset Email
              </button>
            </div>
          </form>
        )}

        {isResetPassword && !resetSuccess && (
          <form>
            <div className={classes.control}>
              <label>Enter your email:</label>
            </div>
            <div className={classes.control}>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.control}>
              <label>Enter the reset code:</label>
            </div>
            <div className={classes.control}>
              <input
                type="text"
                id="resetCode"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.control}>
              <label>Enter your new password:</label>
            </div>
            <div className={classes.control}>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.actions}>
              <button
                type="button"
                className={classes.actions}
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </div>
          </form>
        )}

        {resetSuccess && (
          <div>
            <p>Password reset successfully!</p>
          </div>
        )}

        <button onClick={toggleForm}>
          {isForgotPassword
            ? "Reset Password Manually"
            : "Request Password Reset"}
        </button>
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

