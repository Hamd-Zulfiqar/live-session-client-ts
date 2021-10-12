import { Room } from "twilio-video";
import { ITwilioResponse } from "../types/twilio-types";

export const opentokServerPath: string =
  "https://video-live-session-backend.herokuapp.com/api/v1/room/";

const password: string = "";
const url: string = "";

interface IResponseData {
  password: string;
  token: string;
}

interface IGetRoomResponse {
  sessionId: string;
  token: string;
}

export async function getRoom(
  password: string,
  userName: string
): Promise<IGetRoomResponse | undefined> {
  try {
    let tempurl = opentokServerPath + password;
    console.log(tempurl);
    let response = await fetch(tempurl, {
      method: "get",
      headers: new Headers({
        Service: "twilio",
        "Content-Type": "application/json",
        username: userName,
      }),
    });

    const data: IGetRoomResponse = await response.json();

    console.log("test token", data);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createRoom(name: string) {
  try {
    let tempurl = opentokServerPath + name;

    let response = await fetch(tempurl, {
      method: "post",
      headers: new Headers({
        Service: "twilio",
        "Content-Type": "application/json",
      }),
    });

    const data: IResponseData = await response.json();

    console.log("TWILIO RESPONSE ROOM CREATED : ", data);

    return data;
  } catch (err) {
    console.log(err);
  }
}
