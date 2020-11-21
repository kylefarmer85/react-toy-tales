import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const URL = "http://localhost:3000/toys"

class App extends React.Component{
  
  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    this.setState(prevState => {
     return {
      display: !prevState.display
     }
    })
  }

  componentDidMount() {
    fetch(URL)
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys: toys
      })
    })
  }

  createToy = (e, name, image) => {
    e.preventDefault()
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(newToy => {
      this.setState(prevState => {
        return {
          toys: [...prevState.toys, newToy]
        }
      })
    })
  }
  

  addLike = (likes, id) => {
    fetch(URL+`/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1,
      })
    })
    .then(resp => resp.json())
    .then(likedToy => {
      const updatedToys = this.state.toys.map(toyObj => {
        if (toyObj.id === likedToy.id) {
          return {
            ...toyObj,
            likes: likedToy.likes
          }
        } else {
          return toyObj
        }
      })
      this.setState({
        toys: updatedToys
      })
    })
  }

  deleteToy = (id) => {
    fetch(URL+`/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(obj => console.log(obj))
    const updatedToys = this.state.toys.filter(toyObj => toyObj.id !== id)
    this.setState({
      toys: updatedToys
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} addLike={this.addLike} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
