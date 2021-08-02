import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap';
// import UpdateFormModel from './UpdateFormModel';
// import MyFavCard from './MyFavCard';
import Updatemodel from './Updatemodel'

class MyFav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cartonData: [],
      email: '',
      name: '',
      img: '',
      level: '',
      index: 0,
      showmodel: false
    }
  }
  componentDidMount = async () => {
    const { email } = this.props.auth0.user
    console.log(email);
    // http://localhost:3004/alldata?email=
    let resdata = await axios.get(`${process.env.REACT_APP_SERVER}/alldata?email=${email}`)
    await this.setState({
      cartonData: resdata.data
    })
    console.log(this.state.cartonData);
  }
  handelshow = (index) => {
    this.setState({
      showmodel: true,
      index: index,
      name: this.state.cartonData[index].name,
      img: this.state.cartonData[index].img,
      level: this.state.cartonData[index].level,
    })
  }
  handleClose = () => {
    this.setState({
      showmodel: false
    })
  }
  updatedata = async (e) => {
    e.preventDefault()
    let updatedopj = {
      email: this.props.auth0.user.email,
      name: e.target.name.value,
      img: e.target.img.value,
      level: e.target.level.value
    }
    console.log(updatedopj);
    // http://localhost:3004/update/index
    let resupdate = await axios.put(`${process.env.REACT_APP_SERVER}/update/${this.state.index}`, updatedopj)
    await this.setState({
      cartonData: resupdate.data
    })

  }
  deletedcard = async (index) => {
    // const { email } = this.props.auth0.user

    let paramsopj = {
      email: this.props.auth0.user.email,
    }
    // http://localhost:3004/delete/index
    let resdelet = await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${index}`,{params: paramsopj})
   await this.setState({
      cartonData: resdelet.data,
      index:index
    })

  }

  render() {
    return (
      <div>
        {
          this.state.cartonData.map((ele, index) => {
            return (
              <Card style={{ width: '18rem' ,display:'inline-block'}}>
                <Card.Img variant="top" src={ele.img} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    {ele.level}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.deletedcard(index)}>deledte</Button>
                  <Button variant="primary" onClick={() => this.handelshow(index)}>Update</Button>

                </Card.Body>
              </Card>
            )
          })
        }
        <Updatemodel cartonData={this.state.cartonData} index={this.state.index} showmodel={this.state.showmodel} handelshow={this.handelshow} handleClose={this.handleClose}
          name={this.state.name} img={this.state.img} level={this.state.level} updatedata={this.updatedata} />
      </div>
    )
  }
}

export default withAuth0(MyFav);
