import HomeService from "./HomeService";
class HomeController {
    constructor() {
        this.homeService = new HomeService();
    }

    render() {
        var content = this.homeService.toString();
        $('#myContainer').html(content);
    }
}

module.exports = HomeController;
