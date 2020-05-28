import gql from 'graphql-tag';


const AuthService = {
    registerUser: () => {
        const REGISER_USER_QUERY = gql`
        {
            userRegister(input:{
                email:$email,
                password:$password,
                confirmPassword:$confirmPassword
            }) {
                email
            }   
        }
        `;
         const [registerUser] = useMutation(REGISER_USER_QUERY);
        return registerUser;
    },
    
    userLogin: () => {
        const LOGIN_QUERY = gql`
        {
            userLogin(email:$email, password:$password){
                accessToken
            }
        }
        `;
        return LOGIN_QUERY
    }
}

export default AuthService;
