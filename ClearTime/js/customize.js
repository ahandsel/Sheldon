(function () {
    "use strict";

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];

    kintone.events.on(SHOW_EVENTS, function (e) {
      var timeFields = document.getElementsByClassName("input-time-text-cybozu");
      for (var i = 0; i < timeFields.length; i++) {
        timeFields[i].onkeydown = function(event) {
          var key = event.keyCode || event.charCode;
          if (key == 8 || key == 46) {
            this.value = "";
          }
        };
      }
      return e;
    });
})();
