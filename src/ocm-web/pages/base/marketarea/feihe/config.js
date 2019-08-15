function getEvents(viewModel) {
    return {
        //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
        beforeEdit: function (index, rowId) {
            viewModel.goBillPanel();
            $("#marketareaBase").show();
            $("#marketareaBase_show").hide();
            //设置tab显示基本信息
            $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab")
                .removeClass("is-active");
            $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel")
                .removeClass("is-active");

            var title;
            viewModel.index = index;
            if (u.isNumber(index)) {
                //修改操作
                title = "编辑";
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
                viewModel.simpleList.setMeta("code", "enable", false);
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.itemurl + "/find-by-area",
                    dataType: "json",
                    data:{
                        id:currentData.id
                    },
                    success: function (data) {
                        viewModel.childList.setSimpleData(data, {
                            unSelect: true
                        });
                    }
                });
                viewModel.rowId = rowId;
            } else {
                title = "新增";
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                var curRow = viewModel.simpleList.createEmptyRow();
                // curRow.setSimpleData(copyRow.getSimpleData());
                curRow.setSimpleData({ parentId: viewModel.treeId });
                viewModel.simpleList.setRowFocus(curRow);
                viewModel.childList.setSimpleData([]);
                viewModel.simpleList.setMeta("code", "enable", true);
            }
        },
    }
}