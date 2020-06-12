import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
  } from 'reactstrap';


export default (props) => {
    return (
        <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="fa fa-edit"></i>Form Elements
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    <Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Form className="form-horizontal">
                      <FormGroup>
                        <Label htmlFor="prependedInput">Prepended text</Label>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input id="prependedInput" size="16" type="text" />
                          </InputGroup>
                          <p className="help-block">Here's some help text</p>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="appendedInput">Appended text</Label>
                        <div className="controls">
                          <InputGroup>
                            <Input id="appendedInput" size="16" type="text" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>.00</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <span className="help-block">Here's more help text</span>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="appendedPrependedInput">Append and prepend</Label>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <Input id="appendedPrependedInput" size="16" type="text" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>.00</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="appendedInputButton">Append with button</Label>
                        <div className="controls">
                          <InputGroup>
                            <Input id="appendedInputButton" size="16" type="text" />
                            <InputGroupAddon addonType="append">
                              <Button color="secondary">Go!</Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="appendedInputButtons">Two-button append</Label>
                        <div className="controls">
                          <InputGroup>
                            <Input id="appendedInputButtons" size="16" type="text" />
                            <InputGroupAddon addonType="append">
                              <Button color="secondary">Search</Button>
                              <Button color="secondary">Options</Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                      </FormGroup>
                      <div className="form-actions">
                        <Button type="submit" color="primary">Save changes</Button>
                        <Button color="secondary">Cancel</Button>
                      </div>
                    </Form>
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>
        </Row>
        </div>
    )
}