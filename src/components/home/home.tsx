import React, { SyntheticEvent } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";

const Home: React.FC = () => {
  const [service, setService] = useState<number>();
  const history = useHistory();
  const [operation, setOperation] = useState<string>();

  const createButton = () => {
    const location = {
      pathname: "/create-room-twilio",
      state: {
        operation: "create",
      },
    };
    switch (service) {
      case 1:
        history.push(location);
        break;
      case 2:
        history.push("/create-room");
        break;
    }
  };

  const joinButton = () => {
    const location = {
      pathname: "/create-room-twilio",
      state: {
        operation: "join",
      },
    };
    switch (service) {
      case 1:
        history.push(location);
        break;
      case 2:
        history.push("/join-room");
        break;
    }
  };

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    console.log(+e.currentTarget.value);
    setService(+e.currentTarget.value);
  };

  return (
    <div className="Home d-flex align-items-center container-center">
      <Container className="text-center ">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Creating a Room</Card.Title>
                <Card.Text className="text-justify">
                  You can Create a Room where a Live session can be held. You
                  will be the admin/moderator and have the rights to add or kick
                  someone in the room as well as other facilities.
                </Card.Text>
                <Button variant="primary" size="lg" onClick={createButton}>
                  Create a Room
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Joining a Room</Card.Title>
                <Card.Text className="text-justify">
                  You can choose to join a room that is already created. You
                  will require the room password before you can join the room.
                  You cannot join a room if you dont have its password.
                </Card.Text>
                <Button variant="primary" size="lg" onClick={joinButton}>
                  Join a Room
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Select Provider</Card.Title>
                <Card.Text className="text-justify">
                  Select the service provider You want for the meeting
                </Card.Text>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleSelect(e)}
                >
                  <option selected>Service</option>
                  <option value="1">Twilio</option>
                  <option value="2">Tokbox</option>
                </select>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
