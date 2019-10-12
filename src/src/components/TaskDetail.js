import React from "react";
import {
  Card,
  Container,
  Grid,
  Segment,
  Button,
  Label,
  Header,
  Icon
} from "semantic-ui-react";
import AppHeader from "./AppHeader";
import CreateTask from "./CreateTask";
const priorities = ["Very low", "Low", "Medium", "High", "Urgent"];

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      users: [],
      task_created: false
    };
  }
  componentDidMount() {
    let taskId = this.props && this.props.match.params.taskId;
    this.props.getSingleTask(taskId);
    this.props.getAllUsers();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.tasks.task ||
      (nextProps.users.users && nextProps.users.users.length > 0)
    ) {
      const task_created = nextProps.tasks.task_created;
      const users = nextProps.users.users;
      return { ...prevState, task: nextProps.tasks.task, users, task_created };
    }
    return prevState;
  }

  render() {
    const { task, users, isOpen } = this.state;
    return (
      <React.Fragment>
        <AppHeader {...this.props} />
        <Segment basic style={{ marginTop: "5rem", minHeight: "100vh" }}>
          <Container>
            <Grid style={{ minHeight: "100vh" }}>
              <Grid.Column width={16}>
                {task && (
                  <div>
                    <Header textAlign="right">
                      {this.props.user && this.props.user.user.is_manager && (
                        <CreateTask
                          users={users}
                          task_created={this.state.task_created}
                          isOpen={isOpen}
                          parent={task.id}
                          collectionId={task.collection.id}
                          onSubmit={this.props.createTask}
                        />
                      )}
                    </Header>
                    <Card fluid>
                      <Card.Content style={{margin: '1em'}}>
                        <Card.Header>
                          <Grid >
                            <Grid.Column width={10}>
                              <Header as="h2">
                            {task.title}
                                </Header>
                            </Grid.Column>
                            <Grid.Column
                              width={6}
                              style={{ textAlign: "right" }}
                            >
                              {task.started === false && (
                            <Button
                              icon
                              size="mini"
                              labelPosition="left"
                              color="green"
                              onClick={() =>
                                this.props.changeTaskStatus(task.id, {
                                  started: true
                                })
                              }
                            >
                              <Icon name="cogs"></Icon>
                              Mark Active
                            </Button>
                          )}
                          {task.done === false && (
                            <Button
                              icon
                              size="mini"
                              labelPosition="left"
                              color="red"
                              onClick={() =>
                                this.props.changeTaskStatus(task.id, {
                                  done: true
                                })
                              }
                            >
                              <Icon name="check"></Icon>
                              Mark Done
                            </Button>
                          )}
                            </Grid.Column>
                          </Grid>
                        </Card.Header>
                       
                        <Card.Meta>
                          <Label color="blue">{task.collection.title}</Label>
                          <Label color="red">
                            {priorities[task.priority - 1]}
                          </Label>
                          <Label color="pink">{task.category}</Label>
                        </Card.Meta>
                        <Card.Description style={{ marginBottom: "1em" }}>
                          {task.description}
                        </Card.Description>
                        <Card.Description>
                          
                        </Card.Description>
                 
                      </Card.Content>
                      <Card.Content extra>
                      <Icon name="clock outline"></Icon>
                          {new Date(task.due_date).toLocaleDateString()}
                      </Card.Content>
                    </Card>
                  </div>
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

export default TaskDetail;
