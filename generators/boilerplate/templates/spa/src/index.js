//webpack-hot－middleware
//自动刷新hack
if (module.hot) {
  module.hot.accept();
}

if(process.env.NODE_ENV == "dev") {
    console.log("当前环境为dev");
}


import 'babel-polyfill';
// import Framework7 from 'framework7/js/framework7';
// import 'framework7/css/framework7.ios.css';
import 'bootstrap/css/bootstrap.css';
import 'bootstrap/js/npm.js';
import Main from './app/main';

$(function() {
    const main = new Main();
    main.init();
});
