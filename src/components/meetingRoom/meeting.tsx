import React from "react";
import {Container} from 'react-bootstrap';
import * as OT from 'opentok-react';

// interface Props {
//     title: string;
//     subtitle?: string;
// }

interface State {
    counter: number;
  }
  
class Meeting extends React.Component<{}, State> {
  constructor(props = {}) {
      super(props);
      this.state = {
        counter: 0,
      };
    }

  render() {
      return (
        <Container>
            <h1>Hello Meeting Room!</h1>
            <h3>State of this Component:</h3>
        </Container>
      );
  }
}

export default Meeting;