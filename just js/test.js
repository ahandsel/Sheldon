(function() {
  'use strict';
  kintone.events.on([
    'app.record.edit.show',
    'app.record.create.change.数値_1',
    'app.record.edit.change.数値_1'
  ], function(event){
    event.record.数値_1.value = Number(event.record.数値_1.value.replace(/,/g, '')).toLocaleString();
    return event;
  });
  kintone.events.on([
    'app.record.create.submit',
    'app.record.edit.submit'
  ], function(event){
    event.record.数値_1.value = event.record.数値_1.value.replace(/,/g, '');
    return event;
  });
})();