import React, { Component } from 'react';
import { Card,Button } from 'react-bootstrap';


export class MyFavCard extends Component {
    render() {
        return (
            <div>
                {this.props.showData && this.props.dataList.map((item, index) => {
          return (
            <>
             
              <Card style={{ width: "18rem", margin: "1.5rem", display: "inline-block", }}                >                 
               <Card.Img variant="top" src={item.img} alt="" />                  
               <Card.Body>                    
                 <Card.Title>{item.name}</Card.Title>                    
                 <Card.Text>{item.level}</Card.Text>                    
                 <Button onClick={()=>{this.props.handleShow(index)}}>Update</Button>   
                 <br></br>               
                 <Button onClick={()=>{this.props.deleteData(index)}}>Delete</Button>                  
                 </Card.Body>                
                 </Card>
            </>
            
        )
        
      })}
            </div>
        )
    }
}

export default MyFavCard
