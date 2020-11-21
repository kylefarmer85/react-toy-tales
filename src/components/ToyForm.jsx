import React, { Component, createFactory } from 'react';

class ToyForm extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      image: '',
    }
  }

  onChange = (e) => {
    console.log(this.state.name,this.state.image)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    this.props.createToy(e, this.state.name, this.state.image)
    this.setState({
      name: '',
      image: ''
    })
  }

  render() {
    
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.onSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.onChange} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
