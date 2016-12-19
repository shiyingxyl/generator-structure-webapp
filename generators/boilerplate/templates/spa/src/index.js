//webpack-hot－middleware
//自动刷新hack
if (module.hot) {
  module.hot.accept();
}

if(process.env.NODE_ENV == "dev") {
    console.log("当前环境为dev");
}

import 'babel-polyfill';
import $ from 'jquery';
import Main from './app/main';

$(function() {
    const main = new Main();
    main.render();
});
