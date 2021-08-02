import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';
// import MyApiCard from './MyApiCard';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromapi: [],
     
    }
  }
  componentDidMount = async () => {
    // https://digimon-api.vercel.app/api/digimon
    let resdata = await axios.get(`${process.env.REACT_APP_SERVER}/api/digimon`)
    await this.setState({
      dataFromapi: resdata.data
    })
    console.log(this.state.dataFromapi);
  }

  addtofavaret=async (ele)=>{
    // const { email } = this.props.auth0.user
    let datapjc={
      email:this.props.auth0.user.email,
      name:ele.name,
      img:ele.img,
      level:ele.level
    }
    console.log(datapjc);
    // http://localhost:3004/addtofav
  await axios.post(`${process.env.REACT_APP_SERVER}/addtofav`,datapjc)
  }


  render() {
    return (
      <>
{
        this.state.dataFromapi.map((ele, index) => {
          return (
            <Card style={{ width: '18rem' , display:'inline-block' }}>
              <Card.Img variant="top" src={ele.img} />
              <Card.Body>
                <Card.Title>{ele.name}</Card.Title>
                <Card.Text>
                  {ele.level}
                </Card.Text>
                <Button variant="primary" onClick={()=>{this.addtofavaret(ele)}}>Add to fav </Button>
              </Card.Body>
            </Card>
          )
        })
      }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
