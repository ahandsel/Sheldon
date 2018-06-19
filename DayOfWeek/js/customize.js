jQuery.noConflict();
(function ($, PLUGIN_ID) {
    "use strict";

    // plug-in config
    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    // activation
    if (config && config.activation !== 'active') {
        return;
    }

    // params for setting fields
    var DATE_FIELD = config.dateField;
    var DAY_OF_WEEK_FIELD = config.dayOfWeekField;

    //Initialize the locale and thereby language of Moment.js
    moment.locale('en');

    // var SAVE_EVENTS = ['app.record.create.submit', 'app.record.edit.submit','app.record.index.edit.submit'];
    var CHANGE_EVENTS = ['app.record.create.change.' + DATE_FIELD, 'app.record.edit.change.' + DATE_FIELD,'app.record.index.edit.change.' + DATE_FIELD];
    var EDIT_EVENTS = ['app.record.edit.show', 'app.record.create.show', 'app.record.index.edit.show'];

    // //The "day of the week" field should be updated whenever a record is saved.
    // kintone.events.on(SAVE_EVENTS, function(event) {
    //     var date = event.record[DATE_FIELD].value;
    //     event.record[DAY_OF_WEEK_FIELD].value = moment(date).format('dddd');
    //     return event;
    // });

    //The "day of the week" field should be updated whenever a record's date is changed.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var date = event.changes.field.value;
        event.record[DAY_OF_WEEK_FIELD].value = moment(date).format('dddd');
        return event;
    });

    //Users should not be able to directly edit the calculated "day of the week" field.
    kintone.events.on(EDIT_EVENTS, function (event) {
        event.record[DAY_OF_WEEK_FIELD].disabled = true;
        return event;
    });
})(jQuery, kintone.$PLUGIN_ID);
