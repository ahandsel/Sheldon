(function () {
    "use strict";
    //Initialize the locale and thereby language of Moment.js
    moment.locale('en');

    // var SAVE_EVENTS = ['app.record.create.submit', 'app.record.edit.submit','app.record.index.edit.submit'];
    var CHANGE_EVENTS = ['app.record.create.change.Date', 'app.record.edit.change.Date','app.record.index.edit.change.Date'];
    var EDIT_EVENTS = ['app.record.edit.show', 'app.record.create.show', 'app.record.index.edit.show'];
    
    // //The "day of the week" field should be updated whenever a record is saved.
    // kintone.events.on(SAVE_EVENTS, function(event) {
    //     var date = event.record['Date'].value;
    //     event.record['Day_Of_Week'].value = moment(date).format('dddd');
    //     return event;
    // });

    //The "day of the week" field should be updated whenever a record's date is changed.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var date = event.changes.field.value;
        event.record['Day_Of_Week'].value = moment(date).format('dddd');
        return event;
    });
    
    //Users should not be able to directly edit the calculated "day of the week" field.
    kintone.events.on(EDIT_EVENTS, function (event) {
        event.record['Day_Of_Week'].disabled = true;
        return event;
    });
})();