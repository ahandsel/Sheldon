jQuery.noConflict();
(function($, PLUGIN_ID) {

    'use strict';

    // params from user specifications
    var USER = kintone.getLoginUser();
    var LANG = USER.language;

    // multi-language settings
    var terms = {
        en: {
            configTitle: 'Settings',
            pluginActivation: 'Plug-in activation',
            pluginActive: 'Active',
            kintoneFieldConfig: 'Kintone field settings for date',
            kintoneDateField: 'Date',
            kintoneDayOfWeekField: 'Day of Week',
            pluginSubmit: '     Save   ',
            pluginCancel: '     Cancel   ',
            textDayOfWeek: 'Day of Week (plug-in)',
            textKintoneFields: 'Please create the following fields in your app form.',
            textApiError: 'Error occurred.'
        },
        ja: {
            configTitle: '設定',
            pluginActivation: 'プラグインアクティベーション',
            pluginActive: '有効化',
            kintoneFieldConfig: 'kintoneフィールド設定',
            kintoneDateField: '日付',
            kintoneDayOfWeekField: '曜日',
            pluginSubmit: '     保存   ',
            pluginCancel: 'キャンセル',
            textDayOfWeek: '曜日 (プラグイン)',
            textKintoneFields: '次のフィールドを設定してください。',
            textApiError: 'エラー発生'
        }
    };
    var i18n = LANG in terms ? terms[LANG] : terms.en;

    // append events
    var appendEvents = function appendEvents() {
        // save plug-in settings
        $('#submit').click(function() {
            var config = {};
            config.activation = $('#activation').prop('checked') ? 'active' : 'deactive';
            config.dateField = $('#date-field').val();
            config.dayOfWeekField = $('#dayOfWeek-field').val();
            kintone.plugin.app.setConfig(config);
        });

        // cancel plug-in settings
        $('#cancel').click(function() {
            history.back();
        });
    };

    // create HTML (call in renderHtml)
    var createHtml = function(fields) {
        // template & items settings
        // '#plugin-template' is defined in config.html
        var template = $.templates(document.querySelector('#plugin-template'));
        var templateItems = {
            configTitle: i18n.configTitle,
            // section1 activate plug-in
            pluginActivation: {
                pluginActivation: i18n.pluginActivation,
                pluginActive: i18n.pluginActive
            },
            // section2 kintone fields settings
            kintoneFieldConfig: i18n.kintoneFieldConfig,
            textKintoneFields: i18n.textKintoneFields,
            kintoneFields: [{
                title: i18n.kintoneDateField,
                require: '*',
                row: '',
                id: 'date-field',
                fields: fields['date-field']
            }, {
                title: i18n.kintoneDayOfWeekField,
                require: '*',
                row: '',
                id: 'dayOfWeek-field',
                fields: fields['dayOfWeek-field']
            }],
            // section3 buttons
            pluginSubmit: i18n.pluginSubmit,
            pluginCancel: i18n.pluginCancel
        };
        // render HTML
        $('#plugin-container').html(template(templateItems));
    };

    // render HTML
    var renderHtml = function() {
        kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {
            'app': kintone.app.getId()
        }, function(resp) {
            var fields = {
                'date-field': [],
                'dayOfWeek-field': []
            };
            for (var key in resp.properties) {
                var field = resp.properties[key];
                var item = {
                    label: field.label || field.code,
                    code: field.code,
                    type: field.type
                };
                switch (field.type) {
                    case 'SINGLE_LINE_TEXT':
                        fields['dayOfWeek-field'].push(item);
                        break;
                    case 'DATE':
                        fields['date-field'].push(item);
                        break;
                    default:
                        break;
                }
            }
            Object.keys(fields).forEach(function(f) {
                fields[f].sort(function(a, b) {
                    var aa = a.label || a.code;
                    var bb = b.label || b.code;
                    aa = aa.toUpperCase();
                    bb = bb.toUpperCase();
                    if (aa < bb) {
                        return -1;
                    } else if (aa > bb) {
                        return 1;
                    }
                    return 0;
                });
            });
            createHtml(fields);
            // set existing values
            var config = kintone.plugin.app.getConfig(PLUGIN_ID);
            if (config) {
                $('#activation').prop('checked', config.activation === 'active');
                $('#date-field').val(config.dateField);
                $('#dayOfWeek-field').val(config.dayOfWeekField);
            }
            // append events
            appendEvents();
        });
    };

    // initiated
    $(document).ready(function() {
        renderHtml();
    });
})(jQuery, kintone.$PLUGIN_ID);
