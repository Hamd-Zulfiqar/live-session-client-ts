import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { createRoom, getRoom } from "../../api/twilio";
import { Container, Spinner } from "react-bootstrap";
import TwilioRoom from "../../components/twilio-room/twilio-room.component";

interface LocationState {
  data: string;
  action: string;
  room: string;
  participantName: string;
}

interface Iprops {
  history: History;
}

const TwilioWait = (props: Iprops) => {
  const location = useLocation<LocationState>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    //creates a room and joins it
    async function createMyRoom() {
      //creating a room
      const room = await createRoom(location.state.room);

      // joining the room
      let getRoomData;
      if (room) {
        getRoomData = await getRoom(
          room?.password,
          location.state.participantName
        );
        setToken(getRoomData?.token);
      }
    }

    //for joining the room
    async function joinRoomLocal() {
      console.log(location.state.data);
      const room = await getRoom(
        location.state.data,
        location.state.participantName
      );
      setToken(room?.token);
      console.log("joining room with", token);
    }

    switch (location.state.action) {
      case "create":
        createMyRoom();
        break;
      case "join":
        joinRoomLocal();
        break;
    }

    console.log(location.state.data);
  }, []);

  return (
    <div className="Wait d-flex align-items-center justify-content-center container-center">
      <Container className="text-center">
        {/* <Spinner animation="border" variant="primary" />
        <h3>Hold on we are loading your Room!</h3> */}
        <TwilioRoom roomName={location.state.room} token={token} />
      </Container>
    </div>
  );
};

export default TwilioWait;
