class AuthMediator {
    constructor() {
      this.components = {};
    }
  
    register(name, component) {
      this.components[name] = component;
    }
  
    notify(sender, event, data) {
      switch (event) {
        case 'signIn':
          this.components['SignIn'].onSubmitLogin(data);
          break;
        case 'signUp':
          this.components['SignUp'].onSubmitRegister(data);
          break;
        case 'changeStatus':
          this.components['Auth'].changeStatus(data);
          break;
        default:
          break;
      }
    }
  }
  
  export default AuthMediator;