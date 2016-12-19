import './main.scss';
import router from "./router/router_instance.js";
export default class Main {
    constructor() {

    }

    init() {
        this.render();
        router.init();
    }

    render() {
        $("#content").html('Hello World').hide();
    }

    toString() {

    }
}
