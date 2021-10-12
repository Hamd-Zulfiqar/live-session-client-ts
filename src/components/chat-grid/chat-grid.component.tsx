import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import "./chat-grid.styles.scss";

const ChatGrid: React.FC = () => {
  const [participants, setParticipants] = useState([
    "Hyder",
    "Ahmed",
    // "Ali",
    // "Bilal",
    // "Hamd",
  ]);

  const [colors] = useState(["#AB3274", "#0a8ac9", "#d41135", "#1ad685"]);

  return (
    <Container fluid className="custom-container vh-100 vw-100">
      <Row className="row-participants">
        {participants.map((participant) => (
          <Col
            className={`column-custom col-sm-${
              participants.length === 1 ? 12 : 6
            } mx-auto d-flex justify-content-center flex-column align-items-center`}
          >
            <div
              style={{
                background:
                  colors[Math.floor(Math.random() * (colors.length - 1)) + 1],
              }}
              className="user-avatar d-flex justify-content-center flex-column align-items-center"
            >
              <h1>{participant[0]}</h1>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="action-bar">
        <Col className="col-sm-12"></Col>
      </Row>
    </Container>
  );
};

export default ChatGrid;
