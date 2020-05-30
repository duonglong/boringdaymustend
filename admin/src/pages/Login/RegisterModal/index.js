import React, { Component } from 'react';
import { Button, Modal, Form, Input, Label, TransitionablePortal } from 'semantic-ui-react';
import AuthService from '../../../services/Auth';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-semantic-toasts';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
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
        const { errors } = await this.props.registerUser({ variables: { email, password, confirmPassword } });
        if (errors) {
            const formErrors = errors[0].extensions.errors;
            this.setState({ errors: formErrors });
        } else {
            this.closeModal();
            toast(
                {
                    title: 'Register Succeed !',
                    type:"success",
                    description: <p>Welcome on board, pal :) </p>,
                    time: 5000,
                }
            );
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { open, loading } = this.props;
        const { email, password, confirmPassword, errors } = this.state;
        return (
            <TransitionablePortal
                transition={{ animation: 'browse right', duration: 500 }}
                onClose={this.closeModal}
                open={open}>
                <Modal size={"small"} open={open} onClose={this.closeModal} centered={false}>
                    <Modal.Header>Register New Account</Modal.Header>
                    <Modal.Content>
                        <Form className={loading ? "loading" : ""}>
                            <Form.Field
                                control={Input}
                                label="Email"
                                name="email"
                                placeholder="Email"
                                onChange={this.handleChange}
                                value={email}
                                error={errors.email ? true : false}
                            >
                                <input /> {errors.email && <Label pointing='left' color='red'>{errors.email}</Label>}
                            </Form.Field>

                            <Form.Field
                                control={Input}
                                label="Password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                type="password"
                                error={errors.password ? true : false}
                            >
                                <input />{errors.password && <Label pointing='left' color='red'>{errors.password}</Label>}
                            </Form.Field>

                            <Form.Field
                                control={Input}
                                label="Confirm Password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                                value={confirmPassword}
                                type="password"
                                error={errors.confirmPassword ? true : false}
                            >
                                <input /> {errors.confirmPassword && <Label pointing color='red'>{errors.confirmPassword}</Label>}
                            </Form.Field>


                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary type='submit' onClick={this.submitRegister}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        )
    }
}

const RegisterModalWrapper = (props) => {
    const [registerUser, { loading }] = useMutation(AuthService.registerUser());
    return (
        <RegisterModal {...props} registerUser={registerUser} loading={loading} />
    )
}

export default RegisterModalWrapper;
