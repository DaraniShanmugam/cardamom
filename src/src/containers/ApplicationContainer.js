import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {logout , getAllUsers , createUser} from '../actions/userActions'
import {getAllTasks , getSingleTask  , getTasksByCollection, createTask , changeTaskStatus} from '../actions/taskActions'
import {getAllCollections , createCollection } from '../actions/collectionActions'

export default function ApplicationContainer(ComposedComponent) {
    
    class ApplicationContainer extends Component {
        
        componentDidMount(){
            if(!this.props.user.isAuthenticated){
                this.props.history.push('/');
            }
            else{
               if(!this.props.user.user.is_manager){
                var s = document.createElement( 'script' );
                s.setAttribute( 'src', '/registerSw.js' );
                document.body.appendChild( s );
               }
            }
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

  function mapStateToProps(state) {
    return {
      user: state.authReducer,
      users : state.usersReducer,
      collections: state.collectionReducer,
      tasks : state.taskReducer
    //   matchReducer: state.matchReducer
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      logout: bindActionCreators(logout, dispatch),
      getAllUsers: bindActionCreators(getAllUsers, dispatch),
      createUser: bindActionCreators(createUser, dispatch),
      getAllCollections: bindActionCreators(getAllCollections, dispatch),
      createCollection: bindActionCreators(createCollection, dispatch),
      getSingleTask: bindActionCreators(getSingleTask, dispatch),
      getTasksByCollection: bindActionCreators(getTasksByCollection, dispatch),
      createTask: bindActionCreators(createTask, dispatch),
      changeTaskStatus: bindActionCreators(changeTaskStatus, dispatch),
      getAllTasks: bindActionCreators(getAllTasks, dispatch)
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
}
