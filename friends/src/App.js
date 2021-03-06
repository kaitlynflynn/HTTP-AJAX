import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import DisplayFriends from './component/displayFriends';

//setup your constructor along with super & introduce props
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showUpdateFriend: false,  
      friends: [], //friends accpeting info as empty array
      name: "",
      age: "",
      email: ""
    }
  }

  componentDidMount() {
    this.getFriends();
  }
    getFriends = () => {

    
    axios //implementing axios
      .get(`http://localhost:5000/friends`) //fetching data from localhost:5000
      .then(response => {
        this.setState({ friends: response.data }); //if data is available it will grab
    })
    .catch(err => { //else it will produce an error
      console.log(err);
    });
  }

  handleTextChange = e => { //would love to be walked thru this part to better understand
    this.setState({ [e.target.name]: e.target.value });
  };

  saveData = () => { //this will save info of new data being entered from webpage
    const foo = { name: this.state.name, age: this.state.age, email: this.state.email };
    axios
    .post(`http://localhost:5000/friends`, foo)      
    .then(savedData => {
      console.log(savedData);
    })
    .catch(error => { //if data is missing to save, an error will be logged
      console.log(error);
    });
    this.setState({ name: '', age: '', email: '' });
    };

  deleteFriend = friendId => {
    axios
      .delete(`http://localhost:5000/friends/${friendId}`)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };  

  showUpdateFriend = () => {
    this.setState({ showUpdateFriend: !this.state.showUpdateFriend});
  }


  updateFriend = friendId => {
    const friend = {}; 
    if (this.state.name !== '') {
      friend.name = this.state.name;
    }
    if (this.state.age !== '') {
      friend.age = this.state.age;
    }
    if (this.state.email !== '') {
      friend.email = this.state.email;
    }
    axios
      .put(`http://localhost:5000/friends/${friendId}`, friend)
      .then(response => {
        this.setState({ showUpdateFriend: false, name: '', age: '', email: '' });
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.friends.map(friend => {
          return (
            <div className="friend-card">
            <div key={friend.id} className="friendId">
            <div className="friend friendName"> Name: {friend.name} </div>
            <div className="friend friendAge"> Age: {friend.age} </div>
            <div className="friend friendEmail"> Email: {friend.email} </div>
            <button onClick={() => this.deleteFriend(friend.id)}>Delete</button>
            <button onClick={this.showUpdateFriend}>Update</button>
            
            {this.state.showUpdateFriend ? (
              <div>
                <input type="text" name="name" onChange={this.handleTextChange} placeholder="What is your name?" />
                <input type="number" name="age" onChange={this.handleTextChange} placeholder="Your Age?" />
                <input type="text" name="email" onChange={this.handleTextChange} placeholder="Enter Email" />
                <button onClick={() => this.updateFriend(friend.id)}>
                Save Updates
                </button>
                </div>
            ) : null}    

            </div>
            </div>



)

//Form implemented here for input fields to type in new data via webpage
})}
  <div>
  <div><form>
    <label>
      <input  type="text" name="name" onChange={this.handleTextChange} placeholder="What is your name?" />
    </label>

      <input type="number" name="age" onChange={this.handleTextChange} placeholder="Your Age?" />
            
      <input type="text" name="email" onChange={this.handleTextChange} placeholder="Enter Email" />

{/* Implemented button here */}
    <button type="submit" value="Submit" onClick={this.saveData}> Submit </button>
  </form></div>
  </div>
  </div>
    );
  }
}

export default App;
