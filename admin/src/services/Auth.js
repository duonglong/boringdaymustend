import gql from 'graphql-tag';


const AuthService = {
    registerUser: () => {
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
        return REGISER_USER_QUERY;
    },

    userLogin: () => {
        const LOGIN_QUERY = gql`
            mutation userLogin(
                $email: String!
                $password: String!
            ){
                userLogin(email:$email, password:$password){
                    accessToken
                } 
            }
        `;
        return LOGIN_QUERY
    }
}

export default AuthService;
