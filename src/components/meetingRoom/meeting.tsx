import React, { useRef } from "react";
import { withRouter } from "react-router";
import {Container, Row, Col, Button, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { OTSession, OTPublisher, OTStreams, OTSubscriber, OTPublisherRef } from 'opentok-react';
import { Publisher, PublisherEventHandlers, PublisherProperties, Session, SessionEventHandlers, SubscriberEventHandlers, SubscriberProperties, SignalEvent } from "opentok-react/types/opentok";
import '../home/home.css'
const apiKey = process.env.REACT_APP_TOKBOX_API_KEY!;

interface MyProps {
};

interface Settings {
  video: boolean;
  audio: boolean;
}

interface Message {
  name: string;
  body: string;
}
interface MyState {
  session: string;
  token: string;
  name: string;
  room: string;
  publisher: any;
  settings: Settings;
  chat: Message[];
};

class Meeting extends React.Component <MyProps, MyState>{
  private publisherProperties: PublisherProperties;
  private publisherEventHandlers: PublisherEventHandlers;
  private subscriberProperties: SubscriberProperties;
  private subscriberEventHandlers: SubscriberEventHandlers;
  private sessionEventHandlers: SessionEventHandlers;
  private publisher;
  private session: any;

  constructor(props: MyProps){
    super(props);

    this.state = {
      session: localStorage.getItem("session")! as string,
      token: localStorage.getItem("token")! as string,
      name: localStorage.getItem("name")! as string,
      room: localStorage.getItem("password")! as string,
      publisher: null,
      settings: {
        audio: true,
        video: true
      },
      chat: []
    }

    this.publisher = React.createRef<OTPublisherRef>();
    this.session = null;

    this.sessionEventHandlers = {};

    this.publisherProperties = {
      name: this.state.name,
      height: 320,
      width: 480
    };
 
    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log('Publisher stream created!');
        this.showAlert(true, event.stream.name);
      },
      streamDestroyed: event => {
        console.log('Publisher stream destroyed!');
        this.showAlert(false, event.stream.name);
      },   
    };

    this.subscriberProperties = {
      height: 320,
      width: 480
    };
 
    this.subscriberEventHandlers = {
      videoDisabled: event => {
        console.log('Subscriber video disabled!');
      },
      videoEnabled: event => {
        console.log('Subscriber video enabled!');
      }
    };
    console.log(this.state);
  }

  toggleAudio = () => {
    this.setState({
      settings: {
        audio: !this.state.settings.audio,
        video: this.state.settings.video
      }
    });
    this.publisher.current?.getPublisher().publishAudio(this.state.settings.audio);
  }

  toggleVideo = () => {
    this.setState({
      settings: {
        audio: this.state.settings.audio,
        video: !this.state.settings.video
      }
    });
    this.publisher.current?.getPublisher().publishVideo(this.state.settings.video);
  }

  leaveMeeting = () => {
    localStorage.clear();
    //Redirect to home page here
  }

  showAlert(flag: boolean, name?: string ) {
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

  display = () => {
    console.log("Publisher:");
    console.log(this.publisher.current?.getPublisher());
    console.log("Publisher from state:");
    console.log(this.state.publisher);

    console.log("Session:");
    console.log(this.publisher.current?.getPublisher().session);
    console.log("Session from member:");
    console.log(this.session);
  }

  displayState = () => {
    console.log(this.state);
  }

  componentDidMount(){
    this.getPublisher();
  }

  componentWillUnmount(){
    localStorage.clear();
  }

  getPublisher = () => {
    this.setState({
      publisher: this.publisher.current?.getPublisher()
    });
    //this.session = this.publisher.current?.getPublisher().session;
  }

  render(){
    return (
      <div className="Room">
      <ToastContainer />
      <OTSession apiKey={apiKey} sessionId={this.state.session} token={this.state.token} 
        onConnect={
          () => {
            console.log("Session.connect completed!");
          }}
        onError={
          () => {
            console.log("Session.connect failed!");
          }
        }>
        <Container fluid className="text-center">
          <h3 className="m-3">{this.state.room}</h3>
          <Row className="bg-light border">
            <Col sm={8}>
              <Row className="text-center justify-content-md-center">
                <h2>Publishers here</h2>
                <OTPublisher 
                  properties={this.publisherProperties}
                  eventHandlers={this.publisherEventHandlers}
                  ref={this.publisher}
                />
                <ButtonGroup>
                  <Button onClick={this.toggleAudio}>Toggle Audio</Button>
                  <Button onClick={this.toggleVideo}>Toggle Video</Button>
                  <Button onClick={this.leaveMeeting}>Leave Meeting</Button>
                </ButtonGroup>
              </Row>
              <Row>
                <h2>Subscribers here</h2>
                <OTStreams>
                  <OTSubscriber
                    properties={this.subscriberProperties}
                    eventHandlers={this.subscriberEventHandlers}
                  />
                </OTStreams>
              </Row>
            </Col>
            <Col sm={4} className="outline-primary">
              <h5 className="m-3">Live Chat</h5>
              <div id="chatbox" className="container-half border border-primary">
                <p>Sender_Name: this is a template message</p>
              </div>
              <InputGroup className="mt-3 mb-3">
                <InputGroup.Text>Message:</InputGroup.Text>
                <FormControl aria-label="Type your massage here" id="message"/>
                <Button variant="outline-primary" id="send" onClick={(event) => {
                  console.log("Send Signal for Chat Message!");
                }}>
                  Send
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </OTSession>
    </div>
    );
  }
}

export default Meeting;