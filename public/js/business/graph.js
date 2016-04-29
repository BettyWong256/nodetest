/**
 * Created by wangkun12 on 2016/4/19.
 */
define(function (require, exports) {
    var red = require('/js/plugins/echarts/theme/red.js');
    var blue = require('/js/plugins/echarts/theme/blue.js');
    var dark = require('/js/plugins/echarts/theme/dark.js');
    var helianthus = require('/js/plugins/echarts/theme/helianthus.js');
    var infographic = require('/js/plugins/echarts/theme/infographic.js');
    var roma = require('/js/plugins/echarts/theme/roma.js');
    var shine = require('/js/plugins/echarts/theme/shine.js');
    //主题文件匹配
    function matchTheme(str) {
        switch (str) {
            case 'red':
                return red;
                break;
            case 'blue':
                return blue;
                break;
            case 'dark':
                return dark;
                break;
            case 'helianthus':
                return helianthus;
                break;
            case 'infographic':
                return infographic;
                break;
            case 'roma':
                return roma;
                break;
            case 'shine':
                return shine;
                break;
            default:
                return null;
        }
    }

    //主题背景色设置
    function bgcolor(str) {
        $('.draw-cav').css('background', '#fff');
        $('.draw-cav').css('color', '#000');
        if (str == 'dark') {
            $('.draw-cav').css('background-color', 'rgb(27, 27, 27)');
            $('.draw-cav').css('color', '#fff');
        } else if (str == 'helianthus') {
            $('.draw-cav').css('background-color', 'rgb(242, 242, 230)');
        }
    }


    //绘制线形图
    function graphLine(state, id, param) {
        var data = {
            theme: 'default',
            text: '未来一周气温变化',
            size: "12",
            color: "#000000",
            subtext: '数据分析',
            toolShow: "true",
            legendShow: "true",
            legendOrient: 'horizontal',
            legendX: 'center',
            legendY: 'top',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: "false",
            legendData: ['最高气温', '最低气温'],
            xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            yData: [{
                name: '最高气温',
                arr: [11, 11, 15, 13, 12, 13, 10]
            }, {
                name: '最低气温',
                arr: [1, -2, 2, 5, 3, 2, 0]
            }]

        };
        if (param) {
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id), matchTheme(data.theme));
        var mySeries = [];
        for (var i = 0; i < data.yData.length; i++) {
            mySeries.push({
                name: data.yData[i].name,
                type: 'line',
                smooth: data.smooth == 'true' ? true : false,
                data: data.yData[i].arr
            });
        }
        ;
        var option = {
            title: {
                text: data.text,
                subtext: data.subtext,
                textStyle: {
                    fontSize: Number(data.size),
                    color: data.color,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: data.legendShow == 'true' ? true : false,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y: data.legendY
            },
            toolbox: {
                show: data.toolShow == 'true' ? true : false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        rotate: data.rotateX
                    },
                    data: data.xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: data.minY,
                    max: data.maxY
                }
            ],
            series: mySeries
        };
        myChartLine.setOption(option);
        if (!param) {
            dataPool.push({id: id, data: data, state: state});
        }

    };
    //绘制面积图
    function graphLines(state, id, param) {
        var data = {
            theme: 'default',
            text: '某楼盘销售情况',
            size: "12",
            color: "#000000",
            subtext: '数据分析',
            toolShow: "true",
            legendShow: "true",
            legendOrient: 'horizontal',
            legendX: 'center',
            legendY: 'top',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: "false",
            legendData: ['意向', '预购', '成交'],
            xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            yData: [{
                name: '成交',
                arr: [10, 12, 21, 54, 260, 830, 710]
            }, {
                name: '预购',
                arr: [30, 182, 434, 791, 390, 30, 10]
            }, {
                name: '意向',
                arr: [1320, 1132, 601, 234, 120, 90, 20]
            }]

        };
        if (param) {
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id), matchTheme(data.theme));
        var mySeries = [];
        for (var i = 0; i < data.yData.length; i++) {
            mySeries.push({
                name: data.yData[i].name,
                type: 'line',
                smooth: data.smooth == 'true' ? true : false,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: data.yData[i].arr
            });
        }
        ;
        var option = {
            title: {
                text: data.text,
                subtext: data.subtext,
                textStyle: {
                    fontSize: Number(data.size),
                    color: data.color,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: data.legendShow == 'true' ? true : false,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y: data.legendY,
            },
            toolbox: {
                show: data.toolShow == 'true' ? true : false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {rotate: data.rotateX},
                    data: data.xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: data.minY,
                    max: data.maxY
                }
            ],
            series: mySeries
        };
        myChartLine.setOption(option);
        if (!param) {
            dataPool.push({id: id, data: data, state: state});
        }
    };
    //绘制柱形图
    function graphBar(state, id, param) {
        var data = {
            theme: 'default',
            text: '某地区蒸发量和降水量',
            size: "12",
            color: "#000000",
            subtext: '数据分析',
            toolShow: "true",
            legendShow: "true",
            legendOrient: 'horizontal',
            legendX: 'center',
            legendY: 'top',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: "false",
            legendData: ['蒸发量', '降水量'],
            xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            yData: [{
                name: '蒸发量',
                arr: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }, {
                name: '降水量',
                arr: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            }]

        };
        if (param) {
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var mySeries = [];
        for (var i = 0; i < data.yData.length; i++) {
            mySeries.push({
                name: data.yData[i].name,
                type: 'bar',
                data: data.yData[i].arr
            });
        }
        ;
        var myChartLine = echarts.init(document.getElementById(id), matchTheme(data.theme));
        var option = {
            title: {
                text: data.text,
                subtext: data.subtext,
                textStyle: {
                    fontSize: Number(data.size),
                    color: data.color,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: data.legendShow == 'true' ? true : false,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y: data.legendY
            },
            toolbox: {
                show: data.toolShow == 'true' ? true : false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {rotate: data.rotateX},
                    data: data.xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: data.minY,
                    max: data.maxY
                }
            ],
            series: mySeries
        };
        myChartLine.setOption(option);
        if (!param) {
            dataPool.push({id: id, data: data, state: state});
        }
    };
    //绘制扇形图
    function graphPie(state, id, param) {
        var data = {
            theme: 'default',
            text: '某站点用户访问来源',
            size: "12",
            color: "#000000",
            subtext: '数据分析',
            toolShow: "true",
            legendShow: "true",
            legendOrient: 'horizontal',
            legendX: 'center',
            legendY: 'top',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: "false",
            legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
            xData: [],
            yData: [{
                name: '直接访问',
                arr: [335]
            }, {
                name: '邮件营销',
                arr: [310]
            }, {
                name: '联盟广告',
                arr: [234]
            }, {
                name: '视频广告',
                arr: [135]
            }, {
                name: '搜索引擎',
                arr: [1548]
            }]

        };
        if (param) {
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id), matchTheme(data.theme));
        var mySeries = [];
        for (var i = 0; i < data.yData.length; i++) {
            mySeries.push({
                name: data.yData[i].name,
                value: data.yData[i].arr[0]
            });
        }
        ;
        var option = {
            title: {
                text: data.text,
                subtext: data.subtext,
                textStyle: {
                    fontSize: Number(data.size),
                    color: data.color,
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: data.legendShow == 'true' ? true : false,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y: data.legendY
            },
            toolbox: {
                show: data.toolShow == 'true' ? true : false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    data: mySeries
                }
            ]
        };

        myChartLine.setOption(option);
        if (!param) {
            dataPool.push({id: id, data: data, state: state});
        }
    };
    //绘制雷达图
    function graphGraph(state, id, param) {
        var data = {
            theme: 'default',
            text: '预算 vs 开销（Budget vs spending）',
            size: "12",
            color: "#000000",
            subtext: '数据分析',
            toolShow: "true",
            legendShow: "true",
            legendOrient: 'vertical',
            legendX: 'left',
            legendY: 'bottom',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: "false",
            legendData: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
            xData: ['销售（sales）', '管理（Administration）', '信息技术（Information Techology）', '客服（Customer Support）', '研发（Development）', '市场（Marketing）'],
            yData: [{
                name: '预算分配（Allocated Budget）',
                arr: [4300, 10000, 28000, 35000, 50000, 19000]
            }, {
                name: '实际开销（Actual Spending）',
                arr: [5000, 14000, 28000, 31000, 42000, 21000]
            }]

        };
        if (param) {
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id), matchTheme(data.theme));
        var mySeries = [];
        var myIndicator = [];
        for (var i = 0; i < data.yData.length; i++) {
            for(var s=0;s<data.yData[i].arr.length;s++){
                data.yData[i].arr[s] = typeof(data.yData[i].arr[s])=='string'?Number(data.yData[i].arr[s]):data.yData[i].arr[s];
            }
            mySeries.push({
                name: data.yData[i].name,
                value: data.yData[i].arr
            });
        }
        ;
        for (var j = 0; j < data.xData.length; j++) {
            myIndicator.push({
                text: data.xData[j]
            });
        }
        ;
        var option = {
            title: {
                text: data.text,
                subtext: data.subtext,
                textStyle: {
                    fontSize: Number(data.size),
                    color: data.color,
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: data.legendShow == 'true' ? true : false,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y: data.legendY
            },
            toolbox: {
                show: data.toolShow == 'true' ? true : false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            polar: [
                {
                    indicator: myIndicator
                }
            ],
            calculable: true,
            series: [
                {
                    type: 'radar',
                    data: mySeries
                }
            ]
        };
        myChartLine.setOption(option);
        if (!param) {
            dataPool.push({id: id, data: data, state: state});
        }
    };

    /**
     * 图表初始化
     * @param state 类型 1-折线，2-堆积，3-柱形，4-扇形，5-雷达
     * @param id id
     * @param param 数据对象
     */

    exports.init = function (state, id, param) {
        switch (state) {
            case '1':
                graphLine(state, id, param);
                break;
            case '2':
                graphLines(state, id, param);
                break;
            case '3':
                graphBar(state, id, param);
                break;
            case '4':
                graphPie(state, id, param);
                break;
            case '5':
                graphGraph(state, id, param);
                break;
            default :
                return false;
        }
        if (param) {
            bgcolor(param.theme);
        }
    };


    /**当前数据获取
     * 根据全局变量dataPool填充编辑框 --填充完毕
     * @param id 编辑内容id
     * editParam.data 当前编辑图的数据对象
     */
    exports.getJson = function (id) {
        var editParam = {};
        for (var i = 0; i < dataPool.length; i++) {
            if (dataPool[i].id == id) {
                for (var key in dataPool[i]) {
                    editParam[key] = dataPool[i][key];
                }
            }
        }
        ;
        $('input[type="radio"]').removeAttr('checked');
        $('input[id=' + editParam.data.theme + '-theme]').prop('checked', 'checked');

        $('#title').val(editParam.data.text);
        $('#title-size').val(editParam.data.size);
        $('#title-color').val(editParam.data.color);
        $('#subtitle').val(editParam.data.subtext);
        if (editParam.data.toolShow=='true') {
            $('#show-tool').prop('checked', 'checked');
        }
        else {
            $('#no-tool').prop('checked', 'checked');
        }
        if (editParam.data.legendShow=='true') {
            $('#show-legend').prop('checked', 'checked');
        }
        else {
            $('#no-legend').prop('checked', 'checked');
        }
        $('#' + editParam.data.legendOrient + '-orient').prop('checked', 'checked');
        $('#' + editParam.data.legendX + '-legend').prop('checked', 'checked');
        $('#' + editParam.data.legendY + '-legend').prop('checked', 'checked');
        if (editParam.data.minY != 'normal') {
            $('#min-y').val(editParam.data.minY);
        }
        if (editParam.data.minX != 'normal') {
            $('#min-x').val(editParam.data.minX);
        }
        $('#rotate-x').val(editParam.data.rotateX);
        if (editParam.data.smooth=='true') {
            $('#true-smooth').prop('checked', 'checked');
        }
        else {
            $('#false-smooth').prop('checked', 'checked');
        }


        //x轴
        if(editParam.data.xData){
            for (var i = 0; i < editParam.data.xData.length; i++) {
                $('#myData').find('tr').eq(0).find('th').eq(i + 1).text(editParam.data.xData[i]);
            }
        }

        //y轴
        for (var j = 0; j < editParam.data.legendData.length; j++) {
            $('#myData').find('tr').eq(j + 1).find('th').text(editParam.data.legendData[j]);
            for (var z = 0; z < editParam.data.yData.length; z++) {
                if (editParam.data.legendData[j] == editParam.data.yData[z].name) {
                    for (var m = 0; m < editParam.data.yData[z].arr.length; m++) {
                        $('#myData').find('tr').eq(j + 1).find('td').eq(m).text(editParam.data.yData[z].arr[m]);
                    }
                }
            }
        }


    };

    /**提取更改数据
     * 根据编辑框修改全局变量dataPool --返回
     * @param id 编辑内容id
     */
    exports.postJson = function (id) {
        for (var i = 0; i < dataPool.length; i++) {
            if (dataPool[i].id == id) {
                dataPool[i].data.theme = $('input[name="theme"]:checked').val();
                dataPool[i].data.text = $('#title').val();
                dataPool[i].data.size = $('#title-size').val();
                dataPool[i].data.color = $('#title-color').val();
                dataPool[i].data.subtext = $('#subtitle').val();
                dataPool[i].data.toolShow = $('input[name="toolbox"]:checked').val();
                dataPool[i].data.legendShow = $('input[name="legend"]:checked').val();
                dataPool[i].data.legendOrient = $('input[name="orient"]:checked').val();
                dataPool[i].data.legendX = $('input[name="legend-x"]:checked').val();
                dataPool[i].data.legendY = $('input[name="legend-y"]:checked').val();
                if ($('#min-y').val()) dataPool[i].data.minY = $('#min-y').val();
                if ($('#max-y').val()) dataPool[i].data.maxY = $('#max-y').val();
                dataPool[i].data.rotateX = $('#rotate-x').val();
                dataPool[i].data.smooth = $('input[name="smooth"]:checked').val();


                dataPool[i].data.legendData = [];
                dataPool[i].data.xData = [];
                dataPool[i].data.yData = [];
                var editIn = $('#myData').find('.table');
                var x = 1, y = 1;
                while (editIn.find('tr').eq(0).find('th').eq(x).text() != '') {
                    dataPool[i].data.xData.push(editIn.find('tr').eq(0).find('th').eq(x).text());
                    x++;
                }
                while (editIn.find('tr').eq(y).find('th').text() != '') {
                    var par = {};
                    par.arr = [];
                    dataPool[i].data.legendData.push(editIn.find('tr').eq(y).find('th').text());
                    par.name = editIn.find('tr').eq(y).find('th').text();
                    var len = dataPool[i].state == '4' ? 1 : dataPool[i].data.xData.length;
                    for (var xy = 0; xy < len; xy++) {
                        par.arr.push(Number(editIn.find('tr').eq(y).find('td').eq(xy).text()));
                    }
                    dataPool[i].data.yData.push(par);
                    y++;
                }
                exports.init(dataPool[i].state, dataPool[i].id, dataPool[i].data);
                break;
            }
        }
        ;


    };
});