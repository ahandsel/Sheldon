jQuery.noConflict();
(function ($, PLUGIN_ID) {
    "use strict";

    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (config && config.activation !== 'active') {
        return;
    }

    var TEXT_FIELD = config.textField;
    var CHAR_COUNT_FIELD = config.charCountField;

    var SHOW_EVENTS = ['app.record.create.show',
                       'app.record.edit.show',
                       'app.record.index.edit.show'];

    var CHANGE_EVENTS = ['app.record.create.change.' + TEXT_FIELD,
                         'app.record.edit.change.' + TEXT_FIELD,
                         'app.record.index.edit.change.' + TEXT_FIELD];

    var ALPHA_NUM_PATTERN = /\w/g;

    var updateCharCount = function(text, charCountField) {
        if (!text) {
          charCountField.value = 0;
        } else {
          var result = text.match(ALPHA_NUM_PATTERN);
          charCountField.value = result.length;
        }
    };

    kintone.events.on(SHOW_EVENTS, function (event) {
        var text = event.record[TEXT_FIELD].value;
        var charCountField = event.record[CHAR_COUNT_FIELD];
        //set the default
        updateCharCount(text, charCountField);
        charCountField.disabled = true;
        return event;
    });

    //At the moment, it only updates when the user presses the ENTER key.
    kintone.events.on(CHANGE_EVENTS, function(event) {
        var text = event.changes.field.value;
        var charCountField = event.record[CHAR_COUNT_FIELD];
        updateCharCount(text, charCountField);
        return event;
    });
})(jQuery, kintone.$PLUGIN_ID);
