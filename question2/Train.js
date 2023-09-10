import React from 'react';
import { Card, Typography, Button } from '@material-ui/core';

const Train = ({ train, onViewDetails }) => {
  return (
    <Card>
      <Typography variant="h5">{train.name}</Typography>
      <Typography variant="subtitle1">Departure: {new Date(train.departureTime).toLocaleTimeString()}</Typography>
      <Typography variant="subtitle1">Delay: {train.delay} mins</Typography>
      <Button onClick={() => onViewDetails(train.id)}>View Details</Button>
    </Card>
  );
}

export default Train;
