import React from "react";
import "./App.css";
import Header from "./components/header"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Pages from './pages'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <br />
          <div className="App-Container">
            <div className="App-Content">
              <Switch>
                <Route exact path="/">
                    <Pages.Home />
                </Route>
                <Route exact path="/aquarium-manager">
                    <Pages.AquariumManager.Status />
                </Route>
                <Route exact path="/aquarium-manager/control">
                    <Pages.AquariumManager.Control />
                </Route>
                <Route exact path="/aquarium-manager/log">
                    <Pages.AquariumManager.Log />
                </Route>
                <Route exact path="/aquarium-manager/devices">
                    <Pages.AquariumManager.Devices />
                </Route>
                <Route exact path="/aquarium-manager/schedules">
                    <Pages.AquariumManager.Schedules />
                </Route>
                </Switch>
              </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;