// import React from "react";
import "./App.css";
import { useCharacters, useLocations } from "./api/useData";
import { useState } from "react";

import LandingPage from "./components/LandingPage";
import CharacterList from "./components/CharacterList";
import LocationList from "./components/LocationList";

function App() {
  const characters = useCharacters(1);
  const locations = useLocations(1);

  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showCharacterList, setShowCharacterList] = useState(false);
  const [showLocationList, setShowLocationList] = useState(false);

  console.log("Characters data: ");
  console.log(characters);
  console.log("Locations data: ");
  console.log(locations);

  const handleCharacterClick = () => {
    setShowLandingPage(false);
    setShowCharacterList(true);
    setShowLocationList(false);
  };

  const handleLocationClick = () => {
    setShowLandingPage(false);
    setShowCharacterList(false);
    setShowLocationList(true);
  };

  const handleHomeClick = () => {
    setShowLandingPage(true);
    setShowCharacterList(false);
    setShowLocationList(false);
  };

  return (
    <>
      {showLandingPage && (
        <LandingPage
          handleCharacterClick={handleCharacterClick}
          handleLocationClick={handleLocationClick}
        />
      )}
      {showCharacterList && (
        <CharacterList
          handleHomeClick={handleHomeClick}
          handleLocationClick={handleLocationClick}
        />
      )}
      {showLocationList && (
        <LocationList
          handleHomeClick={handleHomeClick}
          handleCharacterClick={handleCharacterClick}
        />
      )}
    </>
  );
}

export default App;
