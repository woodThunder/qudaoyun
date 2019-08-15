define(["ocm_simpleview", "./meta.js"], function(simpleview, model) {
  var view = simpleview.extend({
    model: model,
    baseData: {
      baseurl: "/buyer/bulletins",
      simpleList: new u.DataTable(model.options.metas.Countrymeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    }
  });
  return view;
});
