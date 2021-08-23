import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Row,Col,Button} from 'react-bootstrap'
import Updatemodel from './Updatemodel';


class MyFav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datadb: [],
      show:false,
      index:'',
      opjdata:{}
    }
  }
  componentDidMount = async () => {
    const email = this.props.auth0.user.email;
    let resdata = await axios.get(`${process.env.REACT_APP_SERVER}/getdatadb?email=${email}`)
    this.setState({
      datadb: resdata.data,
    })
  }
  // http://localhost:3004/delete/inx
  deletefun= async (index) => {
    const email = this.props.auth0.user.email;
    let resdata = await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${index}?email=${email}`)
    this.setState({
      datadb: resdata.data,
    })
  }
  handleClose= ()=>{
    this.setState({
      show:false
    })

  }

handleshow=async(index)=>{
  await this.setState({
    show:true,
    index:index,
    opjdata:{
      name:this.state.datadb[index].name,
      img:this.state.datadb[index].img,
      level:this.state.datadb[index].level,
    }
  })
}
updatefun=async(e)=>{
  e.preventDefault()
let newopj={
  email:this.props.auth0.user.email,
  name:e.target.name.value,
  img:e.target.img.value,
  level:e.target.level.value,

}
let resdata = await axios.put(`${process.env.REACT_APP_SERVER}/update/${this.state.index}`,newopj)
this.setState({
  datadb: resdata.data,
})
}

  render() {
    return (
      <div>
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
                  <Button variant="primary" onClick={()=>{this.deletefun(idx)}} >DELETE</Button>
                  <Button variant="primary" onClick={()=>{this.handleshow(idx)}} >update</Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Updatemodel  handleClose={this.handleClose} updatefun={this.updatefun} show={this.state.show} opjdata={this.state.opjdata} />
      </div>
    )
  }
}

export default withAuth0(MyFav);
