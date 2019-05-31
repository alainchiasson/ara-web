import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";
import store from "./store";
import { getConfig } from "./config/configActions";
import { checkAuthentification } from "./auth/authActions";
import * as Containers from "./containers";
import Header from "./layout/Header";
import PrivateRoute from "./auth/PrivateRoute";
import Page from "./layout/Page";

class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    store
      .dispatch(getConfig())
      .then(() => store.dispatch(checkAuthentification()))
      .catch(error => console.error(error))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return null;
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Page header={<Header />}>
            <Switch>
              <Redirect from="/" exact to="/playbooks" />
              <PrivateRoute
                path="/playbooks"
                exact
                component={Containers.PlaybooksContainer}
              />
              <PrivateRoute
                path="/playbooks/:id"
                component={Containers.PlaybookContainer}
              />
              <Route path="/login" component={Containers.LoginContainer} />
              <Route component={Containers.Container404} />
            </Switch>
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
