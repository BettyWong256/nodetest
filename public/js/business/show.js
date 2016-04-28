define(function (require, exports) {
    var echarts = require('/js/plugins/echarts/echarts-all.js');
    var MyGraph = require('/js/business/graph.js');


    var elem = {};
    var data = {};
    //初始化页面style
    var dSty = 0;
    var ySty = 0;


    //获取页面元素
    function getElem() {
        elem.doc = $('#showData').val();
        elem.paper = $('.showContent');
        elem.normal = $('.normal');
        elem.dark = $('.dark');
        elem.yellow = $('.yellow');
    };

    //字符串转json
    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    };
    //设置页面样式
    function setStyle() {
        if (dSty > 0) {
            elem.dark.click();
        } else if (ySty > 0) {
            elem.yellow.click();
        } else {
            elem.normal.click();
        }
    };
    //设置页面布局
    function setDiv() {
        var div = data.div_data;
        var html = '';
        for (var i = 0; i < div.length; i++) {
            if (div[i].state == 'h3') {
                html += '<div class="editable mb30"><h3 class="new-word" id="';
                html += div[i].id + '">' + div[i].text + '</h3></div>';
            } else if (div[i].state == 'p') {
                html += '<div class="editable mb30"><p class="new-word" id="';
                html += div[i].id + '">' + div[i].text + '</p></div>';
            } else {
                html += '<div class="editable mb30">';
                html += '<div style="height: 500px;" class="new-graph" id="';
                html += div[i].id + '"></div></div>'
            }
        }
        elem.paper.append(html);
    };
    //图表绘制
    function setCav() {
        var cav = data.graph_data;
        console.log(cav);
        for (var j = 0; j < cav.length; j++) {
            //绘图
            MyGraph.init(cav[j].state, cav[j].id, cav[j].data);
            //判断风格
            if (cav[j].data.theme == 'dark') {
                dSty += 1;
            }
            if (cav[j].data.theme == 'helianthus') {
                ySty += 1;
            }
        }
    };


    //绑定事件
    function bindEvent() {
        elem.normal.click(function () {
            $('.showContent').css('background', '#fff');
            $('p').css('color', '#000');
            $('h3').css('color', '#000');
        });
        elem.dark.click(function () {
            $('.showContent').css('background', 'rgb(27, 27, 27)');
            $('p').css('color', '#fff');
            $('h3').css('color', '#fff');
        });
        elem.yellow.click(function () {
            $('.showContent').css('background', 'rgb(242, 242, 230)');
            $('p').css('color', '#000');
            $('h3').css('color', '#000');
        })
    };

    //初始化
    function pageLoad() {
        //数据格式化
        data = strToJson(elem.doc);
        //设置页面布局
        setDiv();
        //图表绘制
        setCav();
        //页面风格初始化
        setStyle();
    };


    $(function () {
        //获取页面元素
        getElem();
        //绑定事件
        bindEvent();
        //初始化
        pageLoad();
    });

    window.onresize = function () {
        setCav();
    }
});