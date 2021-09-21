import React from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './home.css';

const Home: React.FC = () => {
    const history = useHistory();

    const createButton = () => {
      history.push("/create-room");
    }

    const joinButton = () => {
      history.push("/join-room");
    }

    return (
      <div className="Home d-flex align-items-center container-center">
        <Container className="text-center ">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Creating a Room</Card.Title>
                  <Card.Text className="text-justify">
                    You can Create a Room where a Live session can be held. 
                    You will be the admin/moderator and have the rights to 
                    add or kick someone in the room as well as other facilities.
                  </Card.Text>
                  <Button variant="primary" size="lg" onClick={createButton}>Create a Room</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
            <Card>
              <Card.Body>
                <Card.Title>Joining a Room</Card.Title>
                <Card.Text className="text-justify">
                  You can choose to join a room that is already created. You will 
                  require the room password before you can join the room. You cannot 
                  join a room if you dont have its password.
                </Card.Text>
                <Button variant="primary" size="lg" onClick={joinButton}>Join a Room</Button>
              </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default Home;