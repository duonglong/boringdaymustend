import React from 'react';
import DataTable from 'react-data-table-component';
import { Input, Col, FormGroup, Row } from 'reactstrap'


// eslint-disable-next-line react/prop-types
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <Row>
            <Col xs="12">
                <FormGroup>
                    <Input id="search" type="text" placeholder="Search" value={filterText} onChange={onFilter} />
                </FormGroup>
            </Col>
        </Row>
    </>
);


const MyDatatable = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const { data } = props;
    const filteredItems = data.filter(item => item.name && item.name.includes(filterText));

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable            
            {...props}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />
    );
};

export default MyDatatable;