import React, { createContext, useEffect, useState } from "react";

import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    // await wstrzyma funkcje dopóki nie będzie data
    const { data } = await request.get("/courses");

    setCourses(data.courses);
  };

  // ładowanie danych przy odpaleniu aplikacji, pusta tablica bo wykonuje się tylko raz
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{courses, setCourses, user, setUser}}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
