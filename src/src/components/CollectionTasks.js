import React from "react";
import {
  Header,
  Container,
  Grid,
  Segment
} from "semantic-ui-react";
import AppHeader from "./AppHeader";
import CreateTask from "./CreateTask";
import TaskCategoryView from './TaskCategoryView';



class CollectionTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task_created : false,
      users : [],
      isOpen: false
    };
  }
  componentDidMount() {

    let collectionId =
      this.props &&
      this.props.match.params &&
      this.props.match.params.collectionId;
    this.props.getTasksByCollection(collectionId);
    this.props.getAllUsers();
  }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.tasks.task_created) {
            const task_created = nextProps.tasks.task_created;
            const tasks = nextProps.tasks.tasks;
            return { ...prevState, task_created, tasks};
          }
      if ((nextProps.users.users && nextProps.users.users.length > 0 ) || (nextProps.tasks.tasks && nextProps.tasks.tasks.length > 0)) {
        const users = nextProps.users.users;
        const tasks = nextProps.tasks.tasks;
        return { ...prevState, users ,tasks };
      }
      return prevState;
    }

  render() {
    const { isOpen , users , tasks } = this.state;
    return (
      <React.Fragment>
        <AppHeader {...this.props} />
        <div style={{ marginTop: "5rem", minHeight: "100vh" }}>
          <Container>
            <Grid>
              <Grid.Column width={11}>
              <Header as="h1" color="grey" textAlign="left">
                      All tasks
                    </Header>
              </Grid.Column>
              <Grid.Column width={5}>
              <Header textAlign="right">
                  <CreateTask task_created={this.state.task_created} isOpen={isOpen} users={users} parent={null} collectionId={this.props.match.params.collectionId} onSubmit={this.props.createTask}/>
                </Header>
              </Grid.Column>
            </Grid>
            <Grid style={{ minHeight: "100vh" }}>
              <Grid.Column width={16}>
                

                {tasks && tasks.length > 0 ? (
                  <div>
                    
                    <TaskCategoryView tasks={tasks} history={this.props.history}/>
                  </div>
                ) : 
                (
                    <div>
                    <Header as="h3" color="grey" textAlign="left">
                      No tasks for this Collection
                    </Header>
                  </div>
                )
                }
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionTasks;
