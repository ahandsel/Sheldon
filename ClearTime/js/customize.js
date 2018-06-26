(function () {
    "use strict";

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];
    var DELETE_KEY = 46;
    var BACKSPACE_KEY = 8;

    kintone.events.on(SHOW_EVENTS, function (e) {
      var timeFields = document.getElementsByClassName("input-time-text-cybozu");
      for (var i = 0; i < timeFields.length; i++) {
        timeFields[i].onkeydown = function(event) {
          var key = event.keyCode || event.charCode;
          if (key == DELETE_KEY || key == BACKSPACE_KEY) {
            this.value = "";
          }
        };
      }
      return e;
    });
})();
