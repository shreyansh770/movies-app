import React, { Component } from "react";

class Category extends Component {
  state = {
    allGenre: ["Action", "Comedy", "Romance", "Thriller", "Horror"],
  };

  componentDidMount(){
    //api call(msg bhejna=> get)
    fetch("http://localhost:4000/genre").then(function(res){
      return res.json()
    }).then((json)=>{
      this.setState({allGenre:json})
    }).catch((err)=>{
      console.log(err);
    })
  }

  render() {
    return (
      <ul class="list-group">
        <li
          class="list-group-item"
          key="allgenre"
          onClick={() => {
            this.props.receiveCurrGenre("All Genre");
          }}
        >
          All Genres
        </li>

        {this.state.allGenre.map((el) => {
          return (
            <li
              class="list-group-item"
              key={el._id}
              onClick={() => {
                this.props.receiveCurrGenre(el.name);
              }}
            >
              {el.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Category;
