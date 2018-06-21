(function () {
    "use strict";

    var CHANGE_EVENTS = ['app.record.create.change.Text', 'app.record.edit.change.Text','app.record.index.edit.change.Text'];
    var EDIT_EVENTS = ['app.record.edit.show', 'app.record.create.show', 'app.record.index.edit.show'];

    //The character count field should be updated as the user types into a field.
    //At the moment, it only updates when the user presses the ENTER key.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var text = event.changes.field.value;
        var nonSymPattern = /\w/g;
        var result = text.match(nonSymPattern);
        event.record['Char_Count'].value = result.length;
        return event;
    });

    //Users should not be able to directly edit the character count field.
    kintone.events.on(EDIT_EVENTS, function (event) {
        event.record['Char_Count'].disabled = true;
        return event;
    });
})();
