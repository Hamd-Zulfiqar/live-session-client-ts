import React, {useEffect, useState} from "react";
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import OT, { Session } from "@opentok/client";
import { useLocation } from 'react-router';

interface LocationState {
  name: string;
}

function showAlert(flag: boolean, name?: string ) {
  if(flag){
    toast.success(name || "Success", {
      position: toast.POSITION.TOP_CENTER
    });
  } else {
    toast.warn(name || "Warn", {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

function initializeSession(session: Session, name: string) {
  const token = localStorage.getItem("token")!;
  // Subscribe to a newly created stream

  // Connect to the session
  if(session){
    session.connect(token, (error) => {
      // If the connection is successful, publish to the session
      if (error) {
        showAlert(false, error!.message);
        console.log(error);
      } else {
        // Create a publisher
        var publisher = OT.initPublisher('publisher', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          name: name
        }, (error) => {
          showAlert(false, error!.message);
          console.log(error);
        });
        session.publish(publisher, (error) => {
          showAlert(false, error!.message);
        });
      }
    });
    return true;
  } else {
    return false;
  }
}
  
function Meeting() {
  //Utility
  const location = useLocation<LocationState>();

  //States
  const [status, Setstatus] = useState(true);
  const [session, Setsession] = useState<Session>();
  const [room, Setroom] = useState("");
  const [name, Setname] = useState("");
  
  useEffect(() => {
    if(localStorage.getItem("session") === ''){
      showAlert(false, localStorage.getItem("token")!);
    } else {
      Setsession(OT.initSession(process.env.REACT_APP_TOKBOX_API_KEY!, localStorage.getItem("session")!));
      Setroom(localStorage.getItem("room")!);
      Setname(location.state.name);

      console.log(session);
      console.log("session");
      const token = localStorage.getItem("token")!;
      // Subscribe to a newly created stream

      // Connect to the session
      if(session){
        session.connect(token, (error) => {
          // If the connection is successful, publish to the session
          if (error) {
            //showAlert(false, error!.message);
            console.log(error);
          } else {
            // Create a publisher
            var publisher = OT.initPublisher('publisher', {
              insertMode: 'append',
              name: name
            }, (error) => {
              showAlert(false, error!.message);
              console.log(error);
            });
            session.publish(publisher, (error) => {
              showAlert(false, error!.message);
            });
          }
        });
      }
    }
    
  },[]);

  return status? (
    <div className="Room">
      <ToastContainer />
      <Container fluid className="text-center">
        <h3>{room}</h3>
        <Row>
          <Col sm={8}>
            <Row>
              <h2>Publishers here</h2>
              <div className="publisher">

              </div>
            </Row>
            <Row>
              <h2>Subscribers here</h2>
            </Row>
          </Col>
          <Col sm={4}>
            Live Chat
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <div className="Room d-flex align-items-center justify-content-center container-center">
        <Container className="text-center">
            <Spinner animation="border" variant="primary"/>
            <h3>Session Loading!</h3>
            <div className="publisher"></div>
        </Container>
    </div>
  );
}

export default Meeting;