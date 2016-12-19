import AboutService from "./AboutService";
class AboutController {
    constructor() {
        this.aboutService = new AboutService();
    }

    render() {
        var content = this.aboutService.toString();
        $('#myContainer').html(content);
    }
}

module.exports = AboutController;
