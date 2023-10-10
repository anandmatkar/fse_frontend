import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './../Common/Spinner';
import axios from 'axios';

const MachineInfo = () => {
  const [machineData, setMachineData] = useState({});
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  // Replace with your actual API endpoint
  const apiUrl = '/api/v1/technician/assignedProjectDetails';

  // Function to fetch machine data based on the project ID
  const fetchMachineData = async (projectId) => {
    try {
      const response = await axios.get(`${apiUrl}?projectId=${projectId}`);
      setMachineData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching machine data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachineData(projectId);
  }, [projectId]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h2>Machine Information</h2>
      <ul>
        <li>
          <strong>Serial Number:</strong> {machineData.serialNumber}
        </li>
        <li>
          <strong>Machine Type:</strong> {machineData.machineType}
        </li>
        <li>
          <strong>Hour Count:</strong> {machineData.hourCount}
        </li>
        <li>
          <strong>Nominal Speed:</strong> {machineData.nominalSpeed}
        </li>
        <li>
          <strong>Actual Speed:</strong> {machineData.actualSpeed}
        </li>
        <li>
          <strong>Technician:</strong> {machineData.technician}
        </li>
        <li>
          <strong>Attachments:</strong> {machineData.attachments}
        </li>
      </ul>
    </div>
  );
};

export default MachineInfo;
