/**
 * Created by chief on 15/11/4.
 */
//布局设置按钮
/*
 * options
 *
 * isLayoutEdit  是否可以编辑布局
 * isSortable   是否可以拖动
 * layoutId     布局id
 * viewId       预览id
 * status       用户态1 设计态0
 */
define([], function () {
    var Layout = function (containter, options) {
        var options = options || {};
        this.options = {
            isLayoutEdit: true,
            isSortable: false,
            layoutId: null,
            viewId: null,
            gridData: [],
            status: 0
        };
        this.options = $.extend(this.options, options);
        this.edit();
        this.containter = $(containter) || $('#designerContent');
        //this.editLayout();
    }
    Layout.prototype = {
        init: function () {
            var d = this.options;
            if (!d.layoutId) {
                return false;
            }
            if (d.viewId || d.layoutId) {
                this.initSortable($('.widgetBox'));
            }
            if (d.isLayoutEdit) {
                this.getLayoutData();
            }
            if (d.isSortable) {
                this.initSortable();
            }
            return this;

        },
        createElement: function () {

        },
        editLayout: function () {
            var _this = this;
            var container = _this.containter;
            setTimeout(function () {

                var w = (container.width() + 30) / 12;

                var grid = _this.options.gridData;

                function limit() {
                    var lines = [], place = [], curLength = 0;
                    $.each(grid, function (i, item) {
                        var l = grid.length;
                        var p = [], n = i + 1;
                        curLength += item;
                        var persent = (curLength/12*100).toFixed(4)+'%';
                        var line = '<div class="line" style="left:'+persent+'"></div>';
                        if (i == (l - 1)) {
                            return false;
                        }
                        var p = [parseInt((curLength - item + 1) * w), 0, parseInt((curLength + grid[n] - 1) * w), 0];
                        place.push(p);
                        lines.push(line);
                    })
                    if (container.find(".line").length == 0) {
                        container.find(".row").eq(0).append(lines.join(""));
                    }
                    return place;
                }

                var place = limit();

                container.find(".line").each(function (i, item) {
                    var L = i;
                    $(item).draggable({
                        axis: 'x',
                        containment: place[i],
                        grid: [w],
                        drag: function (event, ui) {
                            var myW = ui.helper.width();
                            var lW = Math.round(ui.position.left/w);
                        },
                        stop: function (event, ui) {
                            var myW = ui.helper.width();
                            var lW = Math.round(ui.position.left/w);
                            var grid = _this.options.gridData;
                            var curL = 0, prevL = 0;
                            ui.helper.css('left',(lW/12*100).toFixed(4)+'%');
                            $.each(grid, function (t, item) {
                                if (t < i) {
                                    prevL += item;
                                }
                            })
                            curL = (i == 0) ? lW : lW - prevL;

                            var l = grid[i] + grid[i + 1];
                            //console.log(l);
                            //console.log(grid[i]);
                            $(".ui-grid").eq(i).attr("class", "col-md-" + curL + " ui-grid");
                            $(".ui-grid").eq(i + 1).attr("class", "col-md-" + (l - curL) + " ui-grid");
                            (_this.options.gridData)[i] = curL;

                            (_this.options.gridData)[i + 1] = l - curL;

                            var place = limit();

                            //ui.helper.draggable('option',"containment",place[i]);

                            //更新拖动限制范围
                            if (grid.length == 2) {
                                //ui.helper.draggable('option',"containment",place[i]);
                            }
                            else if (i == grid.length - 1 - 1 && grid.length != 2) {
                                ui.helper.prev().draggable('option', "containment", place[i - 1]);
                            }
                            else {
                                ui.helper.next().draggable('option', "containment", place[i + 1]);
                            }
                            //$(".ui-grid").eq(0).attr("class","col-md-"+lW+" ui-grid");
                            //$(".ui-grid").eq(1).attr("class","col-md-"+(12-lW)+" ui-grid");
                            //console.log(ui.helper.draggable('option',"containment",[500, 0, 1000, 0]));
                            //var grid = _this.getLayoutData().options.gridData;
                            //var length = grid-length,
                            //    l = 0;

                        }
                    });
                })
            },0)

        },
        setLayout: function (data) {
            $(containter).html(data);
            this.initSortable();
        },
        getLayoutData: function () {
            var layouts = $(this.containter).find('.ui-grid'),
                data = [], html = [], str = 0, length = layouts.length, This = this;
            $.each(layouts, function (i, item) {
                var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
                data.push(index);
                //var edit = '<div index="'+i+'" class="layout-edit offset">' +
                //    '<input class="layout-col"  value="'+index+'" />'+
                //    '</div>'
                //html.push(edit);
                //$(item).append(edit).find('.layout-col').change(function(e,index){
                //    var index = parseInt($(this).parent().attr("index"));
                //
                //    var value = $(this).val();
                //    var isNum = value.search(/^[0-9]/ig);
                //
                //    if(length==1) return false;
                //    var next = index+1;
                //    if(next==length){
                //        next = index-1;
                //    };
                //    str=0;
                //    $.each($('.layout-col'),function(i,item){
                //        if(i!=index&&i!=next){
                //            str += parseInt($(this).val())
                //        }
                //    });
                //
                //    if(isNum==-1) {
                //        alert("请输入1-12范围内的整数");
                //        $(this).val(data[index]);
                //        return false;
                //    }
                //    else if(isNum!=-1){
                //        if(parseInt(value)>12||parseInt(value)<=0||parseInt(value)>(12-str-1)){
                //            alert("请输入1-12范围内的整数");
                //            $(this).val(data[index]);
                //            return false;
                //        }
                //    }
                //    $(item).attr("class",'col-md-'+value+' ui-grid ui-resizable');
                //    layouts.eq(next).attr("class",'col-md-'+(12-str-value)+' ui-grid ui-resizable');
                //    $('.layout-col').eq(next).val((12-str-value));
                //    data[next] = 12-str-value;
                //    data[index] = parseInt(value);
                //});
            });
            This.options.gridData = data;
            return this;
        },
        edit: function () {
            $('#content').delegate('.widgetBox .well', 'mouseover', function (e) {
                $(this).find(".edit").show();
            });
            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseover', function (e) {
                $(this).find(".edit").show();
            });

            $('#content').delegate('.widgetBox .well', 'mouseleave', function (e) {
                $(this).find(".edit").hide();
            });

            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseleave', function (e) {
                $(this).find(".edit").hide();
            });
            var _this = this;
        },
        initSortable: function (elems) {
            this.getLayoutData();
            $(elems).sortable({
                placeholder: "ui-portlet-placeholder",
                connectWith: ".widgetBox",
                forcePlaceholderSize: true,
                stop: function (i) {
                    //console.log(i);
                },
                over: function () {

                }
            }).disableSelection();
            return this;
        }
    }

    return Layout;
});