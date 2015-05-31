//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var HTTP = Package['cfs:http-methods'].HTTP;
var HTML = Package.htmljs.HTML;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;

/* Package-scope variables */
var MedBookNavigator, genelist, GeneList_docToForm, GeneList_formToDoc, AppState, MedBookPost;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/genelist/template.genelist.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("genelist");                                                                                      // 2
Template["genelist"] = new Template("Template.genelist", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="genelistWrapper">\n      <input class="genelist" type="text" value="">\n    </div>');   // 5
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/genelist/genelist.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global AutoForm, $ */                                                                                               // 1
                                                                                                                       // 2
AutoForm.addInputType("genelist", {                                                                                    // 3
  template: "genelist",                                                                                                // 4
  valueConverters: {                                                                                                   // 5
    "object": function (val) {                                                                                         // 6
      return val;                                                                                                      // 7
    },                                                                                                                 // 8
    "Object": function (val) {                                                                                         // 9
      return val;                                                                                                      // 10
    },                                                                                                                 // 11
    "string": function (val) {                                                                                         // 12
      return val;                                                                                                      // 13
    },                                                                                                                 // 14
    "stringArray": function (val) {                                                                                    // 15
      return val;                                                                                                      // 16
    },                                                                                                                 // 17
  }                                                                                                                    // 18
});                                                                                                                    // 19
                                                                                                                       // 20
Template.genelist.helpers({                                                                                            // 21
   'change #genelist' : function(evt, tmpl) {                                                                          // 22
       var $genelist = tmpl.find("input");                                                                             // 23
   },                                                                                                                  // 24
});                                                                                                                    // 25
                                                                                                                       // 26
GeneList_formToDoc =  function(doc)  {                                                                                 // 27
   $(".genelist").each(function(i,element) {                                                                           // 28
       var fieldName = $(element).attr("prop")                                                                         // 29
       if (fieldName) {                                                                                                // 30
          var raw = $(element).select2("val");                                                                         // 31
          doc[fieldName] = raw;                                                                                        // 32
       }                                                                                                               // 33
   });                                                                                                                 // 34
                                                                                                                       // 35
   return doc;                                                                                                         // 36
},                                                                                                                     // 37
                                                                                                                       // 38
GeneList_docToForm = function(doc)  {                                                                                  // 39
                                                                                                                       // 40
   $(".genelist").each(function(i,element) {                                                                           // 41
       var fieldName = $(element).attr("prop")                                                                         // 42
       if (fieldName) {                                                                                                // 43
          var data = doc[fieldName];                                                                                   // 44
          if (data == null)                                                                                            // 45
              $(element).select2("data", null);                                                                        // 46
          else                                                                                                         // 47
              $(element).select2("data", data.map(function(e) {return { id: e, text: e}}));                            // 48
       }                                                                                                               // 49
   });                                                                                                                 // 50
  return doc;                                                                                                          // 51
}                                                                                                                      // 52
                                                                                                                       // 53
AutoForm.addHooks("CRFquickForm", {                                                                                    // 54
  formToDoc: GeneList_formToDoc,                                                                                       // 55
  docToForm: GeneList_docToForm                                                                                        // 56
});                                                                                                                    // 57
                                                                                                                       // 58
Template.genelist.rendered = function () {                                                                             // 59
     var thisTemplate = this;;                                                                                         // 60
     thisTemplate.$genelist = $(this.find("input"));                                                                   // 61
     thisTemplate.$genelist.attr("prop", thisTemplate.data.name);                                                      // 62
                                                                                                                       // 63
     var absUrl = Meteor.absoluteUrl();                                                                                // 64
     var whichApp = absUrl.substring(absUrl.lastIndexOf("/", absUrl.length -2));                                       // 65
     var url = whichApp + "genes";                                                                                     // 66
                                                                                                                       // 67
                                                                                                                       // 68
     thisTemplate.$genelist.select2({                                                                                  // 69
          initSelection : function (element, callback) {                                                               // 70
            var data = Template.currentData().value;                                                                   // 71
            if (data)                                                                                                  // 72
                callback( data.map(function(g) { return { id: g, text: g }}) );                                        // 73
          },                                                                                                           // 74
          multiple: true,                                                                                              // 75
          ajax: {                                                                                                      // 76
            url:  url,                                                                                                 // 77
            dataType: 'json',                                                                                          // 78
            delay: 250,                                                                                                // 79
            data: function (term) {                                                                                    // 80
              var qp = {                                                                                               // 81
                q: term                                                                                                // 82
              };                                                                                                       // 83
              return qp;                                                                                               // 84
            },                                                                                                         // 85
            results: function (data, page, query) { return { results: data.items }; },                                 // 86
            cache: true                                                                                                // 87
          },                                                                                                           // 88
          escapeMarkup: function (markup) { return markup; }, // let our custom formatter work                         // 89
          minimumInputLength: 2,                                                                                       // 90
     });                                                                                                               // 91
                                                                                                                       // 92
     var value = Template.currentData().value;                                                                         // 93
     if (value)                                                                                                        // 94
         thisTemplate.$genelist.select2("val", value );                                                                // 95
                                                                                                                       // 96
};                                                                                                                     // 97
                                                                                                                       // 98
Template.genelist.destroyed = function () {                                                                            // 99
};                                                                                                                     // 100
                                                                                                                       // 101
                                                                                                                       // 102
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/genelist/select2.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
Copyright 2012 Igor Vaynberg                                                                                           // 2
                                                                                                                       // 3
Version: 3.5.2 Timestamp: Sat Nov  1 14:43:36 EDT 2014                                                                 // 4
                                                                                                                       // 5
This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU                      // 6
General Public License version 2 (the "GPL License"). You may choose either license to govern your                     // 7
use of this software only upon the condition that you accept all of the terms of either the Apache                     // 8
License or the GPL License.                                                                                            // 9
                                                                                                                       // 10
You may obtain a copy of the Apache License and the GPL License at:                                                    // 11
                                                                                                                       // 12
    http://www.apache.org/licenses/LICENSE-2.0                                                                         // 13
    http://www.gnu.org/licenses/gpl-2.0.html                                                                           // 14
                                                                                                                       // 15
Unless required by applicable law or agreed to in writing, software distributed under the                              // 16
Apache License or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR                            // 17
CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for                      // 18
the specific language governing permissions and limitations under the Apache License and the GPL License.              // 19
*/                                                                                                                     // 20
(function ($) {                                                                                                        // 21
    if(typeof $.fn.each2 == "undefined") {                                                                             // 22
        $.extend($.fn, {                                                                                               // 23
            /*                                                                                                         // 24
            * 4-10 times faster .each replacement                                                                      // 25
            * use it carefully, as it overrides jQuery context of element on each iteration                            // 26
            */                                                                                                         // 27
            each2 : function (c) {                                                                                     // 28
                var j = $([0]), i = -1, l = this.length;                                                               // 29
                while (                                                                                                // 30
                    ++i < l                                                                                            // 31
                    && (j.context = j[0] = this[i])                                                                    // 32
                    && c.call(j[0], i, j) !== false //"this"=DOM, i=index, j=jQuery object                             // 33
                );                                                                                                     // 34
                return this;                                                                                           // 35
            }                                                                                                          // 36
        });                                                                                                            // 37
    }                                                                                                                  // 38
})(jQuery);                                                                                                            // 39
                                                                                                                       // 40
(function ($, undefined) {                                                                                             // 41
    "use strict";                                                                                                      // 42
    /*global document, window, jQuery, console */                                                                      // 43
                                                                                                                       // 44
    if (window.Select2 !== undefined) {                                                                                // 45
        return;                                                                                                        // 46
    }                                                                                                                  // 47
                                                                                                                       // 48
    var AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer,                                                  // 49
        lastMousePosition={x:0,y:0}, $document, scrollBarDimensions,                                                   // 50
                                                                                                                       // 51
    KEY = {                                                                                                            // 52
        TAB: 9,                                                                                                        // 53
        ENTER: 13,                                                                                                     // 54
        ESC: 27,                                                                                                       // 55
        SPACE: 32,                                                                                                     // 56
        LEFT: 37,                                                                                                      // 57
        UP: 38,                                                                                                        // 58
        RIGHT: 39,                                                                                                     // 59
        DOWN: 40,                                                                                                      // 60
        SHIFT: 16,                                                                                                     // 61
        CTRL: 17,                                                                                                      // 62
        ALT: 18,                                                                                                       // 63
        PAGE_UP: 33,                                                                                                   // 64
        PAGE_DOWN: 34,                                                                                                 // 65
        HOME: 36,                                                                                                      // 66
        END: 35,                                                                                                       // 67
        BACKSPACE: 8,                                                                                                  // 68
        DELETE: 46,                                                                                                    // 69
        isArrow: function (k) {                                                                                        // 70
            k = k.which ? k.which : k;                                                                                 // 71
            switch (k) {                                                                                               // 72
            case KEY.LEFT:                                                                                             // 73
            case KEY.RIGHT:                                                                                            // 74
            case KEY.UP:                                                                                               // 75
            case KEY.DOWN:                                                                                             // 76
                return true;                                                                                           // 77
            }                                                                                                          // 78
            return false;                                                                                              // 79
        },                                                                                                             // 80
        isControl: function (e) {                                                                                      // 81
            var k = e.which;                                                                                           // 82
            switch (k) {                                                                                               // 83
            case KEY.SHIFT:                                                                                            // 84
            case KEY.CTRL:                                                                                             // 85
            case KEY.ALT:                                                                                              // 86
                return true;                                                                                           // 87
            }                                                                                                          // 88
                                                                                                                       // 89
            if (e.metaKey) return true;                                                                                // 90
                                                                                                                       // 91
            return false;                                                                                              // 92
        },                                                                                                             // 93
        isFunctionKey: function (k) {                                                                                  // 94
            k = k.which ? k.which : k;                                                                                 // 95
            return k >= 112 && k <= 123;                                                                               // 96
        }                                                                                                              // 97
    },                                                                                                                 // 98
    MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>",                                      // 99
                                                                                                                       // 100
    DIACRITICS = {"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038A":"\u0399","\u03AA":"\u0399","\u038C":"\u039F","\u038E":"\u03A5","\u03AB":"\u03A5","\u038F":"\u03A9","\u03AC":"\u03B1","\u03AD":"\u03B5","\u03AE":"\u03B7","\u03AF":"\u03B9","\u03CA":"\u03B9","\u0390":"\u03B9","\u03CC":"\u03BF","\u03CD":"\u03C5","\u03CB":"\u03C5","\u03B0":"\u03C5","\u03C9":"\u03C9","\u03C2":"\u03C3"};
                                                                                                                       // 102
    $document = $(document);                                                                                           // 103
                                                                                                                       // 104
    nextUid=(function() { var counter=1; return function() { return counter++; }; }());                                // 105
                                                                                                                       // 106
                                                                                                                       // 107
    function reinsertElement(element) {                                                                                // 108
        var placeholder = $(document.createTextNode(''));                                                              // 109
                                                                                                                       // 110
        element.before(placeholder);                                                                                   // 111
        placeholder.before(element);                                                                                   // 112
        placeholder.remove();                                                                                          // 113
    }                                                                                                                  // 114
                                                                                                                       // 115
    function stripDiacritics(str) {                                                                                    // 116
        // Used 'uni range + named function' from http://jsperf.com/diacritics/18                                      // 117
        function match(a) {                                                                                            // 118
            return DIACRITICS[a] || a;                                                                                 // 119
        }                                                                                                              // 120
                                                                                                                       // 121
        return str.replace(/[^\u0000-\u007E]/g, match);                                                                // 122
    }                                                                                                                  // 123
                                                                                                                       // 124
    function indexOf(value, array) {                                                                                   // 125
        var i = 0, l = array.length;                                                                                   // 126
        for (; i < l; i = i + 1) {                                                                                     // 127
            if (equal(value, array[i])) return i;                                                                      // 128
        }                                                                                                              // 129
        return -1;                                                                                                     // 130
    }                                                                                                                  // 131
                                                                                                                       // 132
    function measureScrollbar () {                                                                                     // 133
        var $template = $( MEASURE_SCROLLBAR_TEMPLATE );                                                               // 134
        $template.appendTo(document.body);                                                                             // 135
                                                                                                                       // 136
        var dim = {                                                                                                    // 137
            width: $template.width() - $template[0].clientWidth,                                                       // 138
            height: $template.height() - $template[0].clientHeight                                                     // 139
        };                                                                                                             // 140
        $template.remove();                                                                                            // 141
                                                                                                                       // 142
        return dim;                                                                                                    // 143
    }                                                                                                                  // 144
                                                                                                                       // 145
    /**                                                                                                                // 146
     * Compares equality of a and b                                                                                    // 147
     * @param a                                                                                                        // 148
     * @param b                                                                                                        // 149
     */                                                                                                                // 150
    function equal(a, b) {                                                                                             // 151
        if (a === b) return true;                                                                                      // 152
        if (a === undefined || b === undefined) return false;                                                          // 153
        if (a === null || b === null) return false;                                                                    // 154
        // Check whether 'a' or 'b' is a string (primitive or object).                                                 // 155
        // The concatenation of an empty string (+'') converts its argument to a string's primitive.                   // 156
        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object                   // 157
        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object                   // 158
        return false;                                                                                                  // 159
    }                                                                                                                  // 160
                                                                                                                       // 161
    /**                                                                                                                // 162
     * Splits the string into an array of values, transforming each value. An empty array is returned for nulls or empty
     * strings                                                                                                         // 164
     * @param string                                                                                                   // 165
     * @param separator                                                                                                // 166
     */                                                                                                                // 167
    function splitVal(string, separator, transform) {                                                                  // 168
        var val, i, l;                                                                                                 // 169
        if (string === null || string.length < 1) return [];                                                           // 170
        val = string.split(separator);                                                                                 // 171
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = transform(val[i]);                                      // 172
        return val;                                                                                                    // 173
    }                                                                                                                  // 174
                                                                                                                       // 175
    function getSideBorderPadding(element) {                                                                           // 176
        return element.outerWidth(false) - element.width();                                                            // 177
    }                                                                                                                  // 178
                                                                                                                       // 179
    function installKeyUpChangeEvent(element) {                                                                        // 180
        var key="keyup-change-value";                                                                                  // 181
        element.on("keydown", function () {                                                                            // 182
            if ($.data(element, key) === undefined) {                                                                  // 183
                $.data(element, key, element.val());                                                                   // 184
            }                                                                                                          // 185
        });                                                                                                            // 186
        element.on("keyup", function () {                                                                              // 187
            var val= $.data(element, key);                                                                             // 188
            if (val !== undefined && element.val() !== val) {                                                          // 189
                $.removeData(element, key);                                                                            // 190
                element.trigger("keyup-change");                                                                       // 191
            }                                                                                                          // 192
        });                                                                                                            // 193
    }                                                                                                                  // 194
                                                                                                                       // 195
                                                                                                                       // 196
    /**                                                                                                                // 197
     * filters mouse events so an event is fired only if the mouse moved.                                              // 198
     *                                                                                                                 // 199
     * filters out mouse events that occur when mouse is stationary but                                                // 200
     * the elements under the pointer are scrolled.                                                                    // 201
     */                                                                                                                // 202
    function installFilteredMouseMove(element) {                                                                       // 203
        element.on("mousemove", function (e) {                                                                         // 204
            var lastpos = lastMousePosition;                                                                           // 205
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {                             // 206
                $(e.target).trigger("mousemove-filtered", e);                                                          // 207
            }                                                                                                          // 208
        });                                                                                                            // 209
    }                                                                                                                  // 210
                                                                                                                       // 211
    /**                                                                                                                // 212
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.                                                                       // 214
     *                                                                                                                 // 215
     * @param quietMillis number of milliseconds to wait before invoking fn                                            // 216
     * @param fn function to be debounced                                                                              // 217
     * @param ctx object to be used as this reference within fn                                                        // 218
     * @return debounced version of fn                                                                                 // 219
     */                                                                                                                // 220
    function debounce(quietMillis, fn, ctx) {                                                                          // 221
        ctx = ctx || undefined;                                                                                        // 222
        var timeout;                                                                                                   // 223
        return function () {                                                                                           // 224
            var args = arguments;                                                                                      // 225
            window.clearTimeout(timeout);                                                                              // 226
            timeout = window.setTimeout(function() {                                                                   // 227
                fn.apply(ctx, args);                                                                                   // 228
            }, quietMillis);                                                                                           // 229
        };                                                                                                             // 230
    }                                                                                                                  // 231
                                                                                                                       // 232
    function installDebouncedScroll(threshold, element) {                                                              // 233
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});                     // 234
        element.on("scroll", function (e) {                                                                            // 235
            if (indexOf(e.target, element.get()) >= 0) notify(e);                                                      // 236
        });                                                                                                            // 237
    }                                                                                                                  // 238
                                                                                                                       // 239
    function focus($el) {                                                                                              // 240
        if ($el[0] === document.activeElement) return;                                                                 // 241
                                                                                                                       // 242
        /* set the focus in a 0 timeout - that way the focus is set after the processing                               // 243
            of the current event has finished - which seems like the only reliable way                                 // 244
            to set focus */                                                                                            // 245
        window.setTimeout(function() {                                                                                 // 246
            var el=$el[0], pos=$el.val().length, range;                                                                // 247
                                                                                                                       // 248
            $el.focus();                                                                                               // 249
                                                                                                                       // 250
            /* make sure el received focus so we do not error out when trying to manipulate the caret.                 // 251
                sometimes modals or others listeners may steal it after its set */                                     // 252
            var isVisible = (el.offsetWidth > 0 || el.offsetHeight > 0);                                               // 253
            if (isVisible && el === document.activeElement) {                                                          // 254
                                                                                                                       // 255
                /* after the focus is set move the caret to the end, necessary when we val()                           // 256
                    just before setting focus */                                                                       // 257
                if(el.setSelectionRange)                                                                               // 258
                {                                                                                                      // 259
                    el.setSelectionRange(pos, pos);                                                                    // 260
                }                                                                                                      // 261
                else if (el.createTextRange) {                                                                         // 262
                    range = el.createTextRange();                                                                      // 263
                    range.collapse(false);                                                                             // 264
                    range.select();                                                                                    // 265
                }                                                                                                      // 266
            }                                                                                                          // 267
        }, 0);                                                                                                         // 268
    }                                                                                                                  // 269
                                                                                                                       // 270
    function getCursorInfo(el) {                                                                                       // 271
        el = $(el)[0];                                                                                                 // 272
        var offset = 0;                                                                                                // 273
        var length = 0;                                                                                                // 274
        if ('selectionStart' in el) {                                                                                  // 275
            offset = el.selectionStart;                                                                                // 276
            length = el.selectionEnd - offset;                                                                         // 277
        } else if ('selection' in document) {                                                                          // 278
            el.focus();                                                                                                // 279
            var sel = document.selection.createRange();                                                                // 280
            length = document.selection.createRange().text.length;                                                     // 281
            sel.moveStart('character', -el.value.length);                                                              // 282
            offset = sel.text.length - length;                                                                         // 283
        }                                                                                                              // 284
        return { offset: offset, length: length };                                                                     // 285
    }                                                                                                                  // 286
                                                                                                                       // 287
    function killEvent(event) {                                                                                        // 288
        event.preventDefault();                                                                                        // 289
        event.stopPropagation();                                                                                       // 290
    }                                                                                                                  // 291
    function killEventImmediately(event) {                                                                             // 292
        event.preventDefault();                                                                                        // 293
        event.stopImmediatePropagation();                                                                              // 294
    }                                                                                                                  // 295
                                                                                                                       // 296
    function measureTextWidth(e) {                                                                                     // 297
        if (!sizer){                                                                                                   // 298
            var style = e[0].currentStyle || window.getComputedStyle(e[0], null);                                      // 299
            sizer = $(document.createElement("div")).css({                                                             // 300
                position: "absolute",                                                                                  // 301
                left: "-10000px",                                                                                      // 302
                top: "-10000px",                                                                                       // 303
                display: "none",                                                                                       // 304
                fontSize: style.fontSize,                                                                              // 305
                fontFamily: style.fontFamily,                                                                          // 306
                fontStyle: style.fontStyle,                                                                            // 307
                fontWeight: style.fontWeight,                                                                          // 308
                letterSpacing: style.letterSpacing,                                                                    // 309
                textTransform: style.textTransform,                                                                    // 310
                whiteSpace: "nowrap"                                                                                   // 311
            });                                                                                                        // 312
            sizer.attr("class","select2-sizer");                                                                       // 313
            $(document.body).append(sizer);                                                                            // 314
        }                                                                                                              // 315
        sizer.text(e.val());                                                                                           // 316
        return sizer.width();                                                                                          // 317
    }                                                                                                                  // 318
                                                                                                                       // 319
    function syncCssClasses(dest, src, adapter) {                                                                      // 320
        var classes, replacements = [], adapted;                                                                       // 321
                                                                                                                       // 322
        classes = $.trim(dest.attr("class"));                                                                          // 323
                                                                                                                       // 324
        if (classes) {                                                                                                 // 325
            classes = '' + classes; // for IE which returns object                                                     // 326
                                                                                                                       // 327
            $(classes.split(/\s+/)).each2(function() {                                                                 // 328
                if (this.indexOf("select2-") === 0) {                                                                  // 329
                    replacements.push(this);                                                                           // 330
                }                                                                                                      // 331
            });                                                                                                        // 332
        }                                                                                                              // 333
                                                                                                                       // 334
        classes = $.trim(src.attr("class"));                                                                           // 335
                                                                                                                       // 336
        if (classes) {                                                                                                 // 337
            classes = '' + classes; // for IE which returns object                                                     // 338
                                                                                                                       // 339
            $(classes.split(/\s+/)).each2(function() {                                                                 // 340
                if (this.indexOf("select2-") !== 0) {                                                                  // 341
                    adapted = adapter(this);                                                                           // 342
                                                                                                                       // 343
                    if (adapted) {                                                                                     // 344
                        replacements.push(adapted);                                                                    // 345
                    }                                                                                                  // 346
                }                                                                                                      // 347
            });                                                                                                        // 348
        }                                                                                                              // 349
                                                                                                                       // 350
        dest.attr("class", replacements.join(" "));                                                                    // 351
    }                                                                                                                  // 352
                                                                                                                       // 353
                                                                                                                       // 354
    function markMatch(text, term, markup, escapeMarkup) {                                                             // 355
        var match=stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())),                    // 356
            tl=term.length;                                                                                            // 357
                                                                                                                       // 358
        if (match<0) {                                                                                                 // 359
            markup.push(escapeMarkup(text));                                                                           // 360
            return;                                                                                                    // 361
        }                                                                                                              // 362
                                                                                                                       // 363
        markup.push(escapeMarkup(text.substring(0, match)));                                                           // 364
        markup.push("<span class='select2-match'>");                                                                   // 365
        markup.push(escapeMarkup(text.substring(match, match + tl)));                                                  // 366
        markup.push("</span>");                                                                                        // 367
        markup.push(escapeMarkup(text.substring(match + tl, text.length)));                                            // 368
    }                                                                                                                  // 369
                                                                                                                       // 370
    function defaultEscapeMarkup(markup) {                                                                             // 371
        var replace_map = {                                                                                            // 372
            '\\': '&#92;',                                                                                             // 373
            '&': '&amp;',                                                                                              // 374
            '<': '&lt;',                                                                                               // 375
            '>': '&gt;',                                                                                               // 376
            '"': '&quot;',                                                                                             // 377
            "'": '&#39;',                                                                                              // 378
            "/": '&#47;'                                                                                               // 379
        };                                                                                                             // 380
                                                                                                                       // 381
        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {                                               // 382
            return replace_map[match];                                                                                 // 383
        });                                                                                                            // 384
    }                                                                                                                  // 385
                                                                                                                       // 386
    /**                                                                                                                // 387
     * Produces an ajax-based query function                                                                           // 388
     *                                                                                                                 // 389
     * @param options object containing configuration parameters                                                       // 390
     * @param options.params parameter map for the transport ajax call, can contain such options as cache, jsonpCallback, etc. see $.ajax
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data                                                                             // 393
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber, query) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:                                            // 398
     *      results array of objects that will be used as choices                                                      // 399
     *      more (optional) boolean indicating whether there are more results available                                // 400
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}                                     // 401
     */                                                                                                                // 402
    function ajax(options) {                                                                                           // 403
        var timeout, // current scheduled but not yet executed request                                                 // 404
            handler = null,                                                                                            // 405
            quietMillis = options.quietMillis || 100,                                                                  // 406
            ajaxUrl = options.url,                                                                                     // 407
            self = this;                                                                                               // 408
                                                                                                                       // 409
        return function (query) {                                                                                      // 410
            window.clearTimeout(timeout);                                                                              // 411
            timeout = window.setTimeout(function () {                                                                  // 412
                var data = options.data, // ajax data function                                                         // 413
                    url = ajaxUrl, // ajax url string or function                                                      // 414
                    transport = options.transport || $.fn.select2.ajaxDefaults.transport,                              // 415
                    // deprecated - to be removed in 4.0  - use params instead                                         // 416
                    deprecated = {                                                                                     // 417
                        type: options.type || 'GET', // set type of request (GET or POST)                              // 418
                        cache: options.cache || false,                                                                 // 419
                        jsonpCallback: options.jsonpCallback||undefined,                                               // 420
                        dataType: options.dataType||"json"                                                             // 421
                    },                                                                                                 // 422
                    params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);                               // 423
                                                                                                                       // 424
                data = data ? data.call(self, query.term, query.page, query.context) : null;                           // 425
                url = (typeof url === 'function') ? url.call(self, query.term, query.page, query.context) : url;       // 426
                                                                                                                       // 427
                if (handler && typeof handler.abort === "function") { handler.abort(); }                               // 428
                                                                                                                       // 429
                if (options.params) {                                                                                  // 430
                    if ($.isFunction(options.params)) {                                                                // 431
                        $.extend(params, options.params.call(self));                                                   // 432
                    } else {                                                                                           // 433
                        $.extend(params, options.params);                                                              // 434
                    }                                                                                                  // 435
                }                                                                                                      // 436
                                                                                                                       // 437
                $.extend(params, {                                                                                     // 438
                    url: url,                                                                                          // 439
                    dataType: options.dataType,                                                                        // 440
                    data: data,                                                                                        // 441
                    success: function (data) {                                                                         // 442
                        // TODO - replace query.page with query so users have access to term, page, etc.               // 443
                        // added query as third paramter to keep backwards compatibility                               // 444
                        var results = options.results(data, query.page, query);                                        // 445
                        query.callback(results);                                                                       // 446
                    },                                                                                                 // 447
                    error: function(jqXHR, textStatus, errorThrown){                                                   // 448
                        var results = {                                                                                // 449
                            hasError: true,                                                                            // 450
                            jqXHR: jqXHR,                                                                              // 451
                            textStatus: textStatus,                                                                    // 452
                            errorThrown: errorThrown                                                                   // 453
                        };                                                                                             // 454
                                                                                                                       // 455
                        query.callback(results);                                                                       // 456
                    }                                                                                                  // 457
                });                                                                                                    // 458
                handler = transport.call(self, params);                                                                // 459
            }, quietMillis);                                                                                           // 460
        };                                                                                                             // 461
    }                                                                                                                  // 462
                                                                                                                       // 463
    /**                                                                                                                // 464
     * Produces a query function that works with a local array                                                         // 465
     *                                                                                                                 // 466
     * @param options object containing configuration parameters. The options parameter can either be an array or an   // 467
     * object.                                                                                                         // 468
     *                                                                                                                 // 469
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.                     // 470
     *                                                                                                                 // 471
     * If the object form is used it is assumed that it contains 'data' and 'text' keys. The 'data' key should contain // 472
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'   // 473
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.                                                                                                       // 476
     */                                                                                                                // 477
    function local(options) {                                                                                          // 478
        var data = options, // data elements                                                                           // 479
            dataText,                                                                                                  // 480
            tmp,                                                                                                       // 481
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search
                                                                                                                       // 483
         if ($.isArray(data)) {                                                                                        // 484
            tmp = data;                                                                                                // 485
            data = { results: tmp };                                                                                   // 486
        }                                                                                                              // 487
                                                                                                                       // 488
         if ($.isFunction(data) === false) {                                                                           // 489
            tmp = data;                                                                                                // 490
            data = function() { return tmp; };                                                                         // 491
        }                                                                                                              // 492
                                                                                                                       // 493
        var dataItem = data();                                                                                         // 494
        if (dataItem.text) {                                                                                           // 495
            text = dataItem.text;                                                                                      // 496
            // if text is not a function we assume it to be a key name                                                 // 497
            if (!$.isFunction(text)) {                                                                                 // 498
                dataText = dataItem.text; // we need to store this in a separate variable because in the next step data gets reset and data.text is no longer available
                text = function (item) { return item[dataText]; };                                                     // 500
            }                                                                                                          // 501
        }                                                                                                              // 502
                                                                                                                       // 503
        return function (query) {                                                                                      // 504
            var t = query.term, filtered = { results: [] }, process;                                                   // 505
            if (t === "") {                                                                                            // 506
                query.callback(data());                                                                                // 507
                return;                                                                                                // 508
            }                                                                                                          // 509
                                                                                                                       // 510
            process = function(datum, collection) {                                                                    // 511
                var group, attr;                                                                                       // 512
                datum = datum[0];                                                                                      // 513
                if (datum.children) {                                                                                  // 514
                    group = {};                                                                                        // 515
                    for (attr in datum) {                                                                              // 516
                        if (datum.hasOwnProperty(attr)) group[attr]=datum[attr];                                       // 517
                    }                                                                                                  // 518
                    group.children=[];                                                                                 // 519
                    $(datum.children).each2(function(i, childDatum) { process(childDatum, group.children); });         // 520
                    if (group.children.length || query.matcher(t, text(group), datum)) {                               // 521
                        collection.push(group);                                                                        // 522
                    }                                                                                                  // 523
                } else {                                                                                               // 524
                    if (query.matcher(t, text(datum), datum)) {                                                        // 525
                        collection.push(datum);                                                                        // 526
                    }                                                                                                  // 527
                }                                                                                                      // 528
            };                                                                                                         // 529
                                                                                                                       // 530
            $(data().results).each2(function(i, datum) { process(datum, filtered.results); });                         // 531
            query.callback(filtered);                                                                                  // 532
        };                                                                                                             // 533
    }                                                                                                                  // 534
                                                                                                                       // 535
    // TODO javadoc                                                                                                    // 536
    function tags(data) {                                                                                              // 537
        var isFunc = $.isFunction(data);                                                                               // 538
        return function (query) {                                                                                      // 539
            var t = query.term, filtered = {results: []};                                                              // 540
            var result = isFunc ? data(query) : data;                                                                  // 541
            if ($.isArray(result)) {                                                                                   // 542
                $(result).each(function () {                                                                           // 543
                    var isObject = this.text !== undefined,                                                            // 544
                        text = isObject ? this.text : this;                                                            // 545
                    if (t === "" || query.matcher(t, text)) {                                                          // 546
                        filtered.results.push(isObject ? this : {id: this, text: this});                               // 547
                    }                                                                                                  // 548
                });                                                                                                    // 549
                query.callback(filtered);                                                                              // 550
            }                                                                                                          // 551
        };                                                                                                             // 552
    }                                                                                                                  // 553
                                                                                                                       // 554
    /**                                                                                                                // 555
     * Checks if the formatter function should be used.                                                                // 556
     *                                                                                                                 // 557
     * Throws an error if it is not a function. Returns true if it should be used,                                     // 558
     * false if no formatting should be performed.                                                                     // 559
     *                                                                                                                 // 560
     * @param formatter                                                                                                // 561
     */                                                                                                                // 562
    function checkFormatter(formatter, formatterName) {                                                                // 563
        if ($.isFunction(formatter)) return true;                                                                      // 564
        if (!formatter) return false;                                                                                  // 565
        if (typeof(formatter) === 'string') return true;                                                               // 566
        throw new Error(formatterName +" must be a string, function, or falsy value");                                 // 567
    }                                                                                                                  // 568
                                                                                                                       // 569
  /**                                                                                                                  // 570
   * Returns a given value                                                                                             // 571
   * If given a function, returns its output                                                                           // 572
   *                                                                                                                   // 573
   * @param val string|function                                                                                        // 574
   * @param context value of "this" to be passed to function                                                           // 575
   * @returns {*}                                                                                                      // 576
   */                                                                                                                  // 577
    function evaluate(val, context) {                                                                                  // 578
        if ($.isFunction(val)) {                                                                                       // 579
            var args = Array.prototype.slice.call(arguments, 2);                                                       // 580
            return val.apply(context, args);                                                                           // 581
        }                                                                                                              // 582
        return val;                                                                                                    // 583
    }                                                                                                                  // 584
                                                                                                                       // 585
    function countResults(results) {                                                                                   // 586
        var count = 0;                                                                                                 // 587
        $.each(results, function(i, item) {                                                                            // 588
            if (item.children) {                                                                                       // 589
                count += countResults(item.children);                                                                  // 590
            } else {                                                                                                   // 591
                count++;                                                                                               // 592
            }                                                                                                          // 593
        });                                                                                                            // 594
        return count;                                                                                                  // 595
    }                                                                                                                  // 596
                                                                                                                       // 597
    /**                                                                                                                // 598
     * Default tokenizer. This function uses breaks the input on substring match of any string from the                // 599
     * opts.tokenSeparators array and uses opts.createSearchChoice to create the choice object. Both of those          // 600
     * two options have to be defined in order for the tokenizer to work.                                              // 601
     *                                                                                                                 // 602
     * @param input text user has typed so far or pasted into the search field                                         // 603
     * @param selection currently selected choices                                                                     // 604
     * @param selectCallback function(choice) callback tho add the choice to selection                                 // 605
     * @param opts select2's opts                                                                                      // 606
     * @return undefined/null to leave the current input unchanged, or a string to change the input to the returned value
     */                                                                                                                // 608
    function defaultTokenizer(input, selection, selectCallback, opts) {                                                // 609
        var original = input, // store the original so we can compare and know if we need to tell the search to update its text
            dupe = false, // check for whether a token we extracted represents a duplicate selected choice             // 611
            token, // token                                                                                            // 612
            index, // position at which the separator was found                                                        // 613
            i, l, // looping variables                                                                                 // 614
            separator; // the matched separator                                                                        // 615
                                                                                                                       // 616
        if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;    // 617
                                                                                                                       // 618
        while (true) {                                                                                                 // 619
            index = -1;                                                                                                // 620
                                                                                                                       // 621
            for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {                                                 // 622
                separator = opts.tokenSeparators[i];                                                                   // 623
                index = input.indexOf(separator);                                                                      // 624
                if (index >= 0) break;                                                                                 // 625
            }                                                                                                          // 626
                                                                                                                       // 627
            if (index < 0) break; // did not find any token separator in the input string, bail                        // 628
                                                                                                                       // 629
            token = input.substring(0, index);                                                                         // 630
            input = input.substring(index + separator.length);                                                         // 631
                                                                                                                       // 632
            if (token.length > 0) {                                                                                    // 633
                token = opts.createSearchChoice.call(this, token, selection);                                          // 634
                if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
                    dupe = false;                                                                                      // 636
                    for (i = 0, l = selection.length; i < l; i++) {                                                    // 637
                        if (equal(opts.id(token), opts.id(selection[i]))) {                                            // 638
                            dupe = true; break;                                                                        // 639
                        }                                                                                              // 640
                    }                                                                                                  // 641
                                                                                                                       // 642
                    if (!dupe) selectCallback(token);                                                                  // 643
                }                                                                                                      // 644
            }                                                                                                          // 645
        }                                                                                                              // 646
                                                                                                                       // 647
        if (original!==input) return input;                                                                            // 648
    }                                                                                                                  // 649
                                                                                                                       // 650
    function cleanupJQueryElements() {                                                                                 // 651
        var self = this;                                                                                               // 652
                                                                                                                       // 653
        $.each(arguments, function (i, element) {                                                                      // 654
            self[element].remove();                                                                                    // 655
            self[element] = null;                                                                                      // 656
        });                                                                                                            // 657
    }                                                                                                                  // 658
                                                                                                                       // 659
    /**                                                                                                                // 660
     * Creates a new class                                                                                             // 661
     *                                                                                                                 // 662
     * @param superClass                                                                                               // 663
     * @param methods                                                                                                  // 664
     */                                                                                                                // 665
    function clazz(SuperClass, methods) {                                                                              // 666
        var constructor = function () {};                                                                              // 667
        constructor.prototype = new SuperClass;                                                                        // 668
        constructor.prototype.constructor = constructor;                                                               // 669
        constructor.prototype.parent = SuperClass.prototype;                                                           // 670
        constructor.prototype = $.extend(constructor.prototype, methods);                                              // 671
        return constructor;                                                                                            // 672
    }                                                                                                                  // 673
                                                                                                                       // 674
    AbstractSelect2 = clazz(Object, {                                                                                  // 675
                                                                                                                       // 676
        // abstract                                                                                                    // 677
        bind: function (func) {                                                                                        // 678
            var self = this;                                                                                           // 679
            return function () {                                                                                       // 680
                func.apply(self, arguments);                                                                           // 681
            };                                                                                                         // 682
        },                                                                                                             // 683
                                                                                                                       // 684
        // abstract                                                                                                    // 685
        init: function (opts) {                                                                                        // 686
            var results, search, resultsSelector = ".select2-results";                                                 // 687
                                                                                                                       // 688
            // prepare options                                                                                         // 689
            this.opts = opts = this.prepareOpts(opts);                                                                 // 690
                                                                                                                       // 691
            this.id=opts.id;                                                                                           // 692
                                                                                                                       // 693
            // destroy if called on an existing component                                                              // 694
            if (opts.element.data("select2") !== undefined &&                                                          // 695
                opts.element.data("select2") !== null) {                                                               // 696
                opts.element.data("select2").destroy();                                                                // 697
            }                                                                                                          // 698
                                                                                                                       // 699
            this.container = this.createContainer();                                                                   // 700
                                                                                                                       // 701
            this.liveRegion = $('.select2-hidden-accessible');                                                         // 702
            if (this.liveRegion.length == 0) {                                                                         // 703
                this.liveRegion = $("<span>", {                                                                        // 704
                        role: "status",                                                                                // 705
                        "aria-live": "polite"                                                                          // 706
                    })                                                                                                 // 707
                    .addClass("select2-hidden-accessible")                                                             // 708
                    .appendTo(document.body);                                                                          // 709
            }                                                                                                          // 710
                                                                                                                       // 711
            this.containerId="s2id_"+(opts.element.attr("id") || "autogen"+nextUid());                                 // 712
            this.containerEventName= this.containerId                                                                  // 713
                .replace(/([.])/g, '_')                                                                                // 714
                .replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');                                         // 715
            this.container.attr("id", this.containerId);                                                               // 716
                                                                                                                       // 717
            this.container.attr("title", opts.element.attr("title"));                                                  // 718
                                                                                                                       // 719
            this.body = $(document.body);                                                                              // 720
                                                                                                                       // 721
            syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);                       // 722
                                                                                                                       // 723
            this.container.attr("style", opts.element.attr("style"));                                                  // 724
            this.container.css(evaluate(opts.containerCss, this.opts.element));                                        // 725
            this.container.addClass(evaluate(opts.containerCssClass, this.opts.element));                              // 726
                                                                                                                       // 727
            this.elementTabIndex = this.opts.element.attr("tabindex");                                                 // 728
                                                                                                                       // 729
            // swap container for the element                                                                          // 730
            this.opts.element                                                                                          // 731
                .data("select2", this)                                                                                 // 732
                .attr("tabindex", "-1")                                                                                // 733
                .before(this.container)                                                                                // 734
                .on("click.select2", killEvent); // do not leak click events                                           // 735
                                                                                                                       // 736
            this.container.data("select2", this);                                                                      // 737
                                                                                                                       // 738
            this.dropdown = this.container.find(".select2-drop");                                                      // 739
                                                                                                                       // 740
            syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);                         // 741
                                                                                                                       // 742
            this.dropdown.addClass(evaluate(opts.dropdownCssClass, this.opts.element));                                // 743
            this.dropdown.data("select2", this);                                                                       // 744
            this.dropdown.on("click", killEvent);                                                                      // 745
                                                                                                                       // 746
            this.results = results = this.container.find(resultsSelector);                                             // 747
            this.search = search = this.container.find("input.select2-input");                                         // 748
                                                                                                                       // 749
            this.queryCount = 0;                                                                                       // 750
            this.resultsPage = 0;                                                                                      // 751
            this.context = null;                                                                                       // 752
                                                                                                                       // 753
            // initialize the container                                                                                // 754
            this.initContainer();                                                                                      // 755
                                                                                                                       // 756
            this.container.on("click", killEvent);                                                                     // 757
                                                                                                                       // 758
            installFilteredMouseMove(this.results);                                                                    // 759
                                                                                                                       // 760
            this.dropdown.on("mousemove-filtered", resultsSelector, this.bind(this.highlightUnderEvent));              // 761
            this.dropdown.on("touchstart touchmove touchend", resultsSelector, this.bind(function (event) {            // 762
                this._touchEvent = true;                                                                               // 763
                this.highlightUnderEvent(event);                                                                       // 764
            }));                                                                                                       // 765
            this.dropdown.on("touchmove", resultsSelector, this.bind(this.touchMoved));                                // 766
            this.dropdown.on("touchstart touchend", resultsSelector, this.bind(this.clearTouchMoved));                 // 767
                                                                                                                       // 768
            // Waiting for a click event on touch devices to select option and hide dropdown                           // 769
            // otherwise click will be triggered on an underlying element                                              // 770
            this.dropdown.on('click', this.bind(function (event) {                                                     // 771
                if (this._touchEvent) {                                                                                // 772
                    this._touchEvent = false;                                                                          // 773
                    this.selectHighlighted();                                                                          // 774
                }                                                                                                      // 775
            }));                                                                                                       // 776
                                                                                                                       // 777
            installDebouncedScroll(80, this.results);                                                                  // 778
            this.dropdown.on("scroll-debounced", resultsSelector, this.bind(this.loadMoreIfNeeded));                   // 779
                                                                                                                       // 780
            // do not propagate change event from the search field out of the component                                // 781
            $(this.container).on("change", ".select2-input", function(e) {e.stopPropagation();});                      // 782
            $(this.dropdown).on("change", ".select2-input", function(e) {e.stopPropagation();});                       // 783
                                                                                                                       // 784
            // if jquery.mousewheel plugin is installed we can prevent out-of-bounds scrolling of results via mousewheel
            if ($.fn.mousewheel) {                                                                                     // 786
                results.mousewheel(function (e, delta, deltaX, deltaY) {                                               // 787
                    var top = results.scrollTop();                                                                     // 788
                    if (deltaY > 0 && top - deltaY <= 0) {                                                             // 789
                        results.scrollTop(0);                                                                          // 790
                        killEvent(e);                                                                                  // 791
                    } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
                        results.scrollTop(results.get(0).scrollHeight - results.height());                             // 793
                        killEvent(e);                                                                                  // 794
                    }                                                                                                  // 795
                });                                                                                                    // 796
            }                                                                                                          // 797
                                                                                                                       // 798
            installKeyUpChangeEvent(search);                                                                           // 799
            search.on("keyup-change input paste", this.bind(this.updateResults));                                      // 800
            search.on("focus", function () { search.addClass("select2-focused"); });                                   // 801
            search.on("blur", function () { search.removeClass("select2-focused");});                                  // 802
                                                                                                                       // 803
            this.dropdown.on("mouseup", resultsSelector, this.bind(function (e) {                                      // 804
                if ($(e.target).closest(".select2-result-selectable").length > 0) {                                    // 805
                    this.highlightUnderEvent(e);                                                                       // 806
                    this.selectHighlighted(e);                                                                         // 807
                }                                                                                                      // 808
            }));                                                                                                       // 809
                                                                                                                       // 810
            // trap all mouse events from leaving the dropdown. sometimes there may be a modal that is listening       // 811
            // for mouse events outside of itself so it can close itself. since the dropdown is now outside the select2's
            // dom it will trigger the popup close, which is not what we want                                          // 813
            // focusin can cause focus wars between modals and select2 since the dropdown is outside the modal.        // 814
            this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function (e) { e.stopPropagation(); });
                                                                                                                       // 816
            this.nextSearchTerm = undefined;                                                                           // 817
                                                                                                                       // 818
            if ($.isFunction(this.opts.initSelection)) {                                                               // 819
                // initialize selection based on the current value of the source element                               // 820
                this.initSelection();                                                                                  // 821
                                                                                                                       // 822
                // if the user has provided a function that can set selection based on the value of the source element // 823
                // we monitor the change event on the element and trigger it, allowing for two way synchronization     // 824
                this.monitorSource();                                                                                  // 825
            }                                                                                                          // 826
                                                                                                                       // 827
            if (opts.maximumInputLength !== null) {                                                                    // 828
                this.search.attr("maxlength", opts.maximumInputLength);                                                // 829
            }                                                                                                          // 830
                                                                                                                       // 831
            var disabled = opts.element.prop("disabled");                                                              // 832
            if (disabled === undefined) disabled = false;                                                              // 833
            this.enable(!disabled);                                                                                    // 834
                                                                                                                       // 835
            var readonly = opts.element.prop("readonly");                                                              // 836
            if (readonly === undefined) readonly = false;                                                              // 837
            this.readonly(readonly);                                                                                   // 838
                                                                                                                       // 839
            // Calculate size of scrollbar                                                                             // 840
            scrollBarDimensions = scrollBarDimensions || measureScrollbar();                                           // 841
                                                                                                                       // 842
            this.autofocus = opts.element.prop("autofocus");                                                           // 843
            opts.element.prop("autofocus", false);                                                                     // 844
            if (this.autofocus) this.focus();                                                                          // 845
                                                                                                                       // 846
            this.search.attr("placeholder", opts.searchInputPlaceholder);                                              // 847
        },                                                                                                             // 848
                                                                                                                       // 849
        // abstract                                                                                                    // 850
        destroy: function () {                                                                                         // 851
            var element=this.opts.element, select2 = element.data("select2"), self = this;                             // 852
                                                                                                                       // 853
            this.close();                                                                                              // 854
                                                                                                                       // 855
            if (element.length && element[0].detachEvent && self._sync) {                                              // 856
                element.each(function () {                                                                             // 857
                    if (self._sync) {                                                                                  // 858
                        this.detachEvent("onpropertychange", self._sync);                                              // 859
                    }                                                                                                  // 860
                });                                                                                                    // 861
            }                                                                                                          // 862
            if (this.propertyObserver) {                                                                               // 863
                this.propertyObserver.disconnect();                                                                    // 864
                this.propertyObserver = null;                                                                          // 865
            }                                                                                                          // 866
            this._sync = null;                                                                                         // 867
                                                                                                                       // 868
            if (select2 !== undefined) {                                                                               // 869
                select2.container.remove();                                                                            // 870
                select2.liveRegion.remove();                                                                           // 871
                select2.dropdown.remove();                                                                             // 872
                element                                                                                                // 873
                    .show()                                                                                            // 874
                    .removeData("select2")                                                                             // 875
                    .off(".select2")                                                                                   // 876
                    .prop("autofocus", this.autofocus || false);                                                       // 877
                if (this.elementTabIndex) {                                                                            // 878
                    element.attr({tabindex: this.elementTabIndex});                                                    // 879
                } else {                                                                                               // 880
                    element.removeAttr("tabindex");                                                                    // 881
                }                                                                                                      // 882
                element.show();                                                                                        // 883
            }                                                                                                          // 884
                                                                                                                       // 885
            cleanupJQueryElements.call(this,                                                                           // 886
                "container",                                                                                           // 887
                "liveRegion",                                                                                          // 888
                "dropdown",                                                                                            // 889
                "results",                                                                                             // 890
                "search"                                                                                               // 891
            );                                                                                                         // 892
        },                                                                                                             // 893
                                                                                                                       // 894
        // abstract                                                                                                    // 895
        optionToData: function(element) {                                                                              // 896
            if (element.is("option")) {                                                                                // 897
                return {                                                                                               // 898
                    id:element.prop("value"),                                                                          // 899
                    text:element.text(),                                                                               // 900
                    element: element.get(),                                                                            // 901
                    css: element.attr("class"),                                                                        // 902
                    disabled: element.prop("disabled"),                                                                // 903
                    locked: equal(element.attr("locked"), "locked") || equal(element.data("locked"), true)             // 904
                };                                                                                                     // 905
            } else if (element.is("optgroup")) {                                                                       // 906
                return {                                                                                               // 907
                    text:element.attr("label"),                                                                        // 908
                    children:[],                                                                                       // 909
                    element: element.get(),                                                                            // 910
                    css: element.attr("class")                                                                         // 911
                };                                                                                                     // 912
            }                                                                                                          // 913
        },                                                                                                             // 914
                                                                                                                       // 915
        // abstract                                                                                                    // 916
        prepareOpts: function (opts) {                                                                                 // 917
            var element, select, idKey, ajaxUrl, self = this;                                                          // 918
                                                                                                                       // 919
            element = opts.element;                                                                                    // 920
                                                                                                                       // 921
            if (element.get(0).tagName.toLowerCase() === "select") {                                                   // 922
                this.select = select = opts.element;                                                                   // 923
            }                                                                                                          // 924
                                                                                                                       // 925
            if (select) {                                                                                              // 926
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {                                                                                // 929
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }                                                                                                  // 931
                });                                                                                                    // 932
            }                                                                                                          // 933
                                                                                                                       // 934
            opts = $.extend({}, {                                                                                      // 935
                populateResults: function(container, results, query) {                                                 // 936
                    var populate, id=this.opts.id, liveRegion=this.liveRegion;                                         // 937
                                                                                                                       // 938
                    populate=function(results, container, depth) {                                                     // 939
                                                                                                                       // 940
                        var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;      // 941
                                                                                                                       // 942
                        results = opts.sortResults(results, container, query);                                         // 943
                                                                                                                       // 944
                        // collect the created nodes for bulk append                                                   // 945
                        var nodes = [];                                                                                // 946
                        for (i = 0, l = results.length; i < l; i = i + 1) {                                            // 947
                                                                                                                       // 948
                            result=results[i];                                                                         // 949
                                                                                                                       // 950
                            disabled = (result.disabled === true);                                                     // 951
                            selectable = (!disabled) && (id(result) !== undefined);                                    // 952
                                                                                                                       // 953
                            compound=result.children && result.children.length > 0;                                    // 954
                                                                                                                       // 955
                            node=$("<li></li>");                                                                       // 956
                            node.addClass("select2-results-dept-"+depth);                                              // 957
                            node.addClass("select2-result");                                                           // 958
                            node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");   // 959
                            if (disabled) { node.addClass("select2-disabled"); }                                       // 960
                            if (compound) { node.addClass("select2-result-with-children"); }                           // 961
                            node.addClass(self.opts.formatResultCssClass(result));                                     // 962
                            node.attr("role", "presentation");                                                         // 963
                                                                                                                       // 964
                            label=$(document.createElement("div"));                                                    // 965
                            label.addClass("select2-result-label");                                                    // 966
                            label.attr("id", "select2-result-label-" + nextUid());                                     // 967
                            label.attr("role", "option");                                                              // 968
                                                                                                                       // 969
                            formatted=opts.formatResult(result, label, query, self.opts.escapeMarkup);                 // 970
                            if (formatted!==undefined) {                                                               // 971
                                label.html(formatted);                                                                 // 972
                                node.append(label);                                                                    // 973
                            }                                                                                          // 974
                                                                                                                       // 975
                                                                                                                       // 976
                            if (compound) {                                                                            // 977
                                                                                                                       // 978
                                innerContainer=$("<ul></ul>");                                                         // 979
                                innerContainer.addClass("select2-result-sub");                                         // 980
                                populate(result.children, innerContainer, depth+1);                                    // 981
                                node.append(innerContainer);                                                           // 982
                            }                                                                                          // 983
                                                                                                                       // 984
                            node.data("select2-data", result);                                                         // 985
                            nodes.push(node[0]);                                                                       // 986
                        }                                                                                              // 987
                                                                                                                       // 988
                        // bulk append the created nodes                                                               // 989
                        container.append(nodes);                                                                       // 990
                        liveRegion.text(opts.formatMatches(results.length));                                           // 991
                    };                                                                                                 // 992
                                                                                                                       // 993
                    populate(results, container, 0);                                                                   // 994
                }                                                                                                      // 995
            }, $.fn.select2.defaults, opts);                                                                           // 996
                                                                                                                       // 997
            if (typeof(opts.id) !== "function") {                                                                      // 998
                idKey = opts.id;                                                                                       // 999
                opts.id = function (e) { return e[idKey]; };                                                           // 1000
            }                                                                                                          // 1001
                                                                                                                       // 1002
            if ($.isArray(opts.element.data("select2Tags"))) {                                                         // 1003
                if ("tags" in opts) {                                                                                  // 1004
                    throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
                }                                                                                                      // 1006
                opts.tags=opts.element.data("select2Tags");                                                            // 1007
            }                                                                                                          // 1008
                                                                                                                       // 1009
            if (select) {                                                                                              // 1010
                opts.query = this.bind(function (query) {                                                              // 1011
                    var data = { results: [], more: false },                                                           // 1012
                        term = query.term,                                                                             // 1013
                        children, placeholderOption, process;                                                          // 1014
                                                                                                                       // 1015
                    process=function(element, collection) {                                                            // 1016
                        var group;                                                                                     // 1017
                        if (element.is("option")) {                                                                    // 1018
                            if (query.matcher(term, element.text(), element)) {                                        // 1019
                                collection.push(self.optionToData(element));                                           // 1020
                            }                                                                                          // 1021
                        } else if (element.is("optgroup")) {                                                           // 1022
                            group=self.optionToData(element);                                                          // 1023
                            element.children().each2(function(i, elm) { process(elm, group.children); });              // 1024
                            if (group.children.length>0) {                                                             // 1025
                                collection.push(group);                                                                // 1026
                            }                                                                                          // 1027
                        }                                                                                              // 1028
                    };                                                                                                 // 1029
                                                                                                                       // 1030
                    children=element.children();                                                                       // 1031
                                                                                                                       // 1032
                    // ignore the placeholder option if there is one                                                   // 1033
                    if (this.getPlaceholder() !== undefined && children.length > 0) {                                  // 1034
                        placeholderOption = this.getPlaceholderOption();                                               // 1035
                        if (placeholderOption) {                                                                       // 1036
                            children=children.not(placeholderOption);                                                  // 1037
                        }                                                                                              // 1038
                    }                                                                                                  // 1039
                                                                                                                       // 1040
                    children.each2(function(i, elm) { process(elm, data.results); });                                  // 1041
                                                                                                                       // 1042
                    query.callback(data);                                                                              // 1043
                });                                                                                                    // 1044
                // this is needed because inside val() we construct choices from options and their id is hardcoded     // 1045
                opts.id=function(e) { return e.id; };                                                                  // 1046
            } else {                                                                                                   // 1047
                if (!("query" in opts)) {                                                                              // 1048
                                                                                                                       // 1049
                    if ("ajax" in opts) {                                                                              // 1050
                        ajaxUrl = opts.element.data("ajax-url");                                                       // 1051
                        if (ajaxUrl && ajaxUrl.length > 0) {                                                           // 1052
                            opts.ajax.url = ajaxUrl;                                                                   // 1053
                        }                                                                                              // 1054
                        opts.query = ajax.call(opts.element, opts.ajax);                                               // 1055
                    } else if ("data" in opts) {                                                                       // 1056
                        opts.query = local(opts.data);                                                                 // 1057
                    } else if ("tags" in opts) {                                                                       // 1058
                        opts.query = tags(opts.tags);                                                                  // 1059
                        if (opts.createSearchChoice === undefined) {                                                   // 1060
                            opts.createSearchChoice = function (term) { return {id: $.trim(term), text: $.trim(term)}; };
                        }                                                                                              // 1062
                        if (opts.initSelection === undefined) {                                                        // 1063
                            opts.initSelection = function (element, callback) {                                        // 1064
                                var data = [];                                                                         // 1065
                                $(splitVal(element.val(), opts.separator, opts.transformVal)).each(function () {       // 1066
                                    var obj = { id: this, text: this },                                                // 1067
                                        tags = opts.tags;                                                              // 1068
                                    if ($.isFunction(tags)) tags=tags();                                               // 1069
                                    $(tags).each(function() { if (equal(this.id, obj.id)) { obj = this; return false; } });
                                    data.push(obj);                                                                    // 1071
                                });                                                                                    // 1072
                                                                                                                       // 1073
                                callback(data);                                                                        // 1074
                            };                                                                                         // 1075
                        }                                                                                              // 1076
                    }                                                                                                  // 1077
                }                                                                                                      // 1078
            }                                                                                                          // 1079
            if (typeof(opts.query) !== "function") {                                                                   // 1080
                throw "query function not defined for Select2 " + opts.element.attr("id");                             // 1081
            }                                                                                                          // 1082
                                                                                                                       // 1083
            if (opts.createSearchChoicePosition === 'top') {                                                           // 1084
                opts.createSearchChoicePosition = function(list, item) { list.unshift(item); };                        // 1085
            }                                                                                                          // 1086
            else if (opts.createSearchChoicePosition === 'bottom') {                                                   // 1087
                opts.createSearchChoicePosition = function(list, item) { list.push(item); };                           // 1088
            }                                                                                                          // 1089
            else if (typeof(opts.createSearchChoicePosition) !== "function")  {                                        // 1090
                throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";        // 1091
            }                                                                                                          // 1092
                                                                                                                       // 1093
            return opts;                                                                                               // 1094
        },                                                                                                             // 1095
                                                                                                                       // 1096
        /**                                                                                                            // 1097
         * Monitor the original element for changes and update select2 accordingly                                     // 1098
         */                                                                                                            // 1099
        // abstract                                                                                                    // 1100
        monitorSource: function () {                                                                                   // 1101
            var el = this.opts.element, observer, self = this;                                                         // 1102
                                                                                                                       // 1103
            el.on("change.select2", this.bind(function (e) {                                                           // 1104
                if (this.opts.element.data("select2-change-triggered") !== true) {                                     // 1105
                    this.initSelection();                                                                              // 1106
                }                                                                                                      // 1107
            }));                                                                                                       // 1108
                                                                                                                       // 1109
            this._sync = this.bind(function () {                                                                       // 1110
                                                                                                                       // 1111
                // sync enabled state                                                                                  // 1112
                var disabled = el.prop("disabled");                                                                    // 1113
                if (disabled === undefined) disabled = false;                                                          // 1114
                this.enable(!disabled);                                                                                // 1115
                                                                                                                       // 1116
                var readonly = el.prop("readonly");                                                                    // 1117
                if (readonly === undefined) readonly = false;                                                          // 1118
                this.readonly(readonly);                                                                               // 1119
                                                                                                                       // 1120
                if (this.container) {                                                                                  // 1121
                    syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);               // 1122
                    this.container.addClass(evaluate(this.opts.containerCssClass, this.opts.element));                 // 1123
                }                                                                                                      // 1124
                                                                                                                       // 1125
                if (this.dropdown) {                                                                                   // 1126
                    syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);                 // 1127
                    this.dropdown.addClass(evaluate(this.opts.dropdownCssClass, this.opts.element));                   // 1128
                }                                                                                                      // 1129
                                                                                                                       // 1130
            });                                                                                                        // 1131
                                                                                                                       // 1132
            // IE8-10 (IE9/10 won't fire propertyChange via attachEventListener)                                       // 1133
            if (el.length && el[0].attachEvent) {                                                                      // 1134
                el.each(function() {                                                                                   // 1135
                    this.attachEvent("onpropertychange", self._sync);                                                  // 1136
                });                                                                                                    // 1137
            }                                                                                                          // 1138
                                                                                                                       // 1139
            // safari, chrome, firefox, IE11                                                                           // 1140
            observer = window.MutationObserver || window.WebKitMutationObserver|| window.MozMutationObserver;          // 1141
            if (observer !== undefined) {                                                                              // 1142
                if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }             // 1143
                this.propertyObserver = new observer(function (mutations) {                                            // 1144
                    $.each(mutations, self._sync);                                                                     // 1145
                });                                                                                                    // 1146
                this.propertyObserver.observe(el.get(0), { attributes:true, subtree:false });                          // 1147
            }                                                                                                          // 1148
        },                                                                                                             // 1149
                                                                                                                       // 1150
        // abstract                                                                                                    // 1151
        triggerSelect: function(data) {                                                                                // 1152
            var evt = $.Event("select2-selecting", { val: this.id(data), object: data, choice: data });                // 1153
            this.opts.element.trigger(evt);                                                                            // 1154
            return !evt.isDefaultPrevented();                                                                          // 1155
        },                                                                                                             // 1156
                                                                                                                       // 1157
        /**                                                                                                            // 1158
         * Triggers the change event on the source element                                                             // 1159
         */                                                                                                            // 1160
        // abstract                                                                                                    // 1161
        triggerChange: function (details) {                                                                            // 1162
                                                                                                                       // 1163
            details = details || {};                                                                                   // 1164
            details= $.extend({}, details, { type: "change", val: this.val() });                                       // 1165
            // prevents recursive triggering                                                                           // 1166
            this.opts.element.data("select2-change-triggered", true);                                                  // 1167
            this.opts.element.trigger(details);                                                                        // 1168
            this.opts.element.data("select2-change-triggered", false);                                                 // 1169
                                                                                                                       // 1170
            // some validation frameworks ignore the change event and listen instead to keyup, click for selects       // 1171
            // so here we trigger the click event manually                                                             // 1172
            this.opts.element.click();                                                                                 // 1173
                                                                                                                       // 1174
            // ValidationEngine ignores the change event and listens instead to blur                                   // 1175
            // so here we trigger the blur event manually if so desired                                                // 1176
            if (this.opts.blurOnChange)                                                                                // 1177
                this.opts.element.blur();                                                                              // 1178
        },                                                                                                             // 1179
                                                                                                                       // 1180
        //abstract                                                                                                     // 1181
        isInterfaceEnabled: function()                                                                                 // 1182
        {                                                                                                              // 1183
            return this.enabledInterface === true;                                                                     // 1184
        },                                                                                                             // 1185
                                                                                                                       // 1186
        // abstract                                                                                                    // 1187
        enableInterface: function() {                                                                                  // 1188
            var enabled = this._enabled && !this._readonly,                                                            // 1189
                disabled = !enabled;                                                                                   // 1190
                                                                                                                       // 1191
            if (enabled === this.enabledInterface) return false;                                                       // 1192
                                                                                                                       // 1193
            this.container.toggleClass("select2-container-disabled", disabled);                                        // 1194
            this.close();                                                                                              // 1195
            this.enabledInterface = enabled;                                                                           // 1196
                                                                                                                       // 1197
            return true;                                                                                               // 1198
        },                                                                                                             // 1199
                                                                                                                       // 1200
        // abstract                                                                                                    // 1201
        enable: function(enabled) {                                                                                    // 1202
            if (enabled === undefined) enabled = true;                                                                 // 1203
            if (this._enabled === enabled) return;                                                                     // 1204
            this._enabled = enabled;                                                                                   // 1205
                                                                                                                       // 1206
            this.opts.element.prop("disabled", !enabled);                                                              // 1207
            this.enableInterface();                                                                                    // 1208
        },                                                                                                             // 1209
                                                                                                                       // 1210
        // abstract                                                                                                    // 1211
        disable: function() {                                                                                          // 1212
            this.enable(false);                                                                                        // 1213
        },                                                                                                             // 1214
                                                                                                                       // 1215
        // abstract                                                                                                    // 1216
        readonly: function(enabled) {                                                                                  // 1217
            if (enabled === undefined) enabled = false;                                                                // 1218
            if (this._readonly === enabled) return;                                                                    // 1219
            this._readonly = enabled;                                                                                  // 1220
                                                                                                                       // 1221
            this.opts.element.prop("readonly", enabled);                                                               // 1222
            this.enableInterface();                                                                                    // 1223
        },                                                                                                             // 1224
                                                                                                                       // 1225
        // abstract                                                                                                    // 1226
        opened: function () {                                                                                          // 1227
            return (this.container) ? this.container.hasClass("select2-dropdown-open") : false;                        // 1228
        },                                                                                                             // 1229
                                                                                                                       // 1230
        // abstract                                                                                                    // 1231
        positionDropdown: function() {                                                                                 // 1232
            var $dropdown = this.dropdown,                                                                             // 1233
                container = this.container,                                                                            // 1234
                offset = container.offset(),                                                                           // 1235
                height = container.outerHeight(false),                                                                 // 1236
                width = container.outerWidth(false),                                                                   // 1237
                dropHeight = $dropdown.outerHeight(false),                                                             // 1238
                $window = $(window),                                                                                   // 1239
                windowWidth = $window.width(),                                                                         // 1240
                windowHeight = $window.height(),                                                                       // 1241
                viewPortRight = $window.scrollLeft() + windowWidth,                                                    // 1242
                viewportBottom = $window.scrollTop() + windowHeight,                                                   // 1243
                dropTop = offset.top + height,                                                                         // 1244
                dropLeft = offset.left,                                                                                // 1245
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,                                              // 1246
                enoughRoomAbove = (offset.top - dropHeight) >= $window.scrollTop(),                                    // 1247
                dropWidth = $dropdown.outerWidth(false),                                                               // 1248
                enoughRoomOnRight = function() {                                                                       // 1249
                    return dropLeft + dropWidth <= viewPortRight;                                                      // 1250
                },                                                                                                     // 1251
                enoughRoomOnLeft = function() {                                                                        // 1252
                    return offset.left + viewPortRight + container.outerWidth(false)  > dropWidth;                     // 1253
                },                                                                                                     // 1254
                aboveNow = $dropdown.hasClass("select2-drop-above"),                                                   // 1255
                bodyOffset,                                                                                            // 1256
                above,                                                                                                 // 1257
                changeDirection,                                                                                       // 1258
                css,                                                                                                   // 1259
                resultsListNode;                                                                                       // 1260
                                                                                                                       // 1261
            // always prefer the current above/below alignment, unless there is not enough room                        // 1262
            if (aboveNow) {                                                                                            // 1263
                above = true;                                                                                          // 1264
                if (!enoughRoomAbove && enoughRoomBelow) {                                                             // 1265
                    changeDirection = true;                                                                            // 1266
                    above = false;                                                                                     // 1267
                }                                                                                                      // 1268
            } else {                                                                                                   // 1269
                above = false;                                                                                         // 1270
                if (!enoughRoomBelow && enoughRoomAbove) {                                                             // 1271
                    changeDirection = true;                                                                            // 1272
                    above = true;                                                                                      // 1273
                }                                                                                                      // 1274
            }                                                                                                          // 1275
                                                                                                                       // 1276
            //if we are changing direction we need to get positions when dropdown is hidden;                           // 1277
            if (changeDirection) {                                                                                     // 1278
                $dropdown.hide();                                                                                      // 1279
                offset = this.container.offset();                                                                      // 1280
                height = this.container.outerHeight(false);                                                            // 1281
                width = this.container.outerWidth(false);                                                              // 1282
                dropHeight = $dropdown.outerHeight(false);                                                             // 1283
                viewPortRight = $window.scrollLeft() + windowWidth;                                                    // 1284
                viewportBottom = $window.scrollTop() + windowHeight;                                                   // 1285
                dropTop = offset.top + height;                                                                         // 1286
                dropLeft = offset.left;                                                                                // 1287
                dropWidth = $dropdown.outerWidth(false);                                                               // 1288
                $dropdown.show();                                                                                      // 1289
                                                                                                                       // 1290
                // fix so the cursor does not move to the left within the search-textbox in IE                         // 1291
                this.focusSearch();                                                                                    // 1292
            }                                                                                                          // 1293
                                                                                                                       // 1294
            if (this.opts.dropdownAutoWidth) {                                                                         // 1295
                resultsListNode = $('.select2-results', $dropdown)[0];                                                 // 1296
                $dropdown.addClass('select2-drop-auto-width');                                                         // 1297
                $dropdown.css('width', '');                                                                            // 1298
                // Add scrollbar width to dropdown if vertical scrollbar is present                                    // 1299
                dropWidth = $dropdown.outerWidth(false) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width);
                dropWidth > width ? width = dropWidth : dropWidth = width;                                             // 1301
                dropHeight = $dropdown.outerHeight(false);                                                             // 1302
            }                                                                                                          // 1303
            else {                                                                                                     // 1304
                this.container.removeClass('select2-drop-auto-width');                                                 // 1305
            }                                                                                                          // 1306
                                                                                                                       // 1307
            //console.log("below/ droptop:", dropTop, "dropHeight", dropHeight, "sum", (dropTop+dropHeight)+" viewport bottom", viewportBottom, "enough?", enoughRoomBelow);
            //console.log("above/ offset.top", offset.top, "dropHeight", dropHeight, "top", (offset.top-dropHeight), "scrollTop", this.body.scrollTop(), "enough?", enoughRoomAbove);
                                                                                                                       // 1310
            // fix positioning when body has an offset and is not position: static                                     // 1311
            if (this.body.css('position') !== 'static') {                                                              // 1312
                bodyOffset = this.body.offset();                                                                       // 1313
                dropTop -= bodyOffset.top;                                                                             // 1314
                dropLeft -= bodyOffset.left;                                                                           // 1315
            }                                                                                                          // 1316
                                                                                                                       // 1317
            if (!enoughRoomOnRight() && enoughRoomOnLeft()) {                                                          // 1318
                dropLeft = offset.left + this.container.outerWidth(false) - dropWidth;                                 // 1319
            }                                                                                                          // 1320
                                                                                                                       // 1321
            css =  {                                                                                                   // 1322
                left: dropLeft,                                                                                        // 1323
                width: width                                                                                           // 1324
            };                                                                                                         // 1325
                                                                                                                       // 1326
            if (above) {                                                                                               // 1327
                css.top = offset.top - dropHeight;                                                                     // 1328
                css.bottom = 'auto';                                                                                   // 1329
                this.container.addClass("select2-drop-above");                                                         // 1330
                $dropdown.addClass("select2-drop-above");                                                              // 1331
            }                                                                                                          // 1332
            else {                                                                                                     // 1333
                css.top = dropTop;                                                                                     // 1334
                css.bottom = 'auto';                                                                                   // 1335
                this.container.removeClass("select2-drop-above");                                                      // 1336
                $dropdown.removeClass("select2-drop-above");                                                           // 1337
            }                                                                                                          // 1338
            css = $.extend(css, evaluate(this.opts.dropdownCss, this.opts.element));                                   // 1339
                                                                                                                       // 1340
            $dropdown.css(css);                                                                                        // 1341
        },                                                                                                             // 1342
                                                                                                                       // 1343
        // abstract                                                                                                    // 1344
        shouldOpen: function() {                                                                                       // 1345
            var event;                                                                                                 // 1346
                                                                                                                       // 1347
            if (this.opened()) return false;                                                                           // 1348
                                                                                                                       // 1349
            if (this._enabled === false || this._readonly === true) return false;                                      // 1350
                                                                                                                       // 1351
            event = $.Event("select2-opening");                                                                        // 1352
            this.opts.element.trigger(event);                                                                          // 1353
            return !event.isDefaultPrevented();                                                                        // 1354
        },                                                                                                             // 1355
                                                                                                                       // 1356
        // abstract                                                                                                    // 1357
        clearDropdownAlignmentPreference: function() {                                                                 // 1358
            // clear the classes used to figure out the preference of where the dropdown should be opened              // 1359
            this.container.removeClass("select2-drop-above");                                                          // 1360
            this.dropdown.removeClass("select2-drop-above");                                                           // 1361
        },                                                                                                             // 1362
                                                                                                                       // 1363
        /**                                                                                                            // 1364
         * Opens the dropdown                                                                                          // 1365
         *                                                                                                             // 1366
         * @return {Boolean} whether or not dropdown was opened. This method will return false if, for example,        // 1367
         * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().       // 1368
         */                                                                                                            // 1369
        // abstract                                                                                                    // 1370
        open: function () {                                                                                            // 1371
                                                                                                                       // 1372
            if (!this.shouldOpen()) return false;                                                                      // 1373
                                                                                                                       // 1374
            this.opening();                                                                                            // 1375
                                                                                                                       // 1376
            // Only bind the document mousemove when the dropdown is visible                                           // 1377
            $document.on("mousemove.select2Event", function (e) {                                                      // 1378
                lastMousePosition.x = e.pageX;                                                                         // 1379
                lastMousePosition.y = e.pageY;                                                                         // 1380
            });                                                                                                        // 1381
                                                                                                                       // 1382
            return true;                                                                                               // 1383
        },                                                                                                             // 1384
                                                                                                                       // 1385
        /**                                                                                                            // 1386
         * Performs the opening of the dropdown                                                                        // 1387
         */                                                                                                            // 1388
        // abstract                                                                                                    // 1389
        opening: function() {                                                                                          // 1390
            var cid = this.containerEventName,                                                                         // 1391
                scroll = "scroll." + cid,                                                                              // 1392
                resize = "resize."+cid,                                                                                // 1393
                orient = "orientationchange."+cid,                                                                     // 1394
                mask;                                                                                                  // 1395
                                                                                                                       // 1396
            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");                     // 1397
                                                                                                                       // 1398
            this.clearDropdownAlignmentPreference();                                                                   // 1399
                                                                                                                       // 1400
            if(this.dropdown[0] !== this.body.children().last()[0]) {                                                  // 1401
                this.dropdown.detach().appendTo(this.body);                                                            // 1402
            }                                                                                                          // 1403
                                                                                                                       // 1404
            // create the dropdown mask if doesn't already exist                                                       // 1405
            mask = $("#select2-drop-mask");                                                                            // 1406
            if (mask.length === 0) {                                                                                   // 1407
                mask = $(document.createElement("div"));                                                               // 1408
                mask.attr("id","select2-drop-mask").attr("class","select2-drop-mask");                                 // 1409
                mask.hide();                                                                                           // 1410
                mask.appendTo(this.body);                                                                              // 1411
                mask.on("mousedown touchstart click", function (e) {                                                   // 1412
                    // Prevent IE from generating a click event on the body                                            // 1413
                    reinsertElement(mask);                                                                             // 1414
                                                                                                                       // 1415
                    var dropdown = $("#select2-drop"), self;                                                           // 1416
                    if (dropdown.length > 0) {                                                                         // 1417
                        self=dropdown.data("select2");                                                                 // 1418
                        if (self.opts.selectOnBlur) {                                                                  // 1419
                            self.selectHighlighted({noFocus: true});                                                   // 1420
                        }                                                                                              // 1421
                        self.close();                                                                                  // 1422
                        e.preventDefault();                                                                            // 1423
                        e.stopPropagation();                                                                           // 1424
                    }                                                                                                  // 1425
                });                                                                                                    // 1426
            }                                                                                                          // 1427
                                                                                                                       // 1428
            // ensure the mask is always right before the dropdown                                                     // 1429
            if (this.dropdown.prev()[0] !== mask[0]) {                                                                 // 1430
                this.dropdown.before(mask);                                                                            // 1431
            }                                                                                                          // 1432
                                                                                                                       // 1433
            // move the global id to the correct dropdown                                                              // 1434
            $("#select2-drop").removeAttr("id");                                                                       // 1435
            this.dropdown.attr("id", "select2-drop");                                                                  // 1436
                                                                                                                       // 1437
            // show the elements                                                                                       // 1438
            mask.show();                                                                                               // 1439
                                                                                                                       // 1440
            this.positionDropdown();                                                                                   // 1441
            this.dropdown.show();                                                                                      // 1442
            this.positionDropdown();                                                                                   // 1443
                                                                                                                       // 1444
            this.dropdown.addClass("select2-drop-active");                                                             // 1445
                                                                                                                       // 1446
            // attach listeners to events that can change the position of the container and thus require               // 1447
            // the position of the dropdown to be updated as well so it does not come unglued from the container       // 1448
            var that = this;                                                                                           // 1449
            this.container.parents().add(window).each(function () {                                                    // 1450
                $(this).on(resize+" "+scroll+" "+orient, function (e) {                                                // 1451
                    if (that.opened()) that.positionDropdown();                                                        // 1452
                });                                                                                                    // 1453
            });                                                                                                        // 1454
                                                                                                                       // 1455
                                                                                                                       // 1456
        },                                                                                                             // 1457
                                                                                                                       // 1458
        // abstract                                                                                                    // 1459
        close: function () {                                                                                           // 1460
            if (!this.opened()) return;                                                                                // 1461
                                                                                                                       // 1462
            var cid = this.containerEventName,                                                                         // 1463
                scroll = "scroll." + cid,                                                                              // 1464
                resize = "resize."+cid,                                                                                // 1465
                orient = "orientationchange."+cid;                                                                     // 1466
                                                                                                                       // 1467
            // unbind event listeners                                                                                  // 1468
            this.container.parents().add(window).each(function () { $(this).off(scroll).off(resize).off(orient); });   // 1469
                                                                                                                       // 1470
            this.clearDropdownAlignmentPreference();                                                                   // 1471
                                                                                                                       // 1472
            $("#select2-drop-mask").hide();                                                                            // 1473
            this.dropdown.removeAttr("id"); // only the active dropdown has the select2-drop id                        // 1474
            this.dropdown.hide();                                                                                      // 1475
            this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");               // 1476
            this.results.empty();                                                                                      // 1477
                                                                                                                       // 1478
            // Now that the dropdown is closed, unbind the global document mousemove event                             // 1479
            $document.off("mousemove.select2Event");                                                                   // 1480
                                                                                                                       // 1481
            this.clearSearch();                                                                                        // 1482
            this.search.removeClass("select2-active");                                                                 // 1483
            this.opts.element.trigger($.Event("select2-close"));                                                       // 1484
        },                                                                                                             // 1485
                                                                                                                       // 1486
        /**                                                                                                            // 1487
         * Opens control, sets input value, and updates results.                                                       // 1488
         */                                                                                                            // 1489
        // abstract                                                                                                    // 1490
        externalSearch: function (term) {                                                                              // 1491
            this.open();                                                                                               // 1492
            this.search.val(term);                                                                                     // 1493
            this.updateResults(false);                                                                                 // 1494
        },                                                                                                             // 1495
                                                                                                                       // 1496
        // abstract                                                                                                    // 1497
        clearSearch: function () {                                                                                     // 1498
                                                                                                                       // 1499
        },                                                                                                             // 1500
                                                                                                                       // 1501
        //abstract                                                                                                     // 1502
        getMaximumSelectionSize: function() {                                                                          // 1503
            return evaluate(this.opts.maximumSelectionSize, this.opts.element);                                        // 1504
        },                                                                                                             // 1505
                                                                                                                       // 1506
        // abstract                                                                                                    // 1507
        ensureHighlightVisible: function () {                                                                          // 1508
            var results = this.results, children, index, child, hb, rb, y, more, topOffset;                            // 1509
                                                                                                                       // 1510
            index = this.highlight();                                                                                  // 1511
                                                                                                                       // 1512
            if (index < 0) return;                                                                                     // 1513
                                                                                                                       // 1514
            if (index == 0) {                                                                                          // 1515
                                                                                                                       // 1516
                // if the first element is highlighted scroll all the way to the top,                                  // 1517
                // that way any unselectable headers above it will also be scrolled                                    // 1518
                // into view                                                                                           // 1519
                                                                                                                       // 1520
                results.scrollTop(0);                                                                                  // 1521
                return;                                                                                                // 1522
            }                                                                                                          // 1523
                                                                                                                       // 1524
            children = this.findHighlightableChoices().find('.select2-result-label');                                  // 1525
                                                                                                                       // 1526
            child = $(children[index]);                                                                                // 1527
                                                                                                                       // 1528
            topOffset = (child.offset() || {}).top || 0;                                                               // 1529
                                                                                                                       // 1530
            hb = topOffset + child.outerHeight(true);                                                                  // 1531
                                                                                                                       // 1532
            // if this is the last child lets also make sure select2-more-results is visible                           // 1533
            if (index === children.length - 1) {                                                                       // 1534
                more = results.find("li.select2-more-results");                                                        // 1535
                if (more.length > 0) {                                                                                 // 1536
                    hb = more.offset().top + more.outerHeight(true);                                                   // 1537
                }                                                                                                      // 1538
            }                                                                                                          // 1539
                                                                                                                       // 1540
            rb = results.offset().top + results.outerHeight(false);                                                    // 1541
            if (hb > rb) {                                                                                             // 1542
                results.scrollTop(results.scrollTop() + (hb - rb));                                                    // 1543
            }                                                                                                          // 1544
            y = topOffset - results.offset().top;                                                                      // 1545
                                                                                                                       // 1546
            // make sure the top of the element is visible                                                             // 1547
            if (y < 0 && child.css('display') != 'none' ) {                                                            // 1548
                results.scrollTop(results.scrollTop() + y); // y is negative                                           // 1549
            }                                                                                                          // 1550
        },                                                                                                             // 1551
                                                                                                                       // 1552
        // abstract                                                                                                    // 1553
        findHighlightableChoices: function() {                                                                         // 1554
            return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)");      // 1555
        },                                                                                                             // 1556
                                                                                                                       // 1557
        // abstract                                                                                                    // 1558
        moveHighlight: function (delta) {                                                                              // 1559
            var choices = this.findHighlightableChoices(),                                                             // 1560
                index = this.highlight();                                                                              // 1561
                                                                                                                       // 1562
            while (index > -1 && index < choices.length) {                                                             // 1563
                index += delta;                                                                                        // 1564
                var choice = $(choices[index]);                                                                        // 1565
                if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
                    this.highlight(index);                                                                             // 1567
                    break;                                                                                             // 1568
                }                                                                                                      // 1569
            }                                                                                                          // 1570
        },                                                                                                             // 1571
                                                                                                                       // 1572
        // abstract                                                                                                    // 1573
        highlight: function (index) {                                                                                  // 1574
            var choices = this.findHighlightableChoices(),                                                             // 1575
                choice,                                                                                                // 1576
                data;                                                                                                  // 1577
                                                                                                                       // 1578
            if (arguments.length === 0) {                                                                              // 1579
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());                              // 1580
            }                                                                                                          // 1581
                                                                                                                       // 1582
            if (index >= choices.length) index = choices.length - 1;                                                   // 1583
            if (index < 0) index = 0;                                                                                  // 1584
                                                                                                                       // 1585
            this.removeHighlight();                                                                                    // 1586
                                                                                                                       // 1587
            choice = $(choices[index]);                                                                                // 1588
            choice.addClass("select2-highlighted");                                                                    // 1589
                                                                                                                       // 1590
            // ensure assistive technology can determine the active choice                                             // 1591
            this.search.attr("aria-activedescendant", choice.find(".select2-result-label").attr("id"));                // 1592
                                                                                                                       // 1593
            this.ensureHighlightVisible();                                                                             // 1594
                                                                                                                       // 1595
            this.liveRegion.text(choice.text());                                                                       // 1596
                                                                                                                       // 1597
            data = choice.data("select2-data");                                                                        // 1598
            if (data) {                                                                                                // 1599
                this.opts.element.trigger({ type: "select2-highlight", val: this.id(data), choice: data });            // 1600
            }                                                                                                          // 1601
        },                                                                                                             // 1602
                                                                                                                       // 1603
        removeHighlight: function() {                                                                                  // 1604
            this.results.find(".select2-highlighted").removeClass("select2-highlighted");                              // 1605
        },                                                                                                             // 1606
                                                                                                                       // 1607
        touchMoved: function() {                                                                                       // 1608
            this._touchMoved = true;                                                                                   // 1609
        },                                                                                                             // 1610
                                                                                                                       // 1611
        clearTouchMoved: function() {                                                                                  // 1612
          this._touchMoved = false;                                                                                    // 1613
        },                                                                                                             // 1614
                                                                                                                       // 1615
        // abstract                                                                                                    // 1616
        countSelectableResults: function() {                                                                           // 1617
            return this.findHighlightableChoices().length;                                                             // 1618
        },                                                                                                             // 1619
                                                                                                                       // 1620
        // abstract                                                                                                    // 1621
        highlightUnderEvent: function (event) {                                                                        // 1622
            var el = $(event.target).closest(".select2-result-selectable");                                            // 1623
            if (el.length > 0 && !el.is(".select2-highlighted")) {                                                     // 1624
                var choices = this.findHighlightableChoices();                                                         // 1625
                this.highlight(choices.index(el));                                                                     // 1626
            } else if (el.length == 0) {                                                                               // 1627
                // if we are over an unselectable item remove all highlights                                           // 1628
                this.removeHighlight();                                                                                // 1629
            }                                                                                                          // 1630
        },                                                                                                             // 1631
                                                                                                                       // 1632
        // abstract                                                                                                    // 1633
        loadMoreIfNeeded: function () {                                                                                // 1634
            var results = this.results,                                                                                // 1635
                more = results.find("li.select2-more-results"),                                                        // 1636
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                page = this.resultsPage + 1,                                                                           // 1638
                self=this,                                                                                             // 1639
                term=this.search.val(),                                                                                // 1640
                context=this.context;                                                                                  // 1641
                                                                                                                       // 1642
            if (more.length === 0) return;                                                                             // 1643
            below = more.offset().top - results.offset().top - results.height();                                       // 1644
                                                                                                                       // 1645
            if (below <= this.opts.loadMorePadding) {                                                                  // 1646
                more.addClass("select2-active");                                                                       // 1647
                this.opts.query({                                                                                      // 1648
                        element: this.opts.element,                                                                    // 1649
                        term: term,                                                                                    // 1650
                        page: page,                                                                                    // 1651
                        context: context,                                                                              // 1652
                        matcher: this.opts.matcher,                                                                    // 1653
                        callback: this.bind(function (data) {                                                          // 1654
                                                                                                                       // 1655
                    // ignore a response if the select2 has been closed before it was received                         // 1656
                    if (!self.opened()) return;                                                                        // 1657
                                                                                                                       // 1658
                                                                                                                       // 1659
                    self.opts.populateResults.call(this, results, data.results, {term: term, page: page, context:context});
                    self.postprocessResults(data, false, false);                                                       // 1661
                                                                                                                       // 1662
                    if (data.more===true) {                                                                            // 1663
                        more.detach().appendTo(results).html(self.opts.escapeMarkup(evaluate(self.opts.formatLoadMore, self.opts.element, page+1)));
                        window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);                                // 1665
                    } else {                                                                                           // 1666
                        more.remove();                                                                                 // 1667
                    }                                                                                                  // 1668
                    self.positionDropdown();                                                                           // 1669
                    self.resultsPage = page;                                                                           // 1670
                    self.context = data.context;                                                                       // 1671
                    this.opts.element.trigger({ type: "select2-loaded", items: data });                                // 1672
                })});                                                                                                  // 1673
            }                                                                                                          // 1674
        },                                                                                                             // 1675
                                                                                                                       // 1676
        /**                                                                                                            // 1677
         * Default tokenizer function which does nothing                                                               // 1678
         */                                                                                                            // 1679
        tokenize: function() {                                                                                         // 1680
                                                                                                                       // 1681
        },                                                                                                             // 1682
                                                                                                                       // 1683
        /**                                                                                                            // 1684
         * @param initial whether or not this is the call to this method right after the dropdown has been opened      // 1685
         */                                                                                                            // 1686
        // abstract                                                                                                    // 1687
        updateResults: function (initial) {                                                                            // 1688
            var search = this.search,                                                                                  // 1689
                results = this.results,                                                                                // 1690
                opts = this.opts,                                                                                      // 1691
                data,                                                                                                  // 1692
                self = this,                                                                                           // 1693
                input,                                                                                                 // 1694
                term = search.val(),                                                                                   // 1695
                lastTerm = $.data(this.container, "select2-last-term"),                                                // 1696
                // sequence number used to drop out-of-order responses                                                 // 1697
                queryNumber;                                                                                           // 1698
                                                                                                                       // 1699
            // prevent duplicate queries against the same term                                                         // 1700
            if (initial !== true && lastTerm && equal(term, lastTerm)) return;                                         // 1701
                                                                                                                       // 1702
            $.data(this.container, "select2-last-term", term);                                                         // 1703
                                                                                                                       // 1704
            // if the search is currently hidden we do not alter the results                                           // 1705
            if (initial !== true && (this.showSearchInput === false || !this.opened())) {                              // 1706
                return;                                                                                                // 1707
            }                                                                                                          // 1708
                                                                                                                       // 1709
            function postRender() {                                                                                    // 1710
                search.removeClass("select2-active");                                                                  // 1711
                self.positionDropdown();                                                                               // 1712
                if (results.find('.select2-no-results,.select2-selection-limit,.select2-searching').length) {          // 1713
                    self.liveRegion.text(results.text());                                                              // 1714
                }                                                                                                      // 1715
                else {                                                                                                 // 1716
                    self.liveRegion.text(self.opts.formatMatches(results.find('.select2-result-selectable:not(".select2-selected")').length));
                }                                                                                                      // 1718
            }                                                                                                          // 1719
                                                                                                                       // 1720
            function render(html) {                                                                                    // 1721
                results.html(html);                                                                                    // 1722
                postRender();                                                                                          // 1723
            }                                                                                                          // 1724
                                                                                                                       // 1725
            queryNumber = ++this.queryCount;                                                                           // 1726
                                                                                                                       // 1727
            var maxSelSize = this.getMaximumSelectionSize();                                                           // 1728
            if (maxSelSize >=1) {                                                                                      // 1729
                data = this.data();                                                                                    // 1730
                if ($.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig")) {
                    render("<li class='select2-selection-limit'>" + evaluate(opts.formatSelectionTooBig, opts.element, maxSelSize) + "</li>");
                    return;                                                                                            // 1733
                }                                                                                                      // 1734
            }                                                                                                          // 1735
                                                                                                                       // 1736
            if (search.val().length < opts.minimumInputLength) {                                                       // 1737
                if (checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) {                                 // 1738
                    render("<li class='select2-no-results'>" + evaluate(opts.formatInputTooShort, opts.element, search.val(), opts.minimumInputLength) + "</li>");
                } else {                                                                                               // 1740
                    render("");                                                                                        // 1741
                }                                                                                                      // 1742
                if (initial && this.showSearch) this.showSearch(true);                                                 // 1743
                return;                                                                                                // 1744
            }                                                                                                          // 1745
                                                                                                                       // 1746
            if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) {                            // 1747
                if (checkFormatter(opts.formatInputTooLong, "formatInputTooLong")) {                                   // 1748
                    render("<li class='select2-no-results'>" + evaluate(opts.formatInputTooLong, opts.element, search.val(), opts.maximumInputLength) + "</li>");
                } else {                                                                                               // 1750
                    render("");                                                                                        // 1751
                }                                                                                                      // 1752
                return;                                                                                                // 1753
            }                                                                                                          // 1754
                                                                                                                       // 1755
            if (opts.formatSearching && this.findHighlightableChoices().length === 0) {                                // 1756
                render("<li class='select2-searching'>" + evaluate(opts.formatSearching, opts.element) + "</li>");     // 1757
            }                                                                                                          // 1758
                                                                                                                       // 1759
            search.addClass("select2-active");                                                                         // 1760
                                                                                                                       // 1761
            this.removeHighlight();                                                                                    // 1762
                                                                                                                       // 1763
            // give the tokenizer a chance to pre-process the input                                                    // 1764
            input = this.tokenize();                                                                                   // 1765
            if (input != undefined && input != null) {                                                                 // 1766
                search.val(input);                                                                                     // 1767
            }                                                                                                          // 1768
                                                                                                                       // 1769
            this.resultsPage = 1;                                                                                      // 1770
                                                                                                                       // 1771
            opts.query({                                                                                               // 1772
                element: opts.element,                                                                                 // 1773
                    term: search.val(),                                                                                // 1774
                    page: this.resultsPage,                                                                            // 1775
                    context: null,                                                                                     // 1776
                    matcher: opts.matcher,                                                                             // 1777
                    callback: this.bind(function (data) {                                                              // 1778
                var def; // default choice                                                                             // 1779
                                                                                                                       // 1780
                // ignore old responses                                                                                // 1781
                if (queryNumber != this.queryCount) {                                                                  // 1782
                  return;                                                                                              // 1783
                }                                                                                                      // 1784
                                                                                                                       // 1785
                // ignore a response if the select2 has been closed before it was received                             // 1786
                if (!this.opened()) {                                                                                  // 1787
                    this.search.removeClass("select2-active");                                                         // 1788
                    return;                                                                                            // 1789
                }                                                                                                      // 1790
                                                                                                                       // 1791
                // handle ajax error                                                                                   // 1792
                if(data.hasError !== undefined && checkFormatter(opts.formatAjaxError, "formatAjaxError")) {           // 1793
                    render("<li class='select2-ajax-error'>" + evaluate(opts.formatAjaxError, opts.element, data.jqXHR, data.textStatus, data.errorThrown) + "</li>");
                    return;                                                                                            // 1795
                }                                                                                                      // 1796
                                                                                                                       // 1797
                // save context, if any                                                                                // 1798
                this.context = (data.context===undefined) ? null : data.context;                                       // 1799
                // create a default choice and prepend it to the list                                                  // 1800
                if (this.opts.createSearchChoice && search.val() !== "") {                                             // 1801
                    def = this.opts.createSearchChoice.call(self, search.val(), data.results);                         // 1802
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {    // 1803
                        if ($(data.results).filter(                                                                    // 1804
                            function () {                                                                              // 1805
                                return equal(self.id(this), self.id(def));                                             // 1806
                            }).length === 0) {                                                                         // 1807
                            this.opts.createSearchChoicePosition(data.results, def);                                   // 1808
                        }                                                                                              // 1809
                    }                                                                                                  // 1810
                }                                                                                                      // 1811
                                                                                                                       // 1812
                if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, "formatNoMatches")) {            // 1813
                    render("<li class='select2-no-results'>" + evaluate(opts.formatNoMatches, opts.element, search.val()) + "</li>");
                    return;                                                                                            // 1815
                }                                                                                                      // 1816
                                                                                                                       // 1817
                results.empty();                                                                                       // 1818
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});
                                                                                                                       // 1820
                if (data.more === true && checkFormatter(opts.formatLoadMore, "formatLoadMore")) {                     // 1821
                    results.append("<li class='select2-more-results'>" + opts.escapeMarkup(evaluate(opts.formatLoadMore, opts.element, this.resultsPage)) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);                                    // 1823
                }                                                                                                      // 1824
                                                                                                                       // 1825
                this.postprocessResults(data, initial);                                                                // 1826
                                                                                                                       // 1827
                postRender();                                                                                          // 1828
                                                                                                                       // 1829
                this.opts.element.trigger({ type: "select2-loaded", items: data });                                    // 1830
            })});                                                                                                      // 1831
        },                                                                                                             // 1832
                                                                                                                       // 1833
        // abstract                                                                                                    // 1834
        cancel: function () {                                                                                          // 1835
            this.close();                                                                                              // 1836
        },                                                                                                             // 1837
                                                                                                                       // 1838
        // abstract                                                                                                    // 1839
        blur: function () {                                                                                            // 1840
            // if selectOnBlur == true, select the currently highlighted option                                        // 1841
            if (this.opts.selectOnBlur)                                                                                // 1842
                this.selectHighlighted({noFocus: true});                                                               // 1843
                                                                                                                       // 1844
            this.close();                                                                                              // 1845
            this.container.removeClass("select2-container-active");                                                    // 1846
            // synonymous to .is(':focus'), which is available in jquery >= 1.6                                        // 1847
            if (this.search[0] === document.activeElement) { this.search.blur(); }                                     // 1848
            this.clearSearch();                                                                                        // 1849
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");            // 1850
        },                                                                                                             // 1851
                                                                                                                       // 1852
        // abstract                                                                                                    // 1853
        focusSearch: function () {                                                                                     // 1854
            focus(this.search);                                                                                        // 1855
        },                                                                                                             // 1856
                                                                                                                       // 1857
        // abstract                                                                                                    // 1858
        selectHighlighted: function (options) {                                                                        // 1859
            if (this._touchMoved) {                                                                                    // 1860
              this.clearTouchMoved();                                                                                  // 1861
              return;                                                                                                  // 1862
            }                                                                                                          // 1863
            var index=this.highlight(),                                                                                // 1864
                highlighted=this.results.find(".select2-highlighted"),                                                 // 1865
                data = highlighted.closest('.select2-result').data("select2-data");                                    // 1866
                                                                                                                       // 1867
            if (data) {                                                                                                // 1868
                this.highlight(index);                                                                                 // 1869
                this.onSelect(data, options);                                                                          // 1870
            } else if (options && options.noFocus) {                                                                   // 1871
                this.close();                                                                                          // 1872
            }                                                                                                          // 1873
        },                                                                                                             // 1874
                                                                                                                       // 1875
        // abstract                                                                                                    // 1876
        getPlaceholder: function () {                                                                                  // 1877
            var placeholderOption;                                                                                     // 1878
            return this.opts.element.attr("placeholder") ||                                                            // 1879
                this.opts.element.attr("data-placeholder") || // jquery 1.4 compat                                     // 1880
                this.opts.element.data("placeholder") ||                                                               // 1881
                this.opts.placeholder ||                                                                               // 1882
                ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() : undefined);
        },                                                                                                             // 1884
                                                                                                                       // 1885
        // abstract                                                                                                    // 1886
        getPlaceholderOption: function() {                                                                             // 1887
            if (this.select) {                                                                                         // 1888
                var firstOption = this.select.children('option').first();                                              // 1889
                if (this.opts.placeholderOption !== undefined ) {                                                      // 1890
                    //Determine the placeholder option based on the specified placeholderOption setting                // 1891
                    return (this.opts.placeholderOption === "first" && firstOption) ||                                 // 1892
                           (typeof this.opts.placeholderOption === "function" && this.opts.placeholderOption(this.select));
                } else if ($.trim(firstOption.text()) === "" && firstOption.val() === "") {                            // 1894
                    //No explicit placeholder option specified, use the first if it's blank                            // 1895
                    return firstOption;                                                                                // 1896
                }                                                                                                      // 1897
            }                                                                                                          // 1898
        },                                                                                                             // 1899
                                                                                                                       // 1900
        /**                                                                                                            // 1901
         * Get the desired width for the container element.  This is                                                   // 1902
         * derived first from option `width` passed to select2, then                                                   // 1903
         * the inline 'style' on the original element, and finally                                                     // 1904
         * falls back to the jQuery calculated element width.                                                          // 1905
         */                                                                                                            // 1906
        // abstract                                                                                                    // 1907
        initContainerWidth: function () {                                                                              // 1908
            function resolveContainerWidth() {                                                                         // 1909
                var style, attrs, matches, i, l, attr;                                                                 // 1910
                                                                                                                       // 1911
                if (this.opts.width === "off") {                                                                       // 1912
                    return null;                                                                                       // 1913
                } else if (this.opts.width === "element"){                                                             // 1914
                    return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {                              // 1916
                    // check if there is inline style on the element that contains width                               // 1917
                    style = this.opts.element.attr('style');                                                           // 1918
                    if (style !== undefined) {                                                                         // 1919
                        attrs = style.split(';');                                                                      // 1920
                        for (i = 0, l = attrs.length; i < l; i = i + 1) {                                              // 1921
                            attr = attrs[i].replace(/\s/g, '');                                                        // 1922
                            matches = attr.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);     // 1923
                            if (matches !== null && matches.length >= 1)                                               // 1924
                                return matches[1];                                                                     // 1925
                        }                                                                                              // 1926
                    }                                                                                                  // 1927
                                                                                                                       // 1928
                    if (this.opts.width === "resolve") {                                                               // 1929
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css                               // 1931
                        style = this.opts.element.css('width');                                                        // 1932
                        if (style.indexOf("%") > 0) return style;                                                      // 1933
                                                                                                                       // 1934
                        // finally, fallback on the calculated width of the element                                    // 1935
                        return (this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px');
                    }                                                                                                  // 1937
                                                                                                                       // 1938
                    return null;                                                                                       // 1939
                } else if ($.isFunction(this.opts.width)) {                                                            // 1940
                    return this.opts.width();                                                                          // 1941
                } else {                                                                                               // 1942
                    return this.opts.width;                                                                            // 1943
               }                                                                                                       // 1944
            };                                                                                                         // 1945
                                                                                                                       // 1946
            var width = resolveContainerWidth.call(this);                                                              // 1947
            if (width !== null) {                                                                                      // 1948
                this.container.css("width", width);                                                                    // 1949
            }                                                                                                          // 1950
        }                                                                                                              // 1951
    });                                                                                                                // 1952
                                                                                                                       // 1953
    SingleSelect2 = clazz(AbstractSelect2, {                                                                           // 1954
                                                                                                                       // 1955
        // single                                                                                                      // 1956
                                                                                                                       // 1957
        createContainer: function () {                                                                                 // 1958
            var container = $(document.createElement("div")).attr({                                                    // 1959
                "class": "select2-container"                                                                           // 1960
            }).html([                                                                                                  // 1961
                "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>",                                  // 1962
                "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>",      // 1963
                "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",               // 1964
                "</a>",                                                                                                // 1965
                "<label for='' class='select2-offscreen'></label>",                                                    // 1966
                "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", // 1967
                "<div class='select2-drop select2-display-none'>",                                                     // 1968
                "   <div class='select2-search'>",                                                                     // 1969
                "       <label for='' class='select2-offscreen'></label>",                                             // 1970
                "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
                "       aria-autocomplete='list' />",                                                                  // 1972
                "   </div>",                                                                                           // 1973
                "   <ul class='select2-results' role='listbox'>",                                                      // 1974
                "   </ul>",                                                                                            // 1975
                "</div>"].join(""));                                                                                   // 1976
            return container;                                                                                          // 1977
        },                                                                                                             // 1978
                                                                                                                       // 1979
        // single                                                                                                      // 1980
        enableInterface: function() {                                                                                  // 1981
            if (this.parent.enableInterface.apply(this, arguments)) {                                                  // 1982
                this.focusser.prop("disabled", !this.isInterfaceEnabled());                                            // 1983
            }                                                                                                          // 1984
        },                                                                                                             // 1985
                                                                                                                       // 1986
        // single                                                                                                      // 1987
        opening: function () {                                                                                         // 1988
            var el, range, len;                                                                                        // 1989
                                                                                                                       // 1990
            if (this.opts.minimumResultsForSearch >= 0) {                                                              // 1991
                this.showSearch(true);                                                                                 // 1992
            }                                                                                                          // 1993
                                                                                                                       // 1994
            this.parent.opening.apply(this, arguments);                                                                // 1995
                                                                                                                       // 1996
            if (this.showSearchInput !== false) {                                                                      // 1997
                // IE appends focusser.val() at the end of field :/ so we manually insert it at the beginning using a range
                // all other browsers handle this just fine                                                            // 1999
                                                                                                                       // 2000
                this.search.val(this.focusser.val());                                                                  // 2001
            }                                                                                                          // 2002
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2003
                this.search.focus();                                                                                   // 2004
                // move the cursor to the end after focussing, otherwise it will be at the beginning and               // 2005
                // new text will appear *before* focusser.val()                                                        // 2006
                el = this.search.get(0);                                                                               // 2007
                if (el.createTextRange) {                                                                              // 2008
                    range = el.createTextRange();                                                                      // 2009
                    range.collapse(false);                                                                             // 2010
                    range.select();                                                                                    // 2011
                } else if (el.setSelectionRange) {                                                                     // 2012
                    len = this.search.val().length;                                                                    // 2013
                    el.setSelectionRange(len, len);                                                                    // 2014
                }                                                                                                      // 2015
            }                                                                                                          // 2016
                                                                                                                       // 2017
            // initializes search's value with nextSearchTerm (if defined by user)                                     // 2018
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter                           // 2019
            if(this.search.val() === "") {                                                                             // 2020
                if(this.nextSearchTerm != undefined){                                                                  // 2021
                    this.search.val(this.nextSearchTerm);                                                              // 2022
                    this.search.select();                                                                              // 2023
                }                                                                                                      // 2024
            }                                                                                                          // 2025
                                                                                                                       // 2026
            this.focusser.prop("disabled", true).val("");                                                              // 2027
            this.updateResults(true);                                                                                  // 2028
            this.opts.element.trigger($.Event("select2-open"));                                                        // 2029
        },                                                                                                             // 2030
                                                                                                                       // 2031
        // single                                                                                                      // 2032
        close: function () {                                                                                           // 2033
            if (!this.opened()) return;                                                                                // 2034
            this.parent.close.apply(this, arguments);                                                                  // 2035
                                                                                                                       // 2036
            this.focusser.prop("disabled", false);                                                                     // 2037
                                                                                                                       // 2038
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2039
                this.focusser.focus();                                                                                 // 2040
            }                                                                                                          // 2041
        },                                                                                                             // 2042
                                                                                                                       // 2043
        // single                                                                                                      // 2044
        focus: function () {                                                                                           // 2045
            if (this.opened()) {                                                                                       // 2046
                this.close();                                                                                          // 2047
            } else {                                                                                                   // 2048
                this.focusser.prop("disabled", false);                                                                 // 2049
                if (this.opts.shouldFocusInput(this)) {                                                                // 2050
                    this.focusser.focus();                                                                             // 2051
                }                                                                                                      // 2052
            }                                                                                                          // 2053
        },                                                                                                             // 2054
                                                                                                                       // 2055
        // single                                                                                                      // 2056
        isFocused: function () {                                                                                       // 2057
            return this.container.hasClass("select2-container-active");                                                // 2058
        },                                                                                                             // 2059
                                                                                                                       // 2060
        // single                                                                                                      // 2061
        cancel: function () {                                                                                          // 2062
            this.parent.cancel.apply(this, arguments);                                                                 // 2063
            this.focusser.prop("disabled", false);                                                                     // 2064
                                                                                                                       // 2065
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2066
                this.focusser.focus();                                                                                 // 2067
            }                                                                                                          // 2068
        },                                                                                                             // 2069
                                                                                                                       // 2070
        // single                                                                                                      // 2071
        destroy: function() {                                                                                          // 2072
            $("label[for='" + this.focusser.attr('id') + "']")                                                         // 2073
                .attr('for', this.opts.element.attr("id"));                                                            // 2074
            this.parent.destroy.apply(this, arguments);                                                                // 2075
                                                                                                                       // 2076
            cleanupJQueryElements.call(this,                                                                           // 2077
                "selection",                                                                                           // 2078
                "focusser"                                                                                             // 2079
            );                                                                                                         // 2080
        },                                                                                                             // 2081
                                                                                                                       // 2082
        // single                                                                                                      // 2083
        initContainer: function () {                                                                                   // 2084
                                                                                                                       // 2085
            var selection,                                                                                             // 2086
                container = this.container,                                                                            // 2087
                dropdown = this.dropdown,                                                                              // 2088
                idSuffix = nextUid(),                                                                                  // 2089
                elementLabel;                                                                                          // 2090
                                                                                                                       // 2091
            if (this.opts.minimumResultsForSearch < 0) {                                                               // 2092
                this.showSearch(false);                                                                                // 2093
            } else {                                                                                                   // 2094
                this.showSearch(true);                                                                                 // 2095
            }                                                                                                          // 2096
                                                                                                                       // 2097
            this.selection = selection = container.find(".select2-choice");                                            // 2098
                                                                                                                       // 2099
            this.focusser = container.find(".select2-focusser");                                                       // 2100
                                                                                                                       // 2101
            // add aria associations                                                                                   // 2102
            selection.find(".select2-chosen").attr("id", "select2-chosen-"+idSuffix);                                  // 2103
            this.focusser.attr("aria-labelledby", "select2-chosen-"+idSuffix);                                         // 2104
            this.results.attr("id", "select2-results-"+idSuffix);                                                      // 2105
            this.search.attr("aria-owns", "select2-results-"+idSuffix);                                                // 2106
                                                                                                                       // 2107
            // rewrite labels from original element to focusser                                                        // 2108
            this.focusser.attr("id", "s2id_autogen"+idSuffix);                                                         // 2109
                                                                                                                       // 2110
            elementLabel = $("label[for='" + this.opts.element.attr("id") + "']");                                     // 2111
            this.opts.element.focus(this.bind(function () { this.focus(); }));                                         // 2112
                                                                                                                       // 2113
            this.focusser.prev()                                                                                       // 2114
                .text(elementLabel.text())                                                                             // 2115
                .attr('for', this.focusser.attr('id'));                                                                // 2116
                                                                                                                       // 2117
            // Ensure the original element retains an accessible name                                                  // 2118
            var originalTitle = this.opts.element.attr("title");                                                       // 2119
            this.opts.element.attr("title", (originalTitle || elementLabel.text()));                                   // 2120
                                                                                                                       // 2121
            this.focusser.attr("tabindex", this.elementTabIndex);                                                      // 2122
                                                                                                                       // 2123
            // write label for search field using the label from the focusser element                                  // 2124
            this.search.attr("id", this.focusser.attr('id') + '_search');                                              // 2125
                                                                                                                       // 2126
            this.search.prev()                                                                                         // 2127
                .text($("label[for='" + this.focusser.attr('id') + "']").text())                                       // 2128
                .attr('for', this.search.attr('id'));                                                                  // 2129
                                                                                                                       // 2130
            this.search.on("keydown", this.bind(function (e) {                                                         // 2131
                if (!this.isInterfaceEnabled()) return;                                                                // 2132
                                                                                                                       // 2133
                // filter 229 keyCodes (input method editor is processing key input)                                   // 2134
                if (229 == e.keyCode) return;                                                                          // 2135
                                                                                                                       // 2136
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {                                            // 2137
                    // prevent the page from scrolling                                                                 // 2138
                    killEvent(e);                                                                                      // 2139
                    return;                                                                                            // 2140
                }                                                                                                      // 2141
                                                                                                                       // 2142
                switch (e.which) {                                                                                     // 2143
                    case KEY.UP:                                                                                       // 2144
                    case KEY.DOWN:                                                                                     // 2145
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);                                             // 2146
                        killEvent(e);                                                                                  // 2147
                        return;                                                                                        // 2148
                    case KEY.ENTER:                                                                                    // 2149
                        this.selectHighlighted();                                                                      // 2150
                        killEvent(e);                                                                                  // 2151
                        return;                                                                                        // 2152
                    case KEY.TAB:                                                                                      // 2153
                        this.selectHighlighted({noFocus: true});                                                       // 2154
                        return;                                                                                        // 2155
                    case KEY.ESC:                                                                                      // 2156
                        this.cancel(e);                                                                                // 2157
                        killEvent(e);                                                                                  // 2158
                        return;                                                                                        // 2159
                }                                                                                                      // 2160
            }));                                                                                                       // 2161
                                                                                                                       // 2162
            this.search.on("blur", this.bind(function(e) {                                                             // 2163
                // a workaround for chrome to keep the search field focussed when the scroll bar is used to scroll the dropdown.
                // without this the search field loses focus which is annoying                                         // 2165
                if (document.activeElement === this.body.get(0)) {                                                     // 2166
                    window.setTimeout(this.bind(function() {                                                           // 2167
                        if (this.opened()) {                                                                           // 2168
                            this.search.focus();                                                                       // 2169
                        }                                                                                              // 2170
                    }), 0);                                                                                            // 2171
                }                                                                                                      // 2172
            }));                                                                                                       // 2173
                                                                                                                       // 2174
            this.focusser.on("keydown", this.bind(function (e) {                                                       // 2175
                if (!this.isInterfaceEnabled()) return;                                                                // 2176
                                                                                                                       // 2177
                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {          // 2178
                    return;                                                                                            // 2179
                }                                                                                                      // 2180
                                                                                                                       // 2181
                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {                                        // 2182
                    killEvent(e);                                                                                      // 2183
                    return;                                                                                            // 2184
                }                                                                                                      // 2185
                                                                                                                       // 2186
                if (e.which == KEY.DOWN || e.which == KEY.UP                                                           // 2187
                    || (e.which == KEY.ENTER && this.opts.openOnEnter)) {                                              // 2188
                                                                                                                       // 2189
                    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;                                      // 2190
                                                                                                                       // 2191
                    this.open();                                                                                       // 2192
                    killEvent(e);                                                                                      // 2193
                    return;                                                                                            // 2194
                }                                                                                                      // 2195
                                                                                                                       // 2196
                if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {                                               // 2197
                    if (this.opts.allowClear) {                                                                        // 2198
                        this.clear();                                                                                  // 2199
                    }                                                                                                  // 2200
                    killEvent(e);                                                                                      // 2201
                    return;                                                                                            // 2202
                }                                                                                                      // 2203
            }));                                                                                                       // 2204
                                                                                                                       // 2205
                                                                                                                       // 2206
            installKeyUpChangeEvent(this.focusser);                                                                    // 2207
            this.focusser.on("keyup-change input", this.bind(function(e) {                                             // 2208
                if (this.opts.minimumResultsForSearch >= 0) {                                                          // 2209
                    e.stopPropagation();                                                                               // 2210
                    if (this.opened()) return;                                                                         // 2211
                    this.open();                                                                                       // 2212
                }                                                                                                      // 2213
            }));                                                                                                       // 2214
                                                                                                                       // 2215
            selection.on("mousedown touchstart", "abbr", this.bind(function (e) {                                      // 2216
                if (!this.isInterfaceEnabled()) {                                                                      // 2217
                    return;                                                                                            // 2218
                }                                                                                                      // 2219
                                                                                                                       // 2220
                this.clear();                                                                                          // 2221
                killEventImmediately(e);                                                                               // 2222
                this.close();                                                                                          // 2223
                                                                                                                       // 2224
                if (this.selection) {                                                                                  // 2225
                    this.selection.focus();                                                                            // 2226
                }                                                                                                      // 2227
            }));                                                                                                       // 2228
                                                                                                                       // 2229
            selection.on("mousedown touchstart", this.bind(function (e) {                                              // 2230
                // Prevent IE from generating a click event on the body                                                // 2231
                reinsertElement(selection);                                                                            // 2232
                                                                                                                       // 2233
                if (!this.container.hasClass("select2-container-active")) {                                            // 2234
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2235
                }                                                                                                      // 2236
                                                                                                                       // 2237
                if (this.opened()) {                                                                                   // 2238
                    this.close();                                                                                      // 2239
                } else if (this.isInterfaceEnabled()) {                                                                // 2240
                    this.open();                                                                                       // 2241
                }                                                                                                      // 2242
                                                                                                                       // 2243
                killEvent(e);                                                                                          // 2244
            }));                                                                                                       // 2245
                                                                                                                       // 2246
            dropdown.on("mousedown touchstart", this.bind(function() {                                                 // 2247
                if (this.opts.shouldFocusInput(this)) {                                                                // 2248
                    this.search.focus();                                                                               // 2249
                }                                                                                                      // 2250
            }));                                                                                                       // 2251
                                                                                                                       // 2252
            selection.on("focus", this.bind(function(e) {                                                              // 2253
                killEvent(e);                                                                                          // 2254
            }));                                                                                                       // 2255
                                                                                                                       // 2256
            this.focusser.on("focus", this.bind(function(){                                                            // 2257
                if (!this.container.hasClass("select2-container-active")) {                                            // 2258
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2259
                }                                                                                                      // 2260
                this.container.addClass("select2-container-active");                                                   // 2261
            })).on("blur", this.bind(function() {                                                                      // 2262
                if (!this.opened()) {                                                                                  // 2263
                    this.container.removeClass("select2-container-active");                                            // 2264
                    this.opts.element.trigger($.Event("select2-blur"));                                                // 2265
                }                                                                                                      // 2266
            }));                                                                                                       // 2267
            this.search.on("focus", this.bind(function(){                                                              // 2268
                if (!this.container.hasClass("select2-container-active")) {                                            // 2269
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2270
                }                                                                                                      // 2271
                this.container.addClass("select2-container-active");                                                   // 2272
            }));                                                                                                       // 2273
                                                                                                                       // 2274
            this.initContainerWidth();                                                                                 // 2275
            this.opts.element.hide();                                                                                  // 2276
            this.setPlaceholder();                                                                                     // 2277
                                                                                                                       // 2278
        },                                                                                                             // 2279
                                                                                                                       // 2280
        // single                                                                                                      // 2281
        clear: function(triggerChange) {                                                                               // 2282
            var data=this.selection.data("select2-data");                                                              // 2283
            if (data) { // guard against queued quick consecutive clicks                                               // 2284
                var evt = $.Event("select2-clearing");                                                                 // 2285
                this.opts.element.trigger(evt);                                                                        // 2286
                if (evt.isDefaultPrevented()) {                                                                        // 2287
                    return;                                                                                            // 2288
                }                                                                                                      // 2289
                var placeholderOption = this.getPlaceholderOption();                                                   // 2290
                this.opts.element.val(placeholderOption ? placeholderOption.val() : "");                               // 2291
                this.selection.find(".select2-chosen").empty();                                                        // 2292
                this.selection.removeData("select2-data");                                                             // 2293
                this.setPlaceholder();                                                                                 // 2294
                                                                                                                       // 2295
                if (triggerChange !== false){                                                                          // 2296
                    this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });          // 2297
                    this.triggerChange({removed:data});                                                                // 2298
                }                                                                                                      // 2299
            }                                                                                                          // 2300
        },                                                                                                             // 2301
                                                                                                                       // 2302
        /**                                                                                                            // 2303
         * Sets selection based on source element's value                                                              // 2304
         */                                                                                                            // 2305
        // single                                                                                                      // 2306
        initSelection: function () {                                                                                   // 2307
            var selected;                                                                                              // 2308
            if (this.isPlaceholderOptionSelected()) {                                                                  // 2309
                this.updateSelection(null);                                                                            // 2310
                this.close();                                                                                          // 2311
                this.setPlaceholder();                                                                                 // 2312
            } else {                                                                                                   // 2313
                var self = this;                                                                                       // 2314
                this.opts.initSelection.call(null, this.opts.element, function(selected){                              // 2315
                    if (selected !== undefined && selected !== null) {                                                 // 2316
                        self.updateSelection(selected);                                                                // 2317
                        self.close();                                                                                  // 2318
                        self.setPlaceholder();                                                                         // 2319
                        self.nextSearchTerm = self.opts.nextSearchTerm(selected, self.search.val());                   // 2320
                    }                                                                                                  // 2321
                });                                                                                                    // 2322
            }                                                                                                          // 2323
        },                                                                                                             // 2324
                                                                                                                       // 2325
        isPlaceholderOptionSelected: function() {                                                                      // 2326
            var placeholderOption;                                                                                     // 2327
            if (this.getPlaceholder() === undefined) return false; // no placeholder specified so no option should be considered
            return ((placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.prop("selected"))
                || (this.opts.element.val() === "")                                                                    // 2330
                || (this.opts.element.val() === undefined)                                                             // 2331
                || (this.opts.element.val() === null);                                                                 // 2332
        },                                                                                                             // 2333
                                                                                                                       // 2334
        // single                                                                                                      // 2335
        prepareOpts: function () {                                                                                     // 2336
            var opts = this.parent.prepareOpts.apply(this, arguments),                                                 // 2337
                self=this;                                                                                             // 2338
                                                                                                                       // 2339
            if (opts.element.get(0).tagName.toLowerCase() === "select") {                                              // 2340
                // install the selection initializer                                                                   // 2341
                opts.initSelection = function (element, callback) {                                                    // 2342
                    var selected = element.find("option").filter(function() { return this.selected && !this.disabled });
                    // a single select box always has a value, no need to null check 'selected'                        // 2344
                    callback(self.optionToData(selected));                                                             // 2345
                };                                                                                                     // 2346
            } else if ("data" in opts) {                                                                               // 2347
                // install default initSelection when applied to hidden input and data is local                        // 2348
                opts.initSelection = opts.initSelection || function (element, callback) {                              // 2349
                    var id = element.val();                                                                            // 2350
                    //search in data by id, storing the actual matching item                                           // 2351
                    var match = null;                                                                                  // 2352
                    opts.query({                                                                                       // 2353
                        matcher: function(term, text, el){                                                             // 2354
                            var is_match = equal(id, opts.id(el));                                                     // 2355
                            if (is_match) {                                                                            // 2356
                                match = el;                                                                            // 2357
                            }                                                                                          // 2358
                            return is_match;                                                                           // 2359
                        },                                                                                             // 2360
                        callback: !$.isFunction(callback) ? $.noop : function() {                                      // 2361
                            callback(match);                                                                           // 2362
                        }                                                                                              // 2363
                    });                                                                                                // 2364
                };                                                                                                     // 2365
            }                                                                                                          // 2366
                                                                                                                       // 2367
            return opts;                                                                                               // 2368
        },                                                                                                             // 2369
                                                                                                                       // 2370
        // single                                                                                                      // 2371
        getPlaceholder: function() {                                                                                   // 2372
            // if a placeholder is specified on a single select without a valid placeholder option ignore it           // 2373
            if (this.select) {                                                                                         // 2374
                if (this.getPlaceholderOption() === undefined) {                                                       // 2375
                    return undefined;                                                                                  // 2376
                }                                                                                                      // 2377
            }                                                                                                          // 2378
                                                                                                                       // 2379
            return this.parent.getPlaceholder.apply(this, arguments);                                                  // 2380
        },                                                                                                             // 2381
                                                                                                                       // 2382
        // single                                                                                                      // 2383
        setPlaceholder: function () {                                                                                  // 2384
            var placeholder = this.getPlaceholder();                                                                   // 2385
                                                                                                                       // 2386
            if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {                                     // 2387
                                                                                                                       // 2388
                // check for a placeholder option if attached to a select                                              // 2389
                if (this.select && this.getPlaceholderOption() === undefined) return;                                  // 2390
                                                                                                                       // 2391
                this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(placeholder));                      // 2392
                                                                                                                       // 2393
                this.selection.addClass("select2-default");                                                            // 2394
                                                                                                                       // 2395
                this.container.removeClass("select2-allowclear");                                                      // 2396
            }                                                                                                          // 2397
        },                                                                                                             // 2398
                                                                                                                       // 2399
        // single                                                                                                      // 2400
        postprocessResults: function (data, initial, noHighlightUpdate) {                                              // 2401
            var selected = 0, self = this, showSearchInput = true;                                                     // 2402
                                                                                                                       // 2403
            // find the selected element in the result list                                                            // 2404
                                                                                                                       // 2405
            this.findHighlightableChoices().each2(function (i, elm) {                                                  // 2406
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {                               // 2407
                    selected = i;                                                                                      // 2408
                    return false;                                                                                      // 2409
                }                                                                                                      // 2410
            });                                                                                                        // 2411
                                                                                                                       // 2412
            // and highlight it                                                                                        // 2413
            if (noHighlightUpdate !== false) {                                                                         // 2414
                if (initial === true && selected >= 0) {                                                               // 2415
                    this.highlight(selected);                                                                          // 2416
                } else {                                                                                               // 2417
                    this.highlight(0);                                                                                 // 2418
                }                                                                                                      // 2419
            }                                                                                                          // 2420
                                                                                                                       // 2421
            // hide the search box if this is the first we got the results and there are enough of them for search     // 2422
                                                                                                                       // 2423
            if (initial === true) {                                                                                    // 2424
                var min = this.opts.minimumResultsForSearch;                                                           // 2425
                if (min >= 0) {                                                                                        // 2426
                    this.showSearch(countResults(data.results) >= min);                                                // 2427
                }                                                                                                      // 2428
            }                                                                                                          // 2429
        },                                                                                                             // 2430
                                                                                                                       // 2431
        // single                                                                                                      // 2432
        showSearch: function(showSearchInput) {                                                                        // 2433
            if (this.showSearchInput === showSearchInput) return;                                                      // 2434
                                                                                                                       // 2435
            this.showSearchInput = showSearchInput;                                                                    // 2436
                                                                                                                       // 2437
            this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput);              // 2438
            this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput);                  // 2439
            //add "select2-with-searchbox" to the container if search box is shown                                     // 2440
            $(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput);                   // 2441
        },                                                                                                             // 2442
                                                                                                                       // 2443
        // single                                                                                                      // 2444
        onSelect: function (data, options) {                                                                           // 2445
                                                                                                                       // 2446
            if (!this.triggerSelect(data)) { return; }                                                                 // 2447
                                                                                                                       // 2448
            var old = this.opts.element.val(),                                                                         // 2449
                oldData = this.data();                                                                                 // 2450
                                                                                                                       // 2451
            this.opts.element.val(this.id(data));                                                                      // 2452
            this.updateSelection(data);                                                                                // 2453
                                                                                                                       // 2454
            this.opts.element.trigger({ type: "select2-selected", val: this.id(data), choice: data });                 // 2455
                                                                                                                       // 2456
            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());                                   // 2457
            this.close();                                                                                              // 2458
                                                                                                                       // 2459
            if ((!options || !options.noFocus) && this.opts.shouldFocusInput(this)) {                                  // 2460
                this.focusser.focus();                                                                                 // 2461
            }                                                                                                          // 2462
                                                                                                                       // 2463
            if (!equal(old, this.id(data))) {                                                                          // 2464
                this.triggerChange({ added: data, removed: oldData });                                                 // 2465
            }                                                                                                          // 2466
        },                                                                                                             // 2467
                                                                                                                       // 2468
        // single                                                                                                      // 2469
        updateSelection: function (data) {                                                                             // 2470
                                                                                                                       // 2471
            var container=this.selection.find(".select2-chosen"), formatted, cssClass;                                 // 2472
                                                                                                                       // 2473
            this.selection.data("select2-data", data);                                                                 // 2474
                                                                                                                       // 2475
            container.empty();                                                                                         // 2476
            if (data !== null) {                                                                                       // 2477
                formatted=this.opts.formatSelection(data, container, this.opts.escapeMarkup);                          // 2478
            }                                                                                                          // 2479
            if (formatted !== undefined) {                                                                             // 2480
                container.append(formatted);                                                                           // 2481
            }                                                                                                          // 2482
            cssClass=this.opts.formatSelectionCssClass(data, container);                                               // 2483
            if (cssClass !== undefined) {                                                                              // 2484
                container.addClass(cssClass);                                                                          // 2485
            }                                                                                                          // 2486
                                                                                                                       // 2487
            this.selection.removeClass("select2-default");                                                             // 2488
                                                                                                                       // 2489
            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {                                         // 2490
                this.container.addClass("select2-allowclear");                                                         // 2491
            }                                                                                                          // 2492
        },                                                                                                             // 2493
                                                                                                                       // 2494
        // single                                                                                                      // 2495
        val: function () {                                                                                             // 2496
            var val,                                                                                                   // 2497
                triggerChange = false,                                                                                 // 2498
                data = null,                                                                                           // 2499
                self = this,                                                                                           // 2500
                oldData = this.data();                                                                                 // 2501
                                                                                                                       // 2502
            if (arguments.length === 0) {                                                                              // 2503
                return this.opts.element.val();                                                                        // 2504
            }                                                                                                          // 2505
                                                                                                                       // 2506
            val = arguments[0];                                                                                        // 2507
                                                                                                                       // 2508
            if (arguments.length > 1) {                                                                                // 2509
                triggerChange = arguments[1];                                                                          // 2510
            }                                                                                                          // 2511
                                                                                                                       // 2512
            if (this.select) {                                                                                         // 2513
                this.select                                                                                            // 2514
                    .val(val)                                                                                          // 2515
                    .find("option").filter(function() { return this.selected }).each2(function (i, elm) {              // 2516
                        data = self.optionToData(elm);                                                                 // 2517
                        return false;                                                                                  // 2518
                    });                                                                                                // 2519
                this.updateSelection(data);                                                                            // 2520
                this.setPlaceholder();                                                                                 // 2521
                if (triggerChange) {                                                                                   // 2522
                    this.triggerChange({added: data, removed:oldData});                                                // 2523
                }                                                                                                      // 2524
            } else {                                                                                                   // 2525
                // val is an id. !val is true for [undefined,null,'',0] - 0 is legal                                   // 2526
                if (!val && val !== 0) {                                                                               // 2527
                    this.clear(triggerChange);                                                                         // 2528
                    return;                                                                                            // 2529
                }                                                                                                      // 2530
                if (this.opts.initSelection === undefined) {                                                           // 2531
                    throw new Error("cannot call val() if initSelection() is not defined");                            // 2532
                }                                                                                                      // 2533
                this.opts.element.val(val);                                                                            // 2534
                this.opts.initSelection(this.opts.element, function(data){                                             // 2535
                    self.opts.element.val(!data ? "" : self.id(data));                                                 // 2536
                    self.updateSelection(data);                                                                        // 2537
                    self.setPlaceholder();                                                                             // 2538
                    if (triggerChange) {                                                                               // 2539
                        self.triggerChange({added: data, removed:oldData});                                            // 2540
                    }                                                                                                  // 2541
                });                                                                                                    // 2542
            }                                                                                                          // 2543
        },                                                                                                             // 2544
                                                                                                                       // 2545
        // single                                                                                                      // 2546
        clearSearch: function () {                                                                                     // 2547
            this.search.val("");                                                                                       // 2548
            this.focusser.val("");                                                                                     // 2549
        },                                                                                                             // 2550
                                                                                                                       // 2551
        // single                                                                                                      // 2552
        data: function(value) {                                                                                        // 2553
            var data,                                                                                                  // 2554
                triggerChange = false;                                                                                 // 2555
                                                                                                                       // 2556
            if (arguments.length === 0) {                                                                              // 2557
                data = this.selection.data("select2-data");                                                            // 2558
                if (data == undefined) data = null;                                                                    // 2559
                return data;                                                                                           // 2560
            } else {                                                                                                   // 2561
                if (arguments.length > 1) {                                                                            // 2562
                    triggerChange = arguments[1];                                                                      // 2563
                }                                                                                                      // 2564
                if (!value) {                                                                                          // 2565
                    this.clear(triggerChange);                                                                         // 2566
                } else {                                                                                               // 2567
                    data = this.data();                                                                                // 2568
                    this.opts.element.val(!value ? "" : this.id(value));                                               // 2569
                    this.updateSelection(value);                                                                       // 2570
                    if (triggerChange) {                                                                               // 2571
                        this.triggerChange({added: value, removed:data});                                              // 2572
                    }                                                                                                  // 2573
                }                                                                                                      // 2574
            }                                                                                                          // 2575
        }                                                                                                              // 2576
    });                                                                                                                // 2577
                                                                                                                       // 2578
    MultiSelect2 = clazz(AbstractSelect2, {                                                                            // 2579
                                                                                                                       // 2580
        // multi                                                                                                       // 2581
        createContainer: function () {                                                                                 // 2582
            var container = $(document.createElement("div")).attr({                                                    // 2583
                "class": "select2-container select2-container-multi"                                                   // 2584
            }).html([                                                                                                  // 2585
                "<ul class='select2-choices'>",                                                                        // 2586
                "  <li class='select2-search-field'>",                                                                 // 2587
                "    <label for='' class='select2-offscreen'></label>",                                                // 2588
                "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                "  </li>",                                                                                             // 2590
                "</ul>",                                                                                               // 2591
                "<div class='select2-drop select2-drop-multi select2-display-none'>",                                  // 2592
                "   <ul class='select2-results'>",                                                                     // 2593
                "   </ul>",                                                                                            // 2594
                "</div>"].join(""));                                                                                   // 2595
            return container;                                                                                          // 2596
        },                                                                                                             // 2597
                                                                                                                       // 2598
        // multi                                                                                                       // 2599
        prepareOpts: function () {                                                                                     // 2600
            var opts = this.parent.prepareOpts.apply(this, arguments),                                                 // 2601
                self=this;                                                                                             // 2602
                                                                                                                       // 2603
            // TODO validate placeholder is a string if specified                                                      // 2604
            if (opts.element.get(0).tagName.toLowerCase() === "select") {                                              // 2605
                // install the selection initializer                                                                   // 2606
                opts.initSelection = function (element, callback) {                                                    // 2607
                                                                                                                       // 2608
                    var data = [];                                                                                     // 2609
                                                                                                                       // 2610
                    element.find("option").filter(function() { return this.selected && !this.disabled }).each2(function (i, elm) {
                        data.push(self.optionToData(elm));                                                             // 2612
                    });                                                                                                // 2613
                    callback(data);                                                                                    // 2614
                };                                                                                                     // 2615
            } else if ("data" in opts) {                                                                               // 2616
                // install default initSelection when applied to hidden input and data is local                        // 2617
                opts.initSelection = opts.initSelection || function (element, callback) {                              // 2618
                    var ids = splitVal(element.val(), opts.separator, opts.transformVal);                              // 2619
                    //search in data by array of ids, storing matching items in a list                                 // 2620
                    var matches = [];                                                                                  // 2621
                    opts.query({                                                                                       // 2622
                        matcher: function(term, text, el){                                                             // 2623
                            var is_match = $.grep(ids, function(id) {                                                  // 2624
                                return equal(id, opts.id(el));                                                         // 2625
                            }).length;                                                                                 // 2626
                            if (is_match) {                                                                            // 2627
                                matches.push(el);                                                                      // 2628
                            }                                                                                          // 2629
                            return is_match;                                                                           // 2630
                        },                                                                                             // 2631
                        callback: !$.isFunction(callback) ? $.noop : function() {                                      // 2632
                            // reorder matches based on the order they appear in the ids array because right now       // 2633
                            // they are in the order in which they appear in data array                                // 2634
                            var ordered = [];                                                                          // 2635
                            for (var i = 0; i < ids.length; i++) {                                                     // 2636
                                var id = ids[i];                                                                       // 2637
                                for (var j = 0; j < matches.length; j++) {                                             // 2638
                                    var match = matches[j];                                                            // 2639
                                    if (equal(id, opts.id(match))) {                                                   // 2640
                                        ordered.push(match);                                                           // 2641
                                        matches.splice(j, 1);                                                          // 2642
                                        break;                                                                         // 2643
                                    }                                                                                  // 2644
                                }                                                                                      // 2645
                            }                                                                                          // 2646
                            callback(ordered);                                                                         // 2647
                        }                                                                                              // 2648
                    });                                                                                                // 2649
                };                                                                                                     // 2650
            }                                                                                                          // 2651
                                                                                                                       // 2652
            return opts;                                                                                               // 2653
        },                                                                                                             // 2654
                                                                                                                       // 2655
        // multi                                                                                                       // 2656
        selectChoice: function (choice) {                                                                              // 2657
                                                                                                                       // 2658
            var selected = this.container.find(".select2-search-choice-focus");                                        // 2659
            if (selected.length && choice && choice[0] == selected[0]) {                                               // 2660
                                                                                                                       // 2661
            } else {                                                                                                   // 2662
                if (selected.length) {                                                                                 // 2663
                    this.opts.element.trigger("choice-deselected", selected);                                          // 2664
                }                                                                                                      // 2665
                selected.removeClass("select2-search-choice-focus");                                                   // 2666
                if (choice && choice.length) {                                                                         // 2667
                    this.close();                                                                                      // 2668
                    choice.addClass("select2-search-choice-focus");                                                    // 2669
                    this.opts.element.trigger("choice-selected", choice);                                              // 2670
                }                                                                                                      // 2671
            }                                                                                                          // 2672
        },                                                                                                             // 2673
                                                                                                                       // 2674
        // multi                                                                                                       // 2675
        destroy: function() {                                                                                          // 2676
            $("label[for='" + this.search.attr('id') + "']")                                                           // 2677
                .attr('for', this.opts.element.attr("id"));                                                            // 2678
            this.parent.destroy.apply(this, arguments);                                                                // 2679
                                                                                                                       // 2680
            cleanupJQueryElements.call(this,                                                                           // 2681
                "searchContainer",                                                                                     // 2682
                "selection"                                                                                            // 2683
            );                                                                                                         // 2684
        },                                                                                                             // 2685
                                                                                                                       // 2686
        // multi                                                                                                       // 2687
        initContainer: function () {                                                                                   // 2688
                                                                                                                       // 2689
            var selector = ".select2-choices", selection;                                                              // 2690
                                                                                                                       // 2691
            this.searchContainer = this.container.find(".select2-search-field");                                       // 2692
            this.selection = selection = this.container.find(selector);                                                // 2693
                                                                                                                       // 2694
            var _this = this;                                                                                          // 2695
            this.selection.on("click", ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)", function (e) {
                _this.search[0].focus();                                                                               // 2697
                _this.selectChoice($(this));                                                                           // 2698
            });                                                                                                        // 2699
                                                                                                                       // 2700
            // rewrite labels from original element to focusser                                                        // 2701
            this.search.attr("id", "s2id_autogen"+nextUid());                                                          // 2702
                                                                                                                       // 2703
            this.search.prev()                                                                                         // 2704
                .text($("label[for='" + this.opts.element.attr("id") + "']").text())                                   // 2705
                .attr('for', this.search.attr('id'));                                                                  // 2706
            this.opts.element.focus(this.bind(function () { this.focus(); }));                                         // 2707
                                                                                                                       // 2708
            this.search.on("input paste", this.bind(function() {                                                       // 2709
                if (this.search.attr('placeholder') && this.search.val().length == 0) return;                          // 2710
                if (!this.isInterfaceEnabled()) return;                                                                // 2711
                if (!this.opened()) {                                                                                  // 2712
                    this.open();                                                                                       // 2713
                }                                                                                                      // 2714
            }));                                                                                                       // 2715
                                                                                                                       // 2716
            this.search.attr("tabindex", this.elementTabIndex);                                                        // 2717
                                                                                                                       // 2718
            this.keydowns = 0;                                                                                         // 2719
            this.search.on("keydown", this.bind(function (e) {                                                         // 2720
                if (!this.isInterfaceEnabled()) return;                                                                // 2721
                                                                                                                       // 2722
                ++this.keydowns;                                                                                       // 2723
                var selected = selection.find(".select2-search-choice-focus");                                         // 2724
                var prev = selected.prev(".select2-search-choice:not(.select2-locked)");                               // 2725
                var next = selected.next(".select2-search-choice:not(.select2-locked)");                               // 2726
                var pos = getCursorInfo(this.search);                                                                  // 2727
                                                                                                                       // 2728
                if (selected.length &&                                                                                 // 2729
                    (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
                    var selectedChoice = selected;                                                                     // 2731
                    if (e.which == KEY.LEFT && prev.length) {                                                          // 2732
                        selectedChoice = prev;                                                                         // 2733
                    }                                                                                                  // 2734
                    else if (e.which == KEY.RIGHT) {                                                                   // 2735
                        selectedChoice = next.length ? next : null;                                                    // 2736
                    }                                                                                                  // 2737
                    else if (e.which === KEY.BACKSPACE) {                                                              // 2738
                        if (this.unselect(selected.first())) {                                                         // 2739
                            this.search.width(10);                                                                     // 2740
                            selectedChoice = prev.length ? prev : next;                                                // 2741
                        }                                                                                              // 2742
                    } else if (e.which == KEY.DELETE) {                                                                // 2743
                        if (this.unselect(selected.first())) {                                                         // 2744
                            this.search.width(10);                                                                     // 2745
                            selectedChoice = next.length ? next : null;                                                // 2746
                        }                                                                                              // 2747
                    } else if (e.which == KEY.ENTER) {                                                                 // 2748
                        selectedChoice = null;                                                                         // 2749
                    }                                                                                                  // 2750
                                                                                                                       // 2751
                    this.selectChoice(selectedChoice);                                                                 // 2752
                    killEvent(e);                                                                                      // 2753
                    if (!selectedChoice || !selectedChoice.length) {                                                   // 2754
                        this.open();                                                                                   // 2755
                    }                                                                                                  // 2756
                    return;                                                                                            // 2757
                } else if (((e.which === KEY.BACKSPACE && this.keydowns == 1)                                          // 2758
                    || e.which == KEY.LEFT) && (pos.offset == 0 && !pos.length)) {                                     // 2759
                                                                                                                       // 2760
                    this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last());           // 2761
                    killEvent(e);                                                                                      // 2762
                    return;                                                                                            // 2763
                } else {                                                                                               // 2764
                    this.selectChoice(null);                                                                           // 2765
                }                                                                                                      // 2766
                                                                                                                       // 2767
                if (this.opened()) {                                                                                   // 2768
                    switch (e.which) {                                                                                 // 2769
                    case KEY.UP:                                                                                       // 2770
                    case KEY.DOWN:                                                                                     // 2771
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);                                             // 2772
                        killEvent(e);                                                                                  // 2773
                        return;                                                                                        // 2774
                    case KEY.ENTER:                                                                                    // 2775
                        this.selectHighlighted();                                                                      // 2776
                        killEvent(e);                                                                                  // 2777
                        return;                                                                                        // 2778
                    case KEY.TAB:                                                                                      // 2779
                        this.selectHighlighted({noFocus:true});                                                        // 2780
                        this.close();                                                                                  // 2781
                        return;                                                                                        // 2782
                    case KEY.ESC:                                                                                      // 2783
                        this.cancel(e);                                                                                // 2784
                        killEvent(e);                                                                                  // 2785
                        return;                                                                                        // 2786
                    }                                                                                                  // 2787
                }                                                                                                      // 2788
                                                                                                                       // 2789
                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)                                    // 2790
                 || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {                                                // 2791
                    return;                                                                                            // 2792
                }                                                                                                      // 2793
                                                                                                                       // 2794
                if (e.which === KEY.ENTER) {                                                                           // 2795
                    if (this.opts.openOnEnter === false) {                                                             // 2796
                        return;                                                                                        // 2797
                    } else if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {                                     // 2798
                        return;                                                                                        // 2799
                    }                                                                                                  // 2800
                }                                                                                                      // 2801
                                                                                                                       // 2802
                this.open();                                                                                           // 2803
                                                                                                                       // 2804
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {                                            // 2805
                    // prevent the page from scrolling                                                                 // 2806
                    killEvent(e);                                                                                      // 2807
                }                                                                                                      // 2808
                                                                                                                       // 2809
                if (e.which === KEY.ENTER) {                                                                           // 2810
                    // prevent form from being submitted                                                               // 2811
                    killEvent(e);                                                                                      // 2812
                }                                                                                                      // 2813
                                                                                                                       // 2814
            }));                                                                                                       // 2815
                                                                                                                       // 2816
            this.search.on("keyup", this.bind(function (e) {                                                           // 2817
                this.keydowns = 0;                                                                                     // 2818
                this.resizeSearch();                                                                                   // 2819
            })                                                                                                         // 2820
            );                                                                                                         // 2821
                                                                                                                       // 2822
            this.search.on("blur", this.bind(function(e) {                                                             // 2823
                this.container.removeClass("select2-container-active");                                                // 2824
                this.search.removeClass("select2-focused");                                                            // 2825
                this.selectChoice(null);                                                                               // 2826
                if (!this.opened()) this.clearSearch();                                                                // 2827
                e.stopImmediatePropagation();                                                                          // 2828
                this.opts.element.trigger($.Event("select2-blur"));                                                    // 2829
            }));                                                                                                       // 2830
                                                                                                                       // 2831
            this.container.on("click", selector, this.bind(function (e) {                                              // 2832
                if (!this.isInterfaceEnabled()) return;                                                                // 2833
                if ($(e.target).closest(".select2-search-choice").length > 0) {                                        // 2834
                    // clicked inside a select2 search choice, do not open                                             // 2835
                    return;                                                                                            // 2836
                }                                                                                                      // 2837
                this.selectChoice(null);                                                                               // 2838
                this.clearPlaceholder();                                                                               // 2839
                if (!this.container.hasClass("select2-container-active")) {                                            // 2840
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2841
                }                                                                                                      // 2842
                this.open();                                                                                           // 2843
                this.focusSearch();                                                                                    // 2844
                e.preventDefault();                                                                                    // 2845
            }));                                                                                                       // 2846
                                                                                                                       // 2847
            this.container.on("focus", selector, this.bind(function () {                                               // 2848
                if (!this.isInterfaceEnabled()) return;                                                                // 2849
                if (!this.container.hasClass("select2-container-active")) {                                            // 2850
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2851
                }                                                                                                      // 2852
                this.container.addClass("select2-container-active");                                                   // 2853
                this.dropdown.addClass("select2-drop-active");                                                         // 2854
                this.clearPlaceholder();                                                                               // 2855
            }));                                                                                                       // 2856
                                                                                                                       // 2857
            this.initContainerWidth();                                                                                 // 2858
            this.opts.element.hide();                                                                                  // 2859
                                                                                                                       // 2860
            // set the placeholder if necessary                                                                        // 2861
            this.clearSearch();                                                                                        // 2862
        },                                                                                                             // 2863
                                                                                                                       // 2864
        // multi                                                                                                       // 2865
        enableInterface: function() {                                                                                  // 2866
            if (this.parent.enableInterface.apply(this, arguments)) {                                                  // 2867
                this.search.prop("disabled", !this.isInterfaceEnabled());                                              // 2868
            }                                                                                                          // 2869
        },                                                                                                             // 2870
                                                                                                                       // 2871
        // multi                                                                                                       // 2872
        initSelection: function () {                                                                                   // 2873
            var data;                                                                                                  // 2874
            if (this.opts.element.val() === "" && this.opts.element.text() === "") {                                   // 2875
                this.updateSelection([]);                                                                              // 2876
                this.close();                                                                                          // 2877
                // set the placeholder if necessary                                                                    // 2878
                this.clearSearch();                                                                                    // 2879
            }                                                                                                          // 2880
            if (this.select || this.opts.element.val() !== "") {                                                       // 2881
                var self = this;                                                                                       // 2882
                this.opts.initSelection.call(null, this.opts.element, function(data){                                  // 2883
                    if (data !== undefined && data !== null) {                                                         // 2884
                        self.updateSelection(data);                                                                    // 2885
                        self.close();                                                                                  // 2886
                        // set the placeholder if necessary                                                            // 2887
                        self.clearSearch();                                                                            // 2888
                    }                                                                                                  // 2889
                });                                                                                                    // 2890
            }                                                                                                          // 2891
        },                                                                                                             // 2892
                                                                                                                       // 2893
        // multi                                                                                                       // 2894
        clearSearch: function () {                                                                                     // 2895
            var placeholder = this.getPlaceholder(),                                                                   // 2896
                maxWidth = this.getMaxSearchWidth();                                                                   // 2897
                                                                                                                       // 2898
            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");                                              // 2900
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                // we could call this.resizeSearch(), but we do not because that requires a sizer and we do not want to create one so early because of a firefox bug, see #944
                this.search.width(maxWidth > 0 ? maxWidth : this.container.css("width"));                              // 2903
            } else {                                                                                                   // 2904
                this.search.val("").width(10);                                                                         // 2905
            }                                                                                                          // 2906
        },                                                                                                             // 2907
                                                                                                                       // 2908
        // multi                                                                                                       // 2909
        clearPlaceholder: function () {                                                                                // 2910
            if (this.search.hasClass("select2-default")) {                                                             // 2911
                this.search.val("").removeClass("select2-default");                                                    // 2912
            }                                                                                                          // 2913
        },                                                                                                             // 2914
                                                                                                                       // 2915
        // multi                                                                                                       // 2916
        opening: function () {                                                                                         // 2917
            this.clearPlaceholder(); // should be done before super so placeholder is not used to search               // 2918
            this.resizeSearch();                                                                                       // 2919
                                                                                                                       // 2920
            this.parent.opening.apply(this, arguments);                                                                // 2921
                                                                                                                       // 2922
            this.focusSearch();                                                                                        // 2923
                                                                                                                       // 2924
            // initializes search's value with nextSearchTerm (if defined by user)                                     // 2925
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter                           // 2926
            if(this.search.val() === "") {                                                                             // 2927
                if(this.nextSearchTerm != undefined){                                                                  // 2928
                    this.search.val(this.nextSearchTerm);                                                              // 2929
                    this.search.select();                                                                              // 2930
                }                                                                                                      // 2931
            }                                                                                                          // 2932
                                                                                                                       // 2933
            this.updateResults(true);                                                                                  // 2934
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2935
                this.search.focus();                                                                                   // 2936
            }                                                                                                          // 2937
            this.opts.element.trigger($.Event("select2-open"));                                                        // 2938
        },                                                                                                             // 2939
                                                                                                                       // 2940
        // multi                                                                                                       // 2941
        close: function () {                                                                                           // 2942
            if (!this.opened()) return;                                                                                // 2943
            this.parent.close.apply(this, arguments);                                                                  // 2944
        },                                                                                                             // 2945
                                                                                                                       // 2946
        // multi                                                                                                       // 2947
        focus: function () {                                                                                           // 2948
            this.close();                                                                                              // 2949
            this.search.focus();                                                                                       // 2950
        },                                                                                                             // 2951
                                                                                                                       // 2952
        // multi                                                                                                       // 2953
        isFocused: function () {                                                                                       // 2954
            return this.search.hasClass("select2-focused");                                                            // 2955
        },                                                                                                             // 2956
                                                                                                                       // 2957
        // multi                                                                                                       // 2958
        updateSelection: function (data) {                                                                             // 2959
            var ids = [], filtered = [], self = this;                                                                  // 2960
                                                                                                                       // 2961
            // filter out duplicates                                                                                   // 2962
            $(data).each(function () {                                                                                 // 2963
                if (indexOf(self.id(this), ids) < 0) {                                                                 // 2964
                    ids.push(self.id(this));                                                                           // 2965
                    filtered.push(this);                                                                               // 2966
                }                                                                                                      // 2967
            });                                                                                                        // 2968
            data = filtered;                                                                                           // 2969
                                                                                                                       // 2970
            this.selection.find(".select2-search-choice").remove();                                                    // 2971
            $(data).each(function () {                                                                                 // 2972
                self.addSelectedChoice(this);                                                                          // 2973
            });                                                                                                        // 2974
            self.postprocessResults();                                                                                 // 2975
        },                                                                                                             // 2976
                                                                                                                       // 2977
        // multi                                                                                                       // 2978
        tokenize: function() {                                                                                         // 2979
            var input = this.search.val();                                                                             // 2980
            input = this.opts.tokenizer.call(this, input, this.data(), this.bind(this.onSelect), this.opts);           // 2981
            if (input != null && input != undefined) {                                                                 // 2982
                this.search.val(input);                                                                                // 2983
                if (input.length > 0) {                                                                                // 2984
                    this.open();                                                                                       // 2985
                }                                                                                                      // 2986
            }                                                                                                          // 2987
                                                                                                                       // 2988
        },                                                                                                             // 2989
                                                                                                                       // 2990
        // multi                                                                                                       // 2991
        onSelect: function (data, options) {                                                                           // 2992
                                                                                                                       // 2993
            if (!this.triggerSelect(data) || data.text === "") { return; }                                             // 2994
                                                                                                                       // 2995
            this.addSelectedChoice(data);                                                                              // 2996
                                                                                                                       // 2997
            this.opts.element.trigger({ type: "selected", val: this.id(data), choice: data });                         // 2998
                                                                                                                       // 2999
            // keep track of the search's value before it gets cleared                                                 // 3000
            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());                                   // 3001
                                                                                                                       // 3002
            this.clearSearch();                                                                                        // 3003
            this.updateResults();                                                                                      // 3004
                                                                                                                       // 3005
            if (this.select || !this.opts.closeOnSelect) this.postprocessResults(data, false, this.opts.closeOnSelect===true);
                                                                                                                       // 3007
            if (this.opts.closeOnSelect) {                                                                             // 3008
                this.close();                                                                                          // 3009
                this.search.width(10);                                                                                 // 3010
            } else {                                                                                                   // 3011
                if (this.countSelectableResults()>0) {                                                                 // 3012
                    this.search.width(10);                                                                             // 3013
                    this.resizeSearch();                                                                               // 3014
                    if (this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize()) {   // 3015
                        // if we reached max selection size repaint the results so choices                             // 3016
                        // are replaced with the max selection reached message                                         // 3017
                        this.updateResults(true);                                                                      // 3018
                    } else {                                                                                           // 3019
                        // initializes search's value with nextSearchTerm and update search result                     // 3020
                        if(this.nextSearchTerm != undefined){                                                          // 3021
                            this.search.val(this.nextSearchTerm);                                                      // 3022
                            this.updateResults();                                                                      // 3023
                            this.search.select();                                                                      // 3024
                        }                                                                                              // 3025
                    }                                                                                                  // 3026
                    this.positionDropdown();                                                                           // 3027
                } else {                                                                                               // 3028
                    // if nothing left to select close                                                                 // 3029
                    this.close();                                                                                      // 3030
                    this.search.width(10);                                                                             // 3031
                }                                                                                                      // 3032
            }                                                                                                          // 3033
                                                                                                                       // 3034
            // since its not possible to select an element that has already been                                       // 3035
            // added we do not need to check if this is a new element before firing change                             // 3036
            this.triggerChange({ added: data });                                                                       // 3037
                                                                                                                       // 3038
            if (!options || !options.noFocus)                                                                          // 3039
                this.focusSearch();                                                                                    // 3040
        },                                                                                                             // 3041
                                                                                                                       // 3042
        // multi                                                                                                       // 3043
        cancel: function () {                                                                                          // 3044
            this.close();                                                                                              // 3045
            this.focusSearch();                                                                                        // 3046
        },                                                                                                             // 3047
                                                                                                                       // 3048
        addSelectedChoice: function (data) {                                                                           // 3049
            var enableChoice = !data.locked,                                                                           // 3050
                enabledItem = $(                                                                                       // 3051
                    "<li class='select2-search-choice'>" +                                                             // 3052
                    "    <div></div>" +                                                                                // 3053
                    "    <a href='#' class='select2-search-choice-close' tabindex='-1'></a>" +                         // 3054
                    "</li>"),                                                                                          // 3055
                disabledItem = $(                                                                                      // 3056
                    "<li class='select2-search-choice select2-locked'>" +                                              // 3057
                    "<div></div>" +                                                                                    // 3058
                    "</li>");                                                                                          // 3059
            var choice = enableChoice ? enabledItem : disabledItem,                                                    // 3060
                id = this.id(data),                                                                                    // 3061
                val = this.getVal(),                                                                                   // 3062
                formatted,                                                                                             // 3063
                cssClass;                                                                                              // 3064
                                                                                                                       // 3065
            formatted=this.opts.formatSelection(data, choice.find("div"), this.opts.escapeMarkup);                     // 3066
            if (formatted != undefined) {                                                                              // 3067
                choice.find("div").replaceWith($("<div></div>").html(formatted));                                      // 3068
            }                                                                                                          // 3069
            cssClass=this.opts.formatSelectionCssClass(data, choice.find("div"));                                      // 3070
            if (cssClass != undefined) {                                                                               // 3071
                choice.addClass(cssClass);                                                                             // 3072
            }                                                                                                          // 3073
                                                                                                                       // 3074
            if(enableChoice){                                                                                          // 3075
              choice.find(".select2-search-choice-close")                                                              // 3076
                  .on("mousedown", killEvent)                                                                          // 3077
                  .on("click dblclick", this.bind(function (e) {                                                       // 3078
                  if (!this.isInterfaceEnabled()) return;                                                              // 3079
                                                                                                                       // 3080
                  this.unselect($(e.target));                                                                          // 3081
                  this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");      // 3082
                  killEvent(e);                                                                                        // 3083
                  this.close();                                                                                        // 3084
                  this.focusSearch();                                                                                  // 3085
              })).on("focus", this.bind(function () {                                                                  // 3086
                  if (!this.isInterfaceEnabled()) return;                                                              // 3087
                  this.container.addClass("select2-container-active");                                                 // 3088
                  this.dropdown.addClass("select2-drop-active");                                                       // 3089
              }));                                                                                                     // 3090
            }                                                                                                          // 3091
                                                                                                                       // 3092
            choice.data("select2-data", data);                                                                         // 3093
            choice.insertBefore(this.searchContainer);                                                                 // 3094
                                                                                                                       // 3095
            val.push(id);                                                                                              // 3096
            this.setVal(val);                                                                                          // 3097
        },                                                                                                             // 3098
                                                                                                                       // 3099
        // multi                                                                                                       // 3100
        unselect: function (selected) {                                                                                // 3101
            var val = this.getVal(),                                                                                   // 3102
                data,                                                                                                  // 3103
                index;                                                                                                 // 3104
            selected = selected.closest(".select2-search-choice");                                                     // 3105
                                                                                                                       // 3106
            if (selected.length === 0) {                                                                               // 3107
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";                            // 3108
            }                                                                                                          // 3109
                                                                                                                       // 3110
            data = selected.data("select2-data");                                                                      // 3111
                                                                                                                       // 3112
            if (!data) {                                                                                               // 3113
                // prevent a race condition when the 'x' is clicked really fast repeatedly the event can be queued     // 3114
                // and invoked on an element already removed                                                           // 3115
                return;                                                                                                // 3116
            }                                                                                                          // 3117
                                                                                                                       // 3118
            var evt = $.Event("select2-removing");                                                                     // 3119
            evt.val = this.id(data);                                                                                   // 3120
            evt.choice = data;                                                                                         // 3121
            this.opts.element.trigger(evt);                                                                            // 3122
                                                                                                                       // 3123
            if (evt.isDefaultPrevented()) {                                                                            // 3124
                return false;                                                                                          // 3125
            }                                                                                                          // 3126
                                                                                                                       // 3127
            while((index = indexOf(this.id(data), val)) >= 0) {                                                        // 3128
                val.splice(index, 1);                                                                                  // 3129
                this.setVal(val);                                                                                      // 3130
                if (this.select) this.postprocessResults();                                                            // 3131
            }                                                                                                          // 3132
                                                                                                                       // 3133
            selected.remove();                                                                                         // 3134
                                                                                                                       // 3135
            this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });                  // 3136
            this.triggerChange({ removed: data });                                                                     // 3137
                                                                                                                       // 3138
            return true;                                                                                               // 3139
        },                                                                                                             // 3140
                                                                                                                       // 3141
        // multi                                                                                                       // 3142
        postprocessResults: function (data, initial, noHighlightUpdate) {                                              // 3143
            var val = this.getVal(),                                                                                   // 3144
                choices = this.results.find(".select2-result"),                                                        // 3145
                compound = this.results.find(".select2-result-with-children"),                                         // 3146
                self = this;                                                                                           // 3147
                                                                                                                       // 3148
            choices.each2(function (i, choice) {                                                                       // 3149
                var id = self.id(choice.data("select2-data"));                                                         // 3150
                if (indexOf(id, val) >= 0) {                                                                           // 3151
                    choice.addClass("select2-selected");                                                               // 3152
                    // mark all children of the selected parent as selected                                            // 3153
                    choice.find(".select2-result-selectable").addClass("select2-selected");                            // 3154
                }                                                                                                      // 3155
            });                                                                                                        // 3156
                                                                                                                       // 3157
            compound.each2(function(i, choice) {                                                                       // 3158
                // hide an optgroup if it doesn't have any selectable children                                         // 3159
                if (!choice.is('.select2-result-selectable')                                                           // 3160
                    && choice.find(".select2-result-selectable:not(.select2-selected)").length === 0) {                // 3161
                    choice.addClass("select2-selected");                                                               // 3162
                }                                                                                                      // 3163
            });                                                                                                        // 3164
                                                                                                                       // 3165
            if (this.highlight() == -1 && noHighlightUpdate !== false && this.opts.closeOnSelect === true){            // 3166
                self.highlight(0);                                                                                     // 3167
            }                                                                                                          // 3168
                                                                                                                       // 3169
            //If all results are chosen render formatNoMatches                                                         // 3170
            if(!this.opts.createSearchChoice && !choices.filter('.select2-result:not(.select2-selected)').length > 0){ // 3171
                if(!data || data && !data.more && this.results.find(".select2-no-results").length === 0) {             // 3172
                    if (checkFormatter(self.opts.formatNoMatches, "formatNoMatches")) {                                // 3173
                        this.results.append("<li class='select2-no-results'>" + evaluate(self.opts.formatNoMatches, self.opts.element, self.search.val()) + "</li>");
                    }                                                                                                  // 3175
                }                                                                                                      // 3176
            }                                                                                                          // 3177
                                                                                                                       // 3178
        },                                                                                                             // 3179
                                                                                                                       // 3180
        // multi                                                                                                       // 3181
        getMaxSearchWidth: function() {                                                                                // 3182
            return this.selection.width() - getSideBorderPadding(this.search);                                         // 3183
        },                                                                                                             // 3184
                                                                                                                       // 3185
        // multi                                                                                                       // 3186
        resizeSearch: function () {                                                                                    // 3187
            var minimumWidth, left, maxWidth, containerLeft, searchWidth,                                              // 3188
                sideBorderPadding = getSideBorderPadding(this.search);                                                 // 3189
                                                                                                                       // 3190
            minimumWidth = measureTextWidth(this.search) + 10;                                                         // 3191
                                                                                                                       // 3192
            left = this.search.offset().left;                                                                          // 3193
                                                                                                                       // 3194
            maxWidth = this.selection.width();                                                                         // 3195
            containerLeft = this.selection.offset().left;                                                              // 3196
                                                                                                                       // 3197
            searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;                                       // 3198
                                                                                                                       // 3199
            if (searchWidth < minimumWidth) {                                                                          // 3200
                searchWidth = maxWidth - sideBorderPadding;                                                            // 3201
            }                                                                                                          // 3202
                                                                                                                       // 3203
            if (searchWidth < 40) {                                                                                    // 3204
                searchWidth = maxWidth - sideBorderPadding;                                                            // 3205
            }                                                                                                          // 3206
                                                                                                                       // 3207
            if (searchWidth <= 0) {                                                                                    // 3208
              searchWidth = minimumWidth;                                                                              // 3209
            }                                                                                                          // 3210
                                                                                                                       // 3211
            this.search.width(Math.floor(searchWidth));                                                                // 3212
        },                                                                                                             // 3213
                                                                                                                       // 3214
        // multi                                                                                                       // 3215
        getVal: function () {                                                                                          // 3216
            var val;                                                                                                   // 3217
            if (this.select) {                                                                                         // 3218
                val = this.select.val();                                                                               // 3219
                return val === null ? [] : val;                                                                        // 3220
            } else {                                                                                                   // 3221
                val = this.opts.element.val();                                                                         // 3222
                return splitVal(val, this.opts.separator, this.opts.transformVal);                                     // 3223
            }                                                                                                          // 3224
        },                                                                                                             // 3225
                                                                                                                       // 3226
        // multi                                                                                                       // 3227
        setVal: function (val) {                                                                                       // 3228
            var unique;                                                                                                // 3229
            if (this.select) {                                                                                         // 3230
                this.select.val(val);                                                                                  // 3231
            } else {                                                                                                   // 3232
                unique = [];                                                                                           // 3233
                // filter out duplicates                                                                               // 3234
                $(val).each(function () {                                                                              // 3235
                    if (indexOf(this, unique) < 0) unique.push(this);                                                  // 3236
                });                                                                                                    // 3237
                this.opts.element.val(unique.length === 0 ? "" : unique.join(this.opts.separator));                    // 3238
            }                                                                                                          // 3239
        },                                                                                                             // 3240
                                                                                                                       // 3241
        // multi                                                                                                       // 3242
        buildChangeDetails: function (old, current) {                                                                  // 3243
            var current = current.slice(0),                                                                            // 3244
                old = old.slice(0);                                                                                    // 3245
                                                                                                                       // 3246
            // remove intersection from each array                                                                     // 3247
            for (var i = 0; i < current.length; i++) {                                                                 // 3248
                for (var j = 0; j < old.length; j++) {                                                                 // 3249
                    if (equal(this.opts.id(current[i]), this.opts.id(old[j]))) {                                       // 3250
                        current.splice(i, 1);                                                                          // 3251
                        if(i>0){                                                                                       // 3252
                            i--;                                                                                       // 3253
                        }                                                                                              // 3254
                        old.splice(j, 1);                                                                              // 3255
                        j--;                                                                                           // 3256
                    }                                                                                                  // 3257
                }                                                                                                      // 3258
            }                                                                                                          // 3259
                                                                                                                       // 3260
            return {added: current, removed: old};                                                                     // 3261
        },                                                                                                             // 3262
                                                                                                                       // 3263
                                                                                                                       // 3264
        // multi                                                                                                       // 3265
        val: function (val, triggerChange) {                                                                           // 3266
            var oldData, self=this;                                                                                    // 3267
                                                                                                                       // 3268
            if (arguments.length === 0) {                                                                              // 3269
                return this.getVal();                                                                                  // 3270
            }                                                                                                          // 3271
                                                                                                                       // 3272
            oldData=this.data();                                                                                       // 3273
            if (!oldData.length) oldData=[];                                                                           // 3274
                                                                                                                       // 3275
            // val is an id. !val is true for [undefined,null,'',0] - 0 is legal                                       // 3276
            if (!val && val !== 0) {                                                                                   // 3277
                this.opts.element.val("");                                                                             // 3278
                this.updateSelection([]);                                                                              // 3279
                this.clearSearch();                                                                                    // 3280
                if (triggerChange) {                                                                                   // 3281
                    this.triggerChange({added: this.data(), removed: oldData});                                        // 3282
                }                                                                                                      // 3283
                return;                                                                                                // 3284
            }                                                                                                          // 3285
                                                                                                                       // 3286
            // val is a list of ids                                                                                    // 3287
            this.setVal(val);                                                                                          // 3288
                                                                                                                       // 3289
            if (this.select) {                                                                                         // 3290
                this.opts.initSelection(this.select, this.bind(this.updateSelection));                                 // 3291
                if (triggerChange) {                                                                                   // 3292
                    this.triggerChange(this.buildChangeDetails(oldData, this.data()));                                 // 3293
                }                                                                                                      // 3294
            } else {                                                                                                   // 3295
                if (this.opts.initSelection === undefined) {                                                           // 3296
                    throw new Error("val() cannot be called if initSelection() is not defined");                       // 3297
                }                                                                                                      // 3298
                                                                                                                       // 3299
                this.opts.initSelection(this.opts.element, function(data){                                             // 3300
                    var ids=$.map(data, self.id);                                                                      // 3301
                    self.setVal(ids);                                                                                  // 3302
                    self.updateSelection(data);                                                                        // 3303
                    self.clearSearch();                                                                                // 3304
                    if (triggerChange) {                                                                               // 3305
                        self.triggerChange(self.buildChangeDetails(oldData, self.data()));                             // 3306
                    }                                                                                                  // 3307
                });                                                                                                    // 3308
            }                                                                                                          // 3309
            this.clearSearch();                                                                                        // 3310
        },                                                                                                             // 3311
                                                                                                                       // 3312
        // multi                                                                                                       // 3313
        onSortStart: function() {                                                                                      // 3314
            if (this.select) {                                                                                         // 3315
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }                                                                                                          // 3317
                                                                                                                       // 3318
            // collapse search field into 0 width so its container can be collapsed as well                            // 3319
            this.search.width(0);                                                                                      // 3320
            // hide the container                                                                                      // 3321
            this.searchContainer.hide();                                                                               // 3322
        },                                                                                                             // 3323
                                                                                                                       // 3324
        // multi                                                                                                       // 3325
        onSortEnd:function() {                                                                                         // 3326
                                                                                                                       // 3327
            var val=[], self=this;                                                                                     // 3328
                                                                                                                       // 3329
            // show search and move it to the end of the list                                                          // 3330
            this.searchContainer.show();                                                                               // 3331
            // make sure the search container is the last item in the list                                             // 3332
            this.searchContainer.appendTo(this.searchContainer.parent());                                              // 3333
            // since we collapsed the width in dragStarted, we resize it here                                          // 3334
            this.resizeSearch();                                                                                       // 3335
                                                                                                                       // 3336
            // update selection                                                                                        // 3337
            this.selection.find(".select2-search-choice").each(function() {                                            // 3338
                val.push(self.opts.id($(this).data("select2-data")));                                                  // 3339
            });                                                                                                        // 3340
            this.setVal(val);                                                                                          // 3341
            this.triggerChange();                                                                                      // 3342
        },                                                                                                             // 3343
                                                                                                                       // 3344
        // multi                                                                                                       // 3345
        data: function(values, triggerChange) {                                                                        // 3346
            var self=this, ids, old;                                                                                   // 3347
            if (arguments.length === 0) {                                                                              // 3348
                 return this.selection                                                                                 // 3349
                     .children(".select2-search-choice")                                                               // 3350
                     .map(function() { return $(this).data("select2-data"); })                                         // 3351
                     .get();                                                                                           // 3352
            } else {                                                                                                   // 3353
                old = this.data();                                                                                     // 3354
                if (!values) { values = []; }                                                                          // 3355
                ids = $.map(values, function(e) { return self.opts.id(e); });                                          // 3356
                this.setVal(ids);                                                                                      // 3357
                this.updateSelection(values);                                                                          // 3358
                this.clearSearch();                                                                                    // 3359
                if (triggerChange) {                                                                                   // 3360
                    this.triggerChange(this.buildChangeDetails(old, this.data()));                                     // 3361
                }                                                                                                      // 3362
            }                                                                                                          // 3363
        }                                                                                                              // 3364
    });                                                                                                                // 3365
                                                                                                                       // 3366
    $.fn.select2 = function () {                                                                                       // 3367
                                                                                                                       // 3368
        var args = Array.prototype.slice.call(arguments, 0),                                                           // 3369
            opts,                                                                                                      // 3370
            select2,                                                                                                   // 3371
            method, value, multiple,                                                                                   // 3372
            allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
            valueMethods = ["opened", "isFocused", "container", "dropdown"],                                           // 3374
            propertyMethods = ["val", "data"],                                                                         // 3375
            methodsMap = { search: "externalSearch" };                                                                 // 3376
                                                                                                                       // 3377
        this.each(function () {                                                                                        // 3378
            if (args.length === 0 || typeof(args[0]) === "object") {                                                   // 3379
                opts = args.length === 0 ? {} : $.extend({}, args[0]);                                                 // 3380
                opts.element = $(this);                                                                                // 3381
                                                                                                                       // 3382
                if (opts.element.get(0).tagName.toLowerCase() === "select") {                                          // 3383
                    multiple = opts.element.prop("multiple");                                                          // 3384
                } else {                                                                                               // 3385
                    multiple = opts.multiple || false;                                                                 // 3386
                    if ("tags" in opts) {opts.multiple = multiple = true;}                                             // 3387
                }                                                                                                      // 3388
                                                                                                                       // 3389
                select2 = multiple ? new window.Select2["class"].multi() : new window.Select2["class"].single();       // 3390
                select2.init(opts);                                                                                    // 3391
            } else if (typeof(args[0]) === "string") {                                                                 // 3392
                                                                                                                       // 3393
                if (indexOf(args[0], allowedMethods) < 0) {                                                            // 3394
                    throw "Unknown method: " + args[0];                                                                // 3395
                }                                                                                                      // 3396
                                                                                                                       // 3397
                value = undefined;                                                                                     // 3398
                select2 = $(this).data("select2");                                                                     // 3399
                if (select2 === undefined) return;                                                                     // 3400
                                                                                                                       // 3401
                method=args[0];                                                                                        // 3402
                                                                                                                       // 3403
                if (method === "container") {                                                                          // 3404
                    value = select2.container;                                                                         // 3405
                } else if (method === "dropdown") {                                                                    // 3406
                    value = select2.dropdown;                                                                          // 3407
                } else {                                                                                               // 3408
                    if (methodsMap[method]) method = methodsMap[method];                                               // 3409
                                                                                                                       // 3410
                    value = select2[method].apply(select2, args.slice(1));                                             // 3411
                }                                                                                                      // 3412
                if (indexOf(args[0], valueMethods) >= 0                                                                // 3413
                    || (indexOf(args[0], propertyMethods) >= 0 && args.length == 1)) {                                 // 3414
                    return false; // abort the iteration, ready to return first matched value                          // 3415
                }                                                                                                      // 3416
            } else {                                                                                                   // 3417
                throw "Invalid arguments to select2 plugin: " + args;                                                  // 3418
            }                                                                                                          // 3419
        });                                                                                                            // 3420
        return (value === undefined) ? this : value;                                                                   // 3421
    };                                                                                                                 // 3422
                                                                                                                       // 3423
    // plugin defaults, accessible to users                                                                            // 3424
    $.fn.select2.defaults = {                                                                                          // 3425
        width: "copy",                                                                                                 // 3426
        loadMorePadding: 0,                                                                                            // 3427
        closeOnSelect: true,                                                                                           // 3428
        openOnEnter: true,                                                                                             // 3429
        containerCss: {},                                                                                              // 3430
        dropdownCss: {},                                                                                               // 3431
        containerCssClass: "",                                                                                         // 3432
        dropdownCssClass: "",                                                                                          // 3433
        formatResult: function(result, container, query, escapeMarkup) {                                               // 3434
            var markup=[];                                                                                             // 3435
            markMatch(this.text(result), query.term, markup, escapeMarkup);                                            // 3436
            return markup.join("");                                                                                    // 3437
        },                                                                                                             // 3438
        transformVal: function(val) {                                                                                  // 3439
            return $.trim(val);                                                                                        // 3440
        },                                                                                                             // 3441
        formatSelection: function (data, container, escapeMarkup) {                                                    // 3442
            return data ? escapeMarkup(this.text(data)) : undefined;                                                   // 3443
        },                                                                                                             // 3444
        sortResults: function (results, container, query) {                                                            // 3445
            return results;                                                                                            // 3446
        },                                                                                                             // 3447
        formatResultCssClass: function(data) {return data.css;},                                                       // 3448
        formatSelectionCssClass: function(data, container) {return undefined;},                                        // 3449
        minimumResultsForSearch: 0,                                                                                    // 3450
        minimumInputLength: 0,                                                                                         // 3451
        maximumInputLength: null,                                                                                      // 3452
        maximumSelectionSize: 0,                                                                                       // 3453
        id: function (e) { return e == undefined ? null : e.id; },                                                     // 3454
        text: function (e) {                                                                                           // 3455
          if (e && this.data && this.data.text) {                                                                      // 3456
            if ($.isFunction(this.data.text)) {                                                                        // 3457
              return this.data.text(e);                                                                                // 3458
            } else {                                                                                                   // 3459
              return e[this.data.text];                                                                                // 3460
            }                                                                                                          // 3461
          } else {                                                                                                     // 3462
            return e.text;                                                                                             // 3463
          }                                                                                                            // 3464
        },                                                                                                             // 3465
        matcher: function(term, text) {                                                                                // 3466
            return stripDiacritics(''+text).toUpperCase().indexOf(stripDiacritics(''+term).toUpperCase()) >= 0;        // 3467
        },                                                                                                             // 3468
        separator: ",",                                                                                                // 3469
        tokenSeparators: [],                                                                                           // 3470
        tokenizer: defaultTokenizer,                                                                                   // 3471
        escapeMarkup: defaultEscapeMarkup,                                                                             // 3472
        blurOnChange: false,                                                                                           // 3473
        selectOnBlur: false,                                                                                           // 3474
        adaptContainerCssClass: function(c) { return c; },                                                             // 3475
        adaptDropdownCssClass: function(c) { return null; },                                                           // 3476
        nextSearchTerm: function(selectedObject, currentSearchTerm) { return undefined; },                             // 3477
        searchInputPlaceholder: '',                                                                                    // 3478
        createSearchChoicePosition: 'top',                                                                             // 3479
        shouldFocusInput: function (instance) {                                                                        // 3480
            // Attempt to detect touch devices                                                                         // 3481
            var supportsTouchEvents = (('ontouchstart' in window) ||                                                   // 3482
                                       (navigator.msMaxTouchPoints > 0));                                              // 3483
                                                                                                                       // 3484
            // Only devices which support touch events should be special cased                                         // 3485
            if (!supportsTouchEvents) {                                                                                // 3486
                return true;                                                                                           // 3487
            }                                                                                                          // 3488
                                                                                                                       // 3489
            // Never focus the input if search is disabled                                                             // 3490
            if (instance.opts.minimumResultsForSearch < 0) {                                                           // 3491
                return false;                                                                                          // 3492
            }                                                                                                          // 3493
                                                                                                                       // 3494
            return true;                                                                                               // 3495
        }                                                                                                              // 3496
    };                                                                                                                 // 3497
                                                                                                                       // 3498
    $.fn.select2.locales = [];                                                                                         // 3499
                                                                                                                       // 3500
    $.fn.select2.locales['en'] = {                                                                                     // 3501
         formatMatches: function (matches) { if (matches === 1) { return "One result is available, press enter to select it."; } return matches + " results are available, use up and down arrow keys to navigate."; },
         formatNoMatches: function () { return "No matches found"; },                                                  // 3503
         formatAjaxError: function (jqXHR, textStatus, errorThrown) { return "Loading failed"; },                      // 3504
         formatInputTooShort: function (input, min) { var n = min - input.length; return "Please enter " + n + " or more character" + (n == 1 ? "" : "s"); },
         formatInputTooLong: function (input, max) { var n = input.length - max; return "Please delete " + n + " character" + (n == 1 ? "" : "s"); },
         formatSelectionTooBig: function (limit) { return "You can only select " + limit + " item" + (limit == 1 ? "" : "s"); },
         formatLoadMore: function (pageNumber) { return "Loading more results…"; },                                    // 3508
         formatSearching: function () { return "Searching…"; }                                                         // 3509
    };                                                                                                                 // 3510
                                                                                                                       // 3511
    $.extend($.fn.select2.defaults, $.fn.select2.locales['en']);                                                       // 3512
                                                                                                                       // 3513
    $.fn.select2.ajaxDefaults = {                                                                                      // 3514
        transport: $.ajax,                                                                                             // 3515
        params: {                                                                                                      // 3516
            type: "GET",                                                                                               // 3517
            cache: false,                                                                                              // 3518
            dataType: "json"                                                                                           // 3519
        }                                                                                                              // 3520
    };                                                                                                                 // 3521
                                                                                                                       // 3522
    // exports                                                                                                         // 3523
    window.Select2 = {                                                                                                 // 3524
        query: {                                                                                                       // 3525
            ajax: ajax,                                                                                                // 3526
            local: local,                                                                                              // 3527
            tags: tags                                                                                                 // 3528
        }, util: {                                                                                                     // 3529
            debounce: debounce,                                                                                        // 3530
            markMatch: markMatch,                                                                                      // 3531
            escapeMarkup: defaultEscapeMarkup,                                                                         // 3532
            stripDiacritics: stripDiacritics                                                                           // 3533
        }, "class": {                                                                                                  // 3534
            "abstract": AbstractSelect2,                                                                               // 3535
            "single": SingleSelect2,                                                                                   // 3536
            "multi": MultiSelect2                                                                                      // 3537
        }                                                                                                              // 3538
    };                                                                                                                 // 3539
                                                                                                                       // 3540
}(jQuery));                                                                                                            // 3541
                                                                                                                       // 3542
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/navigation/api-tests.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Write your tests here!                                                                                              // 1
// Here is an example.                                                                                                 // 2
/*                                                                                                                     // 3
Tinytest.add('example', function (test) {                                                                              // 4
  test.equal(true, true);                                                                                              // 5
});                                                                                                                    // 6
*/                                                                                                                     // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/navigation/api.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Write your package code here!                                                                                       // 1
/**                                                                                                                    // 2
 * Created by ted on 11/3/14.                                                                                          // 3
 */                                                                                                                    // 4
                                                                                                                       // 5
/* AppState stores the the state of an application for restoration by the restore route */                             // 6
                                                                                                                       // 7
AppState = new Meteor.Collection("AppState");                                                                          // 8
                                                                                                                       // 9
/*                                                                                                                     // 10
var postObject = {                                                                                                     // 11
    userId: this.userId,                                                                                               // 12
    collaboration: collaboration,                                                                                      // 13
    title:  title,                                                                                                     // 14
    content: content,                                                                                                  // 15
    url: url,                                                                                                          // 16
    blobs: blobs,                                                                                                      // 17
    appStateId: appStateId,                                                                                            // 18
}                                                                                                                      // 19
*/                                                                                                                     // 20
                                                                                                                       // 21
MedBookPost = function(telescopeHost, authToken, postObject, returnFunction) {                                         // 22
    var json = JSON.stringify(postObject);                                                                             // 23
                                                                                                                       // 24
    HTTP.post(telescopeHost + '/medbookPost', {                                                                        // 25
        params:  {                                                                                                     // 26
            json: json,                                                                                                // 27
            token: authToken                                                                                           // 28
        }                                                                                                              // 29
    }, returnFunction);                                                                                                // 30
}                                                                                                                      // 31
                                                                                                                       // 32
if (Meteor.server) {                                                                                                   // 33
                                                                                                                       // 34
    var serverMedBookPost = function (telescopeHost, authToken, postObject) {                                          // 35
        console.log("serverMedBookPost", telescopeHost, authToken, postObject);                                        // 36
        MedBookPost(telescopeHost, authToken, postObject, function (err, ret) {                                        // 37
            console.log("callBack", err, ret);                                                                         // 38
        })                                                                                                             // 39
    };                                                                                                                 // 40
                                                                                                                       // 41
    Meteor.methods({ServerMedBookPost: serverMedBookPost});                                                            // 42
}                                                                                                                      // 43
                                                                                                                       // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/navigation/template.navigator.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("MedBookNavigator");                                                                              // 2
Template["MedBookNavigator"] = new Template("Template.MedBookNavigator", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<a class="MedBookLink" style="text-align: center;" href="#">\n        <img id="MedBookImage" width="230px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAtCAYAAADr0SSvAAAEJGlDQ1BJQ0MgUHJvZmlsZQAAOBGFVd9v21QUPolvUqQWPyBYR4eKxa9VU1u5GxqtxgZJk6XtShal6dgqJOQ6N4mpGwfb6baqT3uBNwb8AUDZAw9IPCENBmJ72fbAtElThyqqSUh76MQPISbtBVXhu3ZiJ1PEXPX6yznfOec7517bRD1fabWaGVWIlquunc8klZOnFpSeTYrSs9RLA9Sr6U4tkcvNEi7BFffO6+EdigjL7ZHu/k72I796i9zRiSJPwG4VHX0Z+AxRzNRrtksUvwf7+Gm3BtzzHPDTNgQCqwKXfZwSeNHHJz1OIT8JjtAq6xWtCLwGPLzYZi+3YV8DGMiT4VVuG7oiZpGzrZJhcs/hL49xtzH/Dy6bdfTsXYNY+5yluWO4D4neK/ZUvok/17X0HPBLsF+vuUlhfwX4j/rSfAJ4H1H0qZJ9dN7nR19frRTeBt4Fe9FwpwtN+2p1MXscGLHR9SXrmMgjONd1ZxKzpBeA71b4tNhj6JGoyFNp4GHgwUp9qplfmnFW5oTdy7NamcwCI49kv6fN5IAHgD+0rbyoBc3SOjczohbyS1drbq6pQdqumllRC/0ymTtej8gpbbuVwpQfyw66dqEZyxZKxtHpJn+tZnpnEdrYBbueF9qQn93S7HQGGHnYP7w6L+YGHNtd1FJitqPAR+hERCNOFi1i1alKO6RQnjKUxL1GNjwlMsiEhcPLYTEiT9ISbN15OY/jx4SMshe9LaJRpTvHr3C/ybFYP1PZAfwfYrPsMBtnE6SwN9ib7AhLwTrBDgUKcm06FSrTfSj187xPdVQWOk5Q8vxAfSiIUc7Z7xr6zY/+hpqwSyv0I0/QMTRb7RMgBxNodTfSPqdraz/sDjzKBrv4zu2+a2t0/HHzjd2Lbcc2sG7GtsL42K+xLfxtUgI7YHqKlqHK8HbCCXgjHT1cAdMlDetv4FnQ2lLasaOl6vmB0CMmwT/IPszSueHQqv6i/qluqF+oF9TfO2qEGTumJH0qfSv9KH0nfS/9TIp0Wboi/SRdlb6RLgU5u++9nyXYe69fYRPdil1o1WufNSdTTsp75BfllPy8/LI8G7AUuV8ek6fkvfDsCfbNDP0dvRh0CrNqTbV7LfEEGDQPJQadBtfGVMWEq3QWWdufk6ZSNsjG2PQjp3ZcnOWWing6noonSInvi0/Ex+IzAreevPhe+CawpgP1/pMTMDo64G0sTCXIM+KdOnFWRfQKdJvQzV1+Bt8OokmrdtY2yhVX2a+qrykJfMq4Ml3VR4cVzTQVz+UoNne4vcKLoyS+gyKO6EHe+75Fdt0Mbe5bRIf/wjvrVmhbqBN97RD1vxrahvBOfOYzoosH9bq94uejSOQGkVM6sN/7HelL4t10t9F4gPdVzydEOx83Gv+uNxo7XyL/FtFl8z9ZAHF4bBsrEwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAnppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CohVDBoAACJPSURBVHgB7ZwJnF1Flf/v9l53Z997TzohAYGwjTAwKn+Cfx1kGRQVUAQREMe/uCEIDighwDjgiKCM8BfRcQNnDIuAAy4MBpRNA/koBGQJWbtfd/a9t3frzvdX996X193vve6ERP1//q/gvntv1TmnTp06W9WtjhtFkVMtVQlUJVBaAl7p6mptVQJVCUgCVQOp6kFVAhUkUDWQCsKpNlUl8IYMxHVdj8svutwRiXSB6zkLXV/XwjO4Q2BEeFWgqgT+zBJwd3eRji5LmX2uENwhK3wZi8ZAU6j7rgLeAvCudkI17qqPnxYtcIN5S53I+ckuvKQv9aeuIr3rPhi3+l6VwL6SwG4ZiJQf/SwofnNz83TPmIbIGD8Kgp4gCFasXLlyk5gF1kYn4I2NFqfvwtu4oKXFD0196HuZyIk2b3OyK9rmL++xg1RkOcMxpYxoXwmhSrcqgXISGLGBFBtHS2Pjubjx8/H3h1M/TsTl2HH1Oeofizz31o6Ojt+oXinU6UQF3d/xppYLIsd82HXcucST8T4mlA+dXhBXA/orbO+bk67JLRWeCrRrRzvOhB2Osw36O3gPuOfj1upvVQL7XgIjMpBUMYkYB7jG/JDgcBQmgVHEhgGbSnsAQ/W5ZCxOZL715gnh5+//07ptG66afpTnmjvG17qH5o3j9OQjJ+QuEp7nuBmSsrrAdTZ1G5nZVZOvWXOdhn5QU92Ml3I9H5QdAd5N1XZof58+PO6iUC2JBJCJXcchF83F/5dlX8hg2EU6nSqtyrdMazkcrf69jMMYkzcmKl6DpOsEmkxeylubCf7xgZeDq5xH9hvvOOYxGceWHpPf0WvCEMzEvrA3J+rNR2Zzd9Tvs+SfPNq7duP85ts1w6Oaejom1QRLsIR1vP79SGddPI8UthIcdLQJYRWvEtxfQ5sMQ6UULwwhKHNpg2VYHShF86+xLpZAaRnsKb9BJUQJj07DqVOnjq3xg7s9zxvLey84NSXwpEiEEL6tRE4/4QHBuxOcV/qmZn2nbku3Ye2iHSv+S0rywE2hx/GIH2bTztBMGuVfuGVB82uLF0dfOf9vxj736+Xb+7f1Oo9Edc42ocJDxeghnuH9DS3ok7Hbft4orXS8++ouXmfPnp2pqamJXnjhhb7B/SCPimmpxgeOnevBuP8vvR/pupkts2d7r732mpx0Ya38RsZQ0UAkNC6TDYIvMgf70WkfVynj2MVD7MMS3Y/6nZqwP2/Io2wksqnYLtghT/JmkYMxsUXmLtj6pdb7vvvctlcTsM1DwEtUHOkemck15Q6Bz+dKNI+oSgoDvmlsbGwjInbz3JXUlfTQIyK6D4BimUZh07SmY3Zu234f1/PTpk17z9q1a7en/HIPaD/F9cx4xrHLeCK/2wmc9bSvoH4N7MmpDNiE2Qcs73WS6ThFuLOh4c5o2/YTmurrP8brf+6N8ZQNrxCXR8nXU+jsPJ7luYczKPFZVIgi/dqdLaoa9pGpNE7/xDq3Nu9F/0fg2gIWP1xlKaldsO0N7RNIBe+e3tAwV+/U73G65UXut3zff6voUPaYToy+T35TeYyBz2m8HEj+ms6pbZsyZUodsfl2z/W+53n+Xb4f2MvznftcE/0myodLWxoaH21tbJzH/MpIUvx9wvC+JMqHgDnspI5j0icn/aTy2eNuKwnDtmU871jyn6kIT+lGJfg9ZmIoYuT1KimInJNeXDA3O29+RMiUfVbML60wslE01vPcmaHjfWYo3eFrZFDqB4X5W+j8PYukScNj/WUhXFerOhvcdpIGD4hyjCdyCcra/mA7fhkrwGdCY5bw/gqAGxnjOM/3jmdz5NfNDQ0fhI55I07lLyuJSNEeRXErppS7w+PwCh+5+yMw0ayY9+9Op8PBMnFeX6h5jlqa8+ubLfyCXWuXMviWSVzgDKsrbnR267TWOQjMpg5lcMpWm8j9DCFLIWh6WaAyDchLRRGvYtQrgz6k2lKrQA9J2bFzLxvloIFU3QVrOnPHTJw86Riej+gP8wfT2ftDE71s2x33W+xUtiYyG143QB6OtyGDGUHFntLUCEUeF2HlMYKuhgUZSco0algqexlAK3bSLEl/dOT4Eyz5pSMbNJM7S5ONZtYaP/9ZcC8SJUtjmB/wbA5ud+y86Ax5XaLYnAStooPQpAInBYUFu0CUhdsiujyovXjnL26s8JviQS+OpwlsWs/rgHHxUuizFFmXMwyqX7p0qfjQemQn1z2tDQ2v4BB+S/QZR4T5EHXXc0nZyo455aEEb6kcEF/lzRToFwr01J/tM8ErjIU26SnVI1t4MxMF3EIHyUNRP4IRzbJjFIq1uAS35I34vNfCVckOSlbiAhAzqUE/XwbtF/aFJeGGVjLqNoSAgdmBf6Rlasv+CCGfCGYoQomayDOXaVLAU2ubfioJEliblqkfLkUsl8XyGF0JrhRSbVqQlfXyglURPsUaq/BUh2cfNXny5HGD6i2DwxmG8FUi7SFS3sy82x5Qyrlz52ZXd3Y+j8h+RR2t3qGCoZRUnARvAG+tra114k20NEaKxjriVC0ZkwwqxcuInsYsRpJ6mwmof9XtSRnUj+ZEPFakN5IIsjJhpiKhPWG4LA4eIMPGV49x1vb313UI7sWDy3uFhE6iLO7s5N2wMB1lfHMp79rVqMh/IryQnauj8BofjGmA4jrNKMCk1atXb5QwEartJ+lDymyVRe/NDc3vdl3z3qaGxrkANmDmEacOOjCLP2KyP13T2fkz0O1E657SKL5DL/0IKl4O8iP3Q5B5C6Nvq8tka5rrG9a3NDT8AbgfQ+Mh4RrPC4a1uqJOno09p8Yhg00NYbtAGGGmCHTAYzFv1vEERJvIeRtSEm91mzZs2Nzc0PgaKvdwTW/vXfC3RTgQ4XGg3FLCtFv56VNC1s+eCTvvaqpveBM0J0Wh6WlubFwN7NMI5UeQeF54RXykZIa9gyOHl29qanqzZ5yzGfxY+ngdxH/l6qd9yNyKaCUDsYJDgk9DWMdBahCGhArdfV5MTeB6fHF/ZuL1y7Y4C1xv/vzKoRAeE4XTmsHq8EPUvYvnj+KJvsbzn5BBQZlLjMAioWiXsWh1TGieiVzSq8hpZqt3KvAbuTR2Cyf8VOh2rePnv02KcpxHgFBqlgoKI21mJXIUKcwFGMsitug+Ci/LUlzRSQt1qXE4KMYN5NKfgxc7R8oEpGLANOL+D6GPs1HGR3v6+06rC4Ktjl9pKpMeIn2bchy+megDYXTwwQdLHn3y1ETrt9mhRW66rS7Y1HgGKGVLQ9M/ozmX+J5vt/yhIQtQWGpk0X8gvP1DT03tFSz6L6P+x/RlC88F2YkPKu18YPCn8CnhFs912gryi+kJZiag/4vduUuQyc0dnZ2XQ0ZOpiAr0SpX1DFt6ifPxstJjPM//SAYA71NTPLJ1Ms4ytKyAitFHESFH48zVS/B68NMtJhV3iqhVb7YVolpxt5J6wnFTyaAp2GuRNF1FAVd+3dL56DKRglf1mgbGhpG421Z1GsN4txElz9n20/51qdjfkr/gi4BGq09YPL9pGfw686H1xUoveeEYWuCafvRc4Ijj3Sg8fK/YQv1OGj0haG5nSGe7EbmUNeEhzGO9+RN+H12kPqBmRe63hMo5JuAVdpXcPw8FyapuaHpPt/zLqPrIDThc2GY/4zJu8ca1zkK2sfTxxcx2uWM7e21mZrHjOsfIpPEoMvOpxinT33kdV599dVensPCR0VjbnA9bz9oEo2cewVDQRRxgTd5V805UbLpXozgCqpq4G0pF0Zg3p7wdjK83hSZaDPG0gL/d+EULgFXtAbwBr48eojSn+e43oO+6+mb0zZk9U0+KZ/GculvOWAxD0d1Mbtuz0GLgxbeJU31jQ/PmTOnRvxAYwDNmFuNM9YXHIBtBzavfpjW/2I7fEw+n3+0prdn5pqurqdEQ7RS3MH34dyOVQj86VXGuP8QeF5NQWqDKRW9A1ODi1JNjRPUuKOyIRwTPCNlwQUdK8KIH9WSZxRjaj1n0w7z4MQFa34mTWTEJdORIgJCFWv6ZjONAeuQ1+vcb0Pop1L3kdZp0xRFCP/lo0jkh58O+ECQD8MHO7pyv0CoUgRZwwADSYQaKvdGc+5B6PVM4iscIThndWfud/RXXP7Iy/0YxTdQ7O/6vofRmHtJKY6Gn20JrcIE0ee/YRzvkZHy3zV4zGuAGzz+ReTot9S6zs0oznko5A2JOrMrjaoOLThOCcir32/SpPF9QTA1crOjHS/cn/oLmJsThEIqeH1HrmNxOr4iMlK0kMhBf+5pzKOU8BvZutrLly9PTmHvAn5oRkPDv/Gh9zvo3jyqv4oTWc4Y7oWuTXPSO5HjfyPb7/LOpyvztON757W3t/9pFyn79Bjt32iub7wOJfonrOSd3du3f5uWD3NpWEOKNEaVbEb006/S3C8xxmuI5Pg6c2dHV+dHqJaDynDvH0KgqKKigYCc5svPH9DQ/PGtxlxHz9ulMtxLTURC2s33hkpLopzT22d29Hkd8NwLQ5AsOYEJMRtxspt3mlzoeR+3xK62TSUFUTQOy4sf+Y10UUcna5mcHQj753wEexoFPoaI8Engtas1gG94smG+tb7+UDzZuUyUos/XRBvAldY++ACld0rKhxTGRP3hF6F9IF5uM4nV+1Z1dr6ghSoTI7gU1sWTufDy3PSpU08K3eBpUpMDs4HzJWAu44KFmIfm+uZ3MokXWQV0osvacznlxwLQPKX0VCWvt5X7+Xh0liDuBbwLohhGcLZQie3KrUbX9dbUzgeWyBWORmn8VBgY2ZfbOzuuTFDSavVt5YOSHc8L35ZsP/8C7BWCpV1rloKB8yzeXqf+HayXfkVkOp5oevPMiTMfpX5zQi8/c+bMWtL3bxA5EKT5vZcJ3s46rzuhp3GkYxE9KfEVGOhOEs1rgTkHo/sp9TI69T9AyY0bf9BG7hn4vh1dOBcYgm9UzLfGNQBPMINLRQMRMERw/673chTd4TY333ViT0/Ax8OU+cH0Cu/9/cZd6UzqdTLjTcbvOqTX6etz60gCKpQp3W602RkdTJi/PD5Wor8NmT/Ee5aiYOmiHzPxMKSWUWcmk+GUPBPouV9lDHczko8ka5FVCFVCL55ULXQ/i+KyRAjvXZ3LLRIug1wW36NZulO0qBVuvqWlZTL9nc8zldE/r8p1vkCbhL7rOEeMY39pk/fsYMK+yP37ED93ZhzVOoUXA5lPk0ngTcOfyzio17jkVQbvJMpxWW88auzoi3Zu33EsKc3+TNbgSFPEgVXmMTFFyCYzqC6gD1z0AYzNc3z3Wt53Up/KyEISXT5N9BNvj7d35lLjKKVkYbKb1UfKewFMPktq1Npf03sendzU1tYmhQ77e3o+QP1BOINeUuALZRxJ6mTTwCLG7XpDDFKuY911NDI6xTPhp6hTOjhYNhiCu0X4mzds+AWw8+BZzu4TfAO6TfXJ2CrKSnAqwxrIIiZiHhO0sqbtfavz/nw+TezAfcrVa/JKFtfwJXOsMznv9H3POeGl7499qe7+sYLElYi9kkhUorNmvLu1zjw8+Tlv+8YLHftHVoK3M1gOrVCPbczAK2ruVyn0Iwgp1z1M/JN4+rcgKH0TuZzLRgCaNcFhfCzFPYf0BOF6N6YE6Xi57dl19ktoKe+1HjPqj47FnvhjMbxi6D9AfUDaVIsRDjC8lBZtHofpeqOmpl+jZTlSo8Y+xzua9vvFA3it0HgrzxrurQmejKCkl6M+L0XUeoK07Dvo8w3CTPsrvjMO8S1Pfa3LMRymYCqAo6ibyIwcwPPJ8HMYRvYFFq/HkYadCH3tQFn5tE2d2ugEgeUNWt8UbR0MLMeb1jZq74yi5TgEzkR5HzeuURp304oVK9LxnER/pNTmp+1dXdqVU1+DjcMOg/pU7v3kzrcwT6fA89HT6+v3o20ZuJpnhUjmlZsXHYYhXRQE/t/l8yG7c9FZ7CA+qD4gKNCSc2Q7G/RT0UAWQvB0JmJV3YxZHLX93jgWOL0wIO2qVPLA1Pu+s8IJD3D6MnXuKJfFJRiVAwgAsS0Af5hxJq+jn8udhXR3On+mW7nYAePLZwkMua/Rnd2aLDdSu0gL9rfQciGh+VaeVyKswjA4liLvGJCf3tfe1f7kkUcemVm8eDGTEa0BVvlkExFjIrQ2Kl0Sbc43HWbtzHVGRYF5iq1dW40WxvdBvxl2mXKCsWsLZ6KUw3HDIwC7X6AsHmbzO5H+NvlhyE6sLRXHrQ9+Fsp4T+g8CT2zTCwZ3a3k6fH51V1dWhMNLleSvlzMEv0ryOHverK1MoKzuSSjsC+TmQ3VqSjmDhbPvxcyDFbkjXYrCMbzGNfHedtf6x+et+hAKatFGaYi/CLRo8RyjZ9L/dr+jGeWwEsX46xnT25/AJcluHItZAD8Rs7FpJ1BPm/+wB/vXdDRkXuW+Zau79aHWjFRUBK9DC6nJ4NEFNePc7wxmyPT242X3xmZsNKFG+jdao3U7XYyvYiVyQPBcOQ96ql8md4obzYySJf8/JFpR9goolSrTGHgEqxkrdKmB67X9TL+tdes4azJ5e6md3J/byKu5lNqQ9HlneW5D4DCh2308Jyb1dbT02MnC6VdDUwv9JrwrNoAcHp7e9OJHKt3jKib353Q7RnxBX9Esw3gFTwZO7D6CCh6GyFoj/WL/EhK5Ecb4VMyKzufkgvFfnhTKkNf7KPEfyeihjWdHTcRfReIDEychSM5EprW26N142MxO2tH9/VtFMQIStyl7+Os7OOobUFQJzxOW4/HYidYnqNIchhJsUTYnFD61KVJID0blyCmc5LmJ8ytjM/5AbuwzyrSArfbxiHasqrSRR6WUNRRO+sAxnfqNn7ggo6sQpbGSWqV1Xp2rtg0pLBRSo3WvqiQprFCsY0ue9NjvYzZaj4Gqj3RWwEF2lGkr9YZL2hVR1yrBf8sT1ICmvP0eiP3hQzjY4Tm21Z1dcnzyHNr7aEty4fwNI8DLxZsXuvV1a3P9/Wvw1u1kMa2Uv8SW4Qx/5HLti27Iq7zy/ZcxxkY2qhsNltQeNEuVYSPAep0cjR93TptXNg0JvKUXiA5tk9HjRpVfl5KEPWNCaJdAbEERFKVfBTk7yWkLNYjqyXlgT/tvNX05z9JFKnHjb2NpsVqZ03fp0Fz1fbU1SnFHEmJ5RSGtQ7rKkYWkubaPhl/Hx8W+8QyHn+3xrpp06YAhmtlLczLkPWHZSz+E250wbmR9DNgPfcVxqiSrqtGwr+FKcvcIvqfJ/6NOXas49ZsZ+mLiMp6cmcvFQ0cyXpOnzWl4/kHH7JEERa+sXst0Y0mgn8zIpiMS2lUhMUMVyZwIleIIuxoPcMkHW1C91PUf5ZF5FykfYF2rjDpmxIcjdFOpP4BCtYvK0kDWviT4bak3d6Y3BUizjVLFexS6VzTbhcmzco0MGYNS0kZcgtG1AahTVyxkpWnatsZ4Eybshmib+lt3vIU4hYro/o1a7blGhra6bY+cnedYiataWfR2c8UKI+czrWea0S84RcPZowsgpzO5s5Ou/myYcOGrShuDhKzoXlAzMKwv+ovcvvcliiIpmPgMBA7QtULmyyTz0yyuuga+G8lY7iKzYUb6GsK8NoxlMO0DknwIylQq1wIY63JER7LRGXovdWKRPENSKTRqZvYkFAtNyG23gvDJgY/hmSum9yhK8FBLogozj+Rm3sLr0gzOl9nfXDj5/FVlcWm86v2zvZHEhwbisGJ+3OjDj1JCdWOIVo5sIv+O+2OQOzN9nAjbQrlwqOgrwMu1VlnNHPixAlN9U0fSs9pgWaVc1pX18uMeCnRDPM0Z6ov0sCKDokzVQmP7nsTbi0t4e5msXRWTplSC96UBNemeRpHZ2fny6jji3hslk3haWqvxJsGC4j17p4bWXjen1xMyqb0Tvio6hPJneM58c6g7rauxI9SYlvtm5PZqaxlHlfwkWOp6nhOx53oaOgQNeYTBb+sdnbLPo+juyOBDemnbGAQTHEpy1AKhJUW9srTun19Z5R0a3sJnJogFmj5TmMl8TjSoXmJnM5uY9Ym4InA4ogwaeqkhYT0PzDRY2sz2R9iGGcla48bBQ++vEuKY2XDX1O8Zmm50X66k57Yczvta9uX0Nd/E5HYWAm/oLbky7Ro4Ffii2rRk6LbSeyvrf1SJvB+RDqoPXyFfBlwRsqDC7yTV0CdT3AO62DRS9YL8RjVQhGe6oXDx7Zj8JyMQ4Zf/ri7RRx41ERrELsOoc2ONeNnPkAaPF0yQeuWCEd/ygtPefr4Qcyb90k+us4Wb6lDsLSTH/GGMgtHH+jOhdvj5Ejo4IcCGT9+vJUD3yp+xMlhpamHN9Y3KqLrEGXKU2G80HPVj/ojjZ0OY5+XevDfXRiu/qWbISkfUcQaAOuqK5mGT+jcqu+7F7CzdX+y+6aPhCMykmENBM9h/zJDA/hzFavm9gcv1JsnNx++oJFzGDSAbk5/clqMocmSQCRk9E/fRVAy51QMpQHF+iULuV/QTma2Ky8XIUvDc1YlJjNT78BoghNv5l0tZWKSz2QX6LqkXcJXsVEEeBV7SpWzSSiC+zl70NiN9KFL25cyHuttJ06e/HXGsQSjG+tHzn+wUJ6RHAsR/6InBRKfRvUcUz8E3b4bhYiVRHpTpiQNO9ScHjWBjqKleMvD27vxSjdCHkOLftPe2fmIYOUQdK8bN/qbbHT80fPdCcYPfsKuXkssTytbsWW7EG+q17kn5HaL1mmUW/m29DtAfO0O6p7L6Z93cr+qVkC+0trU9D4ZfMKTxmsL7/bv7EmHp7FF/RO21hvZMFmRqauxH1FBtwanTtJCOmjr5ETYoLkNJecIjNmBXE/trG94XNvWkLVf0lOccvdhrYjpWIEEhZ/IuBypvVlPhxyh4kRXh9O9qTOhbJko0UvMnOs2JwwuFwzSHbwgs+uK3NrcnWzJfg7qR1hFdaJU0AVFLe6PswTLIt8ov23ia/CE5ZvsR0yFaUWK3+Ilr2Lz6Bq+H1+Jh5rNcYmrqddxiZSvAEXnXJb5LCydYxf2YfRtPral3zoUbaQQotdH5Dib5d7jLJTnkmo9Cf0re/P5e2gr7GxJWUgPz2Gb5suoJUfMzcOM+ERpNkY/QE56xx3YGaThaBR3vYk8dqXsvz4zBt6baH4r+O8Fli9VZgvrBbsxkvCUjlUGeTaK9gSKdgT3pzCqq71M5j54K+xsccxkVt7xLmT8lwLH1nn4FEc7dIJBJeXNKjAe/grGdzgf804EbiHR8GYnDP5v+/r2V6FpYbU13JPNnsRa8Tr4m8WphX5kfM7y5cv1VV76a+c1IW7pphXajABG0ewhaL+DPh6Ap2PwRo9j3zqo+Eo6RuGXKmUNZF6aEnjmiR2hy76ndg7EdOwpShHbG3WJkhsng8L0msddLdC1zVv0LzOm/TC4gtdHgQ/iFfaijqRd0bHgXSRw2u2OFsfSv+oH7p3sk7P2yD1CvYzJevGUdnr33JDvXZBy3aawpruFei00xWY8ybncteS3fHRzvoDwz2QS3s+i8ElSs5UIy8cY38QhtCNQAqTHP0ZhzG30+QnRT/q1dOjf5sbcXySVeCdw90Kvjfd/56Tr1fSxhNFqixPj8I7RljWWBRfRP3Ku/yXqTiRlqSGiJSJUDzTzHnjuaLHMf5fS6aWxU9fhU8uDhaMfSJk/8d3g7FxHx1J4k8FaXdM9kd3zLfX1J4TG/Qn9tyDRO6L+/LVsfrwEJ2xSuJMgegRtOu7Duafwv93AP5NnGzWK6KUOIczU1r63r7v3xyj/e+jjYj4oXsQRlSU4m3UwVufU1B5A6GyhTfRYW0ZnsyHy24Q/G63tAOyPWyc45FTQa/Wt7y5ros6ncT7Hs4Z6wPP92WE+fJb3U2h/DJzBzrRAskCoUJM+MJvJh8JXVmen3zsu8s/a7HCm1HGG5HwpSok7ctu9AgL/uxl3p/aF3e+MBJsBBpzyZPMnT4h20w9hpfq2E97R1bEQ+Ivwl/a7B30MMKakz9i4Mpn2KJ9/Fq7msE85IeUHwdo0QHfOJf0T56geRf0vZnaOJw86FuaPFSzNKF7Uw+Q+wdvXSV0eVH2pSQFWEy4jXoKHOxIc7byciRxmkEbNEJ4KSt+bD81PydhvpO/fEqGOBZb0yV2BURWcgmDjCOKsJDLghJ1uaA8wIMa1net19Ooh8q0fdOZyyusLxiEaKkW8PYVi/Q1R7lLwzgC2jT60u2WL1htc+jB3B5HjW+AVjCGF0Z3qNDL18Hoa0eh8VPtjTNpRRM+jGYsFl1NhNdeOc747E+ZvWLFuXa4UfxbYidagA/yLNvFRE3Wj+sWRTesUSZbifI7nONEPoH44LuJ2ZHcW9eK3pJHIA8e0S/2CxEjM627z9EwQ/KGGf+eqx8EbDGck/CXg+LFuZtPm6NszXtlyvbMsWEYv6ikedYm+1CBOyID7+GcEsmabudk7YcPF5aJHMQkG53KUY/TYfN5/fdOmHYypZDQQjmBpLzlpxTSLn0lpRvOBLJi4adZOCbu4TfREFpJWMVGeNiQ9m+qJtt54HGTMLyt8d5FMrX6UFzy4BQVlXGOzXvZQ/q0XKaHHUZjNuI8X11B4t4am+kmT+NfEMI5169Zp/IVJFX+SDQaEHg9MvxRdxo0b10e6IiW1pbjvtK74Xtyunbis583lHFsTKaQc504Gt4Jj5C+kPABfUvFSmoPbUdgDQZgF/hj4zbNI68ruzL6QpLYab0E2KY30XpinWcyTTkIMKsW4kmttba119vpjuEGghdfKBgLYIjzaPBRudWb6CVj4zzESByPhK0WkVYJVDlFLlFs3HKYbtozxs6u3mK/N2L7+X52nanMyDZZgOsjHPumQ7TzwCOdqGO/50VbzkPuuDSeLrlRA+hQ/751fBGWNZO9Qi6lI+DzZ9UQ5usUTVA4mrQdWhiQ+bdRL69M77ZK9lK9kewo3kntCS/zbLe7hcIbjTfjAKDsZKT2NRYpfybGJP0BiR8TzHhXxPpiGxi/CpQhqEioWGQej9Vv7V/0CF/kOjCM3wfGyfB6NJ5AAKOXG8/PZnKOMfDZlBZhd05N/ILt//784o7d3hr3RR02f083X8SyHG4RHnNfEyijAA9Eb5QXeaM83W6Mf3b1t46kxU4ItzfhgpjVIinZ6JOyKRcIYCVxKRLCUirQhaRU1gWMNPeCf+0x3n0aszNCTsSkNUb/CL6apSVYp0EvgSo6dNhXRKXVZ5YCWdrNKKkkqh/QOWCXe0rHuDj11bdcT8Dh4rHq3jkD9pjyUugOnMtw8aedQJZVFWeNQH2os1dfQOnlIJiTnNk8Jg+ASNPwDbEW21REaNCuaqR1Kjxznd7iNW9vyq35sicCIjMD52bQ5Jggvp/3dbtadol0qi8iQzU7Th1o/w47p1/2TNtxj8coszG1b9acqgT+TBEZuIGIoMRI9vuhOGzM6GHUoSfF0dj6y7NRsYRH7clvvcm1xKsSysYQJYByLFpGmzUvC5y8bpuXD/sMxqwa+QHoY1tYw77yYPWW9xROmswC8+ZW9hfqolqoE9rUEds9AxI0iQqz4hfA+mMlFpAPzFFQGhCeLB2gFxa9GjcGirL7/hSWw+waSMLwAQ5kvQ4kvZxEPbFxHp5MxDTSMBCG9LcBQjouPNqRVIEb8zYfWMiPM9wqY1YeqBPapBPbYQPYpV1XiVQn8lUhA6VK1VCVQlUAZCVQNpIxgqtVVCUgCVQOp6kFVAhUk8D9zCxFs/belYQAAAABJRU5ErkJggg==">\n    </a>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/ucscmedbook:api/client/navigation/navigator.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
    if (Meteor.isClient) {                                                                                             // 2
            console.log("Registering MedBookNavigator");                                                               // 3
                                                                                                                       // 4
            UI.registerHelper("MedBookNavigator", function () {                                                        // 5
                    return Template.MedBookNavigator;                                                                  // 6
            });                                                                                                        // 7
            Template.MedBookNavigator.events({                                                                         // 8
            'click #logout': function (e) {                                                                            // 9
                    e.preventDefault();                                                                                // 10
                    Meteor.logout();                                                                                   // 11
                },                                                                                                     // 12
            'click .navigation-wrapper' : function (e) {                                                               // 13
                $('.navigation-wrapper').removeClass('show-menu');                                                     // 14
                $('.navigation').hide();                                                                               // 15
                $('.navigation li').removeClass('small-padding');                                                      // 16
            },                                                                                                         // 17
            'mouseover .MedBookLink': function (e) {                                                                   // 18
                        if ($('#MedBookAbs').length == 0)                                                              // 19
                            $.ajax({                                                                                   // 20
                                url: "/menu",                                                                          // 21
                                success: function (data) {                                                             // 22
                                    $(data).appendTo('body');                                                          // 23
                                },                                                                                     // 24
                                dataType: 'html'                                                                       // 25
                            });                                                                                        // 26
                    event.preventDefault();                                                                            // 27
                    /*                                                                                                 // 28
                    if($('.navigation-wrapper').hasClass('show-menu')) {                                               // 29
                            $('.navigation-wrapper').removeClass('show-menu');                                         // 30
                            $('.navigation').hide();                                                                   // 31
                            $('.navigation li').removeClass('small-padding');                                          // 32
                    } else {                                                                                           // 33
                            $('.navigation-wrapper').addClass('show-menu');                                            // 34
                            $('.navigation').fadeIn();                                                                 // 35
                            $('.navigation li').addClass('small-padding');                                             // 36
                    }                                                                                                  // 37
                    */                                                                                                 // 38
                }                                                                                                      // 39
                                                                                                                       // 40
        })                                                                                                             // 41
    }                                                                                                                  // 42
});                                                                                                                    // 43
                                                                                                                       // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ucscmedbook:api'] = {
  MedBookNavigator: MedBookNavigator,
  genelist: genelist,
  GeneList_docToForm: GeneList_docToForm,
  GeneList_formToDoc: GeneList_formToDoc
};

})();
