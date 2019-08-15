function getConfig() {
  return {
    simplemeta: {
      meta: {
        isEnable: {
          status: "del"
        }
      },
      pageSize: 20
    },
    button1: [
      {
        key: "add",
        sort: 3
      },
      {
        key: "del",
        sort: 1
      },
      {
        key: "enable",
        sort: 2
      },
      {
        key: "disable",
        sort: 0
      }
    ],
    grid1: {
      columns: [
        {
          field: "code",
          status: "del"
        }
      ]
    }
  };
}

function getEvents() {
  return {
    test: function() {
      toastr.error("default");
    }
  };
}

function afterCreate() {
  return function(viewModel) {
    viewModel.simpleList.on("code.valuechange", function() {});
  };
}
