jQuery.noConflict();
(function ($, PLUGIN_ID) {
    "use strict";

    var config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (config && config.activation !== 'active') {
        return;
    }

    var TEXT = JSON.parse(config.textField);
    var CHAR_COUNT = JSON.parse(config.charCountField);

    var RECORD_DETAILS = ['app.record.create.show',
                       'app.record.edit.show'];

    var NOT_NUMBERS = /\D+/g;
    var ALPHA_NUM_PATTERN = /\w/g;

    var findElement = function(label, show_type, source) {
      var element = $("span:contains("+ label +")");
      if (show_type == "index") {
        element = element.parent().parent().parent();
      } else {
        element = element.parent();
      }
      var element_id = element.attr('class').replace(NOT_NUMBERS, '');

      if (show_type == "index") {
        return $("td[class*=" + element_id + "]").find(":input")[0];
      } else if (source) {
        return $("textarea[name*=" + element_id + "]")[0];
      } else {
        return $("input[id*=" + element_id + "]")[0];
      }
    };

    var addKeyUpListener = function(textLabel, charCountLabel, show_type) {
      var text_el = findElement(textLabel, show_type, true);
      text_el.onkeyup = function() {
        var text = this.value.match(ALPHA_NUM_PATTERN);
        var charCount = 0;
        if (text) {
          charCount = text.length;
        }
        var charCount_el = findElement(charCountLabel, show_type);
        charCount_el.value = charCount;
      };
    };

    kintone.events.on(RECORD_DETAILS, function (e) {
      var charCountField = e.record[CHAR_COUNT.code];
      charCountField.disabled = true;
      addKeyUpListener(TEXT.label, CHAR_COUNT.label, "details");
      return e;
    });

    kintone.events.on('app.record.index.edit.show', function (e) {
      var charCountField = e.record[CHAR_COUNT.code];
      charCountField.disabled = true;
      addKeyUpListener(TEXT.label, CHAR_COUNT.label, "index");
      return e;
    });
})(jQuery, kintone.$PLUGIN_ID);
