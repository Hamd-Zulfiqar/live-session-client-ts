import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Header: React.FC = () => {
    return (
        <div className="Header">
          <Container className="bg-light text-primary border-bottom border-primary" fluid>
            <Row className="text-center align-items-center">
              <Col>
                <h6 className="display-1">Tintash </h6>
              </Col>
              <Col>
                <h2>Live Sessions</h2>
              </Col>
            </Row>
          </Container>
        </div>
      );
};

export default Header;