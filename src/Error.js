import React from 'react';
import { useParams } from 'react-router-dom';

const Error = () => {
  const {id}=useParams()
  return (
    <>
    <div>
    single movie bayya {id}
    </div>
    </>
  );
};

export default Error;