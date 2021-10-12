import React, { useState, useEffect } from "react";
import Video, { Room, Participant } from "twilio-video";
import { Twilio } from "twilio";
import TwilioParticipant from "../../components/twilio-participant/twilio-participant.component";

interface IParticipant {
  sid: string;
  identity: string;
}

interface ITwilioRoom {
  roomName: string | undefined;
  token: string | undefined;
  // handleLogout: () => void;
}

type IRoom = Room | null;

const TwilioRoom = ({ roomName, token }: ITwilioRoom) => {
  const [room, setRoom] = useState<IRoom>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const participantConnected = (participant: Participant) => {
      console.log("a new partcipant has been added");
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant: IParticipant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    if (token) {
      console.log("Entering room with token: ", token);
      //entering room with provided token
      Video.connect(token, { name: roomName }).then((room) => {
        console.log("connected to room");
        setRoom(room);

        //evenet listeners
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        console.log("participants in room: ", room.participants);
        room.participants.forEach(participantConnected);
      });
    }
  }, [roomName, token]);

  //remote participants jsx
  const remoteParticipants = participants.map((participant) => (
    <TwilioParticipant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      {/* <button onClick={handleLogout}>Log out</button> */}
      <h3>Room Owner</h3>
      <div className="local-participant">
        {room ? (
          <TwilioParticipant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default TwilioRoom;
