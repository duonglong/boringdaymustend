import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import gql from 'graphql-tag';
import { Loading, Datatable } from '../Base';

const CATEGORY_LIST = gql`
query productCategoryPagination($page: Int, $perPage: Int){
  productCategoryPagination(
    page: $page
    perPage: $perPage
   ){
     count,
     pageInfo {
        currentPage,
        perPage,
        pageCount,
        itemCount,
        hasNextPage,
        hasPreviousPage
     },
     items {
       _id,
       name,
       description,
       priority    
     }
   }
}
`

export default (props) => {
  const { loading, data } = useQuery(CATEGORY_LIST);
  if (loading) {
    return <Loading />
  }
  const onEdit = (e) => {
    console.log(e.target.getAttribute('data-id'));
  }
  const onDelete = (e) => {
    console.log(e.target.getAttribute('data-id'));
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
            <Button className="btn-square" data-id={row._id} onClick={onEdit} color="primary" style={{ marginRight: 1 + '%' }}>Edit</Button>
            <Button className="btn-square" data-id={row._id} onClick={onDelete} color="danger">Delete</Button>
          </React.Fragment>
        )
      }
    },
  ];
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Product Category
              </CardHeader>
            <CardBody>
              <Datatable columns={columns} data={data.productCategoryPagination.items}/>              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}