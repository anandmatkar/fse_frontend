import React, { useState } from 'react';
import './AddTimesheetEntryForm.css';

function AddTimesheetEntryForm({ onAdd }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date,
      startTime,
      endTime,
      comments,
    };
    onAdd(newEntry);
    setDate('');
    setStartTime(''); 
    setEndTime('');
    setComments('');
  };

  return (
    <form className="add-timesheet-entry-form" onSubmit={handleSubmit}>
      <h3>Add Timesheet Entry</h3>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Comments:</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default AddTimesheetEntryForm;
