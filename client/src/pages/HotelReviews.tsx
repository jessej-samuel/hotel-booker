import React from 'react';
import './Card.css';

interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
}

interface HotelReviewsProps {
  reviews: Review[];
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <h5 className="review-card-title">{review.reviewer}</h5>
        <div className="review-card-rating mb-2 text-muted">{review.rating}/5</div>
      </div>
      <div className="review-card-content">
        <p className="review-card-comment">{review.comment}</p>
      </div>
    </div>
  );
};

const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default HotelReviews;
