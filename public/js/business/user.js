var elem = {};

function userMainH() {
    var height = window.innerHeight;
    $('.user-main').css('min-height', height - 180 + 'px');
};

function getElem() {
    elem.look = $('.look');
    elem.edit = $('.edit');
    elem.delete = $('.delete');
};

function bindEvent() {
    elem.look.click(function () {
        var clicked = $(this);
        var fileId = clicked.parents('li').find('.fileId').val();
        window.open("show?fileId="+fileId);
    });
    elem.edit.click(function () {
        var clicked = $(this);
        var fileId = clicked.parents('li').find('.fileId').val();
        window.open("edit?fileId="+fileId);
    });
    elem.delete.click(function () {
        var clicked = $(this);
        var fileId = clicked.parents('li').find('.fileId').val();
        $('.delId').val(fileId);
    });
    $('.delOk').click(function () {
        var data = {};
        data.id = $('.delId').val();
        data.type = 2;
        $.ajax({
            url: '/personal',
            type: 'post',
            data: data,
            success: function (data, status) {
                location.href = 'personal';
            },
            error: function (data, status) {
                location.href = 'personal';
            }
        })
    });

};

function pageLoad() {
};


$(function () {
    //获取页面元素
    getElem();
    //绑定事件
    bindEvent();
    //初始化
    pageLoad();
    userMainH();
})

window.onresize = function () {
    userMainH();
}