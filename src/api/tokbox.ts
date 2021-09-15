import axios from "axios";
import { CreateResponse } from "../types/tokbox";

const opentokServerPath = 'http://localhost:4000/api/v1/room/';

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function CreateRoom(room: string): Promise<CreateResponse> {
    const url = opentokServerPath + room;
    try {
        const response = await axios({
            url: url,
            method: 'post',
            headers: {
                'Service':'tokbox'
            },
        });

        const data: CreateResponse = {
            apiKey: response.data.apiKey,
            sessionId: response.data.sessionId,
            token: response.data.token,
            password: response.data.password
        }

        await delay(3000);
        return data;
    } catch (error) {
      console.error(error);
      const temp: CreateResponse = {
          apiKey: '',
          sessionId: '',
          token: '',
          password: ''
      }
      return temp;
    }
}

export async function JoinRoom(password: string): Promise<CreateResponse> {
    const url = opentokServerPath + password;
    try {
        const response = await axios({
            url: url,
            method: 'get',
            headers: {
                'Service':'tokbox'
            },
        });

        const data: CreateResponse = {
            apiKey: response.data.apiKey,
            sessionId: response.data.sessionId,
            token: response.data.token,
            password: response.data.password
        }

        await delay(3000);
        return data;
    } catch (error) {
      console.error(error);
      const temp: CreateResponse = {
          apiKey: '',
          sessionId: '',
          token: '',
          password: ''
      }
      return temp;
    }
}