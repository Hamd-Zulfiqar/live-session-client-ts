import React, {useState} from 'react';
import {Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
    const [Name, setName] = useState('');
    const [roomName, setroomName] = useState('');
    const history = useHistory();

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const updateRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setroomName(event.target.value);
    };

    const showAlert = () => {
        toast.warn("Fill the Credentials first!", {
            position: toast.POSITION.TOP_CENTER
          });
    }

    const create = () => {
        if(Name === '' || roomName === ''){
            showAlert();
            return;
        }

        const location = {
            pathname: '/waiting',
            state: {
                operation: 'create',
                name: Name,
                data: roomName,
            }
        };

        history.push(location);        
    }

    return (
        <div className="Create d-flex align-items-center justify-content-center container-center">
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

                    <Form.Group as={Row} className="mb-3" controlId="formRoomName">
                        <Form.Label column sm="3">
                        Room Name:
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="Entertainment" size="lg" onChange={updateRoomName} value={roomName}/>
                        </Col>
                    </Form.Group>

                    <Button className="mt-3" size="lg" onClick={create}>Create Room!</Button>
                </Form>
            </Container>
        </div>
    );
}

export default Create;
