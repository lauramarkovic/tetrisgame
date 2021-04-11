import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import Tetris from "./pages/Tetris";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/LeaderBoard";
import MyScores from "./pages/MyScores";

const App = () => (
  <Router>
    <MenuBar />
    <Route exact path="/" component={Tetris} />
    <Route path="/leaderboard" component={LeaderBoard} />
    <Route path="/myscores" component={MyScores} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Router>
);

export default App;