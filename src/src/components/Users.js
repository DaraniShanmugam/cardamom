import React from "react";
import { Header, Card, Container, Grid, Segment } from "semantic-ui-react";
import AppHeader from "./AppHeader";
import CreateUser from "./CreateUser";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user_created: false,
      isOpen: false
    };
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.user_created) {
      const user_created = nextProps.users.user_created;
      const users = nextProps.users.users;
      return { ...prevState, user_created, users };
    }
    if (nextProps.users.users && nextProps.users.users.length > 0) {
      const users = nextProps.users.users;

      return { ...prevState, users };
    }
    return prevState;
  }

  render() {
    const { isOpen, users } = this.state;
    return (
      <React.Fragment>
        <AppHeader {...this.props} />
        <Segment basic style={{ marginTop: "5rem", minHeight: "100vh" }}>
          <Container>
            <Grid>
              <Grid.Column width={11}>
                <Header as="h1" color="grey" textAlign="left">
                  All Users
                </Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Header textAlign="right">
                  <CreateUser
                    isOpen={isOpen}
                    user_created={this.state.user_created}
                    onSubmit={this.props.createUser}
                  />
                </Header>
              </Grid.Column>
            </Grid>
            <Grid style={{ minHeight: "100vh" }}>
              <Grid.Column width={16}>
                {users && users.length > 0 ? (
                  <div>
                    <Card.Group itemsPerRow={4}>
                      {users.map((user, key) => {
                        return (
                          <Card key={key}>
                            <Card.Content>
                              <Card.Header>{user.username}</Card.Header>
                            </Card.Content>
                          </Card>
                        );
                      })}
                    </Card.Group>
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Users;
