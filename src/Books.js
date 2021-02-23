import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useLocation } from "react-router";
import { createBrowserHistory } from "history";
import PaginationList from 'react-pagination-list';

class BooksClass extends Component {
    constructor(props) {
        super(props);
        const { title } = this.props.params;
        this.state = {data : [],
                    bookTitle : title,
                    fetched : false,
                    activePage : 0};
    }

    componentDidMount() {
        axios.get(`http://openlibrary.org/search.json?title=${this.state.bookTitle.split(" ").join("+")}`).
        then((el) => {
            this.setState({ data: el.data.docs.map( (doc, i) => ({"id": i, "docum": doc}) ) });
            this.setState({ fetched: true });
        }).
        catch((error) => console.log(error));
    }

    handlePageClick(pageNumber) {
        this.setState({activePage: pageNumber.selected});
      }

    render() {
        if(0 === this.state.data.length && this.state.fetched) {
            return (
                <>
                    <h1>There are no books with that title!</h1>
                    <Link to={"/"}>Want to go search for a different one?</Link> 
                </>
            );
        }
        else if(this.state.fetched) {
            return (
                <>
                    <h1>These are the id of the books with a given name</h1>
                    <PaginationList 
                    data={this.state.data}
                    pageSize={10}
                    renderItem={(item, key) => (
                        <Link key = {key} to ={`/${this.state.bookTitle}/${item.docum.key.substring(7)}`}>
                        {item.docum.key.substring(7)}
                    </Link>
                    )} />
                
                    <Link to={"/"}>Want to go search for a different one?</Link> 
                   
                </>
            );
        }
        else {
            return (
                <>
                    <h1>Fetching data about {this.state.bookTitle}...</h1>
                </>
            );
        }
    }
}

export default function Books() {
    const location = useLocation();
    const history = createBrowserHistory({forceRefresh:true});
    const params = useParams();
    return(
        <BooksClass history = {history} location = {location} params = {params}/>
    );
};