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
import { useQuery } from '@apollo/react-hooks';
import { Loading } from '../../Base';
import { GET_CATEGORY_BY_ID } from '../../../queries/ProductCategoryQueries';


export default props => {
    const { loading, data } = useQuery(GET_CATEGORY_BY_ID, { variables: { id: props.categId } });     
    const category = data ? data.productCategoryById: {};
    const [input, setInput] = useState({id: props.categId});

    const handleOnchange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        const newInput = {...input, [name]: value}
        console.log(newInput);
        setInput(newInput);        
    };
    if (loading) {
        return (
            <Modal isOpen={props.isOpen} toggle={props.closeModal} size="lg" backdrop="static">
                <ModalHeader>
                    <span>{"Add Product Category"}</span>
                </ModalHeader>
                <ModalBody>
                    <Loading />
                </ModalBody>
            </Modal>
        )
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
                                                    <Input id="name" size="16" type="text" name="name" onChange={handleOnchange} value={input.name || category.name} />
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="priority">Priority</Label>
                                            <div className="controls">
                                                <InputGroup>
                                                    <Input id="priority" size="16" type="number" name="priority" onChange={handleOnchange} value={input.priority || category.priority} />
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="description">Description</Label>
                                            <div className="controls">
                                                <InputGroup>
                                                    <Input id="description" size="16" type="textarea" name="description" onChange={handleOnchange} value={input.description || category.description} />
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
                <Button type="button" className="pull-right invite-button" onClick={props.closeModal} color="danger">Close</Button>
                <Button type="submit" className="pull-right invite-button" onClick={() => props.onEdit(input)} color="primary">Save</Button>
            </ModalFooter>
        </Modal>
    )
}