import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import "./styles/style.scss";

import Menu from "./components/Menu";
import Main from './pages/Main';
import Character from './pages/Character';
import Event from './pages/Event';

function App() {
  return (
    <Router>
      <header>
        <div className="header-wrap">
          <Menu/>
        </div>
      </header>
      <div className="main">
        <main>
          <Switch>
            <Route path="/main" exact>
              <Main/>
            </Route>
            <Route path="/character" exact>
              <Character/>
            </Route>
            <Route path="/event" exact>
              <Event/>
            </Route>
            <Redirect to="/main"/>
          </Switch>
        </main>
        <footer>
          <div>
            <p>celebring</p>
            <p>©2023</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
