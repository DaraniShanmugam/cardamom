import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ApplicationContainer from "./containers/ApplicationContainer";
import Auth from "./containers/Authentication";
import Dashboard from "./components/Dashboard";
import Collections from "./components/Collections";
import CollectionTasks from "./components/CollectionTasks";
import TaskDetail from "./components/TaskDetail";
import Users from "./components/Users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Segment, Container } from "semantic-ui-react";

export const history = createBrowserHistory();
toast.configure({
  autoClose: 5000,
  draggable: false
});
function App() {
  return (
    <Segment style={{minHeight: "100vh"}}>
      <Container>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route
              path="/dashboard"
              component={ApplicationContainer(Dashboard)}
            />
            <Route
              path="/collections"
              component={ApplicationContainer(Collections)}
            />
            <Route path="/users" component={ApplicationContainer(Users)} />
            <Route
              path="/task/:taskId"
              component={ApplicationContainer(TaskDetail)}
            />
            <Route
              path="/collection/:collectionId"
              component={ApplicationContainer(CollectionTasks)}
            />
          </Switch>
        </Router>
      </Container>
    </Segment>
  );
}

export default App;
