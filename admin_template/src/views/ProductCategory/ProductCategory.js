import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { CREATE_CATEGORY, CATEGORY_LIST, EDIT_CATEGORY } from '../../queries/ProductCategoryQueries';
import { Loading, Datatable } from '../Base';
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';


export default (props) => {
  const { loading, data } = useQuery(CATEGORY_LIST);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [currentCategId, setCurrentCategId] = useState(false);

  const [createCategory, { loading: createLoading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{
      query: CATEGORY_LIST
    }]
  });

  const [editCategory, {loading: editLoading }] = useMutation(EDIT_CATEGORY, {
    refetchQueries: [{
      query: CATEGORY_LIST
    }]
  })
  if (loading) {
    return <Loading />
  }

  const onCreateCategory = (input) => {
    createCategory({ variables: input });
    setOpenCreate(false);
  }

  const openCreateModal = () => {
    setOpenCreate(true);
  }

  const onCloseCreate = () => {
    setOpenCreate(false);
  }

  const onEditCategory= (input) => {
    editCategory({variables: {input}})
  }

  const onOpenEditModal = (e) => {
    setCurrentCategId(e.target.getAttribute('data-id'));
    setOpenEdit(true);
  }
  
  const onCloseEdit = () => {
    setOpenEdit(false);
  }

  const onDelete = (e) => {
  }

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      right: true,
    },
    {
      name: 'Options',
      sortable: false,
      allowOverflow: true,
      cell: row => {
        return (
          <React.Fragment>
            <Button className="btn-square" data-id={row._id} onClick={onOpenEditModal} color="primary" style={{ marginRight: 1 + '%' }}>Edit</Button>
            <Button className="btn-square" data-id={row._id} onClick={onDelete} color="danger">Delete</Button>
          </React.Fragment>
        )
      }
    },
  ];

  return (
    <div className="animated fadeIn">
      {openEdit && <ModalEdit isOpen={openEdit} closeModal={onCloseEdit} categId={currentCategId} onEdit={onEditCategory} loading={editLoading}/>}
      {openCreate && <ModalCreate isOpen={openCreate} closeModal={onCloseCreate} loading={createLoading} onCreate={onCreateCategory} />}
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Product Category
              </CardHeader>
            <CardBody>
              <Button className="btn-square" color="primary" onClick={openCreateModal}>Create</Button>
              <Datatable columns={columns} data={data.productCategoryPagination.items} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}