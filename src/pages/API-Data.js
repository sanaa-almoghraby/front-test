import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Row,Col,Button} from 'react-bootstrap'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datadb: [],
    }
  }
  componentDidMount = async () => {
    let resdata = await axios.get(`${process.env.REACT_APP_SERVER}/dataapi`)
    this.setState({
      datadb: resdata.data,
    })
  }
  // http://localhost:3004/addtofav
  addtofav=async (index)=>{
    const newopj={
      email:this.props.auth0.user.email,
      name:this.state.datadb[index].name,
      img:this.state.datadb[index].img,
      level:this.state.datadb[index].level,

    }
    await axios.post(`${process.env.REACT_APP_SERVER}/addtofav`,newopj)
  }

  render() {
    return (
      <>
        <Row xs={1} md={4} className="g-4">
          {this.state.datadb.map((ele, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={ele.img} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    {ele.level}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>{this.addtofav(idx)}} >ADD to FAV</Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
