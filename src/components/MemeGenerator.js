import React, { Component } from 'react';

// MemeGenerator will be calling to an API and holding on to data

class MemeGenerator extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allMemeImgs: []
  }


  // Make an API call to "https://api.imgflip.com/get_memes" and save the data that comes back (`response.data.memes`) to a new state property
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
      const {memes} = response.data
      this.setState({allMemeImgs: memes})
    });
  }


  // Update the corresponding state on every change of the input box.
  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }


  handleSubmit =event => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }


  render() {
    // Create a controlled form, so make sure to add all attributes you'll need
    return(
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>

        {/* Display meme */}
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>

      </div>
    );
  }
}

export default MemeGenerator;
