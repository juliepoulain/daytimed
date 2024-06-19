import React, { useState } from "react";
import Login from "./Login";

function HomepageLogout({ setUserId, userId, phone, setPhone }) {
  return (
    <>
      <Login
        userId={userId}
        setUserId={setUserId}
        phone={phone}
        setPhone={setPhone}
      />
    </>
  );
}

export default HomepageLogout;
