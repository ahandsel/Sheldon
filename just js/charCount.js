(function () {
    "use strict";

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];

    var CHANGE_EVENTS = ['app.record.create.change.Text',
                         'app.record.edit.change.Text',
                         'app.record.index.edit.change.Text'];
    var ALPHA_NUM_PATTERN = /\w/g;

    var updateCharCount = function(text, charCountField) {
        if (!text) {
          charCountField.value = 0;
        } else {
          var result = text.match(ALPHA_NUM_PATTERN);
          charCountField.value = result.length;
        }
    };
    //The character count field should be updated as the user types into a field.
    //At the moment, it only updates when the user presses the ENTER key or
    //clicks off the field.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var text = event.changes.field.value;
        var charCountField = event.record['Char_Count'];
        updateCharCount(text, charCountField);
        return event;
    });

    //Users should not be able to directly edit the character count field.
    kintone.events.on(SHOW_EVENTS, function (event) {
        var text = event.record['Text'].value;
        var charCountField = event.record['Char_Count'];
        updateCharCount(text, charCountField);
        charCountField.disabled = true;
        return event;
    });
})();
