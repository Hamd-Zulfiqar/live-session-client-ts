import axios from "axios";
import { CreateResponse, ErrorResponse } from "../types/tokbox";

const opentokServerPath =
  "https://live-session-backend-ts.herokuapp.com/api/v1/room/";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function CreateRoom(room: string): Promise<CreateResponse> {
  const url = opentokServerPath + room;
  try {
    const response = await axios({
      url: url,
      method: "post",
      headers: {
        Service: "tokbox",
      },
    });

    if (response.status == 200) {
      const data: CreateResponse = {
        status: true,
        apiKey: response.data.apiKey,
        sessionId: response.data.sessionId,
        token: response.data.token,
        password: response.data.password,
      };
      await delay(3000);
      return data;
    } else {
      const data: CreateResponse = {
        status: false,
        apiKey: "",
        sessionId: "",
        token: response.data.message,
        password: "",
      };
      await delay(3000);
      return data;
    }
  } catch (error) {
    console.error(error);
    const temp: CreateResponse = {
      status: false,
      apiKey: "",
      sessionId: "",
      token: "",
      password: "",
    };
    return temp;
  }
}

export async function JoinRoom(password: string): Promise<CreateResponse> {
  const url = opentokServerPath + password;
  try {
    const response = await axios({
      url: url,
      method: "get",
      headers: {
        Service: "tokbox",
      },
    });

    if (response.status === 200) {
      const data: CreateResponse = {
        status: true,
        apiKey: response.data.apiKey,
        sessionId: response.data.sessionId,
        token: response.data.token,
        password: response.data.password,
      };
      await delay(10000);
      return data;
    } else {
      const data: CreateResponse = {
        status: false,
        apiKey: "",
        sessionId: "",
        token: response.data.message,
        password: "",
      };
      await delay(10000);
      return data;
    }
  } catch (error) {
    console.error(error);
    const temp: CreateResponse = {
      status: false,
      apiKey: "",
      sessionId: "",
      token: "",
      password: "",
    };
    return temp;
  }
}
