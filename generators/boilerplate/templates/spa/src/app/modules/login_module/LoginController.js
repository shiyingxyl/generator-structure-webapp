import LoginService from "./LoginService";
class LoginController {
    constructor() {
        this.loginService = new LoginService();
    }

    render() {
        var content = this.loginService.toString();
        $('#myContainer').html(content);
    }
}

module.exports = LoginController;

