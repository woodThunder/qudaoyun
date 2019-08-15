//定义此js的全局变量，角色Id，ROLEID
var roleid_in_appauth = getUrlParam("roleId");
var isRole = getUrlParam('isRole');
// 定义全局进入界面加载时所有已经分配的app的id
var globleCheckItems = [];
var uncheckedArray = [];
globleCheckItems.length=0;
// 管理-角色分配与应用-点击授权，进入下一页面的实现
require(['dialog','dialogmin'], function () {
    $(function () {
        roleid_in_appauth = getUrlParam("roleId");
        // 负责小应用的具体展示
        littleAppDisplayAndSelect();
        // 获取领域下拉列表的数据
        getAreas();
        // 获取分组下拉列表中的数据
        getGroups();
    });

    $wrap = $('#gadget-site-content-MyAuthAfterRoleMgr');
    $wrap.on("click",".backbutton",function(e){
        //获取url中的参数
        function getUrlParam(name) {
            var aQuery = window.location.href.split("?");//取得Get参数
            var aGET = {};
            if(aQuery.length > 1)
            {
                var aBuf = aQuery[1].split("&");
                for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                {
                    var aTmp = aBuf[i].split("=");//分离key与Value
                    aGET[aTmp[0]] = aTmp[1];
                }
            }
            return  aGET[name];
        }

        if (isRole) {
            if (!window.router.routes.rolemgr) {
                windeow.registerRouter("rolemgr", "pages/app/rolelist/index.js");
            }
            window.location.href = "#/rolemgr?roleId=" + getUrlParam("roleId")+"&pn="+getUrlParam("pn");
        } else {
            window.location.href="#manage/rolemgr?roleId="+getUrlParam("roleId")+"&pn="+getUrlParam("pn");
        }
    })
});
//获取url中的参数
function getUrlParam(name) {
    var aQuery = window.location.href.split("?");//取得Get参数
    var aGET = {};
    if(aQuery.length > 1)
    {
        var aBuf = aQuery[1].split("&");
        for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
        {
            var aTmp = aBuf[i].split("=");//分离key与Value
            aGET[aTmp[0]] = aTmp[1];
        }
    }
    return  aGET[name];
}
// 搜索小应用，实现模糊查询
function queryAppByKeyword() {
    var selectedArea = $("#area-menu").val();
    var selectedGroup = $("#group-menu").val();
    var val = $("#searchApp").val();
    var data;
    // 通过下拉框状态过滤
    if (selectedArea == "all" && selectedGroup == "all") {
        data = {
            keyword: val
        };
    } else if (selectedArea != "all" && selectedGroup == "all") {
        data = {
            keyword: val,
            area: selectedArea
        };
    } else if (selectedArea != "all" && selectedGroup != "all") {
        data = {
            keyword: val,
            area: selectedArea,
            group: selectedGroup
        };
    }
    var params = JSON.stringify(data);
    queryAppByKeywordLimitedByAreaAndeGroup(params)
}

function queryAppByKeywordLimitedByAreaAndeGroup(param) {
    $.ajax({
        url: window.contextRoot + "/rolemgr/queryAppByKeyword",
        dataType: "json",
        data: param,
        type: "post",
        cache: false,
        contentType: "application/json",
        success: function (rtns) {
            // 添加状态后的代码
            var rtn = rtns.data;
            var str = [];
            $("#group_list").empty();
            $
                .each(
                rtn,
                function (i, item) {
                    str
                        .push('<div ><div class="row row-fluid outrow">'
                            + '<div class="col-sm-6 col-lg-3 outrowtitle">'
                            + i
                            + '</div></div>'
                            + '<div class="row" style="margin-left: -15px">'
                            + getItem(item)
                            + '</div>'
                            + '</div><br/>');
                });
            $("#group_list").append(str);
            checkAssignedApp();
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "搜索失败！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
}

// 后台请求查看该角色已经分配哪些应用，记录其id，内容显示时，显示的复选框中自动打勾
function checkAssignedApp() {
    var data = {
        roleid: roleid_in_appauth
    };
    var params = JSON.stringify(data);
    $.ajax({
        url: window.contextRoot + "/rolemgr/assingedApp",
        dataType: "json",
        data: params,
        type: "post",
        cache: false,
        contentType: "application/json",
        success: function (rtn) {
            $.each(rtn, function (i, item) {
                $("input[id=" + item + "]").prop("checked", true);
                // 已经分配的加入全局变量
                globleCheckItems.push(item);
                uncheckedArray=[];
            });
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "查询角色已拥有的应用失败！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
}

// 点击授权,跳转至分配app页面,显示下拉框中的领域列表
function getAreas() {
    $.ajax({
        url: window.contextRoot + "/rolemgr/area",
        dataType: "json",
        type: "get",
        contentType: "application/json",
        success: function (rtns) {
            var rtn = rtns.data;
            var str = [];
            str.push("<option selected value='all'>全部应用</option>");
            $.each(rtn, function (i, item) {
                str.push('<option value="' + item.id + '">' + item.areaName
                    + '</option>');
                $('#area-menu').html(str.join(''));
            });
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "加载领域下拉列表出错！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
}

// 点击授权,跳转至分配app页面,显示下拉框中的分组列表
function getGroups() {
    var url = window.contextRoot + "/rolemgr/group";
    $.ajax({
        url: url,
        dataType: "json",
        type: "get",
        contentType: "application/json",
        success: function (rtns) {
            var rtn = rtns.data;
            var str = [];
            str.push("<option selected value='all'>全部分组</option>");
            $.each(rtn, function (i, item) {
                str.push('<option value="' + item.id + '">' + item.name
                    + '</option>');
                $("#group-menu").html(str.join(" "));
            });
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "加载分组下拉列表出错！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
}

// 小应用的展示列表
function littleAppDisplayAndSelect() {
    var url = window.contextRoot + "/rolemgr/listWithGroup?roleId="+roleid_in_appauth;
    $.ajax({
        url: url,
        dataType: "json",
        type: "get",
        contentType: "application/json",
        success: function (rtns) {
            var rtn = rtns.data;
            var str = [];
            $("#group_list").empty();
            $.each(
                rtn,
                function (i, item) {
                    str.push('<div ><div class="row row-fluid outrow">'
                            + '<div class="col-sm-6 col-lg-3 outrowtitle">'
                            + item.groupName
                            + '</div></div>'
                            + '<div class="row" style="margin-left: -15px">'
                            + getItem(item)
                            + '</div>'
                            + '</div>');
                });
            $("#group_list").append(str);
            checkAssignedApp();
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "获取应用列表失败！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
}

function getItem(item) {
    var length;
    if(item.app==undefined){
    	length = item.length;
    }else{
    	length = item.app.length;
    }
    var str = '';
    for (var i = 0; i < length; i++) {
    	var itemapp
    	 if(item.app!=undefined){
    		 itemapp = item.app[i]
    	 }else{
    		 itemapp = item[i]
    	 }
    	
        str += [
            '<div class="  col-sm-3 col-lg-3">',
            '<label class="app-wrap" for="' + itemapp.id + '">',
            '<div class="title">' + itemapp.appName + '</div>',
            '<div class="img-and-dynamic">',
            '<span class="img-area" ><i class="iconfont appIcon ' + (itemapp.appIcon ? itemapp.appIcon : " icon-C-app ") + '"></i></span></div>',
            '</label>',
            '<div class="checkbox-wrap">',
            '<input type="checkbox" id="' + itemapp.id
                + '" class="checkbox" code="'+itemapp.appCode+'">', '</div>', '</div>' ].join('');
    }
    return str;
}

// 定义全局变量，记录领域id
var AREA_ID = "";
// 领域下拉框发生改变事件时，触发此方法
// 向后台发送两个请求，一个是改更改
function areaChange(area_id) {
    AREA_ID = area_id;
    data = {
        areaId: area_id
    };
    var params = JSON.stringify(data);

    // 如果选择的area_id为all
    // 显示所有的分组
    // 显示所有的内容
    if (area_id == "all") {
        getGroups();
        littleAppDisplayAndSelect();
        // 设置领域id为空，防止出现问题
        AREA_ID = "";
    } else {
        // 请求改变分组下拉框
        changeGroupOnAreaSelect(params);
        // 请求改变显示内容
        changeContentOnAreaSelect(params);
    }
}

// 分组下拉框发生改变时的响应事件
function groupChange(group_id) {
    var data;
    if (AREA_ID == "") { // 不选择领域框的情况下，直接选择分组框，则area_id为空
        var areaid;
        // 对分组下拉表的操作
        if (group_id == "all") { // 如果选择的group_id为all
            areaid = $("#area-menu").val();
            data = {
                areaId: areaid,
                roleId: roleid_in_appauth
            };
            var params = JSON.stringify(data);
            changeGroupOnAreaSelect(params);
        } else { // 如果选择了特定的组
            data = {
                groupId: group_id
            };
            var param = JSON.stringify(data);
            // 1、由分组唯一确定一个领域
            var url = window.contextRoot
                + "/rolemgr/getBothComboBoxByGroupSelected";
            areaid = reloadComboBoxByGroupSelected(url, param, group_id);
        }
        // 对内容显示的操作
        // 2、由分组唯一确定次分组下的应用
        var appLisData;
        var appListParams;
        if (areaid) { // 不选择领域框的情况下，直接选择分组
            if (group_id != "all") { // 分组框选择了具体的值
                appLisData = {
                    areaId: areaid,
                    groupId: group_id,
                    roleId: roleid_in_appauth
                };
                appListParams = JSON.stringify(appLisData);
                getAppListWithParams(window.contextRoot
                    + "/rolemgr/changeContentByAreaAndGroup", appListParams);
            } else { // 分组狂没有选择具体值
                appLisData = {
                    areaId: areaid,
                    roleId: roleid_in_appauth
                };
                appListParams = JSON.stringify(appLisData);
                changeContentOnAreaSelect(appListParams);
            }
        } else {
            areaid = $("#area-menu").val();
            appLisData = {
                areaId: areaid,
                roleId: roleid_in_appauth
            };
            appListParams = JSON.stringify(appLisData);
            changeContentOnAreaSelect(appListParams);
        }
    } else if (group_id == "all") {
        data = {
            areaId: AREA_ID,
            roleId: roleid_in_appauth
        };
        var param = JSON.stringify(data);
        changeContentOnAreaSelect(param);
    } else {
        data = {
            areaId: AREA_ID,
            groupId: group_id,
            roleId: roleid_in_appauth
        };
        var params = JSON.stringify(data);
        var url = window.contextRoot + "/rolemgr/changeContentByAreaAndGroup";
        getAppListWithParams(url, params);
    }
}

// 领域下拉框改变时动态的改变应用具体内容中的显示
function changeContentOnAreaSelect(param) {
    var url = window.contextRoot + "/rolemgr/changeContentByAreaId?roleId="+roleid_in_appauth;
    getAppListWithParams(url, param);
}

// 含有参数的展示应用列表
function getAppListWithParams(url, param) {
    $
        .ajax({
            url: url,
            dataType: "json",
            data: param,
            type: "post",
            contentType: "application/json",
            success: function (rtn) {
                var str = [];
                $("#group_list").empty();
                $.each(
                    rtn,
                    function (i, item) {
                        str.push('<div><div class="row row-fluid outrow">'
                                + '<div class="col-sm-6 col-lg-3 outrowtitle">'
                                + i
                                + '</div></div>'
                                + '<div class="row" style="margin-left: -15px">'
                                + getItem(item)
                                + '</div>'
                                + '</div>'

                            );
                    });
                $("#group_list").append(str);
                checkAssignedApp();
                
            },
            error: function (rtn) {
                dialog({
                    title: "提示",
                    content: "操作失败！",
                    cancel: false,
                    ok: function () {
                    }
                }).show();
            }
        });
}

// 全部领域全部分组情况下，仅通过改变分组下拉列表改变领域和分组列表
function reloadComboBoxByGroupSelected(url, params, groupid) {
    var areaToSelect;
    $.ajax({
        url: url,
        dataType: "json",
        data: params,
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (rtn) {
            var str = [];
            $("#group-menu").empty();
            str.push("<option value='all'>全部分组</option>");
            $.each(rtn, function (i, item) {
                areaToSelect = item.areaId;
                if (item.id == groupid) {
                    str.push('<option selected value="' + item.id + '">'
                        + item.name + '</option>');
                } else {
                    str.push('<option value="' + item.id + '">' + item.name
                        + '</option>');
                }
                $("#group-menu").html(str.join(" "));
            });
            $("#area-menu").find("option[value='" + areaToSelect + "']").attr(
                "selected", true);
        },
        error: function (rtn) {
            dialog({
                title: "提示",
                content: "下拉列表加载失败！",
                cancel: false,
                ok: function () {
                }
            }).show();
        }
    });
    return areaToSelect;
}

// 领域下拉框改变动态的改变属于领域的分组的信息
function changeGroupOnAreaSelect(param) {
    var url = window.contextRoot + "/rolemgr/listGroupByAreaId";
    $.ajax({
        url: url,
        dataType: "json",
        data: param,
        type: "post",
        contentType: "application/json",
        success: function (rtn) {
            var str = [];
            $("#group-menu").empty();
            str.push("<option selected value='all'>全部分组</option>");
            $.each(rtn, function (i, item) {
                str.push('<option value="' + item.id + '">' + item.name
                    + '</option>');
                $("#group-menu").html(str.join(" "));
            });
        },
        error: function (rtn) {
            console.log("Error:获取全部小应用分组失败~！");
        }
    });
}

// 选择完毕，点击完成，触发次事件，请求后台保存数据
function authFinishApp() {
    saveInRoleApp(globleCheckItems,uncheckedArray);
}

//绑定checkboxonchange事件 
$('#group_list')
.on('change','.checkbox-wrap :checkbox',function(){
	var appid = $(this).attr('id');
	var appcode = $(this).attr('code');
	var uncheckindex = uncheckedArray.indexOf(appid);
	var checkindex = globleCheckItems.indexOf(appid);
	if($(this).is(':checked')){
		if(checkindex==-1){
			globleCheckItems.push(appid);
		}
		if(uncheckindex!=-1){
			uncheckedArray.remove(uncheckindex);
		}
	}else{
		if(checkindex!=-1){
			globleCheckItems.remove(checkindex);
		}
		if(uncheckindex==-1){
			uncheckedArray.push(appid);
		}
	}
});
// 保存数据到角色与应用关联表中
function saveInRoleApp(array, uncheckedArray) {
    // 用户选择了数据，执行过程为先删除关联表中的数据，然后再添加数据
    var data = {
    	isHasAppid:false,
        checkedItems: array,
        roleId: roleid_in_appauth,
        uncheckedItems: uncheckedArray
    };
    var params = JSON.stringify(data);
    var url = window.contextRoot + "/roleMGT/saveRoleApp";
    afterSaveRoleApp(url, params);
}

// 保存应用于角色关联表
function afterSaveRoleApp(url, params) {
    $.ajax({
        url: url,
        dataType: "text",
        data: params,
        type: "post",
        contentType: "application/json",
        success: function (rtn) {
        	require('dialogmin')("保存成功","tip-suc");

            if (isRole) {
                if (!window.router.routes.rolemgr) {
                    windeow.registerRouter("rolemgr", "pages/app/rolelist/index.js");
                }
                window.location.href = "#/rolemgr?roleId=" + getUrlParam("roleId")+"&pn="+getUrlParam("pn");
            } else {
                var uri ="#manage/rolemgr?roleId=" + getUrlParam("roleId")+"&pn="+getUrlParam("pn");
                window.location.href = uri;
            }

        },
        error: function (rtn) {
            console.log("Error:"+rtn);
        }
    });
}

// 返回按钮方法
function backTolistPage() {
    debugger;
    if (isRole) {
        if (!window.router.routes.rolemgr) {
            windeow.registerRouter("rolemgr", "pages/app/rolelist/index.js");
        }
        window.location.href = "#/rolemgr?roleId=" + getUrlParam("roleId")+"&pn="+getUrlParam("pn");
    } else {
        var uri ="#manage/rolemgr?roleId=" + getUrlParam("roleId")+"&pn="+getUrlParam("pn");
        window.location.href = uri;
    }
}