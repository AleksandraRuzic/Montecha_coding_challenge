import React, { Component } from "react";
import { useLocation } from "react-router";
import { createBrowserHistory } from "history";

class HomeClass extends Component {
    constructor(props) {
        super(props);
        this.state = { bookTitle : ""};
    }

    handleChange(e) {
      this.setState({bookTitle : e.target.value});
    }
    
    handleSubmit(e) {
      this.props.history.push(`/${this.state.bookTitle}`);
    }

    render() {
      return (
        <div className="App" >
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <label>
              Search for a book by name:
              <input type="text" onInput={this.handleChange.bind(this)}/>
            </label>
              <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
}

export default function Home() {
  const location = useLocation();
  const history = createBrowserHistory({forceRefresh:true});
  return(
    <HomeClass location = {location} history={history}/>
  );
};