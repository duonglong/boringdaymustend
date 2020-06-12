import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Notifications, { notify } from 'react-notify-toast';

const initialState = {
  email: '',
  password: '',
  isOpenRegisterModal: false,
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.closeRegisterModal = this.closeRegisterModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }
  showError(errors) {

  }
  async userLogin() {
    const { email, password } = this.state;
    const { data, errors } = await this.props.userLogin({ variables: { email, password } });
    if (errors) {
      notify.show("Login failed ! Wrong credentials", "error", 3500);
    }
    if (data.userLogin) {
      localStorage.setItem("accessToken", data.userLogin.accessToken);
      localStorage.setItem("refreshToken", data.userLogin.refreshToken);
      this.props.history.push('/dashboard');
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
  clearInput() {
    this.setState(initialState);
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Notifications />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" onChange={this.handleChange} placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" onChange={this.handleChange} placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" onClick={this.userLogin} className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>“Yesterday is not ours to recover, but tomorrow is ours to win or lose.”
— Lyndon B. Johnson</p>
                      <Link to={{
                        pathname: "/register",
                        state: {
                          notify: notify
                        }
                        }}>
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const LOGIN_QUERY = gql`
mutation userLogin(
    $email: String!
    $password: String!
){
    userLogin(email:$email, password:$password){
        accessToken,
        refreshToken
    } 
}
`;

function LoginWrapper(props) {
  if(localStorage.getItem("accessToken")){
    props.history.push("/");
  }
  const [userLogin, { loading }] = useMutation(LOGIN_QUERY);
  return (
    <Login {...props} userLogin={userLogin} loading={loading} />
  )
}
export default LoginWrapper;