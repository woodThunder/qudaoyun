define(['text!./inquirePrice.html', 'ocm_common', 'searchbox',
'./meta.js', 'ocm_global'], function (tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
      baseurl: '/price/price-inquires',
      mainList: new u.DataTable(mainMeta),
      billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    };
    rendertype = {

    };
    events = {

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.mainList.pageIndex(0);
        }
        viewModel.mainList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        if (queryData['search_EQ_organization'] == undefined
            //|| queryData['search_IN_goodsId'] == undefined
          ) {
          //toastr.warning('销售组织、商品 为必选搜索条件');
          toastr.warning('销售组织 为必选搜索条件');
          return;
        }
        // queryData.size = viewModel.mainList.pageSize();
        // queryData.page = viewModel.mainList.pageIndex();
        $.ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.mainList.setSimpleData(data, { unSelect: true });
            generateGrid(data);
            // viewModel.mainList.totalRow(data.totalElements);
            // viewModel.mainList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.mainList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.mainList.pageSize(size);
        viewModel.search(true);
      }
    }

    viewModel = u.extend({}, baseData, events, rendertype);

    // 重新生成grid表格
    function generateGrid(data) {
        var grid = "<div id=\"priceList\" u-meta='{\"id\":\"grid_priceList\",\"data\":\"mainList\",\"type\":\"grid\",\"editable\":false,\"multiSelect\":true,\"showNumCol\":true}'>"
                +"  <div options='{\"field\":\"organizationName\",\"dataType\":\"String\",\"title\":\"销售组织名称\"}'></div>"
                +"  <div options='{\"field\":\"customerName\",\"dataType\":\"String\",\"title\":\"客户名称\"}'></div>"
                +"  <div options='{\"field\":\"goodsCode\",\"dataType\":\"String\",\"title\":\"商品编码\"}'></div>"
                +"  <div options='{\"field\":\"goodsName\",\"dataType\":\"String\",\"title\":\"商品名称\"}'></div>"
                +"  <div options='{\"field\":\"strategyCode\",\"dataType\":\"String\",\"title\":\"定价策略编码\"}'></div>"
                +"  <div options='{\"field\":\"strategyName\",\"dataType\":\"String\",\"title\":\"定价策略名称\"}'></div>"
                +"  <div options='{\"field\":\"priceMaintainName\",\"dataType\":\"String\",\"title\":\"价目表\"}'></div>"
                +"  <div options='{\"field\":\"priceMaintainOrganization\",\"dataType\":\"string\",\"title\":\"价目表所属销售组织\"}'></div>"
                +"  <div options='{\"field\":\"unitName\",\"dataType\":\"String\",\"title\":\"计量单位\"}'></div>";
        if (data.length > 0) {
            data = data[0];
            for (var i = 1; i <= 10; i++) {
              if (data['priceItemName'+i] == null) {
                break;
              }
              grid = grid + "<div options='{\"field\":\"price"+i+"\",\"dataType\":\"float\",\"title\":\""+data['priceItemName'+i]+"\"}'></div> ";
              if (data['discountIndex'+i] != null) {
                grid = grid + "<div options='{\"field\":\"discountIndex"+i+"\",\"dataType\":\"float\",\"title\":\"折扣价格指数\"}'></div>";
              }
              grid = grid + "<div options='{\"field\":\"currencyName"+i+"\",\"dataType\":\"String\",\"title\":\"币种\"}'></div>";
            }
        }
        grid = grid + "</div>";
        $("#priceGrid").html(grid);
        ko.cleanNode($("#priceGrid")[0]);
        u.createApp({
          el:$("#priceGrid")[0],
          model:viewModel
        });
    }

    function appInit(element, params) {

      //将模板页渲染到页面上
      element.innerHTML = tpl;
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });

      // 查询组件初始化
      singledocSearch = new searchbox(
        $("#mainList-searchcontent")[0], [
          {
            type: "refer",
            key: "organization",
            label: "销售组织",
            refinfo:"organization_ocm",
            clientParam:{"EQ_orgFuncRel":"01","AUTH_refcod":"PriceInquire","AUTH_refdim":"organization"}
          },
          {
            type: "refer",
            key: "customer",
            label: "客户",
            refinfo: "customer",
            clientParam:{"AUTH_refcod":"PriceInquire","AUTH_refdim":"customer"}
          },
          {
            type: "refer",
            key: "goodsId",
            label: "商品",
            refinfo: "goods-no-version",
            multi: true,
            clientParam:{"AUTH_refcod":"PriceInquire","AUTH_refdim":"goodsId"}
          },
          {
            type: "refer",
            key: "shop",
            label: "门店",
            refinfo: "shopref"
          },
          {
            type: "number",
            key: "num",
            label: "询价数量"
          }
        ]);
    }

    function afterRender() {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //绑定输入框enter事件
      $('#mainList-searchcontent input').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });
    }

    function init(element, params) {
      appInit(element, params);
      afterRender();
      window.vm = viewModel;
    }

    return {
      init: init
    }
  });
