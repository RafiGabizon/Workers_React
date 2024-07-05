import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeList from '../Components/EmployeeList';
import SearchBar from '../Components/SearchBar';
import Wellcome from '../Components/Wellcome';
import '../Css/Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [companyName, setCompanyName] = useState("nvidia"); // Default to null

  useEffect(() => {
    const querySearch = searchParams.get('search');
    setCompanyName(querySearch || null); // Set companyName based on the search query
  }, [searchParams]);

  const showWelcome = !companyName;

  return (
    <div>
      {showWelcome && <Wellcome />}
      <div className="home-container">
        <SearchBar />
        <EmployeeList company={companyName} />
      </div>
    </div>
  );
};

export default Home;
