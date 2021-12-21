import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mapbox.css";
import ReactMapGL from "react-map-gl";
import { Loader } from "./Loader";

export const Mapbox = ({ setIsLogged }) => {

  //setting the geolocation state (current coordinates) and Mapbox viewport state
  const [currCord, setcurrCord] = useState(null);
  const [viewport, setViewport] = useState({});

    //greeting with username
    const jsonString = localStorage.getItem("credentials");
    const localCredentials = JSON.parse(jsonString);

  // render when page loads and setting up current coordinates.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const cordinate = pos.coords;
        setcurrCord({ lat: cordinate.latitude, lng: cordinate.longitude });
      });
    }
  }, []);

  //rendering and setting viewport object keys and values to current location
  useEffect(() => {
    if (currCord !== null) {
      setViewport({
        width: 500,
        height: 400,
        latitude: currCord.lat,
        longitude: currCord.lng,
        zoom: 11,
        pitch: 50,
      });
    }
  }, [currCord]);

  //logout function 
  const logOut = () => {
    setIsLogged(false);
  };

  //JSX Part

  return (
    <>
      {Object.keys(viewport).length > 0 ? (
        <div>
          <section className="vh-100 ">
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div
                    className="card shadow-2-strong"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body p-4 p-md-5">
                    <div className="d-flex justify-content-center">
                    <h5>Welcome {localCredentials.username} !</h5>
                    </div>
                      
                      <div className="d-flex justify-content-center pb-4 mb-4">
                        <ReactMapGL
                          mapboxApiAccessToken={
                            "pk.eyJ1Ijoic2hhc2hhbmtzaW5oYSIsImEiOiJja3hmd3hhZGYwNXNzMnJramY0MGkxczIwIn0.gpqmgG0Rb8Bk7n0aWpkCgQ"
                          }
                          mapStyle={"mapbox://styles/mapbox/dark-v9"}
                          {...viewport}
                          onViewportChange={(nextViewport) =>
                            setViewport(nextViewport)
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button className="btn btn-lg" onClick={logOut}>
                          LOGOUT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
        <Loader />
        </div>
        
      )}
    </>
  );
};

export default Mapbox;
