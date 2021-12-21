import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Mapbox from "./components/Mapbox";
import Signup from "./components/Signup"

function App() {
  const [islogged, setIsLogged] = useState(false);
 

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            islogged ? (
              <Mapbox setIsLogged={setIsLogged} />
            ) : (
              <Login setIsLogged={setIsLogged} />
            )
          }
        />
        <Route exact path = "/Signup" element = {<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
