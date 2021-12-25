import React, { Component } from "react";

class Table extends Component {
  state = {
    allMovies: [],
    currPage: 1,
  };

  componentDidMount() {
    //api call(msg bhejna=> get)
    fetch("http://localhost:4000/movies")
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        this.setState({ allMovies: json });
        this.props.sendData(json.length);
      });
  }

  render() {
    let moviesToDisplay = [];

    if (this.props.currGenre != "All Genre") {
      moviesToDisplay = this.state.allMovies.filter((el) => {
        return el.genre.name == this.props.currGenre;
      });
    } else {
      moviesToDisplay = this.state.allMovies;
    }

    

    if (this.props.sendString) {
      let strToCompare = this.props.sendString.toLowerCase();


      moviesToDisplay = moviesToDisplay.filter((el) => {
        return el.title.toLowerCase().includes(strToCompare);
      });
    }

    let numberOfPages = Math.ceil(moviesToDisplay.length / 5); // pagination ke liye ek bar me 5 he movie hongi
    let arr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arr.push(i);
    }

    let starting = (this.state.currPage - 1) * 5;
    let ending = this.state.currPage * 5 - 1;

    moviesToDisplay = moviesToDisplay.slice(
      starting,
      Math.min(ending, moviesToDisplay.length - 1) + 1
    ); // ek bar me sirf 5 dikhani hai

    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genere</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {moviesToDisplay.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.title}</td>
                  <td>{ele.genre.name}</td>
                  <td>{ele.numberInStock}</td>
                  <td>{ele.dailyRentalRate}</td>
                  <td
                    onClick={() => {
                      let allMovies = this.state.allMovies;

                      let index = allMovies.findIndex((e) => e._id == ele._id);

                      allMovies[index].liked == true
                        ? (allMovies[index].liked = true)
                        : (allMovies[index].liked = false);

                      this.setState({ allMovies: allMovies });
                    }}
                  >
                    {ele.liked ? "Liked!" : "Like"}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger mb-4"
                      onClick={() => {
                        let allMovies = this.state.allMovies;

                        allMovies = allMovies.filter((el) => {
                          return el._id != ele._id;
                        });

                        this.props.sendData(allMovies.length);

                        this.setState({ allMovies: allMovies });
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li
              class="page-item"
              onClick={() => {
                let page = this.state.currPage;
                page--;
                if (page < 1) page = 1;
                this.setState({ currPage: page });
              }}
            >
              <a class="page-link" href="#">
                Previous
              </a>
            </li>

            {arr.map((ele) => {
              return (
                <li
                  class="page-item"
                  onClick={() => {
                    this.setState({ currPage: ele });
                  }}
                >
                  <a class="page-link" href="#">
                    {ele}
                  </a>
                </li>
              );
            })}
            <li
              class="page-item"
              onClick={() => {
                let page = this.state.currPage;
                page++;
                if (page > numberOfPages) page = numberOfPages;
                this.setState({ currPage: page });
              }}
            >
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Table;
