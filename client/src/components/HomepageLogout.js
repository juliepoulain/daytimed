import React, { useState } from "react";
import Login from "./Login";


function HomepageLogout({ setUserId }) {

  return (
    <>
      <Login setUserId={setUserId} />
      <div className="homepage">
            <h2>DAYTIMED</h2>
      </div>
    </>
  );
}

export default HomepageLogout;
