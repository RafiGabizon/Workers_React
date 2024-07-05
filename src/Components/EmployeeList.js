import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeItem from "./EmployeeItem";
import "../Css/EmployeeList.css";

const EmployeeList = ({ company = null }) => {
  const [employees, setEmployees] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!company) {
      const favourites = localStorage.getItem('favourites');
      if (favourites) {
        setEmployees(JSON.parse(favourites));
      }
      setUrl("/favourites/employee?index=");
    } else {
      doApi();
      setUrl(`/employee?company=${company}&index=`);
    }
  }, [company, isFav]);

  const doApi = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
      setEmployees(response.data.results);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="container">
      <h2>{company ? `Search results for the company: ${company}` : "Favorites"}</h2>
      <div className="containerList">
        {employees.map((employee, index) => (
          <EmployeeItem 
            key={employee.login.uuid} 
            isFav={isFav} 
            setIsFav={setIsFav} 
            url={`${url}${index}`}  
            employee={employee} 
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
