import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import Create from './components/createRoom/create';
import Join from './components/joinRoom/join';
import Wait from './components/waitingRoom/waiting';
import Meeting from './components/meetingRoom/meeting';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create-room" component={Create} />
          <Route path="/join-room" component={Join} />
          <Route path="/waiting" component={Wait} />
          <Route path="/room" component={Meeting} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
