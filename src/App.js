import React, { useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import "./App.css";
import Home from "./containers/Home/Home";
import Character from "./containers/Character/Character";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route
              path="/character"
              render={(props) => <Character {...props} />}
            />

            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
