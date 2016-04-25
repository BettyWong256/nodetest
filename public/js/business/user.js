var elem = {};

function userMainH(){
    var height = window.innerHeight;
    $('.user-main').css('min-height',height-180+'px');
};

function getElem(){
    
};

function bindEvent(){

};

function pageLoad(){
};




$(function(){
    //获取页面元素
    getElem();
    //绑定事件
    bindEvent();
    //初始化
    pageLoad();
    userMainH();
})

window.onresize = function(){
    userMainH();
}