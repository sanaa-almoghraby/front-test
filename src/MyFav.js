import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

class MyFav extends React.Component {
  render() {
    return(
      <Jumbotron>
        <h1>My Favorite</h1>
        <p>
          This is a collection of my favorites
        </p>
      </Jumbotron>
    )
  }
}

export default MyFav;
