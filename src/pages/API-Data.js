import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.REACT_APP_SERVER,
      dataList: [],
      showData: false,
    }

  }

  componentDidMount = async () => {
    axios.get(`${this.state.url}/api`).then(result => {
      this.setState({
        dataList: result.data,
        showData: true,
      })
    })
  }

  creatFav = async (item) => {
    const reqbody = {
      email: this.props.auth0.user.email,
      name: item.name,
      img: item.img,
      level: item.level
    };
    axios.post(`${this.state.url}/fav`, reqbody)
  }

  render() {
    return (
      <>
        {this.state.showData && this.state.dataList.map((item, index) => {
          return (
            <>
              {/* <h2>{item.name}</h2>
    <h2>{item.level}</h2>
    <img src={item.img}/>
    <button onClick={()=>{this.creatFav(item)}} >add to fav</button> */}
              <Card style={{ width: "18rem", margin: "1.5rem", display: "inline-block", }}                >                 
               <Card.Img variant="top" src={item.img} alt="" />                  
               <Card.Body>                    
                 <Card.Title>{item.name}</Card.Title>                    
                 <Card.Text>{item.level}</Card.Text>                    
                 <Button onClick={()=>{this.creatFav(item)}}>Add To Fav</Button>                  
                 </Card.Body>                
                 </Card>
            </>
          )
        })}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
