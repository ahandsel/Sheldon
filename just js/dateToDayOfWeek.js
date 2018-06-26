(function () {
    "use strict";

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];

    var CHANGE_EVENTS = ['app.record.create.change.Date',
                         'app.record.edit.change.Date',
                         'app.record.index.edit.change.Date'];

    var LANG = kintone.getLoginUser().language;
    if (LANG) {
      moment.locale(LANG);
    } else {
      moment.locale('en');
    }

    var updateDay = function(date, dayOfWeekField) {
      if (!date) {
        dayOfWeekField.value = "";
      } else {
        dayOfWeekField.value = moment(date).format('dddd');
      }
    };
    //The "day of the week" field should be updated whenever a record's date is changed.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var date = event.changes.field.value;
        var dayOfWeekField = event.record['Day_Of_Week'];
        updateDay(date, dayOfWeekField);
        return event;
    });

    //Users should not be able to directly edit the calculated "day of the week" field.
    kintone.events.on(SHOW_EVENTS, function (event) {
        var date = event.record['Date'].value;
        var dayOfWeekField = event.record['Day_Of_Week'];
        updateDay(date, dayOfWeekField);
        dayOfWeekField.disabled = true;
        return event;
    });
})();
