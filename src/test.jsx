import { render } from "@testing-library/react";
import React, { Component } from "react";

class Test extends Component {
  constructor() {
    super();
    this.state = {
      a: 1,
    };

    console.log("constructor was called");
  }

  // first render(ONE TIME)
  componentDidMount() {
      console.log("CDM");
  }

  //excecution context ke hisab se ye vala chlega
  componentDidMount() {
      console.log("CDM-2");
  }
  
  
  // after every re-render
  componentDidUpdate() {
    console.log("CDU");
  }


  componentWillUnmount() {
      //database close that unmount
      console.log("CWU");
  }
  

  render() {
    console.log("Render was called");

    return (
      <div>
        <button
          onClick={() => {
            this.setState({ a: 2 });
          }}
        >
          Change State
        </button>
      </div>
    );
  }
}

export default Test;
