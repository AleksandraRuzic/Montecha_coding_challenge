import './App.css';
import { Routes, Route } from "react-router-dom";
import  Home from "./Home";
import Books from "./Books";
import Book from "./Book";


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path = "" element = {<Home/>}/>
        <Route path = "/:title/:OLID" element = {<Book/>}/>
        <Route path = "/:title" element = {<Books/>}/>
      </Routes>
    </div>
  );
}

export default App;