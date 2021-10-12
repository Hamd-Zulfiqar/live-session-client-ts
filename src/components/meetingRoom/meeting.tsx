import React, { Component, useEffect, useRef } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  OTPublisherRef,
  preloadScript,
  OTStreamsProps,
  OTSubscriberRef,
  SessionHelper,
  createSession,
} from "opentok-react";
import {
  Publisher,
  PublisherEventHandlers,
  PublisherProperties,
  Session,
  SessionEventHandlers,
  SubscriberEventHandlers,
  SubscriberProperties,
  SignalEvent,
  VideoElementCreatedEvent,
  Stream,
} from "opentok-react/types/opentok";
import "./meeting.styles.scss";
import "../home/home.css";

import { match } from "react-router-dom";
const apiKey = process.env.REACT_APP_TOKBOX_API_KEY!;

interface MyCompProps extends RouteComponentProps<any> {
  name: string;
  session: string;
  password: string;
  room: string;
  token: string;
}

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
  subscriber: any;
  subscribers: HTMLElement[];
  streams: Stream[];
  settings: Settings;
  chat: Message[];
  mySession: Session | undefined;
  rows: number;
  cols: number;
}

class Meeting extends React.Component<MyCompProps, MyState> {
  private publisherProperties: PublisherProperties;
  private publisherEventHandlers: PublisherEventHandlers;
  private subscriberProperties: SubscriberProperties;
  private subscriberEventHandlers: SubscriberEventHandlers;
  private sessionEventHandlers: SessionEventHandlers;
  private sessionHelper: SessionHelper | null;

  private publisherParentRef;
  private subscriberParentRef;
  private subscriber;
  private parentRef;
  private publisher;
  private session: any;

  constructor(props: MyCompProps) {
    super(props);

    const {
      name,
      session: session1,
      password,
      room,
      token,
    } = this.props.location.state as MyCompProps;

    console.log(name, password);

    this.sessionHelper = null;

    this.state = {
      session: session1,
      token: token,
      name: name,
      room: password,
      publisher: null,
      subscriber: null,
      subscribers: [],
      streams: [],

      rows: 1,
      cols: 12,

      settings: {
        audio: true,
        video: true,
      },
      chat: [],
      mySession: undefined,
    };

    this.publisherParentRef = React.createRef<HTMLDivElement>();
    this.subscriberParentRef = React.createRef<HTMLDivElement>();
    this.parentRef = React.createRef<HTMLDivElement>();
    this.subscriber = React.createRef<OTSubscriberRef>();

    this.publisher = React.createRef<OTPublisherRef>();

    this.session = null;

    this.sessionEventHandlers = {};

    this.publisherProperties = {
      // name: this.state.name,
      // insertMode: "append",

      resolution: "1280x720",
      height: "100%",
      width: "100%",
    };

    this.publisherEventHandlers = {
      streamCreated: (event) => {
        console.log("Publisher stream created!");
        this.showAlert(true, event.stream.name);

        //publisher stream created and setting our session to our state
        this.setState({
          mySession: this.publisher.current?.getPublisher().session,
        });

        this.parentRef.current
          ?.querySelectorAll(".member")
          .forEach((element) => {
            if (element.parentElement)
              element.firstElementChild?.classList.add("parent-attr");
          });

        // this.publisher.current
        //   ?.getPublisher()
        //   .element?.parentElement?.classList.add("parent-attr");
      },
      streamDestroyed: (event) => {
        console.log("Publisher stream destroyed!");

        this.props.history.go(-3);
        this.showAlert(false, event.stream.name);
      },

      videoElementCreated: (event) => {
        console.log("videoElement is created");
      },
    };

    this.subscriberProperties = {
      height: "100%",
      width: "100%",
    };

    this.subscriberEventHandlers = {
      connected: (event) => {
        this.parentRef.current
          ?.querySelectorAll(".member")
          .forEach((element) => {
            if (element.parentElement)
              element.firstElementChild?.classList.add("parent-attr");
          });

        const streamsLength = this.state.streams.length;

        console.log(streamsLength)

        if (streamsLength > 1 && streamsLength <= 5) {
          this.setState({
            rows: 2,
          });
        } else if (streamsLength > 5 && streamsLength <= 11) {
          this.setState({
            rows: 3,
          });
        } else if (streamsLength > 11 && streamsLength <= 15) {
          this.setState({
            rows: 4,
          });
        }

        if(streamsLength>0 && streamsLength<4){
          this.setState({
            cols: 6
          })
        }
        else if(streamsLength>=4 && streamsLength<9){
          this.setState({
            cols: 4
          })
        }
        else if(streamsLength>=9 && streamsLength<16){
          this.setState({
            cols: 3
          })
        }
      },
      videoDisabled: (event) => {
        console.log("Subscriber video disabled!");
      },
      videoEnabled: (event) => {
        console.log("Subscriber video enabled!");
      },
    };
    console.log(this.state);
  }

  toggleAudio = () => {
    this.setState({
      settings: {
        audio: !this.state.settings.audio,
        video: this.state.settings.video,
      },
    });
    this.publisher.current
      ?.getPublisher()
      .publishAudio(this.state.settings.audio);
  };

  toggleVideo = () => {
    this.setState({
      settings: {
        audio: this.state.settings.audio,
        video: !this.state.settings.video,
      },
    });
    this.publisher.current
      ?.getPublisher()
      .publishVideo(this.state.settings.video);
  };

  leaveMeeting = () => {
    localStorage.clear();

    //disconnecting from the session here
    this.state.mySession?.disconnect();

    //Redirecting to home page
  };

  showAlert(flag: boolean, name?: string) {
    if (flag) {
      toast.success(name || "Success", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.warn(name || "Warn", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  display = () => {
    console.log("Publisher:");
    console.log(this.publisher.current?.getPublisher());
    console.log("Publisher from state:");
    console.log(this.state.publisher);

    console.log("Session from member:");
    console.log(this.session);
  };

  displayState = () => {
    console.log(this.state);
  };

  componentDidMount() {
    this.sessionHelper = createSession({
      apiKey: apiKey,
      sessionId: this.state.session,
      token: this.state.token,
      onStreamsUpdated: (streams) => {
        this.setState({ streams: streams });
      },
    });
    this.getPublisher();
  }

  componentWillUnmount() {
    if (this.sessionHelper) this.sessionHelper.disconnect();
  }

  getPublisher = () => {
    // console.log(this.publisher.current?.getPublisher().session.connection.data);

    this.setState({
      publisher: this.publisher.current?.getPublisher(),
    });
  };

  render() {
    return (
      <div className="Room">
        <Container fluid className="custom-container vh-100 vw-100">
          <Row className="main-row">
          <Col className="col-sm-12 col-1">
           <Row className={`row-participants-level-${this.state.rows} mx-auto`} ref={this.parentRef}>
            <Col
              className={`member column-custom col-sm-${this.state.cols} mx-auto d-flex justify-content-center flex-column align-items-center`}
            >
              {this.sessionHelper ? (
                <OTPublisher
                  ref={this.publisher}
                  session={this.sessionHelper.session}
                  properties={{
                    width: "100%",
                    height: "100%",
                  }}
                  eventHandlers={this.publisherEventHandlers}
                />
              ) : null}
            </Col>
            {this.state.streams.map((stream) => {
              return this.sessionHelper ? (
                <Col className={`member column-custom col-sm-${this.state.cols} mx-auto d-flex justify-content-center flex-column align-items-center`}>
                  <OTSubscriber
                    properties={{
                      width: "100%",
                      height: "100%",
                    }}
                    ref={this.subscriber}
                    key={stream.streamId}
                    session={this.sessionHelper.session}
                    stream={stream}
                    eventHandlers={this.subscriberEventHandlers}
                  />
                </Col>
              ) : null;
            })}
          </Row>
          </Col>
          <Col className="col-sm-12 col-2">
          <div className=" d-flex justify-content-center flex-row align-items-center">
          <div
            className="action-buttons my-btn-group d-flex justify-content-center flex-row align-items-center"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-secondary rounded-circle custom-button"
              onClick={this.toggleAudio}
            >
              <i className="fas fa-microphone icon-img"></i>
            </button>
            <button
              type="button"
              className="btn btn-secondary rounded-circle custom-button"
              onClick={this.toggleVideo}
            >
              <i className="fas fa-video icon-img"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-circle custom-button"
              onClick={this.leaveMeeting}
            >
              <i className="fas fa-phone-slash icon-img"></i>
            </button>
          </div>
          </div>
          </Col>
          </Row>
         
          
          
        </Container>
      </div>
    );
  }
}

export default withRouter(Meeting);
