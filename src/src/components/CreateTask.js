import React, { Component } from 'react'
import {Modal, Form, Button , Dropdown } from 'semantic-ui-react';

const options = [
    {
        key:"verylow", value:1, text:"Very low" 
    },
    {
        key:"low", value:2, text:"Low"
    },
    {
        key:"medium", value:3, text:"Medium"
    },
    {
        key:"high", value:4, text:"High"
    },
    {
        key:"urgent", value:5, text:"Urgent"
    }
]
const categoryOptions = [
    {
        key:"bug", value:"BUG", text:"Bug" 
    },
    {
        key:"feature", value:"FEATURE", text:"Feature" 
    },
    {
        key:"maintenance", value:"MAINTENANCE", text:"Maintenance" 
    },
    
]
class CreateTask extends Component {    
    constructor(props){
        super(props);
        this.state = {
            due_date: new Date().toISOString().substr(0,10),
            title: "",
            priority : null,
            assigned_to : null,
            description : "",
            category : "",
            isOpen : props.isOpen,
            users : props.users,
            userOptions : props.users.map((val)=>{ return {key:val.id,value:val.id,text:val.username}})
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
        const { title, description ,priority , category, assigned_to, due_date} = this.state;
        let body = {title , 
            description ,
             priority , 
             category , 
             assigned_to , 
             due_date, 
             collection : this.props.collectionId , 
             parent : this.props.parent}
        this.props.onSubmit(body)
    }
    static getDerivedStateFromProps(nextProps,prevState){
        
        if(nextProps.task_created)
        return {...prevState,isOpen : false}
        if(nextProps.users && nextProps.users.length > 0){
            const userOptions = nextProps.users.map((val)=>{ return {key:val.id,value:val.id,text:val.username}})
            return {...prevState,users:nextProps.users,userOptions}
        }
        return prevState;
    }
    

    render(){
       const {userOptions} = this.state;
        return(
            <Modal 
                trigger={<Button color="blue" onClick={()=>{this.setState({isOpen:true})}}>{this.props.parent ? 'Link' : 'Create'} New Task</Button>} 
                centered={false} 
                size={"small"}
                closeOnDimmerClick={false}
                onClose={()=>this.setState({isOpen:false})}
                open={this.state.isOpen}
                closeIcon
                >
                <Modal.Header as="h3">Add Task details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required >
                            <label>Title</label>
                            <input 
                            placeholder='Title' 
                            name="title"
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.TextArea  name="description" onChange={this.handleChange} label="Description" />
                        <Form.Field required>
                            <label>Due Date</label>
                            <div>
                                <input type="date" name="due_date" onChange={this.handleChange}  value={this.state.due_date} />
                            </div>
                        </Form.Field>
                        <Form.Field required>
                        <label>Priority</label>
                        <Dropdown
                            name="priority" 
                            placeholder="Priority"
                            fluid
                            search
                            selection
                            options={options}
                            onChange={this.handleChange}/>
                    </Form.Field>
                        <Form.Field required>
                        <label>Category</label>
                        <Dropdown
                            name="category" 
                            placeholder="Category"
                            fluid
                            search
                            selection
                            options={categoryOptions}
                            onChange={this.handleChange}/>
                    </Form.Field>
                        <Form.Field required>
                        <label>Assign To</label>
                        <Dropdown
                            name="assigned_to" 
                            placeholder="Assignee"
                            fluid
                            search
                            selection
                            options={userOptions}
                            onChange={this.handleChange}/>
                    </Form.Field>

                        <Form.Button floated="right" color="blue">Create Task</Form.Button>
                        <div className="clearfix"></div>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default CreateTask