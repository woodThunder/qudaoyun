define(['text!./shopdecorationseries.html','ocm_common','searchbox','./meta.js','ocm_global'], function (html,common,searchbox) {
  var init = function (element, params) {
    var app,queryviewmodel;
    var viewModel = {
      saveurl : '/shop-decoration-series',
      listurl : '/shop-decoration-series',
      delurl  :  '/shop-decoration-series/delete',

      shopDecorationSeriesList: new u.DataTable(shopDecorationSeriesmeta),
      shopDecorationSeriesCard: new u.DataTable(shopDecorationSeriesmeta),
      rendertype:{
        operation:function(obj){
           var delfun = "data-bind=click:event.delRow.bind($data," + obj.rowIndex + ")";
           var editfun = "data-bind=click:event.beforeEdit.bind($data," + obj.rowIndex + ")";
           obj.element.innerHTML = '<div class="ui-handle-icon">'+
           '<span class="ui-handle ui-tab-icon-b">'+
           '<a href="#" class="uifont icon-edit font-c-c" '+
           editfun +
           ' title="编辑"></a>'+
           '</span>    '+
           '<span class="ui-handle ui-tab-icon-b">'+
           '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
           delfun +
           ' title="删除"></a>'+
           '</span></div>';
           ko.cleanNode(obj.element);
           ko.applyBindings(viewModel, obj.element);
        }
      },

      event: {
        beforeEdit: function(index) {
            var self = this;
            viewModel.index = index;
            if (index >= 0) {
                //修改操作
                var currentData = viewModel.shopDecorationSeriesList.getSimpleData()[index];
                viewModel.shopDecorationSeriesCard.removeAllRows();
                var temprow = viewModel.shopDecorationSeriesCard.createEmptyRow();
                temprow.setSimpleData(currentData);
            } else {
                //添加操作
                viewModel.shopDecorationSeriesCard.removeAllRows();
                viewModel.shopDecorationSeriesCard.createEmptyRow();
            }
            //显示模态框
            //如果模态框不存在创建模态框，存在则直接显示
            if (!viewModel.dialog) {
                viewModel.dialog = u.dialog({
                    id: 'testDialg',
                    content: "#dialog_content",
                    hasCloseMenu: true,
                    width: "27.8%",
                });

                var okButton = document.body.querySelector(".J-ok");
                u.on(okButton, 'click', function() {
                    viewModel.event.edit(viewModel.index);
                    viewModel.dialog.close();
                });

                var cancelButton = document.body.querySelector(".J-cancel");
                u.on(cancelButton, 'click', function() {
                    viewModel.dialog.close();
                });
            } else {
                viewModel.dialog.show();
            }


        },
        //将操作后的数据进行保存
        edit: function(index) {
            var currentRow,type = "post";
            var postdata = viewModel.shopDecorationSeriesCard.getSimpleData()[0];
            if(index>=0){
              type = "put";
            }
            //更改后台数据
            $._ajax({
              url:appCtx + viewModel.saveurl,
              type:type,
              data:JSON.stringify(postdata),
              contentType : "application/json; charset=utf-8",
              success:function(data){
                //如果index大于等于0说明是修改
                if (index >= 0) {
                  //获取需要修改的行
                  currentRow = viewModel.shopDecorationSeriesList.getRow(index);
                  //将用户填写的数据更新到shopDecorationSeriesList上
                } else {
                  //添加数据
                  currentRow = viewModel.shopDecorationSeriesList.createEmptyRow();
                }
                currentRow.setSimpleData(data);

              }
            })


        },
        initList: function () {
          var nowPageIndex = viewModel.shopDecorationSeriesList.pageIndex();
          if (viewModel.shopDecorationSeriesList.hasPage(nowPageIndex)) {
            viewModel.shopDecorationSeriesList.setCurrentPage(nowPageIndex)
          } else {
            var queryData = {};
            viewModel.shopDecorationSeriesList.addParams(queryData);
            app.serverEvent().addDataTable("shopDecorationSeriesList").fire({
              url: appCtx + viewModel.listurl,
              success: function (data) {

              },
              error:function(er){
                u.messageDialog({msg: '请求失败，请检查。', title: '请求错误', btnText: '确定'});
              }
            })
          }
        },
        pageChange: function (index) {
          viewModel.shopDecorationSeriesList.pageIndex(index);
          viewModel.event.initList();
        },
        sizeChange: function (size) {
          viewModel.shopDecorationSeriesList.clear();
          viewModel.shopDecorationSeriesList.pageSize(size);
          viewModel.event.initList();
        },
        search: function () {
          viewModel.shopDecorationSeriesList.clear();
          var queryData = {};
          queryData = queryviewmodel.getSearchData();
          // viewModel.shopDecorationSeriesList.addParams(queryData);
          // app.serverEvent().addDataTable("shopDecorationSeriesList").fire({
          //   url: appCtx + viewModel.listurl,
          //   success: function (data) {
          //
          //   },
          //   error:function(er){
          //     u.messageDialog({msg: '请求失败，请检查。', title: '请求错误', btnText: '确定'});
          //   }
          // })
          // layer.open({
          //   type: 1,
          //   area: ['600px', '360px'],
          //   shadeClose: false, //点击遮罩关闭
          //   content: '\<\div style="padding:20px;">自定义内容\<\/div>'
          // });
          var pageSize = viewModel.shopDecorationSeriesList.pageSize();
          var pageNumber = viewModel.shopDecorationSeriesList.pageIndex();
          $._ajax({
            type:"get",
            url:appCtx + viewModel.listurl,
            dataType:"json",
            data:{
              pageSize:pageSize,
              pageNumber:pageNumber
            },
            success:function(data){
              viewModel.shopDecorationSeriesList.setSimpleData(data.content);
            }
          })
        },
        cleanSearch: function () {
          queryviewmodel.clearSearch();
        },
        delRow: function (data) {
          if (typeof(data) == 'number') {
            viewModel.shopDecorationSeriesList.setRowSelect(data);
          }
          var ids = [];
          var rows = viewModel.shopDecorationSeriesList.getSelectedRows();
          if(rows&&rows.length>0){
            for(var i = 0;i<rows.length;i++){
              ids.push(rows[i].getValue("id"));
            }
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              $._ajax({
                url:appCtx + viewModel.delurl,
                type:"post",
                data: {ids:ids.join(",")},
                success:function(data){
                  viewModel.shopDecorationSeriesList.removeRows(rows);
                }
              });

            }
          });
        }
      }
    }		//end viewModel
    var appInit = function(){
      $(element).html(html);
      app = u.createApp({
        el: element,
        model: viewModel
      });
      queryviewmodel = new searchbox($("#shopDecorationSeries-searchcontent")[0],[
        {
          type:"text",
          key:"code",
          label:"编码"
        },
        {
          type:"text",
          key:"name",
          label:"名称"
        }
      ])
      viewModel.event.search();
    }
    var afterRender = function(){
      $('.search-enter').keydown(function (e) {
        if (e.keyCode == 13) {
          $('#user-action-search').trigger('click');

        }
      });
      var pagebcomp = $("#pagination")[0]['u.pagination'];
       pagebcomp.update({showState:false});
    }
    appInit();
    afterRender();
  }

  return {
    init: init
  }
});//end define
