import React, { Component } from "react";
import axios from 'axios';
import { useLocation } from "react-router";
import { createBrowserHistory } from "history";
import { useParams, Link } from "react-router-dom";

class BookClass extends Component {
    constructor(props) {
        super(props);
        this.state = {bookInfo : "{}",
                    bookId : this.props.params.OLID,
                    fetched : false,
                    bookTitle : this.props.params.title};
    }

    componentDidMount() {
        axios.get(`https://openlibrary.org/api/books?bibkeys=${this.state.bookId}`).
        then((el) => {
            if(33 < el.data.length) {
                this.setState({ bookInfo : el.data.substring(33, el.data.length-2) });
            }
            this.setState({ fetched : true });
        } ).
        catch((error) => console.log(error));
    }

    back() {
        this.props.history.go(-1);
    }
    
    render() {
        
        const info = JSON.parse(this.state.bookInfo);
        if(undefined === info.bib_key && this.state.fetched) {
            return (
                <>
                    <h1>There is no info about this edition!</h1>
                    <Link to={`/${this.state.bookTitle}`}>Maybe go back and try another?</Link> 
                </>
            );
        }
        else if (this.state.fetched) {
            return (
                <>
                    <h1>I don't know what to say except that {this.state.bookTitle} is a great book!</h1>
                    <div>
                        <a href={info.preview_url}>Here is some info!</a>
                    </div>
                    <div>
                        <a href={info.info_url}>And here is more info!</a>
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <h1>Fetching data {this.state.bookId}...</h1>
                </>
            );            
        }
      }
}

export default function Book() {
    const location = useLocation();
    const history = createBrowserHistory({forceRefresh:true});
    const params = useParams();
    return(
        <BookClass history = {history} location = {location} params = {params}/>
    );
};