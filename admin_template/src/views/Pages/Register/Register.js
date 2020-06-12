import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Notifications from 'react-notify-toast';


const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.clearInput = this.clearInput.bind(this);    
  }
  async submitRegister() {
    const { email, password, confirmPassword } = this.state;
    const { errors } = await this.props.registerUser({ variables: { email, password, confirmPassword } });
    if (errors) {
      const formErrors = errors[0].extensions.errors;
      this.setState({ errors: formErrors });
    } else {
      this.props.history.push('/login');
      this.props.location.state.notify.show(`Welcome to the party ${email}, this would be fun :) `, "success", 3500);
    }
  }
  clearInput() {
    this.setState(initialState);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Notifications />
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" invalid={errors.email ? true : false} name="email" onChange={this.handleChange} placeholder="Email" autoComplete="email" />
                      {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" invalid={errors.password ? true : false} name="password" onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                      {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" invalid={errors.confirmPassword ? true : false} name="confirmPassword" onChange={this.handleChange} placeholder="Repeat password" autoComplete="new-password" />
                      {errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
                    </InputGroup>
                    <Button color="success" onClick={this.submitRegister} block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const REGISER_USER_QUERY = gql`
mutation userRegister(
    $email: String!
    $password: String!
    $confirmPassword: String!
    ) {
    userRegister(input:{
        email:$email,
        password:$password,
        confirmPassword:$confirmPassword
    }) {
        email
    } 
}  
`;

const RegisterWrapper = (props) => {
  const [registerUser, { loading }] = useMutation(REGISER_USER_QUERY);
  return (
    <Register {...props} registerUser={registerUser} loading={loading} />
  )
}

export default RegisterWrapper;
