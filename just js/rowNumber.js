(function () {
    "use strict";

    var CHANGE_EVENTS = ['app.record.create.change.Table', 'app.record.edit.change.Table','app.record.index.edit.change.Table'];
    var EDIT_EVENTS = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];

    //The row numbers need to be updated each time a row is added/removed.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        //Any new rows added must have their RowNum field disabled.
        if (event.changes.row) {
          event.changes.row.value['Row'].disabled = true;
        }
        //rows can be added to /removed from anywhere, so we'd need to renumber all rows.
        var count = event.record['Table'].value.length;
        for (var i = 0; i < count; i++) {
            event.record['Table'].value[i].value['Row'].value = i + 1;
        }
        return event;
    });

    //Disables the Row Num fields in the table when the record is initially displayed.
    kintone.events.on(EDIT_EVENTS, function (event) {
        var count = event.record['Table'].value.length;
        for (var i = 0; i < count; i++) {
            event.record['Table'].value[i].value['Row'].disabled = true;
        }
        return event;
    });
})();
