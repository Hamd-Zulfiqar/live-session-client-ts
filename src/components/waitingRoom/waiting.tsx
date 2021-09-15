import React, {useEffect} from 'react';
import { useLocation } from 'react-router';
import {Container, Spinner} from 'react-bootstrap'
import { CreateRoom, JoinRoom } from '../../api/tokbox';
import { CreateResponse } from "../../types/tokbox";
import { useHistory } from "react-router-dom";
import '../home/home.css'

interface LocationState {
    name: string;
    operation: string;
    data: string;
}

function Wait() {
    const location = useLocation<LocationState>();
    const history = useHistory();

    useEffect(() => {
        let data: CreateResponse;
        async function generatingRoom(operation:string) {
            if(operation === 'create')
                data = await CreateRoom(location.state.data);
            else
                data = await JoinRoom(location.state.data);

            localStorage.setItem("session", data.sessionId);
            localStorage.setItem("token", data.token);
            localStorage.setItem("password", data.password);
            localStorage.setItem("room", location.state.data);
        }
        generatingRoom(location.state.operation);
        history.push("/room");
    },);

  return (
    <div className="Wait d-flex align-items-center justify-content-center container-center">
        <Container className="text-center">
            <Spinner animation="border" variant="primary"/>
            <h3>Hold on {location.state.name}, We are loading your Room!</h3>
        </Container>
    </div>
  );
}

export default Wait;