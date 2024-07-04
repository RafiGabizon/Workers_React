import React, { useContext, useEffect, useState } from 'react';
import '../Css/EmployeeItem.css';
import { AppContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const EmployeeItem = ({ employee, url, setIsFav, isFav }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { favourites, addFavourite, removeFavourite } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      const fav = favourites.find(fav => fav.login.uuid === employee.login.uuid);
      setIsFavourite(!!fav);
    }
  }, [favourites, employee]);

  const handleFavouriteToggle = () => {
    if (isFavourite) {
      removeFavourite(employee);
      if (url.includes("favourites")) {
        setIsFav(!isFav);
      }
    } else {
      addFavourite(employee);
    }
    setIsFavourite(!isFavourite);
  };

  if (!employee) {
    return <div>No employee data available</div>;
  }

  return (
    <div className="employee-card">
      <div className="image-container">
        {employee.picture ? (
          <img src={employee.picture.large} alt={employee.name.first} className="employee-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <div className="info-container">
        <h5 className="employee-name">{`${employee.name.first} ${employee.name.last}`}</h5>
        <p className="employee-detail">Age: {employee.dob.age}</p>
        <p className="employee-detail">Country: {employee.location.country}</p>
        <button className="more-info-btn" onClick={() => navigate(url)}>More info</button>
      </div>
      <button className={`favourite-btn ${isFavourite ? 'remove' : 'add'}`} onClick={handleFavouriteToggle}>
          {isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    </div>
  );
};

export default EmployeeItem;
