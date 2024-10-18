
class Authentication {

    isAuthentication() {
        const token = sessionStorage.getItem('token');
        return token;
    }
}

const authentication = new Authentication();
export { authentication };