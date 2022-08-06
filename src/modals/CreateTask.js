import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateTask extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.props.toggle}>
                    create new task
                </Button>{' '}
                <Button color="secondary" onClick={this.props.toggle}>
                    cancel
                </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CreateTask;
