import { useState } from "react";
import { useCharacters } from "../api/useData";
import {
  Card,
  Row,
  Pagination,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";

const CharacterList = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const characters = useCharacters(pageNum);

  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState({});

  const limit = 21;
  const start = Math.max(1, pageNum - limit / 2);
  const end = Math.min(42, start + limit - 1);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter({});
  };

  const handleShowModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  return (
    <>
      {characters !== "Loading..." && (
        <>
          {showModal && (
            <div className="custom-modal">
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="modal-font-size"
              >
                <Modal.Header closeButton>
                  <Modal.Title>{selectedCharacter.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <img
                      src={selectedCharacter.image}
                      alt={selectedCharacter.name}
                    />
                  </div>
                  <br />
                  <ListGroup variant="flush">
                    <ListGroup.Item variant="danger">
                      <strong>Status:</strong> {selectedCharacter.status}
                    </ListGroup.Item>
                    <ListGroup.Item variant="primary">
                      <strong>Species:</strong> {selectedCharacter.species}
                    </ListGroup.Item>
                    <ListGroup.Item variant="warning">
                      <strong>Origin:</strong> {selectedCharacter.origin.name}
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark">
                      <strong>Created:</strong>{" "}
                      {selectedCharacter.created.slice(0, 10)}
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
                onClick={props.handleLocationClick}
              >
                Locations
              </Button>
            </div>
            <h2 className="text-center title-padding">List of Characters</h2>
            <Row className="items-container">
              {characters.results.map((character) => (
                <Card
                  key={character.id}
                  onClick={() => handleShowModal(character)}
                  className="card-character"
                >
                  <Card.Img
                    variant="top"
                    src={character.image}
                    alt={character.name}
                  />
                  <Card.Body>
                    <Card.Title>
                      <strong>{character.name}</strong>
                    </Card.Title>
                    <Card.Text>
                      <strong>Status:</strong> {character.status}
                      <br></br>
                      <strong>Species:</strong> {character.species}
                      <br></br>
                      <strong>Origin:</strong> {character.origin.name}
                      <br></br>
                    </Card.Text>
                    <Card.Text>
                      <strong>Created:</strong> {character.created.slice(0, 10)}
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

              {pageNum > limit && (
                <Pagination.Ellipsis onClick={() => setPageNum(1)} />
              )}

              {Array.from({ length: 42 }, (_, i) => i + 1)
                .slice(start - 1, end)
                .map((number) => (
                  <Pagination.Item
                    key={number}
                    active={pageNum === number}
                    onClick={() => setPageNum(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
              {end < 42 && (
                <Pagination.Ellipsis onClick={() => setPageNum(42)} />
              )}

              <Pagination.Next
                disabled={pageNum === 42}
                onClick={() => setPageNum(pageNum + 1)}
              />
            </Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default CharacterList;
