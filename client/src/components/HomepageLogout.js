import React, { useState } from "react";
import Login from "./Login";


function HomepageLogout({ setUserId }) {

  return (
    <>
      <Login setUserId={setUserId} />
    </>
  );
}

export default HomepageLogout;
