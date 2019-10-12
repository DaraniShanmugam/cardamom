import React from "react";

import {
  Header,
  Container,
  Grid,
  Segment
} from "semantic-ui-react";
import AppHeader from "./AppHeader";
import TaskCategoryView from './TaskCategoryView';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTasks: [],
      activeTasks: [],
      doneTasks: [],
      pendingTasks: []
    };
  }
  componentDidMount() {
    this.props.getAllTasks();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tasks.tasks && nextProps.tasks.tasks.length > 0) {
      const allTasks = nextProps.tasks.tasks;
      return { ...prevState, allTasks };
    }
    return prevState;
  }

  render() {
    const {  allTasks } = this.state;
    return (
      <React.Fragment>
        <AppHeader {...this.props} />
        <Segment basic style={{ marginTop: "5rem", minHeight: "100vh" }}>
          <Container fluid>
            <Grid.Row>
              {/* {is_manager && (
                <Header textAlign="right">
                  <Button primary>Create New Task </Button>
                </Header>
              )} */}
              <Header as="h1" style={{marginBottom: '2rem'}}>All Tasks</Header>
            </Grid.Row>
            {allTasks && allTasks.length > 0 ? (
                    <TaskCategoryView tasks={allTasks} history={this.props.history}/>
                    ) : (
              <Header as="h1">No Tasks </Header>
            )}
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Dashboard;
