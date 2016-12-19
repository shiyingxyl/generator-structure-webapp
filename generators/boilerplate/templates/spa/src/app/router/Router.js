export default class Router {
    constructor(opt={}) {
        this.root = opt.root ? opt.root : "";
        this.routes = {}; //路由表
        this.currentUrl = "";
        this.h5Flg = false;
        if(window.history.pushState) {
            this.h5Flg = true;
        }
    }

    //route 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新
    //path like /home
    route(path, callback) {
        //给不同的hash设置不同的回调函数
        this.routes[path] = callback || function(){};
    }

    initLocation() {
        var self = this;
        $(document).on('click', 'a', function(evt) {
            evt.preventDefault();
            let $a = $(this);
            let href = $a.attr('href');
            let title = $a.attr('title');

            document.title = title;
            window.history.pushState(
                { title: title },
                title,
                window.location.origin + self.root + href
            );

            self.routes[href.replace("#", "/")]();

            return false;
        });
    }

    navigate(url, title) {
        if(this.h5Flg) {
            window.history.pushState(
                { title: title },
                title,
                window.location.origin + this.root  + Router.HASH_SEP + url.slice(1)
            );
            this.routes[url]();
            return;
        }

        window.location.href = window.location.origin + this.root + Router.HASH_SEP + url.slice(1);
        this.routes[url]();
    }

    //refresh 执行当前url对应的回调函数，更新页面
    refresh() {
        if(this.h5Flg) {
            this.currentUrl = Router.H5_SEP + window.location.hash.slice(1);
            this.routes[this.currentUrl]();
            return;
        }
        console.log(location.hash.slice(1));//获取到相应的hash值
        this.currentUrl = Router.H5_SEP + location.hash.slice(1) || '/';//如果存在hash值则获取到，否则设置hash值为/
        // console.log(this.currentUrl);
        this.routes[this.currentUrl]();//根据当前的hash值来调用相对应的回调函数
    }

    popstate() {
        this.currentUrl =location.hash.replace("#", "/");
        this.routes[this.currentUrl]();
    }

    //init 监听浏览器url hash更新事件
    init() {
        var self = this;
        if(this.h5Flg) {
            self.initLocation();
            window.addEventListener("popstate", function() {
                self.popstate();
            });
        } else {
            window.addEventListener('hashchange', this.refresh.bind(this), false);
        }

        this.refresh();
    }
}

Router.HASH_SEP = "#";
Router.H5_SEP = "/";
