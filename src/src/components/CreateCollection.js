import React, { Component } from 'react'
import {Modal, Form, Button } from 'semantic-ui-react'


class CreateCollection extends Component {    
    constructor(props){
        super(props);
        this.state = {
            title: "",
            isOpen : props.isOpen
        }
    }

    handleChange = (e) => {
        this.setState({
            title : e.target.value
        })
    }
    
    handleSubmit = () => {
        const {title} = this.state;
        if(title)
            this.props.handleClick({title})        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.collection_created)
            return {...prevState,isOpen : false}
        return prevState;
    }
    

    render(){
       
        return(
            <Modal 
                trigger={<Button color="blue" onClick={()=>{this.setState({isOpen:true})}}>Create New Collection</Button>} 
                centered={false} 
                size={"small"}
                closeOnDimmerClick={false}
                onClose={()=>this.setState({isOpen:false})}
                open={this.state.isOpen}
                closeIcon
                >
                <Modal.Header as="h3">Add Collection details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required >
                            <label>Collection Name</label>
                            <input 
                            placeholder='Collection Name' 
                            name="title"
                            onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Button floated="right" color="blue">Create Collection</Form.Button>
                        <div className="clearfix"></div>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default CreateCollection