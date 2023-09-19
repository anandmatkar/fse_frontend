import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import classes from  "./timeSheetShow.module.css";

function TimeSheet() {
  const [date, setDate] = useState("");
  const [name,setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [comments, setComments] = useState("");
  const [message,setMessage] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the timesheet data
    const timesheetData = {
      name,
      date,
      startTime,
      endTime,
      comments,
    };

    // Send the timesheetData to Firebase Realtime Database
    fetch(
      "https://testproject-e9582-default-rtdb.firebaseio.com/timesheet.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timesheetData),
      }
    )
      .then((response) => {
        // setMessage(true);
        return response.json()
       
    })
      .then((data) => {
        console.log("Timesheet data sent to Firebase:", data);
        // Reset form fields
        setName("")
        setDate("");
        setStartTime("");
        setEndTime("");
        setComments("");
        setMessage(true)
        setTimeout(() => setMessage(false), 2000);
      })
      .catch((error) => {
        console.error("Error sending timesheet data to Firebase:", error);
      });
  };

  return (
    <div>
    {message && <h1 className={classes["success-message"]}>Your Timesheet is Saved</h1>}
      <h2>Time Sheet</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Tehnician Name</label>
          <input
            type="text"
            id="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Starting Time</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">Ending Time</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
          ></textarea>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default TimeSheet;
