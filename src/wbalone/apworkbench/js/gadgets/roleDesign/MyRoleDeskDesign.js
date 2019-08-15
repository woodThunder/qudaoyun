require([
], function () {
    var getUserLayout = window.contextRoot + "/roleDesign/getUserLayout";
    $("#roleDesign_tbody").empty();
    //加载角色列表
    var initTableData = function () {
        $.ajax({
            url: getUserLayout,
            dataType: "json",
            type: "get",
            contentType: "application/json",
            success: function (rtnVal) {
//                $("#roleDesign_tbody").empty();
                var str = [];
                $.each(rtnVal, function (i, item) {
                    if (item.roleCode != 'admin') {
                        str.push(
                            '<tr><td>' + item.roleName + '</td><td>' + item.roleCode +
                                '</td><td>' +
                                '<span roleCode="' + item.roleCode + '" id="' + item.id + '" layout="' + item.pk_layoutperference + '" class="design  btn-design">' +
                                '<i class="iconfont icon-pencil '+(item.pk_layoutperference==""?" grey-400":" green-700 ") +'" ></i>' +
                                '设计</span>' +
                                '</td>' +
                                '</tr>'
                        );
                    }
                });
                $("#roleDesign_tbody").append(str);
//                $("#gadget-site-MyRoleDeskDesign").append(designPop);
            },
            error: function (rtnVal) {
            }
        });
    };
    initTableData();
    // 事件监听
    $("#roleDesign_tbody").on("click", "span.design", function () {//点击设计按钮,跳转到相应的设计页面
        var $b = $(this);
        var itemId = $b.attr('id');
        var roleCode = $b.attr('roleCode');
        var view = $b.attr("layout");
        var data = {
            roleId: itemId,
            roleCode:roleCode
        };
        $.ajax({
            url: window.contextRoot + "/roleDesign/getExistLayout",
            dataType: "json",
            data: JSON.stringify(data),
            type: "post",
            contentType: "application/json",
            success: function (res) {
                if (res.status=="1") {
                    var data = res.data;
//                        window.location.href = "#/layout/" + res.data;
                    $("#content").html('');
                    window.location.href = "#/layout/"+data.viewId+"/"+encodeURIComponent(data.modify)+"/back/manage%2Frolemgrdesign";
                } else {
                    alert(res.msg);
                }
            }
        });

       /* if (view == "") {
            var data = {
                roleId: itemId,
                roleCode:roleCode
            };
            $.ajax({
                url: window.contextRoot + "/roleDesign/getExistLayout",
                dataType: "json",
                data: JSON.stringify(data),
                type: "post",
                contentType: "application/json",
                success: function (res) {
                    if (res.status=="1") {
                          var data = res.data;
//                        window.location.href = "#/layout/" + res.data;
                        window.location.href = "#/layout/"+data.viewId+"/"+encodeURIComponent(data.modify)+"/back/manage%2Frolemgrdesign";


                    } else {
                        alert(res.msg);
                    }
                }
            });
        } else {
//            window.location.href = "#/layout/" + view;
            window.location.href = "#/layout/"+view+"/"+encodeURIComponent("modify")+"/back/manage%2Frolemgrdesign";

        }*/

        $("#designer").addClass("in").css({
            "display": "block",
            "paddingLeft": "17px",
            "opacity": "1"
        });

        /*
         //  显示toolbar 显示默认的两列可以拖拽的布局
         $("#toolbar").show();
         var param = {
         id: 'workbench',
         viewId: view,
         element: 'content'
         }
         //        layout(param);
         //
         initLayout(contextRoot + '/data:layout/' + view, param);
         var Toolbar = require(window.contextRoot + '/js/ext/Toolbar.js');
         console.log(Toolbar);
         var toolbar = new Toolbar('#toolbar', {
         viewId: itemId,
         id: 'workbench',
         layout: layout(param)
         });
         var tools = $("#toolbar>.sidebar-tools").eq(0);
         tools.css(
         {
         "position": "fixed",
         "top": "60px",
         "right": "0px",
         "height": "100%"
         }
         );
         //订阅-设计器保存
         Topic.subscribe('/layout/set/save', function (parm) {

         if (parm) {
         parm.success = function (res) {
         alert("保存成功！");
         };
         parm.data.biz = {"name": itemId};
         //临时 赵宇发送设计器保存url不对，这里覆盖

         parm.url = parm.url.replace("/page/sort/save", "/layout/design/save");
         }
         });*/
    });
});


