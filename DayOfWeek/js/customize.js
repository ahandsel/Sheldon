jQuery.noConflict();
(function ($, PLUGIN_ID) {
    "use strict";

    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (config && config.activation !== 'active') {
        return;
    }

    var DATE_FIELD = config.dateField;
    var DAY_OF_WEEK_FIELD = config.dayOfWeekField;

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];

    var CHANGE_EVENTS = ['app.record.create.change.' + DATE_FIELD,
                         'app.record.edit.change.' + DATE_FIELD,
                         'app.record.index.edit.change.' + DATE_FIELD];

    //set day of week display language
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

    kintone.events.on(SHOW_EVENTS, function(event) {
        var date = event.record[DATE_FIELD].value;
        var dayOfWeekField = event.record[DAY_OF_WEEK_FIELD];
        //set the default
        updateDay(date, dayOfWeekField);
        dayOfWeekField.disabled = true;
        return event;
    });

    kintone.events.on(CHANGE_EVENTS, function(event) {
        var date = event.changes.field.value;
        var dayOfWeekField = event.record[DAY_OF_WEEK_FIELD];
        updateDay(date, dayOfWeekField);
        return event;
    });
})(jQuery, kintone.$PLUGIN_ID);
