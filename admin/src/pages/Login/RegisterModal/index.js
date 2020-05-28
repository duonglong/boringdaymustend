import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import AuthService from '../../../services/Auth';


const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
}

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }
    clearInput(){
        this.setState(initialState);
    }
    closeModal() {
        this.clearInput();
        this.props.closeModal();
    }
   
    submitRegister() {
        const { email, password, confirmPassword } = this.state;
        this.closeModal();
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    render() {
        const self = this;
        const { open, dimmer } = this.props;
        const { email, password, confirmPassword } = this.state;

        return (
            <Modal open={open} onClose={this.closeModal} dimmer={dimmer}>
                <Modal.Header>Register New Account</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <Input value={email} name="email" placeholder='Email' onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input value={password} name="password" placeholder='Password' type="password" onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm Password</label>
                            <Input value={confirmPassword} name="confirmPassword" placeholder='Confirm Password' type="password" onChange={this.handleChange} />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary type='submit' onClick={this.submitRegister}>Submit</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default RegisterModal
