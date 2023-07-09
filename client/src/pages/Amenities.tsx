import React from 'react';
import './Amenities.css';
import { FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaDumbbell } from 'react-icons/fa';

interface AmenitiesCardProps {
  icon: React.ReactNode;
  title: string;
}

const AmenitiesCard: React.FC<AmenitiesCardProps> = ({ icon, title }) => {
  return (
    <div className="amenities-card">
      <div className="amenities-icon">{icon}</div>
      <h5 className="amenities-title">{title}</h5>
    </div>
  );
};

interface AmenitiesProps {
  amenities: string[];
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const getIcon = (amenity: string): React.ReactNode => {
    switch (amenity) {
      case 'Wifi':
        return <FaWifi />;
      case 'Swimming Pool':
        return <FaSwimmingPool />;
      case 'Parking':
        return <FaParking />;
      case 'Restaurant':
        return <FaUtensils />;
      case 'Gym':
        return <FaDumbbell />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Amenities</h1>
      <div className="amenities-container">
        {amenities.map((amenity, index) => (
          <AmenitiesCard key={index} icon={getIcon(amenity)} title={amenity} />
        ))}
      </div>
    </div>
  );
};

export default Amenities;
