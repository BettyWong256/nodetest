var elem = {};

function userMainH(){
    var height = window.innerHeight;
    $('.user-main').css('min-height',height-180+'px');
};

function getElem(){
    elem.look = $('.look');
    elem.delete = $('.delete');
};

function bindEvent(){
    elem.look.click(function(){
        var clicked = $(this);
        var fileId = clicked.parents('li').find('.fileId').val();
        alert(fileId);
    });
    elem.delete.click(function(){
        var clicked = $(this);
        var fileId = clicked.parents('li').find('.fileId').val();
        $('.delId').val(fileId);
    });

};

function pageLoad(){
};


$('.delOk').onclick = function(){
    alert($('.delId').val());
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