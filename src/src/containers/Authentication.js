import React from "react";
import { connect  } from "react-redux";
import { bindActionCreators } from "redux";
import Login from '../components/Login'

import {login} from '../actions/userActions'

class LoginPage extends React.Component {
    componentDidMount(){
        const { is_manager } = this.props.user;
        if(this.props.isAuthenticated) 
             this.props.history.push(`/${ is_manager ? 'collections':'dashboard'}`) 
    }
    render(){
        return( <Login {...this.props} /> )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: bindActionCreators(login, dispatch)
    };
};

const mapStateToProps = (state) => {
    const {isAuthenticated , error , user} = state.authReducer
    return {
        user,
        isAuthenticated,
        error
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);