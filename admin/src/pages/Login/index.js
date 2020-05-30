import React, { useState } from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import RegisterModal from './RegisterModal';
import { useMutation } from '@apollo/react-hooks'
import AuthService from '../../services/Auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',            
            isOpenRegisterModal: false,
        };
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.closeRegisterModal = this.closeRegisterModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userLogin = this.userLogin.bind(this);   
    }
    showError(errors){
        toast(
            {
                title: errors.message,
                type:"error",
                list: Object.values(errors.extensions.errors),
                time: 3500,
            }
        );
    }
    async userLogin(){
        const { email, password } = this.state;
        const { data, errors } = await this.props.userLogin({variables: {email, password}});
        if(errors){
            this.showError(errors[0])
        }
        if(data.userLogin){
            localStorage.setItem("accessToken", data.userLogin.accessToken);
        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    openRegisterModal() {
        this.setState({ isOpenRegisterModal: true });
    }
    closeRegisterModal() {
        this.setState({ isOpenRegisterModal: false });
    }
    render() {
        const { isOpenRegisterModal } = this.state;
        const { loading } = this.props;
        return (
            <React.Fragment>
                <SemanticToastContainer position={"top-left"} />
                <Grid textAlign='center' style={{ height: '100vh', background: '#228884' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large' loading={ loading }>
                            <Segment stacked>
                                <Form.Input
                                    name='email'
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    name="password"
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                     />
                                <Button color='teal' fluid size='large' onClick={this.userLogin}> Login </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to="#" onClick={this.openRegisterModal}>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                    <RegisterModal open={isOpenRegisterModal} closeModal={this.closeRegisterModal} />
                </Grid>
            </React.Fragment>
        )
    }
}

function LoginWrapper(props) {
    const [userLogin, { loading }] =  useMutation(AuthService.userLogin());
    return (
        <Login {...props} userLogin={userLogin} loading={loading} />
    )
}
export default LoginWrapper;