import React from "react";
import { Header, Card, Container, Grid ,Segment } from "semantic-ui-react";
import AppHeader from './AppHeader';
import CreateCollection from './CreateCollection';

class Collections extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          collections: [],
          collection_created : false,
          isOpen : false
        };
      }
      componentDidMount() {
        this.props.getAllCollections();
      }
      static getDerivedStateFromProps(nextProps, prevState) {
        
        if (nextProps.collections.collection_created) {
          const collection_created = nextProps.collections.collection_created;
          const collections = nextProps.collections.collections;
          return { ...prevState, collection_created, collections};
        }
        if (nextProps.collections.collections && nextProps.collections.collections.length > 0) {
          const collections = nextProps.collections.collections;
          return { ...prevState, collections};
        }
      
        return prevState;
      }
  
  render() {
      const {collections , isOpen } = this.state;
    return (
      <React.Fragment>
          <AppHeader {...this.props}/>
          <Segment basic style={{marginTop:'5rem', minHeight:'100vh'}} >
            <Container>
                <Grid>
                            <Grid.Column width={11}>

                            <Header as="h1" color="grey" textAlign="left"> All collections </Header>
                            </Grid.Column>
                    <Grid.Column width={5}>
                        <Header  textAlign="right"> 
                            <CreateCollection collection_created={this.state.collection_created} isOpen={isOpen} handleClick={this.props.createCollection}/>
                        </Header>
                        </Grid.Column>
                          </Grid>
                <Grid style={{minHeight:'100vh'}}>

                          <Grid.Column width={16}>
                    {     
                        collections && collections.length > 0 ? 
                        <div>
                        <Card.Group itemsPerRow={4}>
                        {
                          collections.map((project, key) => {
                            return (
                              <Card key={key} link onClick={() => {                                  
                                let collectionId = (project.id);
                                this.props.history.push(`/collection/${collectionId}`)
                              }}>
                                
                                <Card.Content>
                                  <Card.Header>
                                    {project.title}
                                  </Card.Header>
                                </Card.Content>
                              </Card>
                            )
                          })
                        }
                        </Card.Group>
                        </div>
                      :
                      null
                      }
                    </Grid.Column>
                </Grid>
            </Container>

          </Segment>
      </React.Fragment>
    );
  }
}

export default Collections;
