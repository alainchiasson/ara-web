import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "@patternfly/patternfly-next/patternfly.css";
import store from "./store";
import { getConfig } from "./config/configActions";
import * as Containers from "./containers";

class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    store.dispatch(getConfig()).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return null;
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Redirect from="/" exact to="/playbooks" />
            <Route
              path="/playbooks"
              exact
              component={Containers.PlaybooksContainer}
            />
            <Route component={Containers.Container404} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
