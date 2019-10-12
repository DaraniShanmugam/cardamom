import React from "react";
import { Header, Label, Grid, Card, Segment } from "semantic-ui-react";

const priorities = ["Very low", "Low", "Medium", "High", "Urgent"];

export default class TaskCategoryView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      tasks: props.tasks,
      activeTasks: props.tasks.filter(val => {
        return val.started === true && val.done === false;
      }),
      doneTasks: props.tasks.filter(val => {
        return val.done === true;
      }),
      pendingTasks: props.tasks.filter(val => {
        return val.started === false;
      })
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tasks && nextProps.tasks.length > 0) {
      const allTasks = nextProps.tasks;
      const activeTasks = allTasks.filter(val => {
          return val.started === true && val.done === false;
        }),
        doneTasks = allTasks.filter(val => {
          return val.done === true;
        }),
        pendingTasks = allTasks.filter(val => {
          return val.started === false;
        });
      return {
        ...prevState,
        tasks: allTasks,
        activeTasks,
        doneTasks,
        pendingTasks
      };
    }
    return prevState;
  }

  render() {
    const { activeTasks, pendingTasks, doneTasks } = this.state;
    return (
      <Grid className="ticket-list" columns={3}>
        <Grid.Column className="issue-container">
          <div>
            <Header
              inverted
              attached="top"
              as="h3"
              color="white"
              textAlign="left"
            >
              Pending
            </Header>
            <Segment attached secondary>
              {pendingTasks && pendingTasks.length > 0 ? (
                <Card.Group itemsPerRow={1}>
                  {pendingTasks.map((task, key) => {
                    return (
                      <Card
                        key={key}
                        onClick={() => {
                          let taskId = task.id;
                          this.props.history.push(`/task/${taskId}`);
                        }}
                      >
                        <Card.Content>
                          <Card.Header>{task.title}</Card.Header>
                          <Card.Meta>
                            <Label color="red">
                              {priorities[task.priority - 1]}
                            </Label>
                            <Label color="pink">{task.category}</Label>
                          </Card.Meta>
                          <Card.Description>
                            {new Date(task.due_date).toLocaleDateString()}
                          </Card.Description>
                          <Card.Description>
                            <Label color="blue">{task.collection.title}</Label>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </Card.Group>
              ) : (
                <Header as="h4">No Pending Tasks </Header>
              )}
            </Segment>
          </div>
        </Grid.Column>
        <Grid.Column className="issue-container">
          <div>
            <Header
              inverted
              attached="top"
              as="h3"
              color="white"
              textAlign="left"
            >
              Active
            </Header>
            <Segment attached secondary>
              {activeTasks && activeTasks.length > 0 ? (
                <Card.Group itemsPerRow={1}>
                  {activeTasks.map((task, key) => {
                    return (
                      <Card
                        key={key}
                        onClick={() => {
                          let taskId = task.id;
                          this.props.history.push(`/task/${taskId}`);
                        }}
                      >
                        <Card.Content>
                          <Card.Header>{task.title}</Card.Header>
                          <Card.Meta>
                            <Label color="red">
                              {priorities[task.priority - 1]}
                            </Label>
                            <Label color="pink">{task.category}</Label>
                          </Card.Meta>
                          <Card.Description>
                            {new Date(task.due_date).toLocaleDateString()}
                          </Card.Description>
                          <Card.Description>
                            <Label color="blue">{task.collection.title}</Label>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </Card.Group>
              ) : (
                <Header as="h4">No Active Tasks </Header>
              )}
            </Segment>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div>
            <Header
              inverted
              attached="top"
              as="h3"
              color="white"
              textAlign="left"
            >
              Done
            </Header>
            <Segment attached secondary>
              {doneTasks && doneTasks.length > 0 ? (
                <Card.Group itemsPerRow={1}>
                  {doneTasks.map((task, key) => {
                    return (
                      <Card
                        key={key}
                        onClick={() => {
                          let taskId = task.id;
                          this.props.history.push(`/task/${taskId}`);
                        }}
                      >
                        <Card.Content>
                          <Card.Header>{task.title}</Card.Header>
                          <Card.Meta>
                            <Label color="red">
                              {priorities[task.priority - 1]}
                            </Label>
                            <Label color="pink">{task.category}</Label>
                          </Card.Meta>
                          <Card.Description>
                            {new Date(task.due_date).toLocaleDateString()}
                          </Card.Description>
                          <Card.Description>
                            <Label color="blue">{task.collection.title}</Label>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </Card.Group>
              ) : (
                <Header as="h4">No Done Tasks </Header>
              )}
            </Segment>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}
