import { useEffect, useState } from "react";
import { getRoom, createRoom } from "../../api/twilio";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";

interface ILocation {
  operation: string;
}

const CreateRoomTwilio = () => {
  const [room, setRoom] = useState<Response | null>();
  const [roomName, setroomName] = useState("");
  const [partcipantName, setParticipantName] = useState("");
  const [roomPassword, setroomPassword] = useState("");
  const location = useLocation<ILocation>();
  const history = useHistory();
  const [operation, setOperation] = useState<string>();

  useEffect(() => {
    setOperation(location.state.operation);
  }, []);

  const updateParticipantName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticipantName(event.target.value);
  };

  //for room creation
  const updateRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setroomName(event.target.value);
  };

  //for joining room
  const updateRoomPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setroomPassword(event.target.value);
  };

  const showAlert = (message: string) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const create = () => {
    if (roomName === "") {
      showAlert("Enter a room name");
      return;
    }

    const location = {
      pathname: "/twilio-waiting",
      state: {
        participantName: partcipantName,
        room: roomName,
        action: "create",
      },
    };

    history.push(location);
  };

  const join = () => {
    if (roomPassword === "") {
      showAlert("Enter a room password");
      return;
    }

    const location = {
      pathname: "/twilio-waiting",
      state: {
        data: roomPassword,
        action: "join",
        room: roomName,
        participantName: partcipantName,
      },
    };

    history.push(location);
  };

  return (
    <div className="Create d-flex align-items-center justify-content-center container-center">
      <Container>
        <ToastContainer />
        {operation === "create" ? (
          <Form className="text-center">
            <Form.Group as={Row} className="mb-3" controlId="formRoomName">
              <Form.Label column sm="3">
                Room Name:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Entertainment"
                  size="lg"
                  onChange={updateRoomName}
                  value={roomName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formRoomName">
              <Form.Label column sm="3">
                User Name:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Entertainment"
                  size="lg"
                  onChange={updateParticipantName}
                  value={partcipantName}
                />
              </Col>
            </Form.Group>

            <Button className="mt-3" size="lg" onClick={create}>
              Create Room!
            </Button>
          </Form>
        ) : (
          <Form className="text-center">
            <Form.Group as={Row} className="mb-3" controlId="formRoomName">
              <Form.Label column sm="3">
                User Name:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Entertainment"
                  size="lg"
                  onChange={updateParticipantName}
                  value={partcipantName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formRoomName">
              <Form.Label column sm="3">
                Room Name:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Entertainment"
                  size="lg"
                  onChange={updateRoomName}
                  value={roomName}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formRoomName">
              <Form.Label column sm="3">
                Room Password:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Entertainment"
                  size="lg"
                  onChange={updateRoomPassword}
                  value={roomPassword}
                />
              </Col>
            </Form.Group>

            <Button className="mt-3" size="lg" onClick={join}>
              Join Room!
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default CreateRoomTwilio;
