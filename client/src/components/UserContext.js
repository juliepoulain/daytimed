import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId, phone, setPhone }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };