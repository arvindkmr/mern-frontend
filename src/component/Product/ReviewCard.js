import React from 'react';
import profilePng from "../../images/1.jpg"

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
    
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <p>{review.review}</p>
    </div>
  );
};

export default ReviewCard;
