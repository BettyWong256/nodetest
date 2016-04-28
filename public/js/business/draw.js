/**
 * Created by wangkun12 on 2016/4/15.
 */
define(function (require, exports) {

    var echarts = require('/js/plugins/echarts/echarts-all.js');
    var MyGraph = require('/js/business/graph.js');


    var elem = {};
    var graphID = 1; //图表id随机数
    var cavObj = $('.draw-cav');//画布
    var editObj = {};
    var editId = null;

//高度自适应
    function mainHeight() {
        var height = window.innerHeight;
        var showHeight = height - 180;
        $('.draw-main').css('min-height', showHeight + 'px');
    };

//表格可编辑
    function tableEdit(obj) {
        tableSave();
        var value = obj.text();
        var edit = '<textarea id="draw-test-edit" value="';
        edit += value;
        edit += '">';
        edit += value + '</textarea>';
        obj.html(edit);
        $('#draw-test-edit').focus();
    };
    function tableSave() {
        var $this = $('#draw-test-edit');
        var text = $this.val();
        $this.parent().html(text);
        $this.remove();
    };

//添加图表画布
    function addGraph() {
        cavObj.append('<div class="editable mb20" data-id="graph' + graphID + '" data-state="graph"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit-data">编辑数据</a><a href="javascript:;" class="mr5 draw-edit-set">参数设置</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><div style="width:740px;height: 300px;" class="new-graph" id="graph' + graphID + '"></div></div>');
        editId = $('.new-graph').eq($('.new-graph').size() - 1).attr('id');
        graphID++;
    };

//判断图表编辑框位置
    function fixedTop() {
        var scrollH = $(document).scrollTop();
        var fixTop = 80 - scrollH;

        if (fixTop <= 0) {
            fixTop = 0;
            $('.draw-data').height($('.draw-main').height() - scrollH + 80);
            $('.draw-data-body').height($('.draw-main').height() - scrollH + 30);
        }
        $('.draw-data').css('top', fixTop);
    };
//编辑框高度
    function editHeight() {
        var heights = document.body.scrollHeight;
        $('.draw-data').height(heights - 180 + 'px');
        $('.draw-data-body').height(heights - 230 + 'px');
    };

//表格框清空
    function setEdit() {
        $('.draw-data-body').find('.table').find('th').each(function () {
            $(this).text('');
        });
        $('.draw-data-body').find('.table').find('td').each(function () {
            $(this).text('');
        });
    }

//保存-获取页面元素
    function getDivArr() {
        var arr = [];
        $('.draw-cav').find('.editable').each(
            function () {
                var id = $(this).attr('data-id');
                var state = $(this).attr('data-state');
                var divObj = {};
                divObj.id = id;
                divObj.state = state;
                if (state == 'h3') {
                    divObj.text = $(this).find('h3').text();
                }
                else if (state == 'p') {
                    divObj.text = $(this).find('p').text();
                }
                else {
                    divObj.text = null;
                }
                arr.push(divObj);
            }
        );
        return arr;
    }

//保存-提交数据
    function postData() {
        var id = $('.fileId').val();
        var user = $('.draw-user-name').text();
        var name = $('#file_name').val();
        var oDate = new Date();
        var arr = getDivArr();
        var data = {
            "fileId": id,
            "userName": user,
            "fileName": name,
            "fileTime": oDate,
            "graphData": dataPool,
            "divData": arr
        };
        if (name == '') {
            $('.nameErr').show();
            return false;
        }
        $.ajax({
            url: '/draw',
            type: 'post',
            data: data,
            success: function (data, status) {
                if (status == 'success') {
                    $('#mySaveInfo').find('.modal-body').html('保存成功');
                    $('#mySaveInfo').modal();
                    $('.fileId').val(data.id);
                } else {
                    $('#mySaveInfo').find('.modal-body').html('保存失败，请重试……');
                    $('#mySaveInfo').modal();
                }
            },
            error: function (data, status) {
                $('#mySaveInfo').find('.modal-body').html('系统错误，请重试……');
                $('#mySaveInfo').modal();
            }
        });
    };


//获取页面元素
    function getElem() {
        elem.editth = $('.table').find('th');
        elem.edittd = $('.table').find('td');    //数据编辑表格
        elem.change = $('.draw-change');         //运行
        elem.closeEdit = $('.draw-close');       //关闭
        elem.look = $('.draw-look');             //预览
        elem.save = $('.draw-save');             //保存
        elem.editData = $('.draw-edit-data');    //数据编辑
        elem.editSet = $('.draw-edit-set');      //设置参数
        elem.edit = $('.draw-edit');             //文本编辑
        elem.saveWord = $('.save-word');         //弹框保存文本
        elem.delete = $('.draw-edit-delete');    //删除
        elem.addH = $('.add-h');
        elem.addP = $('.add-p');
        elem.addC = $('.add-c');
        //添加图表
        elem.line = $('.draw-add-line');
        elem.lines = $('.draw-add-lines');
        elem.bar = $('.draw-add-bar');
        elem.pie = $('.draw-add-pie');
        elem.graph = $('.draw-add-graph');


    };
//绑定事件
    function bindEvent() {
        $('#myInfoTrue').on("click", postData);
        //保存
        elem.save.click(function () {
            $('.nameErr').hide();
            if ($('.fileId').val() == '') {
                $('#file_name').val('');
                $('#myInfo').modal();
            }else{
                postData();
            }
        })

        //运行
        elem.change.click(function () {
            tableSave();
            MyGraph.postJson(editId);
        });
        //关闭
        elem.closeEdit.click(function () {
            $('.active').removeClass('active');
            $('.draw-cav').removeClass('cavMove');
            $('.draw-data').hide();
        });
        //可编辑表格
        elem.editth.bind('click', function () {
            var obj = $(this);
            tableEdit(obj);
        });
        elem.edittd.bind('click', function () {
            var obj = $(this);
            tableEdit(obj);
        });
        //添加标题
        elem.addH.bind('click', function () {
            var h = '<div class="editable mb20" data-id="graph' + graphID + '" data-state="h3"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit"  data-toggle="modal" data-target="#myModal">编辑</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><h3 class="new-word" id="graph';
            h += graphID;
            h += '">请输入标题</h3></div>';
            cavObj.append(h);
            graphID++;
        });
        //添加段落
        elem.addP.bind('click', function () {
            var h = '<div class="editable mb20"  data-id="graph' + graphID + '" data-state="p"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit"  data-toggle="modal" data-target="#myModal">编辑</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><p class="new-word" id="graph';
            h += graphID;
            h += '">请输入文本</p></div>';
            cavObj.append(h);
            graphID++;
        });
        //保存文案
        elem.saveWord.bind('click', function () {
            var value = $('.new-text').val();
            editObj.text(value);

        });
        //添加图表
        elem.line.click(function () {
            // $('.draw-data').hide();
            // $('.draw-cav').removeClass('cavMove');
            addGraph();
            MyGraph.init('1', editId);
        });
        elem.lines.click(function () {
            //
            // $('.draw-data').hide();
            // $('.draw-cav').removeClass('cavMove');
            addGraph();
            MyGraph.init('2', editId);
        });
        elem.bar.click(function () {

            // $('.draw-data').hide();
            // $('.draw-cav').removeClass('cavMove');
            addGraph();
            MyGraph.init('3', editId);
        });
        elem.pie.click(function () {

            // $('.draw-data').hide();
            // $('.draw-cav').removeClass('cavMove');
            addGraph();
            MyGraph.init('4', editId);
        });
        elem.graph.click(function () {

            // $('.draw-data').hide();
            // $('.draw-cav').removeClass('cavMove');
            addGraph();
            MyGraph.init('5', editId);
        })


    };

//初始化页面
    function pageLoad() {
        mainHeight();
        editHeight();
    };


    $(function () {
        //获取页面元素
        getElem();
        //绑定事件
        bindEvent();
        //初始化
        pageLoad();
        //编辑提示
        newT();
    });


//当浏览器窗口大小改变时
    window.onresize = function () {
        mainHeight();
        editHeight();
    };
//当浏览器滑动时
    window.onscroll = function () {
        tableSave();
        fixedTop();
    };
//当绘图页面滚动时
    $('.draw-data-body').scroll(function () {
        tableSave();
    });

//生成元素触发事件
    function newT() {
        //操作条显示
        $(document).on("mousemove", ".editable", function () {
            $(this).css('background', 'rgba(36,36,36,0.2)');
            $(this).find('.draw-edit-tab').show();
        });
        $(document).on("mouseout", ".editable", function () {
            $(this).css('background', 'none');
            $(this).parent().find('.draw-edit-tab').hide();
        });

        //编辑数据
        $(document).on("click", '.draw-edit-data', function () {
            editHeight();
            setEdit();
            editId = $(this).parents('.editable').find('.new-graph').attr('id');
            $('.active').removeClass('active').removeClass('in');
            $('.draw-cav').addClass('cavMove');
            fixedTop();
            $('.draw-data').show();
            $('.myData').addClass('active').addClass('in');
            $('#myData').addClass('active').addClass('in');
            MyGraph.getJson(editId);
        });
        //参数设置
        $(document).on("click", '.draw-edit-set', function () {
            editHeight();
            setEdit();
            editId = $(this).parents('.editable').find('.new-graph').attr('id');


            $('.active').removeClass('active').removeClass('in');
            $('.draw-cav').addClass('cavMove');
            fixedTop();
            $('.draw-data').show();
            $('.mySet').addClass('active').addClass('in');
            $('#mySet').addClass('active').addClass('in');
            MyGraph.getJson(editId);

        });
        //删除
        $(document).on("click", ".draw-edit-delete", function () {
            editId = $(this).parents('.editable').find('.new-graph').attr('id');
            for (var i = 0; i < dataPool.length; i++) {
                if (dataPool[i].id == editId) {
                    dataPool.splice(i, 1);
                }
            }
            ;
            $(this).parents('.editable').remove();
            $('.draw-data').hide();
            $('.draw-cav').removeClass('cavMove');
        });
        //编辑文本
        $(document).on("click", ".draw-edit", function () {
            editObj = $(this).parents('.editable').find('.new-word');
            $('.new-text').val(editObj.text());
        });
    }


});