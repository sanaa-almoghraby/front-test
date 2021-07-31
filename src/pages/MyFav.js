import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class MyFav extends React.Component {
  constructor(props){
    super(props);
    this.state={
      url:process.env.REACT_APP_SERVER,
      dataList:[],
      showData:false,
    }

  }

componentDidMount=async()=>{
  const {user} = this.props.auth0
  axios.get(`${this.state.url}/fav?email=${user.email}`).then(result=>{
    this.setState({
      dataList:result.data,
      showData:true,
    })
    console.log(result);
  })
}

deleteData=async(index)=>{
  const {user} = this.props.auth0

axios.delete(`${this.state.url}/fav/${index}?email=${user.email}`).then(result=>{
  this.setState({
    dataList:result.data,
    showData:true,
  })
  console.log(result);
})
}

  render() {
    return(
      <>
      {this.props.auth0.isAuthenticated &&
      this.state.showData && this.state.dataList.map((item,index)=>{
        return(
          <>
          <h2>{item.name}</h2>
          <h2>{item.level}</h2>
          <img src={item.img} alt='img'/>
          <button onClick={()=>{this.deleteData(index)}} >Delete</button>
          </>
        )
      })}
            </>
    )
  }
}

export default withAuth0(MyFav);
