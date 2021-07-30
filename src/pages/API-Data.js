import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

class MyFavoriteBooks extends React.Component {
  render() {
    return(
      <Jumbotron>
        <h1>All Data from the API</h1>
        <p>
          Select tour favorites :)
        </p>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
