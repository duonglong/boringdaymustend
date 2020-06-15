import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';


export default props => {

    const [input, setInput] = useState({})

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        const newInput = {...input, [name]: value}
        setInput(newInput);
    }

    return (
        <Modal isOpen={props.isOpen} toggle={props.closeModal} size="lg" backdrop="static">
            <ModalHeader>
                <span>{"Add Product Category"}</span>
            </ModalHeader>
            <ModalBody>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <Form className="form-horizontal">
                                        <FormGroup>
                                            <Label htmlFor="name">Name</Label>
                                            <div className="controls">
                                                <InputGroup className="input-prepend">
                                                    <Input onChange={handleOnchange} id="name" size="16" type="text" name="name" />
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="priority">Priority</Label>
                                            <div className="controls">
                                                <InputGroup>
                                                    <Input onChange={handleOnchange} id="priority" size="16" type="number" name="priority" />
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="description">Description</Label>
                                            <div className="controls">
                                                <InputGroup>
                                                    <Input onChange={handleOnchange} id="description" size="16" type="textarea" name="description" />
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button type="button" className="pull-right invite-button"  onClick={props.closeModal} color="danger">Close</Button>
                <Button type="submit" className="pull-right invite-button" onClick={()=>props.onCreate(input)} color="primary">{props.loading ? "Saving" : "Save"}</Button>
            </ModalFooter>
        </Modal>
    )
}