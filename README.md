<h1>Live Session Client Application</h1>
<p>This project is the client side of the Live Session Backend Application (deployed on https://video-live-session-backend.herokuapp.com/). This is a react application which uses Typescript and the purpose is to use all the endpoints on the backend application and see them in action</p>

<h2>Project Directory Structure</h2>

<h2>Project Architecture and Design</h2>
<p>The scope of this project has been defined to expand every now and then with the addition of newer service providers. The goal was to implement a client for tokbox service only at the moment as it's basic backend implementation has been completed.</p>
<p>Most of the Applciation is straight forward following basic React Typescript. The Components directory holds all the various components that facilitate a user in creation of a room or joining a live session room. The "tokbox.ts" file inside the "api" directory is responsible for fetching the API call from the Backend Application and forwarding its data to the caller component. 'twilio.ts' manages teh twilio service and has 2 functions 1 for creating room and one for joining it via password</p>

<h2>Installation and Usage</h2>
Follow the steps to get the project up and running on your local machine:

1. Clone the Project from this repository. Always check for the latest publish.
2. Create a ".env" file in the base directory of project and add your credentials and network port for the applciation in this format:
```
REACTAPP_TOKBOX_API_KEY=<Your tokbox account api key>
REACTAPP_TOKBOX_API_SECRET=<Your tokbox account api secret>
TWILIO_API_SECRET=<Your api secret key from twilio dashboard>
TWILIO_API_KEY=<Your api key from twilio dashboard>
TWILIO_ACCOUNT_SID=<Your twilio account id>

```
3. Open the project base directory in terminal and run the following script:
```
npm install
```
this script should install all the dependecies of the project.

4. To finally start the applciation, enter the following script:
```
npm start
```
The use of the application is fairly straight forward.
- Select a service provider
- Choose the desired action (join room/ create room)
For tokbox:
- To create a live session room, enter your name and a name for your room in the input fields and then click "Create Room"
- To join a live session room, get the password from room creator and then enter your name and that password in the input fields and then click "Join Room"
- Do allow your browser the permission to use your device's webcame and microphone when asked.
For twilio:
-To create room enter room name, your name
- To join room enter room password (retrieved from console for now),room name and your name (Labels are given for convenience)
- Enjoy the meeting ^^

For any information regarding the backend implementation, look up the following document: https://docs.google.com/document/d/15PdMSYtCIOYdDvwIO1zhQp47Jmnh1MyQDmfjUaYOrV0/edit?usp=sharing

