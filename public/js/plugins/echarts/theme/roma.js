define({
    color: ['#E01F54','#b8d2c7','#f5e8c8','#001852','#c6b38e',
        '#a4d8c2','#f3d999','#d3758f','#dcc392','#2e4783',
        '#82b6e9','#ff6347','#a092f1','#0a915d','#eaf889',
        '#6699FF','#ff6666','#3cb371','#d5b158','#38b6b6'],
    dataRange: {
        color:['#e01f54','#e7dbc3'],
        textStyle: {
            color: '#333'
        }
    },
    k: {
        itemStyle: {
            normal: {
                color: '#e01f54',
                color0: '#001852',
                lineStyle: {
                    width: 1,
                    color: '#f5e8c8',
                    color0: '#b8d2c7'
                }
            }
        }
    },
    pie: {
        itemStyle: {
            normal: {

                borderColor: '#fff',
                borderWidth: 1,
                label: {
                    show: true,
                    position: 'outer',
                    textStyle: {color: '#1b1b1b'},
                    lineStyle: {color: '#1b1b1b'}

                },
                labelLine: {
                    show: true,
                    length: 20,
                    lineStyle: {

                        width: 1,
                        type: 'solid'
                    }
                }
            },
            emphasis: {

                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                label: {
                    show: false
                },
                labelLine: {
                    show: false,
                    length: 20,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        }
    },

    map: {
        itemStyle: {
            normal: {
                borderColor: '#fff',
                borderWidth: 1,
                areaStyle: {
                    color: '#ccc'
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            },
            emphasis: {

                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                areaStyle: {
                    color: '#f3d999'
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            }
        }
    },

    force : {
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                nodeStyle : {
                    brushType : 'both',
                    strokeColor : '#5182ab'
                },
                linkStyle : {
                    strokeColor : '#5182ab'
                }
            },
            emphasis: {
                label: {
                    show: false
                },
                nodeStyle : {},
                linkStyle : {}
            }
        }
    },

    gauge : {
        axisLine: {            // 鍧愭爣杞寸嚎
            show: true,        // 榛樿鏄剧ず锛屽睘鎬how鎺у埗鏄剧ず涓庡惁
            lineStyle: {       // 灞炴€ineStyle鎺у埗绾挎潯鏍峰紡
                color: [[0.2, '#E01F54'],[0.8, '#b8d2c7'],[1, '#001852']],
                width: 8
            }
        },
        axisTick: {            // 鍧愭爣杞村皬鏍囪
            splitNumber: 10,   // 姣忎唤split缁嗗垎澶氬皯娈�
            length :12,        // 灞炴€ength鎺у埗绾块暱
            lineStyle: {       // 灞炴€ineStyle鎺у埗绾挎潯鏍峰紡
                color: 'auto'
            }
        },
        axisLabel: {           // 鍧愭爣杞存枃鏈爣绛撅紝璇﹁axis.axisLabel
            textStyle: {       // 鍏朵綑灞炴€ч粯璁や娇鐢ㄥ叏灞€鏂囨湰鏍峰紡锛岃瑙乀EXTSTYLE
                color: 'auto'
            }
        },
        splitLine: {           // 鍒嗛殧绾�
            length : 18,         // 灞炴€ength鎺у埗绾块暱
            lineStyle: {       // 灞炴€ineStyle锛堣瑙乴ineStyle锛夋帶鍒剁嚎鏉℃牱寮�
                color: 'auto'
            }
        },
        pointer : {
            length : '90%',
            color : 'auto'
        },
        title : {
            textStyle: {       // 鍏朵綑灞炴€ч粯璁や娇鐢ㄥ叏灞€鏂囨湰鏍峰紡锛岃瑙乀EXTSTYLE
                color: '#333'
            }
        },
        detail : {
            textStyle: {       // 鍏朵綑灞炴€ч粯璁や娇鐢ㄥ叏灞€鏂囨湰鏍峰紡锛岃瑙乀EXTSTYLE
                color: 'auto'
            }
        }
    }
});