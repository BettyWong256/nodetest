/**
 * Created by wangkun12 on 2016/4/11.
 */
var elem = {};


//板块1高度自适应
function changeDivHeight(){
    var width = window.innerWidth;
    var showHeight = width/1366*500;
    $('.home-top').css('height' , showHeight+'px');
};
//start位置
function changeBtnBottom(){
    var height = $('.home-top').height();
    var showBottom = (height - 450)/3*2;
    $('.btn-diy').css('bottom' , showBottom+'px');
};
//输入框回车
function send(e) {
    var ev= window.event||e;
//13是键盘上面固定的回车键
    if (ev.keyCode == 13) {
        sendChat();
        return false;
    }
}
//发送消息
function sendChat(){
    var oDate = new Date();
    var user = 'my_id ';
    var time = oDate.getFullYear() +'-'+ (oDate.getMonth()+1) +'-'+ oDate.getDate() +'&nbsp;'+ oDate.getHours() +':'+ oDate.getMinutes() +':'+ oDate.getSeconds();
    var value = $('#chat').val();
    if(!value){
        $("[data-toggle='chat']").popover('show');
        setTimeout(function(){$("[data-toggle='chat']").popover('destroy');},1000);
        return false;
    }

    //--------------提交成功-------------
    var myChat = '<div class="mb20 overhidden"><img src="../../images/pic.png" alt="照片太帅" class="w50 h50 fr">'
        + '<span class="fr mr20 tr"><span class="p5 chat-text bg-green cl-white iblock">'
        + value + '</span><p class="mt5 f12">'
        + user + time
        +'</p></span></div>'
    $('.home-chat').append(myChat);
    $('#chat').val("");
    $('.home-chat').scrollTop($('.home-chat')[0].scrollHeight);
    //----------------------------------
}

//获取页面元素
function getElem(){
    elem.login = $('.home-login');
    elem.sign = $('.home-sign');
    elem.start = $('.home-start');
    elem.submit = $('.home-submit');
};
//绑定事件
function bindEvent(){
    elem.login.bind('click',function(){
        window.location.href = '/login'
    });
    elem.sign.bind('click',function(){
        window.location.href = '/signIn'
    });
    elem.start.bind('click',function(){
        window.location.href = '/draw'
    })
    elem.submit.bind('click',function(){
        sendChat();
    })
};
//初始化页面
function pageLoad(){
    changeDivHeight();
    changeBtnBottom();
};


$(function(){
    //获取页面元素
    getElem();
    //绑定事件
    bindEvent();
    //初始化
    pageLoad();
});


//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize=function(){
    changeDivHeight();
    changeBtnBottom();
}