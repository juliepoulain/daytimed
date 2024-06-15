import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import UserProfile from "./UserProfile";
import Homepage from "./Homepage";
import Login from "./Login";
import NavBar from "./NavBar";
import HomepageLogout from "./HomepageLogout";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Router>
      <NavBar userId={userId} />
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            {userId ? (
              <Homepage userId={userId} setUserId={setUserId} />
            ) : (
              <HomepageLogout userId={userId} setUserId={setUserId} />
            )}
          </Route>
          <Route exact path="/login">
            <Login userId={userId} setUserId={setUserId} />
          </Route>
          <Route exact path="/user">
            {userId ? (
              <UserProfile userId={userId} setUserId={setUserId} />
            ) : (
              <Login userId={userId} setUserId={setUserId} />
            )}
          </Route>
          <Route exact path="/user/:id">
            {userId ? (
              <UserProfile userId={userId} setUserId={setUserId} />
            ) : (
              <Login userId={userId} setUserId={setUserId} />
            )}
          </Route>
          <Route exact path="/templates/:id">
            {userId ? (
              <Homepage userId={userId} setUserId={setUserId}/>
            ) : (
              <Login userId={userId} setUserId={setUserId} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
