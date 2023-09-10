// pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Train from '../components/Train';

const Home = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('API_URL', {
        headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
      });
      setTrains(response.data);
    }

    fetchData();
  }, []);

  const viewTrainDetails = (id) => {
    // Redirect to the Train Detail Page
  }

  return (
    <div>
      {trains.map(train => (
        <Train key={train.id} train={train} onViewDetails={viewTrainDetails} />
      ))}
    </div>
  );
}

export default Home;
