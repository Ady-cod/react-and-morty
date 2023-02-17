import { useState } from "react";
import { useLocations } from "../api/useData";
import {
  Card,
  Row,
  Col,
  Pagination,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";

const LocationList = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const locations = useLocations(pageNum);

  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLocation({});
  };

  const handleShowModal = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  return (
    <>
      {locations !== "Loading..." && (
        <>
          {showModal && (
            <div className="custom-modal">
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="modal-font-size"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{selectedLocation.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item variant="danger">
                      <strong>Type:</strong> {selectedLocation.type}
                    </ListGroup.Item>
                    <ListGroup.Item variant="primary">
                      <strong>Dimension:</strong> {selectedLocation.dimension}
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      <strong>Created:</strong>{" "}
                      {selectedLocation.created.slice(0, 10)}
                    </ListGroup.Item>
                  </ListGroup>
                </Modal.Body>
              </Modal>
            </div>
          )}

          <div className="container mt-5">
            <div className="buttons-container">
              <Button
                variant="success"
                className="home-button"
                onClick={props.handleHomeClick}
              >
                Home
              </Button>
              <Button
                variant="warning"
                className="locations-button"
                onClick={props.handleCharacterClick}
              >
                Characters
              </Button>
            </div>
            <h2 className="text-center title-padding">List of Locations</h2>
            <Row className="items-container">
              {locations.results.map((location) => (
                
                  <Card
                    key={location.id}
                    onClick={() => handleShowModal(location)}
                    className="card-location"
                  >
                    <Card.Body>
                      <Card.Title>
                        <strong>{location.name}</strong>
                      </Card.Title>
                      <Card.Text>
                        <strong>Type:</strong> {location.type}
                        <br></br>
                        <strong>Dimension:</strong> {location.dimension}
                      </Card.Text>
                      <Card.Text>
                        <strong>Created:</strong>{" "}
                        {location.created.slice(0, 10)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                
              ))}
            </Row>
            <Pagination className="mt-3 pagination">
              <Pagination.Prev
                disabled={pageNum === 1}
                onClick={() => setPageNum(pageNum - 1)}
              />
              {Array.from({ length: 7 }, (_, i) => i + 1).map((number) => (
                <Pagination.Item
                  key={number}
                  active={pageNum === number}
                  onClick={() => setPageNum(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={pageNum === 7}
                onClick={() => setPageNum(pageNum + 1)}
              />
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default LocationList;

