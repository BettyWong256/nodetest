/**
 * Created by wangkun12 on 2016/4/29.
 */

var crypto = require('crypto');

exports.md5 = function(str){
    //return str;
    return crypto.createHash('md5').update(str).digest('hex');
}