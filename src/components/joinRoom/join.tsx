import React, {useState} from 'react';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from "react-router-dom";

function Join() {
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const history = useHistory();

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const showAlert = () => {
        toast.warn("Fill the Credentials first!", {
            position: toast.POSITION.TOP_CENTER
          });
    }

    const join = () => {
        if(Name === '' || Password === ''){
            showAlert();
            return;
        }

        const location = {
            pathname: '/waiting',
            state: {
                operation: 'join',
                name: Name,
                data: Password,
            }
        };

        history.push(location);        
    }

  return (
    <div className="Join d-flex align-items-center justify-content-center container-center">
        <Container>
            <ToastContainer />
            <Form className="text-center">
                <Form.Group as={Row} className="mb-3" controlId="formName">
                    <Form.Label column sm="3" >
                    Your Name:
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control type="text" placeholder="Hamd" size="lg" onChange={updateName} value={Name}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPassword">
                    <Form.Label column sm="3" >
                    Room Password:
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control type="text" placeholder="h3jsbd3 XD" size="lg" onChange={updatePassword} value={Password}/>
                    </Col>
                </Form.Group>

                <Button className="mt-3" size="lg"  onClick={join}>Join Room!</Button>
            </Form>
        </Container>
    </div>
  );
}

export default Join;
