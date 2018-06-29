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
                       'app.record.edit.show'];

    var NUM_PATTERN = /\d/g;
    var ALPHA_NUM_PATTERN = /\w/g;

    kintone.events.on(SHOW_EVENTS, function (e) {
      var charCountField = e.record[CHAR_COUNT_FIELD];

      var id = $("span:contains('Text Area 2')").parent().attr('class');
      id = id.replace( /\D+/g, '');

      $("textarea[name*=" + id + "]")[0].onkeydown = function() {
        var text = this.value.match(ALPHA_NUM_PATTERN);
        var charCount = 0;
        if (text) {
          charCount = text.length;
        }
        var target = $("span:contains('Number 2')").parent().attr('class');
        target = target.replace( /\D+/g, '');
        $("input[id*=" + target + "]")[0].value = charCount;
      };

      charCountField.disabled = true;
      return e;
    });

    kintone.events.on('app.record.index.edit.show', function (e) {
      var charCountField = e.record[CHAR_COUNT_FIELD];

      var id = $("span:contains('Text Area 2')").parent().parent().parent().attr('class');
      id = id.replace( /\D+/g, '');

      $("td[class*=" + id + "]").find(":input")[0].onkeydown = function() {
        var text = this.value.match(ALPHA_NUM_PATTERN);
        var charCount = 0;
        if (text) {
          charCount = text.length;
        }
        var target = $("span:contains('Number 2')").parent().parent().parent().attr('class');
        target = target.replace( /\D+/g, '');
        $("td[class*=" + target + "]").find(":input")[0].value = charCount;
      };

      charCountField.disabled = true;
      return e;
    });
})(jQuery, kintone.$PLUGIN_ID);
