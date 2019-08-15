define(function(require, exports, module ){
    var styles = require('css!./index.css');
    var viewModel={
        pageInit:function(widgetid,height,count,system,column,time){
            height=height||'360px';
            count=count||'6';
            column=column||'title|senddate|sendername';
            $('#'+widgetid).children('.u-panel').css('min-height',parseInt(height)+'px');
            var vm = {
                dataTable: new u.DataTable({
                    meta: {
                        "title": "",
                        "senddate": "",
                        "sendername":""
                    }
                }),
                onClickFun: function (mod) {
                    var param={
                        id:mod.rowObj.value.id,
                        ext:mod.rowObj.value.ext,
                        system:mod.rowObj.value.system
                    };
                    require([window.taskActionHandler[mod.rowObj.value.system]], function(sc) {
                        if(sc){
                            sc.on("click", param);
                            setTimeout(function() {
                                window.needReload = true;
                            }, 500);
                        }else{
                            alert('找不到文件')
                        }
                    });

                }
            };
            app = u.createApp({
                el: '#'+widgetid,
                model: vm
            });
            viewModel.loadColumn(widgetid,column);
            viewModel.loadTitle(widgetid,system);
            viewModel.loadData(widgetid,vm,system.split('|').join(':'),count,time);
            window.setInterval(function(){
                time=time||5;
                viewModel.loadData(widgetid,vm,system.split('|').join(':'),count,time);
            },parseInt(time)*60*1000);

            $('#'+widgetid).find('#approveTitle').on('click',function(e){
                if($(e.target).parent().hasClass('title')){
                    var key=$(e.target).attr('searchType');
                    viewModel.loadColumn(widgetid,column);
                    viewModel.loadTitle(widgetid,system);
                    viewModel.loadData(widgetid,vm,key,count,time);
                }
            })
        },
        loadTitle:function(widgetid,system){
            $.ajax({
                type: "get",
                url: '/integration/task/system/list',
                success: function (res) {
                    eval(res);
                    //筛选system
                    var newAry=[];
                    if(system){
                        var a= system.split('|');
                        for(var i=0;i<taskSystemList.length;i++){
                            var code=taskSystemList[i].code;
                            if(a.indexOf(code)!=-1){
                                var obj={};
                                obj.code=code;
                                obj.name=code;
                                newAry.push(obj);
                                obj=null;
                            }
                        }
                    }else{
                        newAry=taskSystemList;
                    }
                    if(newAry.length>1){
                        $('#'+widgetid).find('#approveTitle').html('');
                        for(var i=0;i<newAry.length;i++){
                            var str='<li class="pull-left title" searchType="'+newAry[i].code+'" ><a href="javaScript:void(0)"  searchType="'+newAry[i].code+'">'+newAry[i].code+'</a></li>';
                            $('#'+widgetid).find('#approveTitle').append(str);
                        }
                    }
                }
            });
        },
        loadColumn:function(widgetid,column){
            $('#'+widgetid).find('#approveTable').append('');
            var ary=column.split('|');
            for(var i=0;i<ary.length;i++){
                var str="<div options='{\"field\":\""+ary[i]+"\",\"dataType\":\"String\",\"editType\":\"string\"}'></div>";
                $('#'+widgetid).find('#approveTable').append(str);
            }
        },
        loadData:function(widgetid,vm,code,count,time){
            ajaxRq();
            function ajaxRq(){
                var url = '/integration/task/list';
                var data={
                    "pageIndex":1,
                    "pageSize":count,
                    "state":'unread',
                    "dateRang":'all',
                    "type":'',
                    "system":code,
                    "key":''
                };
                $.ajax({
                    url:url,
                    type:'post',
                    dataType: 'json',
                    data:JSON.stringify(data),
                    contentType: 'application/json',
                    success:function(res){
                        if(res.status==1||res.status=='1'){
                            if(res.data&&res.data.content&&res.data.content.length){
                                var data =res.data.content;
                                vm.dataTable.removeAllRows();
                                vm.dataTable.setSimpleData(data);
                            }
                        }else{
                            window.message(res.message,'error');
                        }
                    },
                    error:function(){
                        alert('请求出错');
                    }
                });
            }


        }
    };
    return {
        init: function(widgetid,height,count,system,column,time){
            viewModel.pageInit(widgetid,height,count,system,column,time);
        }
    }
});
