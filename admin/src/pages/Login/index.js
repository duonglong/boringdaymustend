import React from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import RegisterModal from './RegisterModal';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenRegisterModal: false
        };
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.closeRegisterModal = this.closeRegisterModal.bind(this);
    }
    openRegisterModal() {
        this.setState({isOpenRegisterModal: true});
    }
    closeRegisterModal() {
        this.setState({isOpenRegisterModal: false});
    }
    render() {
        const { isOpenRegisterModal } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Button color='teal' fluid size='large'> Login </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="#" onClick={this.openRegisterModal}>Sign Up</Link>
                    </Message>
                </Grid.Column>
                <RegisterModal open={isOpenRegisterModal} closeModal={this.closeRegisterModal} dimmer="blurring"/>
            </Grid>
        )
    }
}
export default Login