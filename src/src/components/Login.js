import React from "react";
import {
  Header,
  Button,
  Form,
  Grid,
  Container,
  Segment
} from "semantic-ui-react";
import { toast } from "react-toastify";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (username && password) {
      let body = {
        username,
        password
      };
      this.props.login(body);
    } else {
      toast("All fields are required", { type: toast.TYPE.ERROR });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { is_manager } = nextProps.user;
    if (nextProps.isAuthenticated) {
      nextProps.history.push(`/${is_manager ? "collections" : "dashboard"}`);
    }
    if (nextProps.error && nextProps.error.type === "error")
      toast(nextProps.error.message, { type: toast.TYPE.ERROR });
    return prevState;
  }
  render() {
    return (
      <Container>
        <Grid style={{ margin: 0, marginTop: 50 }} centered>
          <Grid.Column width={12} style={{ textAlign: "center" }}></Grid.Column>
        </Grid>
        <div style={{ marginTop: "3em" }}>
          <Grid verticalAlign="middle">
            <Grid.Column width={10}>
                <Header as="h1" style={{fontSize: '2.5em'}}>
                    Welcome to Cardamom Ticketing System
                </Header>
                <Header as="h3" color="blue" style={{fontSize: '1.5em'}}>
                    Manage your issues and task progress easily.
                </Header>
            </Grid.Column>
            <Grid.Column width={6}>
                  <Header attached="top" as="h2" color="white" style={{marginTop: 0, textAlign: 'center'}}>
                    Login to continue
                  </Header>
              <Segment attached secondary>
                <div style={{ textAlign: "center" }}>
                  {/* <Header as="h1">Cardamom</Header> */}
                </div>
                <Form>
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Button
                    fluid
                    content="Login"
                    primary
                    onClick={this.handleLogin}
                    style={{ margin: "auto", width: 100 }}
                  />
                </Form>
              </Segment>
            </Grid.Column>
            
          </Grid>
        </div>
      </Container>
    );
  }
}

export default Login;
