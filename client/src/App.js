import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  FormGroup
} from 'reactstrap';

import Dog from './Dog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dog: null,
      dogList: [],
      newDogName: ''
    };
  }

  getDogList = () => {
    fetch('/api/dogs') // fetch data from api endpoint
    .then(res => res.json())
    .then(res => {
      var dogList = res.map(r => r.name); // rows of database (r.column_name)
      this.setState({ dogList }); 
    });
  };

  handleInputChange = (e) => {
    this.setState({ newDogName: e.target.value });
  };

  handleAddDog = () => {
    fetch('/api/dogs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dog: this.state.newDogName })
    })
    .then(res => res.json()) // want the response from server to be JSON
    .then(res => {
      this.getDogList(); // refreshing
      this.setState({ newDogName: '' }); // init again
    });
  };

  getDog = (dog) => {
    fetch(`/api/dogs/${dog}`) // template literal 
    .then(res => res.json())
    .then(dog => {
      console.log(dog);
      this.setState({ dog });
    });
  };

  handleChangeDog = (e) => {
    this.getDog(e.target.value); // selected item in drop down
  }

  // Lifecycle method
  componentDidMount () { 
    this.getDogList();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">PawBook</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
          <Jumbotron>
            <h1 className="display-3">PawBook</h1>
            <p className="lead">The current dogs registered!</p>
            <InputGroup>
              <Input
                placeholder="New dog name..."
                value={this.state.newDogName}
                onChange={this.handleInputChange}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.handleAddDog}>Add Dog</Button>
              </InputGroupAddon>
            </InputGroup>
          </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Dog</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeDog}>
                { this.state.dogList.length === 0 && <option>No dogs added yet.</option> }
                { this.state.dogList.length > 0 && <option>Select a dog.</option> }
                { this.state.dogList.map((dog, i) => <option key={i}>{dog}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Dog data={this.state.dog}/>
      </Container>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
