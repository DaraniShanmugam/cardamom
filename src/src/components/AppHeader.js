import React from "react";
import { Button, Menu, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class AppHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }  
  }
  

  handleLogout = () => {
    this.props.logout();
  };
  static getDerivedStateFromProps(nextProps,prevState){
      if(!nextProps.user.isAuthenticated)
          nextProps.history.push('/')
      return prevState
  }
  render() {
    const {is_manager} =  this.props.user.user;
    return (
      <React.Fragment>
        <div>
          <Menu fixed={"top"} size="large">
            <Link to="/dashboard"><Menu.Item as="h3">Cardamom</Menu.Item> </Link>
            {is_manager && <Link to="/collections"><Menu.Item >Collections</Menu.Item> </Link>}
            {is_manager  &&<Link to="/users"><Menu.Item >Users</Menu.Item></Link>}
            <Menu.Item position="right">
              <Button
                as="a"
                color="secondary"
                inverted
                onClick={this.handleLogout}
              >
                {/* <Icon name="sign-out"></Icon> */}
                 Logout
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}

export default AppHeader;
