import React, { Component } from 'react'
import {Modal, Form, Button } from 'semantic-ui-react'
import  {toast} from 'react-toastify'

class CreateUser extends Component {    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password : "",
            conpassword : "",
            isOpen : props.isOpen
        }
    }

    handleChange = (e,data) => {
        const value = data !== undefined ? data.value : e.target.value;
        const name = data !== undefined ? data.name : e.target.name;
        this.setState({
            [name] : value
        })
    }
    
    handleSubmit = () => {

        const {username , password , conpassword} = this.state;
        if(username && password && conpassword && (password === conpassword)){
            let userObj = {
                username,
                password,
                confirm_password : conpassword
            }
            this.props.onSubmit(userObj)
        }
        else{
            let message = ''
            if(!username)
                message = 'Username can not be empty'
            else if(!password)
                message = 'Password can not be empty'
            else if(!conpassword)
                message = 'Confirm Password can not be empty'
            else
                message = 'Passwords did not match'
            toast(message,{type:toast.TYPE.ERROR})
        }
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.user_created){
            return {...prevState,isOpen : false}
        }
        return prevState;
    }
    

    render(){
       
        return(
            <Modal 
                trigger={<Button color="blue" onClick={()=>{this.setState({isOpen:true})}}>Create New User</Button>} 
                centered={false} 
                size={"small"}
                closeOnDimmerClick={false}
                onClose={()=>this.setState({isOpen:false})}
                open={this.state.isOpen}
                closeIcon
                >
                <Modal.Header as="h3">Add User details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required >
                            <label>Username</label>
                            <input 
                            placeholder='User Name' 
                            name="username"
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required >
                            <label>Password</label>
                            <input 
                            type='password'
                            placeholder='Password' 
                            name="password"
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required >
                            <label>Confirm Password</label>
                            <input 
                            type='password'
                            placeholder='Confirm Password' 
                            name="conpassword"
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Button floated="right" color="blue">Create User</Form.Button>
                        <div className="clearfix"></div>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default CreateUser