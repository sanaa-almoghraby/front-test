import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'


export class Updatemodel extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updatefun}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.opjdata.name} name='name' />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>image</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.opjdata.img} name='img' />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>level</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.opjdata.level} name='level' />

                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Updatemodel
