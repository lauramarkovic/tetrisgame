import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import Tetris from "./pages/Tetris";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/LeaderBoard";
import MyScores from "./pages/MyScores";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import MyScoresRoute from "./util/MyScoresRoute";

import "./App.css";

const App = () => (
  <AuthProvider>
    <Router>
      <MenuBar />
      <Route exact path="/" component={Tetris} />
      <Route exact path="/leaderboard" component={LeaderBoard} />
      <MyScoresRoute exact path="/myscores" component={MyScores} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </Router>
  </AuthProvider>
);

export default App;