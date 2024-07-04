import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../Css/EmployeeDetail.css';
import { AppContext } from '../Context/Context';
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EmployeeDetail = () => {
  const { favourites, addFavourite, removeFavourite } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const company = searchParams.get('company');
  const index = searchParams.get('index');
  const [employee, setEmployee] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    
    if (!company || !index) {
      return navigate('/error');
    }
    if (favourites[index]) {
      setEmployee(favourites[index]);
      setIsFavourite(true);
    } else {
      fetchEmployee();
    }
  }, [company, index]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
      const emp = response.data.results[index];
      if (!emp) {
        navigate('/error');
      } else {
        setEmployee(emp);
        checkIfFavourite(emp);
      }
    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };

  const checkIfFavourite = (employee) => {
    if (favourites.some(fav => fav.login.uuid === employee.login.uuid)) {
      setIsFavourite(true);
    }
  };

  const handleFavourite = () => {
    if (isFavourite) {
      removeFavourite(employee);
      setIsFavourite(false);
    } else {
      addFavourite(employee);
      setIsFavourite(true);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
      Back
      </button>
      <div className="employee-details-image-container">
        <img src={employee.picture.large} alt={employee.name.first} className="employee-details-image" />
      </div>
      <div className="text-container">
        <h1>{`${employee.name.first} ${employee.name.last}`}</h1>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Age:</strong> {employee.dob.age}</p>
        <p><strong>Country:</strong> {employee.location.country}</p>
        <p><strong>Date of Birth:</strong> {employee.dob.date.substring(0, 10)}</p>
      </div>
      <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} scrollWheelZoom={true} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
          <Tooltip>
            {`${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}, ${employee.location.postcode}`}
          </Tooltip>
        </Marker>
      </MapContainer>

      <button className={`favourite-btn ${isFavourite ? 'remove' : 'add'}`} onClick={handleFavourite}>
          {isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    </div>
  );
};

export default EmployeeDetail;
