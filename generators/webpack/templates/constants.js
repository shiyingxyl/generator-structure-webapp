/*
    常量
 */
var path = require('path');

var DIR_NAME = __dirname;


/*
    程序根目录
 */
exports.ROOT_DIR = DIR_NAME;
/*
    临时编译目录
 */
exports.BUILD_DIR = path.join(DIR_NAME,'target');

exports.ARTIFACT_ID = 'inspur-git';
