import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import AuthService from '../../../services/Auth';
import { useMutation } from '@apollo/react-hooks'

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
    clearInput() {
        this.setState(initialState);
    }
    closeModal() {
        this.clearInput();
        this.props.closeModal();
    }

    async submitRegister() {
        const { email, password, confirmPassword } = this.state;
        const {data, errors } = await this.props.registerUser({ variables: { email, password, confirmPassword } });
        if(errors){
            console.log(errors.length);
        }else{
            this.closeModal();
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { open, dimmer } = this.props;
        const { email, password, confirmPassword } = this.state;
        return (
            <Modal open={open} onClose={this.closeModal} dimmer={dimmer}>
                <Modal.Header>Register New Account</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field
                            control={Input}
                            label="Email"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={email}
                            error
                        />
                        <Form.Field
                            control={Input}
                            label="Password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={password}
                            error={errorPassword}
                        />
                        <Form.Field
                            control={Input}
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            value={confirmPassword}
                            error={errorConfirmPassword}
                        />

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary type='submit' onClick={this.submitRegister}>Submit</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const RegisterModalWrapper = (props) => {
    const [registerUser] = useMutation(AuthService.registerUser());
    return (
        <RegisterModal {...props} registerUser={registerUser} />
    )
}

export default RegisterModalWrapper;
