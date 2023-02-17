import { Button } from "react-bootstrap";

import logo from "../assets/rick-and-morty-portal.png";

const LandingPage = (props) => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        <Button
          variant="success"
          className="landing-buttons"
          onClick={props.handleCharacterClick}
        >
          Characters
        </Button>

        <img src={logo} alt="Rick and Morty logo" className="logo" />

        <Button
          variant="warning"
          className="landing-buttons"
          onClick={props.handleLocationClick}
        >
          Locations
        </Button>
      </div>

      <p className="description">
        Welcome to our Rick and Morty characters website. Here you can explore
        information about all the characters and locations from the show. Click
        on either the "Characters" or "Locations" button to get started.
      </p>
    </div>
  );
};

export default LandingPage;
