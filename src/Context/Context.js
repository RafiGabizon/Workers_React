import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = () => {
      const savedFavourites = localStorage.getItem('favourites');
      if (savedFavourites) {
        setFavourites(JSON.parse(savedFavourites));
      }
    };

    loadFavourites();
  }, []);

  const addFavourite = (employee) => {
    setFavourites((prevFavourites) => {
      const isAlreadyFavourited = prevFavourites.some((fav) => fav.login.uuid === employee.login.uuid);
      
      if (isAlreadyFavourited) {
        console.log('Already in favourites');
        return prevFavourites;
      }

      const updatedFavourites = [...prevFavourites, employee];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const removeFavourite = (employee) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.filter((fav) => fav.login.uuid !== employee.login.uuid);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const contextValue = { favourites, addFavourite, removeFavourite };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
