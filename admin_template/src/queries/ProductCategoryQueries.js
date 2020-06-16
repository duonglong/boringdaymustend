import gql from 'graphql-tag';

const CREATE_CATEGORY = gql`
    mutation productCategoryCreateOne(
        $name: String!,
        $description: String,
        $priority: String!
    ){
        productCategoryCreateOne(record: {
            name: $name,
            description: $description,
            priority: $priority
        }) {
            recordId
        }
    }
`

const EDIT_CATEGORY = gql`
    mutation productCategoryUpdateById(        
        $id: MongoID!,
        $name: String,
        $priority: String,
        $description: String        
    ){
        productCategoryUpdateById(record: {
            _id: $id,
            name: $name,
            priority: $priority,
            description: $description
        }){
            recordId
        }
    }
`;

const GET_CATEGORY_BY_ID = gql`
    query productCategoryById(
        $id: MongoID!,
    ){
        productCategoryById(_id: $id){
            _id,            
            name,
            description,
            priority
        }
    }
`

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

export { 
    CREATE_CATEGORY,
    CATEGORY_LIST,
    EDIT_CATEGORY,
    GET_CATEGORY_BY_ID
}