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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/natestrauser:select2/lib/select2/select2.js                                                                //
// This file is in bare mode and is not in its own closure.                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
Copyright 2012 Igor Vaynberg                                                                                           // 2
                                                                                                                       // 3
Version: 3.5.1 Timestamp: Tue Jul 22 18:58:56 EDT 2014                                                                 // 4
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
    var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer,                                             // 49
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
    // removed diacritics support to enable spiderable - see https://github.com/gadicc/meteor-phantomjs/issues/1       // 101
    // DIACRITICS = {"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038A":"\u0399","\u03AA":"\u0399","\u038C":"\u039F","\u038E":"\u03A5","\u03AB":"\u03A5","\u038F":"\u03A9","\u03AC":"\u03B1","\u03AD":"\u03B5","\u03AE":"\u03B7","\u03AF":"\u03B9","\u03CA":"\u03B9","\u0390":"\u03B9","\u03CC":"\u03BF","\u03CD":"\u03C5","\u03CB":"\u03C5","\u03B0":"\u03C5","\u03C9":"\u03C9","\u03C2":"\u03C3"};
                                                                                                                       // 103
    $document = $(document);                                                                                           // 104
                                                                                                                       // 105
    nextUid=(function() { var counter=1; return function() { return counter++; }; }());                                // 106
                                                                                                                       // 107
                                                                                                                       // 108
    function reinsertElement(element) {                                                                                // 109
        var placeholder = $(document.createTextNode(''));                                                              // 110
                                                                                                                       // 111
        element.before(placeholder);                                                                                   // 112
        placeholder.before(element);                                                                                   // 113
        placeholder.remove();                                                                                          // 114
    }                                                                                                                  // 115
                                                                                                                       // 116
    function stripDiacritics(str) {                                                                                    // 117
        // removed diacritics support to enable spiderable - see https://github.com/gadicc/meteor-phantomjs/issues/1   // 118
        return str;                                                                                                    // 119
        // // Used 'uni range + named function' from http://jsperf.com/diacritics/18                                   // 120
        // function match(a) {                                                                                         // 121
        //     return DIACRITICS[a] || a;                                                                              // 122
        // }                                                                                                           // 123
                                                                                                                       // 124
        // return str.replace(/[^\u0000-\u007E]/g, match);                                                             // 125
    }                                                                                                                  // 126
                                                                                                                       // 127
    function indexOf(value, array) {                                                                                   // 128
        var i = 0, l = array.length;                                                                                   // 129
        for (; i < l; i = i + 1) {                                                                                     // 130
            if (equal(value, array[i])) return i;                                                                      // 131
        }                                                                                                              // 132
        return -1;                                                                                                     // 133
    }                                                                                                                  // 134
                                                                                                                       // 135
    function measureScrollbar () {                                                                                     // 136
        var $template = $( MEASURE_SCROLLBAR_TEMPLATE );                                                               // 137
        $template.appendTo('body');                                                                                    // 138
                                                                                                                       // 139
        var dim = {                                                                                                    // 140
            width: $template.width() - $template[0].clientWidth,                                                       // 141
            height: $template.height() - $template[0].clientHeight                                                     // 142
        };                                                                                                             // 143
        $template.remove();                                                                                            // 144
                                                                                                                       // 145
        return dim;                                                                                                    // 146
    }                                                                                                                  // 147
                                                                                                                       // 148
    /**                                                                                                                // 149
     * Compares equality of a and b                                                                                    // 150
     * @param a                                                                                                        // 151
     * @param b                                                                                                        // 152
     */                                                                                                                // 153
    function equal(a, b) {                                                                                             // 154
        if (a === b) return true;                                                                                      // 155
        if (a === undefined || b === undefined) return false;                                                          // 156
        if (a === null || b === null) return false;                                                                    // 157
        // Check whether 'a' or 'b' is a string (primitive or object).                                                 // 158
        // The concatenation of an empty string (+'') converts its argument to a string's primitive.                   // 159
        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object                   // 160
        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object                   // 161
        return false;                                                                                                  // 162
    }                                                                                                                  // 163
                                                                                                                       // 164
    /**                                                                                                                // 165
     * Splits the string into an array of values, trimming each value. An empty array is returned for nulls or empty   // 166
     * strings                                                                                                         // 167
     * @param string                                                                                                   // 168
     * @param separator                                                                                                // 169
     */                                                                                                                // 170
    function splitVal(string, separator) {                                                                             // 171
        var val, i, l;                                                                                                 // 172
        if (string === null || string.length < 1) return [];                                                           // 173
        val = string.split(separator);                                                                                 // 174
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);                                         // 175
        return val;                                                                                                    // 176
    }                                                                                                                  // 177
                                                                                                                       // 178
    function getSideBorderPadding(element) {                                                                           // 179
        return element.outerWidth(false) - element.width();                                                            // 180
    }                                                                                                                  // 181
                                                                                                                       // 182
    function installKeyUpChangeEvent(element) {                                                                        // 183
        var key="keyup-change-value";                                                                                  // 184
        element.on("keydown", function () {                                                                            // 185
            if ($.data(element, key) === undefined) {                                                                  // 186
                $.data(element, key, element.val());                                                                   // 187
            }                                                                                                          // 188
        });                                                                                                            // 189
        element.on("keyup", function () {                                                                              // 190
            var val= $.data(element, key);                                                                             // 191
            if (val !== undefined && element.val() !== val) {                                                          // 192
                $.removeData(element, key);                                                                            // 193
                element.trigger("keyup-change");                                                                       // 194
            }                                                                                                          // 195
        });                                                                                                            // 196
    }                                                                                                                  // 197
                                                                                                                       // 198
                                                                                                                       // 199
    /**                                                                                                                // 200
     * filters mouse events so an event is fired only if the mouse moved.                                              // 201
     *                                                                                                                 // 202
     * filters out mouse events that occur when mouse is stationary but                                                // 203
     * the elements under the pointer are scrolled.                                                                    // 204
     */                                                                                                                // 205
    function installFilteredMouseMove(element) {                                                                       // 206
        element.on("mousemove", function (e) {                                                                         // 207
            var lastpos = lastMousePosition;                                                                           // 208
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {                             // 209
                $(e.target).trigger("mousemove-filtered", e);                                                          // 210
            }                                                                                                          // 211
        });                                                                                                            // 212
    }                                                                                                                  // 213
                                                                                                                       // 214
    /**                                                                                                                // 215
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.                                                                       // 217
     *                                                                                                                 // 218
     * @param quietMillis number of milliseconds to wait before invoking fn                                            // 219
     * @param fn function to be debounced                                                                              // 220
     * @param ctx object to be used as this reference within fn                                                        // 221
     * @return debounced version of fn                                                                                 // 222
     */                                                                                                                // 223
    function debounce(quietMillis, fn, ctx) {                                                                          // 224
        ctx = ctx || undefined;                                                                                        // 225
        var timeout;                                                                                                   // 226
        return function () {                                                                                           // 227
            var args = arguments;                                                                                      // 228
            window.clearTimeout(timeout);                                                                              // 229
            timeout = window.setTimeout(function() {                                                                   // 230
                fn.apply(ctx, args);                                                                                   // 231
            }, quietMillis);                                                                                           // 232
        };                                                                                                             // 233
    }                                                                                                                  // 234
                                                                                                                       // 235
    function installDebouncedScroll(threshold, element) {                                                              // 236
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});                     // 237
        element.on("scroll", function (e) {                                                                            // 238
            if (indexOf(e.target, element.get()) >= 0) notify(e);                                                      // 239
        });                                                                                                            // 240
    }                                                                                                                  // 241
                                                                                                                       // 242
    function focus($el) {                                                                                              // 243
        if ($el[0] === document.activeElement) return;                                                                 // 244
                                                                                                                       // 245
        /* set the focus in a 0 timeout - that way the focus is set after the processing                               // 246
            of the current event has finished - which seems like the only reliable way                                 // 247
            to set focus */                                                                                            // 248
        window.setTimeout(function() {                                                                                 // 249
            var el=$el[0], pos=$el.val().length, range;                                                                // 250
                                                                                                                       // 251
            $el.focus();                                                                                               // 252
                                                                                                                       // 253
            /* make sure el received focus so we do not error out when trying to manipulate the caret.                 // 254
                sometimes modals or others listeners may steal it after its set */                                     // 255
            var isVisible = (el.offsetWidth > 0 || el.offsetHeight > 0);                                               // 256
            if (isVisible && el === document.activeElement) {                                                          // 257
                                                                                                                       // 258
                /* after the focus is set move the caret to the end, necessary when we val()                           // 259
                    just before setting focus */                                                                       // 260
                if(el.setSelectionRange)                                                                               // 261
                {                                                                                                      // 262
                    el.setSelectionRange(pos, pos);                                                                    // 263
                }                                                                                                      // 264
                else if (el.createTextRange) {                                                                         // 265
                    range = el.createTextRange();                                                                      // 266
                    range.collapse(false);                                                                             // 267
                    range.select();                                                                                    // 268
                }                                                                                                      // 269
            }                                                                                                          // 270
        }, 0);                                                                                                         // 271
    }                                                                                                                  // 272
                                                                                                                       // 273
    function getCursorInfo(el) {                                                                                       // 274
        el = $(el)[0];                                                                                                 // 275
        var offset = 0;                                                                                                // 276
        var length = 0;                                                                                                // 277
        if ('selectionStart' in el) {                                                                                  // 278
            offset = el.selectionStart;                                                                                // 279
            length = el.selectionEnd - offset;                                                                         // 280
        } else if ('selection' in document) {                                                                          // 281
            el.focus();                                                                                                // 282
            var sel = document.selection.createRange();                                                                // 283
            length = document.selection.createRange().text.length;                                                     // 284
            sel.moveStart('character', -el.value.length);                                                              // 285
            offset = sel.text.length - length;                                                                         // 286
        }                                                                                                              // 287
        return { offset: offset, length: length };                                                                     // 288
    }                                                                                                                  // 289
                                                                                                                       // 290
    function killEvent(event) {                                                                                        // 291
        event.preventDefault();                                                                                        // 292
        event.stopPropagation();                                                                                       // 293
    }                                                                                                                  // 294
    function killEventImmediately(event) {                                                                             // 295
        event.preventDefault();                                                                                        // 296
        event.stopImmediatePropagation();                                                                              // 297
    }                                                                                                                  // 298
                                                                                                                       // 299
    function measureTextWidth(e) {                                                                                     // 300
        if (!sizer){                                                                                                   // 301
            var style = e[0].currentStyle || window.getComputedStyle(e[0], null);                                      // 302
            sizer = $(document.createElement("div")).css({                                                             // 303
                position: "absolute",                                                                                  // 304
                left: "-10000px",                                                                                      // 305
                top: "-10000px",                                                                                       // 306
                display: "none",                                                                                       // 307
                fontSize: style.fontSize,                                                                              // 308
                fontFamily: style.fontFamily,                                                                          // 309
                fontStyle: style.fontStyle,                                                                            // 310
                fontWeight: style.fontWeight,                                                                          // 311
                letterSpacing: style.letterSpacing,                                                                    // 312
                textTransform: style.textTransform,                                                                    // 313
                whiteSpace: "nowrap"                                                                                   // 314
            });                                                                                                        // 315
            sizer.attr("class","select2-sizer");                                                                       // 316
            $("body").append(sizer);                                                                                   // 317
        }                                                                                                              // 318
        sizer.text(e.val());                                                                                           // 319
        return sizer.width();                                                                                          // 320
    }                                                                                                                  // 321
                                                                                                                       // 322
    function syncCssClasses(dest, src, adapter) {                                                                      // 323
        var classes, replacements = [], adapted;                                                                       // 324
                                                                                                                       // 325
        classes = $.trim(dest.attr("class"));                                                                          // 326
                                                                                                                       // 327
        if (classes) {                                                                                                 // 328
            classes = '' + classes; // for IE which returns object                                                     // 329
                                                                                                                       // 330
            $(classes.split(/\s+/)).each2(function() {                                                                 // 331
                if (this.indexOf("select2-") === 0) {                                                                  // 332
                    replacements.push(this);                                                                           // 333
                }                                                                                                      // 334
            });                                                                                                        // 335
        }                                                                                                              // 336
                                                                                                                       // 337
        classes = $.trim(src.attr("class"));                                                                           // 338
                                                                                                                       // 339
        if (classes) {                                                                                                 // 340
            classes = '' + classes; // for IE which returns object                                                     // 341
                                                                                                                       // 342
            $(classes.split(/\s+/)).each2(function() {                                                                 // 343
                if (this.indexOf("select2-") !== 0) {                                                                  // 344
                    adapted = adapter(this);                                                                           // 345
                                                                                                                       // 346
                    if (adapted) {                                                                                     // 347
                        replacements.push(adapted);                                                                    // 348
                    }                                                                                                  // 349
                }                                                                                                      // 350
            });                                                                                                        // 351
        }                                                                                                              // 352
                                                                                                                       // 353
        dest.attr("class", replacements.join(" "));                                                                    // 354
    }                                                                                                                  // 355
                                                                                                                       // 356
                                                                                                                       // 357
    function markMatch(text, term, markup, escapeMarkup) {                                                             // 358
        var match=stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())),                    // 359
            tl=term.length;                                                                                            // 360
                                                                                                                       // 361
        if (match<0) {                                                                                                 // 362
            markup.push(escapeMarkup(text));                                                                           // 363
            return;                                                                                                    // 364
        }                                                                                                              // 365
                                                                                                                       // 366
        markup.push(escapeMarkup(text.substring(0, match)));                                                           // 367
        markup.push("<span class='select2-match'>");                                                                   // 368
        markup.push(escapeMarkup(text.substring(match, match + tl)));                                                  // 369
        markup.push("</span>");                                                                                        // 370
        markup.push(escapeMarkup(text.substring(match + tl, text.length)));                                            // 371
    }                                                                                                                  // 372
                                                                                                                       // 373
    function defaultEscapeMarkup(markup) {                                                                             // 374
        var replace_map = {                                                                                            // 375
            '\\': '&#92;',                                                                                             // 376
            '&': '&amp;',                                                                                              // 377
            '<': '&lt;',                                                                                               // 378
            '>': '&gt;',                                                                                               // 379
            '"': '&quot;',                                                                                             // 380
            "'": '&#39;',                                                                                              // 381
            "/": '&#47;'                                                                                               // 382
        };                                                                                                             // 383
                                                                                                                       // 384
        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {                                               // 385
            return replace_map[match];                                                                                 // 386
        });                                                                                                            // 387
    }                                                                                                                  // 388
                                                                                                                       // 389
    /**                                                                                                                // 390
     * Produces an ajax-based query function                                                                           // 391
     *                                                                                                                 // 392
     * @param options object containing configuration parameters                                                       // 393
     * @param options.params parameter map for the transport ajax call, can contain such options as cache, jsonpCallback, etc. see $.ajax
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data                                                                             // 396
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber, query) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:                                            // 401
     *      results array of objects that will be used as choices                                                      // 402
     *      more (optional) boolean indicating whether there are more results available                                // 403
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}                                     // 404
     */                                                                                                                // 405
    function ajax(options) {                                                                                           // 406
        var timeout, // current scheduled but not yet executed request                                                 // 407
            handler = null,                                                                                            // 408
            quietMillis = options.quietMillis || 100,                                                                  // 409
            ajaxUrl = options.url,                                                                                     // 410
            self = this;                                                                                               // 411
                                                                                                                       // 412
        return function (query) {                                                                                      // 413
            window.clearTimeout(timeout);                                                                              // 414
            timeout = window.setTimeout(function () {                                                                  // 415
                var data = options.data, // ajax data function                                                         // 416
                    url = ajaxUrl, // ajax url string or function                                                      // 417
                    transport = options.transport || $.fn.select2.ajaxDefaults.transport,                              // 418
                    // deprecated - to be removed in 4.0  - use params instead                                         // 419
                    deprecated = {                                                                                     // 420
                        type: options.type || 'GET', // set type of request (GET or POST)                              // 421
                        cache: options.cache || false,                                                                 // 422
                        jsonpCallback: options.jsonpCallback||undefined,                                               // 423
                        dataType: options.dataType||"json"                                                             // 424
                    },                                                                                                 // 425
                    params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);                               // 426
                                                                                                                       // 427
                data = data ? data.call(self, query.term, query.page, query.context) : null;                           // 428
                url = (typeof url === 'function') ? url.call(self, query.term, query.page, query.context) : url;       // 429
                                                                                                                       // 430
                if (handler && typeof handler.abort === "function") { handler.abort(); }                               // 431
                                                                                                                       // 432
                if (options.params) {                                                                                  // 433
                    if ($.isFunction(options.params)) {                                                                // 434
                        $.extend(params, options.params.call(self));                                                   // 435
                    } else {                                                                                           // 436
                        $.extend(params, options.params);                                                              // 437
                    }                                                                                                  // 438
                }                                                                                                      // 439
                                                                                                                       // 440
                $.extend(params, {                                                                                     // 441
                    url: url,                                                                                          // 442
                    dataType: options.dataType,                                                                        // 443
                    data: data,                                                                                        // 444
                    success: function (data) {                                                                         // 445
                        // TODO - replace query.page with query so users have access to term, page, etc.               // 446
                        // added query as third paramter to keep backwards compatibility                               // 447
                        var results = options.results(data, query.page, query);                                        // 448
                        query.callback(results);                                                                       // 449
                    },                                                                                                 // 450
                    error: function(jqXHR, textStatus, errorThrown){                                                   // 451
                        var results = {                                                                                // 452
                            hasError: true,                                                                            // 453
                            jqXHR: jqXHR,                                                                              // 454
                            textStatus: textStatus,                                                                    // 455
                            errorThrown: errorThrown,                                                                  // 456
                        };                                                                                             // 457
                                                                                                                       // 458
                        query.callback(results);                                                                       // 459
                    }                                                                                                  // 460
                });                                                                                                    // 461
                handler = transport.call(self, params);                                                                // 462
            }, quietMillis);                                                                                           // 463
        };                                                                                                             // 464
    }                                                                                                                  // 465
                                                                                                                       // 466
    /**                                                                                                                // 467
     * Produces a query function that works with a local array                                                         // 468
     *                                                                                                                 // 469
     * @param options object containing configuration parameters. The options parameter can either be an array or an   // 470
     * object.                                                                                                         // 471
     *                                                                                                                 // 472
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.                     // 473
     *                                                                                                                 // 474
     * If the object form is used it is assumed that it contains 'data' and 'text' keys. The 'data' key should contain // 475
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'   // 476
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.                                                                                                       // 479
     */                                                                                                                // 480
    function local(options) {                                                                                          // 481
        var data = options, // data elements                                                                           // 482
            dataText,                                                                                                  // 483
            tmp,                                                                                                       // 484
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search
                                                                                                                       // 486
         if ($.isArray(data)) {                                                                                        // 487
            tmp = data;                                                                                                // 488
            data = { results: tmp };                                                                                   // 489
        }                                                                                                              // 490
                                                                                                                       // 491
         if ($.isFunction(data) === false) {                                                                           // 492
            tmp = data;                                                                                                // 493
            data = function() { return tmp; };                                                                         // 494
        }                                                                                                              // 495
                                                                                                                       // 496
        var dataItem = data();                                                                                         // 497
        if (dataItem.text) {                                                                                           // 498
            text = dataItem.text;                                                                                      // 499
            // if text is not a function we assume it to be a key name                                                 // 500
            if (!$.isFunction(text)) {                                                                                 // 501
                dataText = dataItem.text; // we need to store this in a separate variable because in the next step data gets reset and data.text is no longer available
                text = function (item) { return item[dataText]; };                                                     // 503
            }                                                                                                          // 504
        }                                                                                                              // 505
                                                                                                                       // 506
        return function (query) {                                                                                      // 507
            var t = query.term, filtered = { results: [] }, process;                                                   // 508
            if (t === "") {                                                                                            // 509
                query.callback(data());                                                                                // 510
                return;                                                                                                // 511
            }                                                                                                          // 512
                                                                                                                       // 513
            process = function(datum, collection) {                                                                    // 514
                var group, attr;                                                                                       // 515
                datum = datum[0];                                                                                      // 516
                if (datum.children) {                                                                                  // 517
                    group = {};                                                                                        // 518
                    for (attr in datum) {                                                                              // 519
                        if (datum.hasOwnProperty(attr)) group[attr]=datum[attr];                                       // 520
                    }                                                                                                  // 521
                    group.children=[];                                                                                 // 522
                    $(datum.children).each2(function(i, childDatum) { process(childDatum, group.children); });         // 523
                    if (group.children.length || query.matcher(t, text(group), datum)) {                               // 524
                        collection.push(group);                                                                        // 525
                    }                                                                                                  // 526
                } else {                                                                                               // 527
                    if (query.matcher(t, text(datum), datum)) {                                                        // 528
                        collection.push(datum);                                                                        // 529
                    }                                                                                                  // 530
                }                                                                                                      // 531
            };                                                                                                         // 532
                                                                                                                       // 533
            $(data().results).each2(function(i, datum) { process(datum, filtered.results); });                         // 534
            query.callback(filtered);                                                                                  // 535
        };                                                                                                             // 536
    }                                                                                                                  // 537
                                                                                                                       // 538
    // TODO javadoc                                                                                                    // 539
    function tags(data) {                                                                                              // 540
        var isFunc = $.isFunction(data);                                                                               // 541
        return function (query) {                                                                                      // 542
            var t = query.term, filtered = {results: []};                                                              // 543
            var result = isFunc ? data(query) : data;                                                                  // 544
            if ($.isArray(result)) {                                                                                   // 545
                $(result).each(function () {                                                                           // 546
                    var isObject = this.text !== undefined,                                                            // 547
                        text = isObject ? this.text : this;                                                            // 548
                    if (t === "" || query.matcher(t, text)) {                                                          // 549
                        filtered.results.push(isObject ? this : {id: this, text: this});                               // 550
                    }                                                                                                  // 551
                });                                                                                                    // 552
                query.callback(filtered);                                                                              // 553
            }                                                                                                          // 554
        };                                                                                                             // 555
    }                                                                                                                  // 556
                                                                                                                       // 557
    /**                                                                                                                // 558
     * Checks if the formatter function should be used.                                                                // 559
     *                                                                                                                 // 560
     * Throws an error if it is not a function. Returns true if it should be used,                                     // 561
     * false if no formatting should be performed.                                                                     // 562
     *                                                                                                                 // 563
     * @param formatter                                                                                                // 564
     */                                                                                                                // 565
    function checkFormatter(formatter, formatterName) {                                                                // 566
        if ($.isFunction(formatter)) return true;                                                                      // 567
        if (!formatter) return false;                                                                                  // 568
        if (typeof(formatter) === 'string') return true;                                                               // 569
        throw new Error(formatterName +" must be a string, function, or falsy value");                                 // 570
    }                                                                                                                  // 571
                                                                                                                       // 572
  /**                                                                                                                  // 573
   * Returns a given value                                                                                             // 574
   * If given a function, returns its output                                                                           // 575
   *                                                                                                                   // 576
   * @param val string|function                                                                                        // 577
   * @param context value of "this" to be passed to function                                                           // 578
   * @returns {*}                                                                                                      // 579
   */                                                                                                                  // 580
    function evaluate(val, context) {                                                                                  // 581
        if ($.isFunction(val)) {                                                                                       // 582
            var args = Array.prototype.slice.call(arguments, 2);                                                       // 583
            return val.apply(context, args);                                                                           // 584
        }                                                                                                              // 585
        return val;                                                                                                    // 586
    }                                                                                                                  // 587
                                                                                                                       // 588
    function countResults(results) {                                                                                   // 589
        var count = 0;                                                                                                 // 590
        $.each(results, function(i, item) {                                                                            // 591
            if (item.children) {                                                                                       // 592
                count += countResults(item.children);                                                                  // 593
            } else {                                                                                                   // 594
                count++;                                                                                               // 595
            }                                                                                                          // 596
        });                                                                                                            // 597
        return count;                                                                                                  // 598
    }                                                                                                                  // 599
                                                                                                                       // 600
    /**                                                                                                                // 601
     * Default tokenizer. This function uses breaks the input on substring match of any string from the                // 602
     * opts.tokenSeparators array and uses opts.createSearchChoice to create the choice object. Both of those          // 603
     * two options have to be defined in order for the tokenizer to work.                                              // 604
     *                                                                                                                 // 605
     * @param input text user has typed so far or pasted into the search field                                         // 606
     * @param selection currently selected choices                                                                     // 607
     * @param selectCallback function(choice) callback tho add the choice to selection                                 // 608
     * @param opts select2's opts                                                                                      // 609
     * @return undefined/null to leave the current input unchanged, or a string to change the input to the returned value
     */                                                                                                                // 611
    function defaultTokenizer(input, selection, selectCallback, opts) {                                                // 612
        var original = input, // store the original so we can compare and know if we need to tell the search to update its text
            dupe = false, // check for whether a token we extracted represents a duplicate selected choice             // 614
            token, // token                                                                                            // 615
            index, // position at which the separator was found                                                        // 616
            i, l, // looping variables                                                                                 // 617
            separator; // the matched separator                                                                        // 618
                                                                                                                       // 619
        if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;    // 620
                                                                                                                       // 621
        while (true) {                                                                                                 // 622
            index = -1;                                                                                                // 623
                                                                                                                       // 624
            for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {                                                 // 625
                separator = opts.tokenSeparators[i];                                                                   // 626
                index = input.indexOf(separator);                                                                      // 627
                if (index >= 0) break;                                                                                 // 628
            }                                                                                                          // 629
                                                                                                                       // 630
            if (index < 0) break; // did not find any token separator in the input string, bail                        // 631
                                                                                                                       // 632
            token = input.substring(0, index);                                                                         // 633
            input = input.substring(index + separator.length);                                                         // 634
                                                                                                                       // 635
            if (token.length > 0) {                                                                                    // 636
                token = opts.createSearchChoice.call(this, token, selection);                                          // 637
                if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
                    dupe = false;                                                                                      // 639
                    for (i = 0, l = selection.length; i < l; i++) {                                                    // 640
                        if (equal(opts.id(token), opts.id(selection[i]))) {                                            // 641
                            dupe = true; break;                                                                        // 642
                        }                                                                                              // 643
                    }                                                                                                  // 644
                                                                                                                       // 645
                    if (!dupe) selectCallback(token);                                                                  // 646
                }                                                                                                      // 647
            }                                                                                                          // 648
        }                                                                                                              // 649
                                                                                                                       // 650
        if (original!==input) return input;                                                                            // 651
    }                                                                                                                  // 652
                                                                                                                       // 653
    function cleanupJQueryElements() {                                                                                 // 654
        var self = this;                                                                                               // 655
                                                                                                                       // 656
        $.each(arguments, function (i, element) {                                                                      // 657
            self[element].remove();                                                                                    // 658
            self[element] = null;                                                                                      // 659
        });                                                                                                            // 660
    }                                                                                                                  // 661
                                                                                                                       // 662
    /**                                                                                                                // 663
     * Creates a new class                                                                                             // 664
     *                                                                                                                 // 665
     * @param superClass                                                                                               // 666
     * @param methods                                                                                                  // 667
     */                                                                                                                // 668
    function clazz(SuperClass, methods) {                                                                              // 669
        var constructor = function () {};                                                                              // 670
        constructor.prototype = new SuperClass;                                                                        // 671
        constructor.prototype.constructor = constructor;                                                               // 672
        constructor.prototype.parent = SuperClass.prototype;                                                           // 673
        constructor.prototype = $.extend(constructor.prototype, methods);                                              // 674
        return constructor;                                                                                            // 675
    }                                                                                                                  // 676
                                                                                                                       // 677
    AbstractSelect2 = clazz(Object, {                                                                                  // 678
                                                                                                                       // 679
        // abstract                                                                                                    // 680
        bind: function (func) {                                                                                        // 681
            var self = this;                                                                                           // 682
            return function () {                                                                                       // 683
                func.apply(self, arguments);                                                                           // 684
            };                                                                                                         // 685
        },                                                                                                             // 686
                                                                                                                       // 687
        // abstract                                                                                                    // 688
        init: function (opts) {                                                                                        // 689
            var results, search, resultsSelector = ".select2-results";                                                 // 690
                                                                                                                       // 691
            // prepare options                                                                                         // 692
            this.opts = opts = this.prepareOpts(opts);                                                                 // 693
                                                                                                                       // 694
            this.id=opts.id;                                                                                           // 695
                                                                                                                       // 696
            // destroy if called on an existing component                                                              // 697
            if (opts.element.data("select2") !== undefined &&                                                          // 698
                opts.element.data("select2") !== null) {                                                               // 699
                opts.element.data("select2").destroy();                                                                // 700
            }                                                                                                          // 701
                                                                                                                       // 702
            this.container = this.createContainer();                                                                   // 703
                                                                                                                       // 704
            this.liveRegion = $("<span>", {                                                                            // 705
                    role: "status",                                                                                    // 706
                    "aria-live": "polite"                                                                              // 707
                })                                                                                                     // 708
                .addClass("select2-hidden-accessible")                                                                 // 709
                .appendTo(document.body);                                                                              // 710
                                                                                                                       // 711
            this.containerId="s2id_"+(opts.element.attr("id") || "autogen"+nextUid());                                 // 712
            this.containerEventName= this.containerId                                                                  // 713
                .replace(/([.])/g, '_')                                                                                // 714
                .replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');                                         // 715
            this.container.attr("id", this.containerId);                                                               // 716
                                                                                                                       // 717
            this.container.attr("title", opts.element.attr("title"));                                                  // 718
                                                                                                                       // 719
            this.body = $("body");                                                                                     // 720
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
            if (element.length && element[0].detachEvent) {                                                            // 856
                element.each(function () {                                                                             // 857
                    this.detachEvent("onpropertychange", self._sync);                                                  // 858
                });                                                                                                    // 859
            }                                                                                                          // 860
            if (this.propertyObserver) {                                                                               // 861
                this.propertyObserver.disconnect();                                                                    // 862
                this.propertyObserver = null;                                                                          // 863
            }                                                                                                          // 864
            this._sync = null;                                                                                         // 865
                                                                                                                       // 866
            if (select2 !== undefined) {                                                                               // 867
                select2.container.remove();                                                                            // 868
                select2.liveRegion.remove();                                                                           // 869
                select2.dropdown.remove();                                                                             // 870
                element                                                                                                // 871
                    .removeClass("select2-offscreen")                                                                  // 872
                    .removeData("select2")                                                                             // 873
                    .off(".select2")                                                                                   // 874
                    .prop("autofocus", this.autofocus || false);                                                       // 875
                if (this.elementTabIndex) {                                                                            // 876
                    element.attr({tabindex: this.elementTabIndex});                                                    // 877
                } else {                                                                                               // 878
                    element.removeAttr("tabindex");                                                                    // 879
                }                                                                                                      // 880
                element.show();                                                                                        // 881
            }                                                                                                          // 882
                                                                                                                       // 883
            cleanupJQueryElements.call(this,                                                                           // 884
                "container",                                                                                           // 885
                "liveRegion",                                                                                          // 886
                "dropdown",                                                                                            // 887
                "results",                                                                                             // 888
                "search"                                                                                               // 889
            );                                                                                                         // 890
        },                                                                                                             // 891
                                                                                                                       // 892
        // abstract                                                                                                    // 893
        optionToData: function(element) {                                                                              // 894
            if (element.is("option")) {                                                                                // 895
                return {                                                                                               // 896
                    id:element.prop("value"),                                                                          // 897
                    text:element.text(),                                                                               // 898
                    element: element.get(),                                                                            // 899
                    css: element.attr("class"),                                                                        // 900
                    disabled: element.prop("disabled"),                                                                // 901
                    locked: equal(element.attr("locked"), "locked") || equal(element.data("locked"), true)             // 902
                };                                                                                                     // 903
            } else if (element.is("optgroup")) {                                                                       // 904
                return {                                                                                               // 905
                    text:element.attr("label"),                                                                        // 906
                    children:[],                                                                                       // 907
                    element: element.get(),                                                                            // 908
                    css: element.attr("class")                                                                         // 909
                };                                                                                                     // 910
            }                                                                                                          // 911
        },                                                                                                             // 912
                                                                                                                       // 913
        // abstract                                                                                                    // 914
        prepareOpts: function (opts) {                                                                                 // 915
            var element, select, idKey, ajaxUrl, self = this;                                                          // 916
                                                                                                                       // 917
            element = opts.element;                                                                                    // 918
                                                                                                                       // 919
            if (element.get(0).tagName.toLowerCase() === "select") {                                                   // 920
                this.select = select = opts.element;                                                                   // 921
            }                                                                                                          // 922
                                                                                                                       // 923
            if (select) {                                                                                              // 924
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {                                                                                // 927
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }                                                                                                  // 929
                });                                                                                                    // 930
            }                                                                                                          // 931
                                                                                                                       // 932
            opts = $.extend({}, {                                                                                      // 933
                populateResults: function(container, results, query) {                                                 // 934
                    var populate, id=this.opts.id, liveRegion=this.liveRegion;                                         // 935
                                                                                                                       // 936
                    populate=function(results, container, depth) {                                                     // 937
                                                                                                                       // 938
                        var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;      // 939
                                                                                                                       // 940
                        results = opts.sortResults(results, container, query);                                         // 941
                                                                                                                       // 942
                        // collect the created nodes for bulk append                                                   // 943
                        var nodes = [];                                                                                // 944
                        for (i = 0, l = results.length; i < l; i = i + 1) {                                            // 945
                                                                                                                       // 946
                            result=results[i];                                                                         // 947
                                                                                                                       // 948
                            disabled = (result.disabled === true);                                                     // 949
                            selectable = (!disabled) && (id(result) !== undefined);                                    // 950
                                                                                                                       // 951
                            compound=result.children && result.children.length > 0;                                    // 952
                                                                                                                       // 953
                            node=$("<li></li>");                                                                       // 954
                            node.addClass("select2-results-dept-"+depth);                                              // 955
                            node.addClass("select2-result");                                                           // 956
                            node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");   // 957
                            if (disabled) { node.addClass("select2-disabled"); }                                       // 958
                            if (compound) { node.addClass("select2-result-with-children"); }                           // 959
                            node.addClass(self.opts.formatResultCssClass(result));                                     // 960
                            node.attr("role", "presentation");                                                         // 961
                                                                                                                       // 962
                            label=$(document.createElement("div"));                                                    // 963
                            label.addClass("select2-result-label");                                                    // 964
                            label.attr("id", "select2-result-label-" + nextUid());                                     // 965
                            label.attr("role", "option");                                                              // 966
                                                                                                                       // 967
                            formatted=opts.formatResult(result, label, query, self.opts.escapeMarkup);                 // 968
                            if (formatted!==undefined) {                                                               // 969
                                label.html(formatted);                                                                 // 970
                                node.append(label);                                                                    // 971
                            }                                                                                          // 972
                                                                                                                       // 973
                                                                                                                       // 974
                            if (compound) {                                                                            // 975
                                                                                                                       // 976
                                innerContainer=$("<ul></ul>");                                                         // 977
                                innerContainer.addClass("select2-result-sub");                                         // 978
                                populate(result.children, innerContainer, depth+1);                                    // 979
                                node.append(innerContainer);                                                           // 980
                            }                                                                                          // 981
                                                                                                                       // 982
                            node.data("select2-data", result);                                                         // 983
                            nodes.push(node[0]);                                                                       // 984
                        }                                                                                              // 985
                                                                                                                       // 986
                        // bulk append the created nodes                                                               // 987
                        container.append(nodes);                                                                       // 988
                        liveRegion.text(opts.formatMatches(results.length));                                           // 989
                    };                                                                                                 // 990
                                                                                                                       // 991
                    populate(results, container, 0);                                                                   // 992
                }                                                                                                      // 993
            }, $.fn.select2.defaults, opts);                                                                           // 994
                                                                                                                       // 995
            if (typeof(opts.id) !== "function") {                                                                      // 996
                idKey = opts.id;                                                                                       // 997
                opts.id = function (e) { return e[idKey]; };                                                           // 998
            }                                                                                                          // 999
                                                                                                                       // 1000
            if ($.isArray(opts.element.data("select2Tags"))) {                                                         // 1001
                if ("tags" in opts) {                                                                                  // 1002
                    throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
                }                                                                                                      // 1004
                opts.tags=opts.element.data("select2Tags");                                                            // 1005
            }                                                                                                          // 1006
                                                                                                                       // 1007
            if (select) {                                                                                              // 1008
                opts.query = this.bind(function (query) {                                                              // 1009
                    var data = { results: [], more: false },                                                           // 1010
                        term = query.term,                                                                             // 1011
                        children, placeholderOption, process;                                                          // 1012
                                                                                                                       // 1013
                    process=function(element, collection) {                                                            // 1014
                        var group;                                                                                     // 1015
                        if (element.is("option")) {                                                                    // 1016
                            if (query.matcher(term, element.text(), element)) {                                        // 1017
                                collection.push(self.optionToData(element));                                           // 1018
                            }                                                                                          // 1019
                        } else if (element.is("optgroup")) {                                                           // 1020
                            group=self.optionToData(element);                                                          // 1021
                            element.children().each2(function(i, elm) { process(elm, group.children); });              // 1022
                            if (group.children.length>0) {                                                             // 1023
                                collection.push(group);                                                                // 1024
                            }                                                                                          // 1025
                        }                                                                                              // 1026
                    };                                                                                                 // 1027
                                                                                                                       // 1028
                    children=element.children();                                                                       // 1029
                                                                                                                       // 1030
                    // ignore the placeholder option if there is one                                                   // 1031
                    if (this.getPlaceholder() !== undefined && children.length > 0) {                                  // 1032
                        placeholderOption = this.getPlaceholderOption();                                               // 1033
                        if (placeholderOption) {                                                                       // 1034
                            children=children.not(placeholderOption);                                                  // 1035
                        }                                                                                              // 1036
                    }                                                                                                  // 1037
                                                                                                                       // 1038
                    children.each2(function(i, elm) { process(elm, data.results); });                                  // 1039
                                                                                                                       // 1040
                    query.callback(data);                                                                              // 1041
                });                                                                                                    // 1042
                // this is needed because inside val() we construct choices from options and their id is hardcoded     // 1043
                opts.id=function(e) { return e.id; };                                                                  // 1044
            } else {                                                                                                   // 1045
                if (!("query" in opts)) {                                                                              // 1046
                                                                                                                       // 1047
                    if ("ajax" in opts) {                                                                              // 1048
                        ajaxUrl = opts.element.data("ajax-url");                                                       // 1049
                        if (ajaxUrl && ajaxUrl.length > 0) {                                                           // 1050
                            opts.ajax.url = ajaxUrl;                                                                   // 1051
                        }                                                                                              // 1052
                        opts.query = ajax.call(opts.element, opts.ajax);                                               // 1053
                    } else if ("data" in opts) {                                                                       // 1054
                        opts.query = local(opts.data);                                                                 // 1055
                    } else if ("tags" in opts) {                                                                       // 1056
                        opts.query = tags(opts.tags);                                                                  // 1057
                        if (opts.createSearchChoice === undefined) {                                                   // 1058
                            opts.createSearchChoice = function (term) { return {id: $.trim(term), text: $.trim(term)}; };
                        }                                                                                              // 1060
                        if (opts.initSelection === undefined) {                                                        // 1061
                            opts.initSelection = function (element, callback) {                                        // 1062
                                var data = [];                                                                         // 1063
                                $(splitVal(element.val(), opts.separator)).each(function () {                          // 1064
                                    var obj = { id: this, text: this },                                                // 1065
                                        tags = opts.tags;                                                              // 1066
                                    if ($.isFunction(tags)) tags=tags();                                               // 1067
                                    $(tags).each(function() { if (equal(this.id, obj.id)) { obj = this; return false; } });
                                    data.push(obj);                                                                    // 1069
                                });                                                                                    // 1070
                                                                                                                       // 1071
                                callback(data);                                                                        // 1072
                            };                                                                                         // 1073
                        }                                                                                              // 1074
                    }                                                                                                  // 1075
                }                                                                                                      // 1076
            }                                                                                                          // 1077
            if (typeof(opts.query) !== "function") {                                                                   // 1078
                throw "query function not defined for Select2 " + opts.element.attr("id");                             // 1079
            }                                                                                                          // 1080
                                                                                                                       // 1081
            if (opts.createSearchChoicePosition === 'top') {                                                           // 1082
                opts.createSearchChoicePosition = function(list, item) { list.unshift(item); };                        // 1083
            }                                                                                                          // 1084
            else if (opts.createSearchChoicePosition === 'bottom') {                                                   // 1085
                opts.createSearchChoicePosition = function(list, item) { list.push(item); };                           // 1086
            }                                                                                                          // 1087
            else if (typeof(opts.createSearchChoicePosition) !== "function")  {                                        // 1088
                throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";        // 1089
            }                                                                                                          // 1090
                                                                                                                       // 1091
            return opts;                                                                                               // 1092
        },                                                                                                             // 1093
                                                                                                                       // 1094
        /**                                                                                                            // 1095
         * Monitor the original element for changes and update select2 accordingly                                     // 1096
         */                                                                                                            // 1097
        // abstract                                                                                                    // 1098
        monitorSource: function () {                                                                                   // 1099
            var el = this.opts.element, observer, self = this;                                                         // 1100
                                                                                                                       // 1101
            el.on("change.select2", this.bind(function (e) {                                                           // 1102
                if (this.opts.element.data("select2-change-triggered") !== true) {                                     // 1103
                    this.initSelection();                                                                              // 1104
                }                                                                                                      // 1105
            }));                                                                                                       // 1106
                                                                                                                       // 1107
            this._sync = this.bind(function () {                                                                       // 1108
                                                                                                                       // 1109
                // sync enabled state                                                                                  // 1110
                var disabled = el.prop("disabled");                                                                    // 1111
                if (disabled === undefined) disabled = false;                                                          // 1112
                this.enable(!disabled);                                                                                // 1113
                                                                                                                       // 1114
                var readonly = el.prop("readonly");                                                                    // 1115
                if (readonly === undefined) readonly = false;                                                          // 1116
                this.readonly(readonly);                                                                               // 1117
                                                                                                                       // 1118
                syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);                   // 1119
                this.container.addClass(evaluate(this.opts.containerCssClass, this.opts.element));                     // 1120
                                                                                                                       // 1121
                syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);                     // 1122
                this.dropdown.addClass(evaluate(this.opts.dropdownCssClass, this.opts.element));                       // 1123
                                                                                                                       // 1124
            });                                                                                                        // 1125
                                                                                                                       // 1126
            // IE8-10 (IE9/10 won't fire propertyChange via attachEventListener)                                       // 1127
            if (el.length && el[0].attachEvent) {                                                                      // 1128
                el.each(function() {                                                                                   // 1129
                    this.attachEvent("onpropertychange", self._sync);                                                  // 1130
                });                                                                                                    // 1131
            }                                                                                                          // 1132
                                                                                                                       // 1133
            // safari, chrome, firefox, IE11                                                                           // 1134
            observer = window.MutationObserver || window.WebKitMutationObserver|| window.MozMutationObserver;          // 1135
            if (observer !== undefined) {                                                                              // 1136
                if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }             // 1137
                this.propertyObserver = new observer(function (mutations) {                                            // 1138
                    $.each(mutations, self._sync);                                                                     // 1139
                });                                                                                                    // 1140
                this.propertyObserver.observe(el.get(0), { attributes:true, subtree:false });                          // 1141
            }                                                                                                          // 1142
        },                                                                                                             // 1143
                                                                                                                       // 1144
        // abstract                                                                                                    // 1145
        triggerSelect: function(data) {                                                                                // 1146
            var evt = $.Event("select2-selecting", { val: this.id(data), object: data, choice: data });                // 1147
            this.opts.element.trigger(evt);                                                                            // 1148
            return !evt.isDefaultPrevented();                                                                          // 1149
        },                                                                                                             // 1150
                                                                                                                       // 1151
        /**                                                                                                            // 1152
         * Triggers the change event on the source element                                                             // 1153
         */                                                                                                            // 1154
        // abstract                                                                                                    // 1155
        triggerChange: function (details) {                                                                            // 1156
                                                                                                                       // 1157
            details = details || {};                                                                                   // 1158
            details= $.extend({}, details, { type: "change", val: this.val() });                                       // 1159
            // prevents recursive triggering                                                                           // 1160
            this.opts.element.data("select2-change-triggered", true);                                                  // 1161
            this.opts.element.trigger(details);                                                                        // 1162
            this.opts.element.data("select2-change-triggered", false);                                                 // 1163
                                                                                                                       // 1164
            // some validation frameworks ignore the change event and listen instead to keyup, click for selects       // 1165
            // so here we trigger the click event manually                                                             // 1166
            this.opts.element.click();                                                                                 // 1167
                                                                                                                       // 1168
            // ValidationEngine ignores the change event and listens instead to blur                                   // 1169
            // so here we trigger the blur event manually if so desired                                                // 1170
            if (this.opts.blurOnChange)                                                                                // 1171
                this.opts.element.blur();                                                                              // 1172
        },                                                                                                             // 1173
                                                                                                                       // 1174
        //abstract                                                                                                     // 1175
        isInterfaceEnabled: function()                                                                                 // 1176
        {                                                                                                              // 1177
            return this.enabledInterface === true;                                                                     // 1178
        },                                                                                                             // 1179
                                                                                                                       // 1180
        // abstract                                                                                                    // 1181
        enableInterface: function() {                                                                                  // 1182
            var enabled = this._enabled && !this._readonly,                                                            // 1183
                disabled = !enabled;                                                                                   // 1184
                                                                                                                       // 1185
            if (enabled === this.enabledInterface) return false;                                                       // 1186
                                                                                                                       // 1187
            this.container.toggleClass("select2-container-disabled", disabled);                                        // 1188
            this.close();                                                                                              // 1189
            this.enabledInterface = enabled;                                                                           // 1190
                                                                                                                       // 1191
            return true;                                                                                               // 1192
        },                                                                                                             // 1193
                                                                                                                       // 1194
        // abstract                                                                                                    // 1195
        enable: function(enabled) {                                                                                    // 1196
            if (enabled === undefined) enabled = true;                                                                 // 1197
            if (this._enabled === enabled) return;                                                                     // 1198
            this._enabled = enabled;                                                                                   // 1199
                                                                                                                       // 1200
            this.opts.element.prop("disabled", !enabled);                                                              // 1201
            this.enableInterface();                                                                                    // 1202
        },                                                                                                             // 1203
                                                                                                                       // 1204
        // abstract                                                                                                    // 1205
        disable: function() {                                                                                          // 1206
            this.enable(false);                                                                                        // 1207
        },                                                                                                             // 1208
                                                                                                                       // 1209
        // abstract                                                                                                    // 1210
        readonly: function(enabled) {                                                                                  // 1211
            if (enabled === undefined) enabled = false;                                                                // 1212
            if (this._readonly === enabled) return;                                                                    // 1213
            this._readonly = enabled;                                                                                  // 1214
                                                                                                                       // 1215
            this.opts.element.prop("readonly", enabled);                                                               // 1216
            this.enableInterface();                                                                                    // 1217
        },                                                                                                             // 1218
                                                                                                                       // 1219
        // abstract                                                                                                    // 1220
        opened: function () {                                                                                          // 1221
            return (this.container) ? this.container.hasClass("select2-dropdown-open") : false;                        // 1222
        },                                                                                                             // 1223
                                                                                                                       // 1224
        // abstract                                                                                                    // 1225
        positionDropdown: function() {                                                                                 // 1226
            var $dropdown = this.dropdown,                                                                             // 1227
                offset = this.container.offset(),                                                                      // 1228
                height = this.container.outerHeight(false),                                                            // 1229
                width = this.container.outerWidth(false),                                                              // 1230
                dropHeight = $dropdown.outerHeight(false),                                                             // 1231
                $window = $(window),                                                                                   // 1232
                windowWidth = $window.width(),                                                                         // 1233
                windowHeight = $window.height(),                                                                       // 1234
                viewPortRight = $window.scrollLeft() + windowWidth,                                                    // 1235
                viewportBottom = $window.scrollTop() + windowHeight,                                                   // 1236
                dropTop = offset.top + height,                                                                         // 1237
                dropLeft = offset.left,                                                                                // 1238
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,                                              // 1239
                enoughRoomAbove = (offset.top - dropHeight) >= $window.scrollTop(),                                    // 1240
                dropWidth = $dropdown.outerWidth(false),                                                               // 1241
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight,                                             // 1242
                aboveNow = $dropdown.hasClass("select2-drop-above"),                                                   // 1243
                bodyOffset,                                                                                            // 1244
                above,                                                                                                 // 1245
                changeDirection,                                                                                       // 1246
                css,                                                                                                   // 1247
                resultsListNode;                                                                                       // 1248
                                                                                                                       // 1249
            // always prefer the current above/below alignment, unless there is not enough room                        // 1250
            if (aboveNow) {                                                                                            // 1251
                above = true;                                                                                          // 1252
                if (!enoughRoomAbove && enoughRoomBelow) {                                                             // 1253
                    changeDirection = true;                                                                            // 1254
                    above = false;                                                                                     // 1255
                }                                                                                                      // 1256
            } else {                                                                                                   // 1257
                above = false;                                                                                         // 1258
                if (!enoughRoomBelow && enoughRoomAbove) {                                                             // 1259
                    changeDirection = true;                                                                            // 1260
                    above = true;                                                                                      // 1261
                }                                                                                                      // 1262
            }                                                                                                          // 1263
                                                                                                                       // 1264
            //if we are changing direction we need to get positions when dropdown is hidden;                           // 1265
            if (changeDirection) {                                                                                     // 1266
                $dropdown.hide();                                                                                      // 1267
                offset = this.container.offset();                                                                      // 1268
                height = this.container.outerHeight(false);                                                            // 1269
                width = this.container.outerWidth(false);                                                              // 1270
                dropHeight = $dropdown.outerHeight(false);                                                             // 1271
                viewPortRight = $window.scrollLeft() + windowWidth;                                                    // 1272
                viewportBottom = $window.scrollTop() + windowHeight;                                                   // 1273
                dropTop = offset.top + height;                                                                         // 1274
                dropLeft = offset.left;                                                                                // 1275
                dropWidth = $dropdown.outerWidth(false);                                                               // 1276
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;                                             // 1277
                $dropdown.show();                                                                                      // 1278
                                                                                                                       // 1279
                // fix so the cursor does not move to the left within the search-textbox in IE                         // 1280
                this.focusSearch();                                                                                    // 1281
            }                                                                                                          // 1282
                                                                                                                       // 1283
            if (this.opts.dropdownAutoWidth) {                                                                         // 1284
                resultsListNode = $('.select2-results', $dropdown)[0];                                                 // 1285
                $dropdown.addClass('select2-drop-auto-width');                                                         // 1286
                $dropdown.css('width', '');                                                                            // 1287
                // Add scrollbar width to dropdown if vertical scrollbar is present                                    // 1288
                dropWidth = $dropdown.outerWidth(false) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width);
                dropWidth > width ? width = dropWidth : dropWidth = width;                                             // 1290
                dropHeight = $dropdown.outerHeight(false);                                                             // 1291
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;                                             // 1292
            }                                                                                                          // 1293
            else {                                                                                                     // 1294
                this.container.removeClass('select2-drop-auto-width');                                                 // 1295
            }                                                                                                          // 1296
                                                                                                                       // 1297
            //console.log("below/ droptop:", dropTop, "dropHeight", dropHeight, "sum", (dropTop+dropHeight)+" viewport bottom", viewportBottom, "enough?", enoughRoomBelow);
            //console.log("above/ offset.top", offset.top, "dropHeight", dropHeight, "top", (offset.top-dropHeight), "scrollTop", this.body.scrollTop(), "enough?", enoughRoomAbove);
                                                                                                                       // 1300
            // fix positioning when body has an offset and is not position: static                                     // 1301
            if (this.body.css('position') !== 'static') {                                                              // 1302
                bodyOffset = this.body.offset();                                                                       // 1303
                dropTop -= bodyOffset.top;                                                                             // 1304
                dropLeft -= bodyOffset.left;                                                                           // 1305
            }                                                                                                          // 1306
                                                                                                                       // 1307
            if (!enoughRoomOnRight) {                                                                                  // 1308
                dropLeft = offset.left + this.container.outerWidth(false) - dropWidth;                                 // 1309
            }                                                                                                          // 1310
                                                                                                                       // 1311
            css =  {                                                                                                   // 1312
                left: dropLeft,                                                                                        // 1313
                width: width                                                                                           // 1314
            };                                                                                                         // 1315
                                                                                                                       // 1316
            if (above) {                                                                                               // 1317
                css.top = offset.top - dropHeight;                                                                     // 1318
                css.bottom = 'auto';                                                                                   // 1319
                this.container.addClass("select2-drop-above");                                                         // 1320
                $dropdown.addClass("select2-drop-above");                                                              // 1321
            }                                                                                                          // 1322
            else {                                                                                                     // 1323
                css.top = dropTop;                                                                                     // 1324
                css.bottom = 'auto';                                                                                   // 1325
                this.container.removeClass("select2-drop-above");                                                      // 1326
                $dropdown.removeClass("select2-drop-above");                                                           // 1327
            }                                                                                                          // 1328
            css = $.extend(css, evaluate(this.opts.dropdownCss, this.opts.element));                                   // 1329
                                                                                                                       // 1330
            $dropdown.css(css);                                                                                        // 1331
        },                                                                                                             // 1332
                                                                                                                       // 1333
        // abstract                                                                                                    // 1334
        shouldOpen: function() {                                                                                       // 1335
            var event;                                                                                                 // 1336
                                                                                                                       // 1337
            if (this.opened()) return false;                                                                           // 1338
                                                                                                                       // 1339
            if (this._enabled === false || this._readonly === true) return false;                                      // 1340
                                                                                                                       // 1341
            event = $.Event("select2-opening");                                                                        // 1342
            this.opts.element.trigger(event);                                                                          // 1343
            return !event.isDefaultPrevented();                                                                        // 1344
        },                                                                                                             // 1345
                                                                                                                       // 1346
        // abstract                                                                                                    // 1347
        clearDropdownAlignmentPreference: function() {                                                                 // 1348
            // clear the classes used to figure out the preference of where the dropdown should be opened              // 1349
            this.container.removeClass("select2-drop-above");                                                          // 1350
            this.dropdown.removeClass("select2-drop-above");                                                           // 1351
        },                                                                                                             // 1352
                                                                                                                       // 1353
        /**                                                                                                            // 1354
         * Opens the dropdown                                                                                          // 1355
         *                                                                                                             // 1356
         * @return {Boolean} whether or not dropdown was opened. This method will return false if, for example,        // 1357
         * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().       // 1358
         */                                                                                                            // 1359
        // abstract                                                                                                    // 1360
        open: function () {                                                                                            // 1361
                                                                                                                       // 1362
            if (!this.shouldOpen()) return false;                                                                      // 1363
                                                                                                                       // 1364
            this.opening();                                                                                            // 1365
                                                                                                                       // 1366
            // Only bind the document mousemove when the dropdown is visible                                           // 1367
            $document.on("mousemove.select2Event", function (e) {                                                      // 1368
                lastMousePosition.x = e.pageX;                                                                         // 1369
                lastMousePosition.y = e.pageY;                                                                         // 1370
            });                                                                                                        // 1371
                                                                                                                       // 1372
            return true;                                                                                               // 1373
        },                                                                                                             // 1374
                                                                                                                       // 1375
        /**                                                                                                            // 1376
         * Performs the opening of the dropdown                                                                        // 1377
         */                                                                                                            // 1378
        // abstract                                                                                                    // 1379
        opening: function() {                                                                                          // 1380
            var cid = this.containerEventName,                                                                         // 1381
                scroll = "scroll." + cid,                                                                              // 1382
                resize = "resize."+cid,                                                                                // 1383
                orient = "orientationchange."+cid,                                                                     // 1384
                mask;                                                                                                  // 1385
                                                                                                                       // 1386
            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");                     // 1387
                                                                                                                       // 1388
            this.clearDropdownAlignmentPreference();                                                                   // 1389
                                                                                                                       // 1390
            if(this.dropdown[0] !== this.body.children().last()[0]) {                                                  // 1391
                this.dropdown.detach().appendTo(this.body);                                                            // 1392
            }                                                                                                          // 1393
                                                                                                                       // 1394
            // create the dropdown mask if doesn't already exist                                                       // 1395
            mask = $("#select2-drop-mask");                                                                            // 1396
            if (mask.length == 0) {                                                                                    // 1397
                mask = $(document.createElement("div"));                                                               // 1398
                mask.attr("id","select2-drop-mask").attr("class","select2-drop-mask");                                 // 1399
                mask.hide();                                                                                           // 1400
                mask.appendTo(this.body);                                                                              // 1401
                mask.on("mousedown touchstart click", function (e) {                                                   // 1402
                    // Prevent IE from generating a click event on the body                                            // 1403
                    reinsertElement(mask);                                                                             // 1404
                                                                                                                       // 1405
                    var dropdown = $("#select2-drop"), self;                                                           // 1406
                    if (dropdown.length > 0) {                                                                         // 1407
                        self=dropdown.data("select2");                                                                 // 1408
                        if (self.opts.selectOnBlur) {                                                                  // 1409
                            self.selectHighlighted({noFocus: true});                                                   // 1410
                        }                                                                                              // 1411
                        self.close();                                                                                  // 1412
                        e.preventDefault();                                                                            // 1413
                        e.stopPropagation();                                                                           // 1414
                    }                                                                                                  // 1415
                });                                                                                                    // 1416
            }                                                                                                          // 1417
                                                                                                                       // 1418
            // ensure the mask is always right before the dropdown                                                     // 1419
            if (this.dropdown.prev()[0] !== mask[0]) {                                                                 // 1420
                this.dropdown.before(mask);                                                                            // 1421
            }                                                                                                          // 1422
                                                                                                                       // 1423
            // move the global id to the correct dropdown                                                              // 1424
            $("#select2-drop").removeAttr("id");                                                                       // 1425
            this.dropdown.attr("id", "select2-drop");                                                                  // 1426
                                                                                                                       // 1427
            // show the elements                                                                                       // 1428
            mask.show();                                                                                               // 1429
                                                                                                                       // 1430
            this.positionDropdown();                                                                                   // 1431
            this.dropdown.show();                                                                                      // 1432
            this.positionDropdown();                                                                                   // 1433
                                                                                                                       // 1434
            this.dropdown.addClass("select2-drop-active");                                                             // 1435
                                                                                                                       // 1436
            // attach listeners to events that can change the position of the container and thus require               // 1437
            // the position of the dropdown to be updated as well so it does not come unglued from the container       // 1438
            var that = this;                                                                                           // 1439
            this.container.parents().add(window).each(function () {                                                    // 1440
                $(this).on(resize+" "+scroll+" "+orient, function (e) {                                                // 1441
                    if (that.opened()) that.positionDropdown();                                                        // 1442
                });                                                                                                    // 1443
            });                                                                                                        // 1444
                                                                                                                       // 1445
                                                                                                                       // 1446
        },                                                                                                             // 1447
                                                                                                                       // 1448
        // abstract                                                                                                    // 1449
        close: function () {                                                                                           // 1450
            if (!this.opened()) return;                                                                                // 1451
                                                                                                                       // 1452
            var cid = this.containerEventName,                                                                         // 1453
                scroll = "scroll." + cid,                                                                              // 1454
                resize = "resize."+cid,                                                                                // 1455
                orient = "orientationchange."+cid;                                                                     // 1456
                                                                                                                       // 1457
            // unbind event listeners                                                                                  // 1458
            this.container.parents().add(window).each(function () { $(this).off(scroll).off(resize).off(orient); });   // 1459
                                                                                                                       // 1460
            this.clearDropdownAlignmentPreference();                                                                   // 1461
                                                                                                                       // 1462
            $("#select2-drop-mask").hide();                                                                            // 1463
            this.dropdown.removeAttr("id"); // only the active dropdown has the select2-drop id                        // 1464
            this.dropdown.hide();                                                                                      // 1465
            this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");               // 1466
            this.results.empty();                                                                                      // 1467
                                                                                                                       // 1468
            // Now that the dropdown is closed, unbind the global document mousemove event                             // 1469
            $document.off("mousemove.select2Event");                                                                   // 1470
                                                                                                                       // 1471
            this.clearSearch();                                                                                        // 1472
            this.search.removeClass("select2-active");                                                                 // 1473
            this.opts.element.trigger($.Event("select2-close"));                                                       // 1474
        },                                                                                                             // 1475
                                                                                                                       // 1476
        /**                                                                                                            // 1477
         * Opens control, sets input value, and updates results.                                                       // 1478
         */                                                                                                            // 1479
        // abstract                                                                                                    // 1480
        externalSearch: function (term) {                                                                              // 1481
            this.open();                                                                                               // 1482
            this.search.val(term);                                                                                     // 1483
            this.updateResults(false);                                                                                 // 1484
        },                                                                                                             // 1485
                                                                                                                       // 1486
        // abstract                                                                                                    // 1487
        clearSearch: function () {                                                                                     // 1488
                                                                                                                       // 1489
        },                                                                                                             // 1490
                                                                                                                       // 1491
        //abstract                                                                                                     // 1492
        getMaximumSelectionSize: function() {                                                                          // 1493
            return evaluate(this.opts.maximumSelectionSize, this.opts.element);                                        // 1494
        },                                                                                                             // 1495
                                                                                                                       // 1496
        // abstract                                                                                                    // 1497
        ensureHighlightVisible: function () {                                                                          // 1498
            var results = this.results, children, index, child, hb, rb, y, more, topOffset;                            // 1499
                                                                                                                       // 1500
            index = this.highlight();                                                                                  // 1501
                                                                                                                       // 1502
            if (index < 0) return;                                                                                     // 1503
                                                                                                                       // 1504
            if (index == 0) {                                                                                          // 1505
                                                                                                                       // 1506
                // if the first element is highlighted scroll all the way to the top,                                  // 1507
                // that way any unselectable headers above it will also be scrolled                                    // 1508
                // into view                                                                                           // 1509
                                                                                                                       // 1510
                results.scrollTop(0);                                                                                  // 1511
                return;                                                                                                // 1512
            }                                                                                                          // 1513
                                                                                                                       // 1514
            children = this.findHighlightableChoices().find('.select2-result-label');                                  // 1515
                                                                                                                       // 1516
            child = $(children[index]);                                                                                // 1517
                                                                                                                       // 1518
            topOffset = (child.offset() || {}).top || 0;                                                               // 1519
                                                                                                                       // 1520
            hb = topOffset + child.outerHeight(true);                                                                  // 1521
                                                                                                                       // 1522
            // if this is the last child lets also make sure select2-more-results is visible                           // 1523
            if (index === children.length - 1) {                                                                       // 1524
                more = results.find("li.select2-more-results");                                                        // 1525
                if (more.length > 0) {                                                                                 // 1526
                    hb = more.offset().top + more.outerHeight(true);                                                   // 1527
                }                                                                                                      // 1528
            }                                                                                                          // 1529
                                                                                                                       // 1530
            rb = results.offset().top + results.outerHeight(true);                                                     // 1531
            if (hb > rb) {                                                                                             // 1532
                results.scrollTop(results.scrollTop() + (hb - rb));                                                    // 1533
            }                                                                                                          // 1534
            y = topOffset - results.offset().top;                                                                      // 1535
                                                                                                                       // 1536
            // make sure the top of the element is visible                                                             // 1537
            if (y < 0 && child.css('display') != 'none' ) {                                                            // 1538
                results.scrollTop(results.scrollTop() + y); // y is negative                                           // 1539
            }                                                                                                          // 1540
        },                                                                                                             // 1541
                                                                                                                       // 1542
        // abstract                                                                                                    // 1543
        findHighlightableChoices: function() {                                                                         // 1544
            return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)");      // 1545
        },                                                                                                             // 1546
                                                                                                                       // 1547
        // abstract                                                                                                    // 1548
        moveHighlight: function (delta) {                                                                              // 1549
            var choices = this.findHighlightableChoices(),                                                             // 1550
                index = this.highlight();                                                                              // 1551
                                                                                                                       // 1552
            while (index > -1 && index < choices.length) {                                                             // 1553
                index += delta;                                                                                        // 1554
                var choice = $(choices[index]);                                                                        // 1555
                if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
                    this.highlight(index);                                                                             // 1557
                    break;                                                                                             // 1558
                }                                                                                                      // 1559
            }                                                                                                          // 1560
        },                                                                                                             // 1561
                                                                                                                       // 1562
        // abstract                                                                                                    // 1563
        highlight: function (index) {                                                                                  // 1564
            var choices = this.findHighlightableChoices(),                                                             // 1565
                choice,                                                                                                // 1566
                data;                                                                                                  // 1567
                                                                                                                       // 1568
            if (arguments.length === 0) {                                                                              // 1569
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());                              // 1570
            }                                                                                                          // 1571
                                                                                                                       // 1572
            if (index >= choices.length) index = choices.length - 1;                                                   // 1573
            if (index < 0) index = 0;                                                                                  // 1574
                                                                                                                       // 1575
            this.removeHighlight();                                                                                    // 1576
                                                                                                                       // 1577
            choice = $(choices[index]);                                                                                // 1578
            choice.addClass("select2-highlighted");                                                                    // 1579
                                                                                                                       // 1580
            // ensure assistive technology can determine the active choice                                             // 1581
            this.search.attr("aria-activedescendant", choice.find(".select2-result-label").attr("id"));                // 1582
                                                                                                                       // 1583
            this.ensureHighlightVisible();                                                                             // 1584
                                                                                                                       // 1585
            this.liveRegion.text(choice.text());                                                                       // 1586
                                                                                                                       // 1587
            data = choice.data("select2-data");                                                                        // 1588
            if (data) {                                                                                                // 1589
                this.opts.element.trigger({ type: "select2-highlight", val: this.id(data), choice: data });            // 1590
            }                                                                                                          // 1591
        },                                                                                                             // 1592
                                                                                                                       // 1593
        removeHighlight: function() {                                                                                  // 1594
            this.results.find(".select2-highlighted").removeClass("select2-highlighted");                              // 1595
        },                                                                                                             // 1596
                                                                                                                       // 1597
        touchMoved: function() {                                                                                       // 1598
            this._touchMoved = true;                                                                                   // 1599
        },                                                                                                             // 1600
                                                                                                                       // 1601
        clearTouchMoved: function() {                                                                                  // 1602
          this._touchMoved = false;                                                                                    // 1603
        },                                                                                                             // 1604
                                                                                                                       // 1605
        // abstract                                                                                                    // 1606
        countSelectableResults: function() {                                                                           // 1607
            return this.findHighlightableChoices().length;                                                             // 1608
        },                                                                                                             // 1609
                                                                                                                       // 1610
        // abstract                                                                                                    // 1611
        highlightUnderEvent: function (event) {                                                                        // 1612
            var el = $(event.target).closest(".select2-result-selectable");                                            // 1613
            if (el.length > 0 && !el.is(".select2-highlighted")) {                                                     // 1614
                var choices = this.findHighlightableChoices();                                                         // 1615
                this.highlight(choices.index(el));                                                                     // 1616
            } else if (el.length == 0) {                                                                               // 1617
                // if we are over an unselectable item remove all highlights                                           // 1618
                this.removeHighlight();                                                                                // 1619
            }                                                                                                          // 1620
        },                                                                                                             // 1621
                                                                                                                       // 1622
        // abstract                                                                                                    // 1623
        loadMoreIfNeeded: function () {                                                                                // 1624
            var results = this.results,                                                                                // 1625
                more = results.find("li.select2-more-results"),                                                        // 1626
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                page = this.resultsPage + 1,                                                                           // 1628
                self=this,                                                                                             // 1629
                term=this.search.val(),                                                                                // 1630
                context=this.context;                                                                                  // 1631
                                                                                                                       // 1632
            if (more.length === 0) return;                                                                             // 1633
            below = more.offset().top - results.offset().top - results.height();                                       // 1634
                                                                                                                       // 1635
            if (below <= this.opts.loadMorePadding) {                                                                  // 1636
                more.addClass("select2-active");                                                                       // 1637
                this.opts.query({                                                                                      // 1638
                        element: this.opts.element,                                                                    // 1639
                        term: term,                                                                                    // 1640
                        page: page,                                                                                    // 1641
                        context: context,                                                                              // 1642
                        matcher: this.opts.matcher,                                                                    // 1643
                        callback: this.bind(function (data) {                                                          // 1644
                                                                                                                       // 1645
                    // ignore a response if the select2 has been closed before it was received                         // 1646
                    if (!self.opened()) return;                                                                        // 1647
                                                                                                                       // 1648
                                                                                                                       // 1649
                    self.opts.populateResults.call(this, results, data.results, {term: term, page: page, context:context});
                    self.postprocessResults(data, false, false);                                                       // 1651
                                                                                                                       // 1652
                    if (data.more===true) {                                                                            // 1653
                        more.detach().appendTo(results).text(evaluate(self.opts.formatLoadMore, self.opts.element, page+1));
                        window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);                                // 1655
                    } else {                                                                                           // 1656
                        more.remove();                                                                                 // 1657
                    }                                                                                                  // 1658
                    self.positionDropdown();                                                                           // 1659
                    self.resultsPage = page;                                                                           // 1660
                    self.context = data.context;                                                                       // 1661
                    this.opts.element.trigger({ type: "select2-loaded", items: data });                                // 1662
                })});                                                                                                  // 1663
            }                                                                                                          // 1664
        },                                                                                                             // 1665
                                                                                                                       // 1666
        /**                                                                                                            // 1667
         * Default tokenizer function which does nothing                                                               // 1668
         */                                                                                                            // 1669
        tokenize: function() {                                                                                         // 1670
                                                                                                                       // 1671
        },                                                                                                             // 1672
                                                                                                                       // 1673
        /**                                                                                                            // 1674
         * @param initial whether or not this is the call to this method right after the dropdown has been opened      // 1675
         */                                                                                                            // 1676
        // abstract                                                                                                    // 1677
        updateResults: function (initial) {                                                                            // 1678
            var search = this.search,                                                                                  // 1679
                results = this.results,                                                                                // 1680
                opts = this.opts,                                                                                      // 1681
                data,                                                                                                  // 1682
                self = this,                                                                                           // 1683
                input,                                                                                                 // 1684
                term = search.val(),                                                                                   // 1685
                lastTerm = $.data(this.container, "select2-last-term"),                                                // 1686
                // sequence number used to drop out-of-order responses                                                 // 1687
                queryNumber;                                                                                           // 1688
                                                                                                                       // 1689
            // prevent duplicate queries against the same term                                                         // 1690
            if (initial !== true && lastTerm && equal(term, lastTerm)) return;                                         // 1691
                                                                                                                       // 1692
            $.data(this.container, "select2-last-term", term);                                                         // 1693
                                                                                                                       // 1694
            // if the search is currently hidden we do not alter the results                                           // 1695
            if (initial !== true && (this.showSearchInput === false || !this.opened())) {                              // 1696
                return;                                                                                                // 1697
            }                                                                                                          // 1698
                                                                                                                       // 1699
            function postRender() {                                                                                    // 1700
                search.removeClass("select2-active");                                                                  // 1701
                self.positionDropdown();                                                                               // 1702
                if (results.find('.select2-no-results,.select2-selection-limit,.select2-searching').length) {          // 1703
                    self.liveRegion.text(results.text());                                                              // 1704
                }                                                                                                      // 1705
                else {                                                                                                 // 1706
                    self.liveRegion.text(self.opts.formatMatches(results.find('.select2-result-selectable').length));  // 1707
                }                                                                                                      // 1708
            }                                                                                                          // 1709
                                                                                                                       // 1710
            function render(html) {                                                                                    // 1711
                results.html(html);                                                                                    // 1712
                postRender();                                                                                          // 1713
            }                                                                                                          // 1714
                                                                                                                       // 1715
            queryNumber = ++this.queryCount;                                                                           // 1716
                                                                                                                       // 1717
            var maxSelSize = this.getMaximumSelectionSize();                                                           // 1718
            if (maxSelSize >=1) {                                                                                      // 1719
                data = this.data();                                                                                    // 1720
                if ($.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig")) {
                    render("<li class='select2-selection-limit'>" + evaluate(opts.formatSelectionTooBig, opts.element, maxSelSize) + "</li>");
                    return;                                                                                            // 1723
                }                                                                                                      // 1724
            }                                                                                                          // 1725
                                                                                                                       // 1726
            if (search.val().length < opts.minimumInputLength) {                                                       // 1727
                if (checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) {                                 // 1728
                    render("<li class='select2-no-results'>" + evaluate(opts.formatInputTooShort, opts.element, search.val(), opts.minimumInputLength) + "</li>");
                } else {                                                                                               // 1730
                    render("");                                                                                        // 1731
                }                                                                                                      // 1732
                if (initial && this.showSearch) this.showSearch(true);                                                 // 1733
                return;                                                                                                // 1734
            }                                                                                                          // 1735
                                                                                                                       // 1736
            if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) {                            // 1737
                if (checkFormatter(opts.formatInputTooLong, "formatInputTooLong")) {                                   // 1738
                    render("<li class='select2-no-results'>" + evaluate(opts.formatInputTooLong, opts.element, search.val(), opts.maximumInputLength) + "</li>");
                } else {                                                                                               // 1740
                    render("");                                                                                        // 1741
                }                                                                                                      // 1742
                return;                                                                                                // 1743
            }                                                                                                          // 1744
                                                                                                                       // 1745
            if (opts.formatSearching && this.findHighlightableChoices().length === 0) {                                // 1746
                render("<li class='select2-searching'>" + evaluate(opts.formatSearching, opts.element) + "</li>");     // 1747
            }                                                                                                          // 1748
                                                                                                                       // 1749
            search.addClass("select2-active");                                                                         // 1750
                                                                                                                       // 1751
            this.removeHighlight();                                                                                    // 1752
                                                                                                                       // 1753
            // give the tokenizer a chance to pre-process the input                                                    // 1754
            input = this.tokenize();                                                                                   // 1755
            if (input != undefined && input != null) {                                                                 // 1756
                search.val(input);                                                                                     // 1757
            }                                                                                                          // 1758
                                                                                                                       // 1759
            this.resultsPage = 1;                                                                                      // 1760
                                                                                                                       // 1761
            opts.query({                                                                                               // 1762
                element: opts.element,                                                                                 // 1763
                    term: search.val(),                                                                                // 1764
                    page: this.resultsPage,                                                                            // 1765
                    context: null,                                                                                     // 1766
                    matcher: opts.matcher,                                                                             // 1767
                    callback: this.bind(function (data) {                                                              // 1768
                var def; // default choice                                                                             // 1769
                                                                                                                       // 1770
                // ignore old responses                                                                                // 1771
                if (queryNumber != this.queryCount) {                                                                  // 1772
                  return;                                                                                              // 1773
                }                                                                                                      // 1774
                                                                                                                       // 1775
                // ignore a response if the select2 has been closed before it was received                             // 1776
                if (!this.opened()) {                                                                                  // 1777
                    this.search.removeClass("select2-active");                                                         // 1778
                    return;                                                                                            // 1779
                }                                                                                                      // 1780
                                                                                                                       // 1781
                // handle ajax error                                                                                   // 1782
                if(data.hasError !== undefined && checkFormatter(opts.formatAjaxError, "formatAjaxError")) {           // 1783
                    render("<li class='select2-ajax-error'>" + evaluate(opts.formatAjaxError, opts.element, data.jqXHR, data.textStatus, data.errorThrown) + "</li>");
                    return;                                                                                            // 1785
                }                                                                                                      // 1786
                                                                                                                       // 1787
                // save context, if any                                                                                // 1788
                this.context = (data.context===undefined) ? null : data.context;                                       // 1789
                // create a default choice and prepend it to the list                                                  // 1790
                if (this.opts.createSearchChoice && search.val() !== "") {                                             // 1791
                    def = this.opts.createSearchChoice.call(self, search.val(), data.results);                         // 1792
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {    // 1793
                        if ($(data.results).filter(                                                                    // 1794
                            function () {                                                                              // 1795
                                return equal(self.id(this), self.id(def));                                             // 1796
                            }).length === 0) {                                                                         // 1797
                            this.opts.createSearchChoicePosition(data.results, def);                                   // 1798
                        }                                                                                              // 1799
                    }                                                                                                  // 1800
                }                                                                                                      // 1801
                                                                                                                       // 1802
                if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, "formatNoMatches")) {            // 1803
                    render("<li class='select2-no-results'>" + evaluate(opts.formatNoMatches, opts.element, search.val()) + "</li>");
                    return;                                                                                            // 1805
                }                                                                                                      // 1806
                                                                                                                       // 1807
                results.empty();                                                                                       // 1808
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});
                                                                                                                       // 1810
                if (data.more === true && checkFormatter(opts.formatLoadMore, "formatLoadMore")) {                     // 1811
                    results.append("<li class='select2-more-results'>" + opts.escapeMarkup(evaluate(opts.formatLoadMore, opts.element, this.resultsPage)) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);                                    // 1813
                }                                                                                                      // 1814
                                                                                                                       // 1815
                this.postprocessResults(data, initial);                                                                // 1816
                                                                                                                       // 1817
                postRender();                                                                                          // 1818
                                                                                                                       // 1819
                this.opts.element.trigger({ type: "select2-loaded", items: data });                                    // 1820
            })});                                                                                                      // 1821
        },                                                                                                             // 1822
                                                                                                                       // 1823
        // abstract                                                                                                    // 1824
        cancel: function () {                                                                                          // 1825
            this.close();                                                                                              // 1826
        },                                                                                                             // 1827
                                                                                                                       // 1828
        // abstract                                                                                                    // 1829
        blur: function () {                                                                                            // 1830
            // if selectOnBlur == true, select the currently highlighted option                                        // 1831
            if (this.opts.selectOnBlur)                                                                                // 1832
                this.selectHighlighted({noFocus: true});                                                               // 1833
                                                                                                                       // 1834
            this.close();                                                                                              // 1835
            this.container.removeClass("select2-container-active");                                                    // 1836
            // synonymous to .is(':focus'), which is available in jquery >= 1.6                                        // 1837
            if (this.search[0] === document.activeElement) { this.search.blur(); }                                     // 1838
            this.clearSearch();                                                                                        // 1839
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");            // 1840
        },                                                                                                             // 1841
                                                                                                                       // 1842
        // abstract                                                                                                    // 1843
        focusSearch: function () {                                                                                     // 1844
            focus(this.search);                                                                                        // 1845
        },                                                                                                             // 1846
                                                                                                                       // 1847
        // abstract                                                                                                    // 1848
        selectHighlighted: function (options) {                                                                        // 1849
            if (this._touchMoved) {                                                                                    // 1850
              this.clearTouchMoved();                                                                                  // 1851
              return;                                                                                                  // 1852
            }                                                                                                          // 1853
            var index=this.highlight(),                                                                                // 1854
                highlighted=this.results.find(".select2-highlighted"),                                                 // 1855
                data = highlighted.closest('.select2-result').data("select2-data");                                    // 1856
                                                                                                                       // 1857
            if (data) {                                                                                                // 1858
                this.highlight(index);                                                                                 // 1859
                this.onSelect(data, options);                                                                          // 1860
            } else if (options && options.noFocus) {                                                                   // 1861
                this.close();                                                                                          // 1862
            }                                                                                                          // 1863
        },                                                                                                             // 1864
                                                                                                                       // 1865
        // abstract                                                                                                    // 1866
        getPlaceholder: function () {                                                                                  // 1867
            var placeholderOption;                                                                                     // 1868
            return this.opts.element.attr("placeholder") ||                                                            // 1869
                this.opts.element.attr("data-placeholder") || // jquery 1.4 compat                                     // 1870
                this.opts.element.data("placeholder") ||                                                               // 1871
                this.opts.placeholder ||                                                                               // 1872
                ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() : undefined);
        },                                                                                                             // 1874
                                                                                                                       // 1875
        // abstract                                                                                                    // 1876
        getPlaceholderOption: function() {                                                                             // 1877
            if (this.select) {                                                                                         // 1878
                var firstOption = this.select.children('option').first();                                              // 1879
                if (this.opts.placeholderOption !== undefined ) {                                                      // 1880
                    //Determine the placeholder option based on the specified placeholderOption setting                // 1881
                    return (this.opts.placeholderOption === "first" && firstOption) ||                                 // 1882
                           (typeof this.opts.placeholderOption === "function" && this.opts.placeholderOption(this.select));
                } else if ($.trim(firstOption.text()) === "" && firstOption.val() === "") {                            // 1884
                    //No explicit placeholder option specified, use the first if it's blank                            // 1885
                    return firstOption;                                                                                // 1886
                }                                                                                                      // 1887
            }                                                                                                          // 1888
        },                                                                                                             // 1889
                                                                                                                       // 1890
        /**                                                                                                            // 1891
         * Get the desired width for the container element.  This is                                                   // 1892
         * derived first from option `width` passed to select2, then                                                   // 1893
         * the inline 'style' on the original element, and finally                                                     // 1894
         * falls back to the jQuery calculated element width.                                                          // 1895
         */                                                                                                            // 1896
        // abstract                                                                                                    // 1897
        initContainerWidth: function () {                                                                              // 1898
            function resolveContainerWidth() {                                                                         // 1899
                var style, attrs, matches, i, l, attr;                                                                 // 1900
                                                                                                                       // 1901
                if (this.opts.width === "off") {                                                                       // 1902
                    return null;                                                                                       // 1903
                } else if (this.opts.width === "element"){                                                             // 1904
                    return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {                              // 1906
                    // check if there is inline style on the element that contains width                               // 1907
                    style = this.opts.element.attr('style');                                                           // 1908
                    if (style !== undefined) {                                                                         // 1909
                        attrs = style.split(';');                                                                      // 1910
                        for (i = 0, l = attrs.length; i < l; i = i + 1) {                                              // 1911
                            attr = attrs[i].replace(/\s/g, '');                                                        // 1912
                            matches = attr.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);     // 1913
                            if (matches !== null && matches.length >= 1)                                               // 1914
                                return matches[1];                                                                     // 1915
                        }                                                                                              // 1916
                    }                                                                                                  // 1917
                                                                                                                       // 1918
                    if (this.opts.width === "resolve") {                                                               // 1919
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css                               // 1921
                        style = this.opts.element.css('width');                                                        // 1922
                        if (style.indexOf("%") > 0) return style;                                                      // 1923
                                                                                                                       // 1924
                        // finally, fallback on the calculated width of the element                                    // 1925
                        return (this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px');
                    }                                                                                                  // 1927
                                                                                                                       // 1928
                    return null;                                                                                       // 1929
                } else if ($.isFunction(this.opts.width)) {                                                            // 1930
                    return this.opts.width();                                                                          // 1931
                } else {                                                                                               // 1932
                    return this.opts.width;                                                                            // 1933
               }                                                                                                       // 1934
            };                                                                                                         // 1935
                                                                                                                       // 1936
            var width = resolveContainerWidth.call(this);                                                              // 1937
            if (width !== null) {                                                                                      // 1938
                this.container.css("width", width);                                                                    // 1939
            }                                                                                                          // 1940
        }                                                                                                              // 1941
    });                                                                                                                // 1942
                                                                                                                       // 1943
    SingleSelect2 = clazz(AbstractSelect2, {                                                                           // 1944
                                                                                                                       // 1945
        // single                                                                                                      // 1946
                                                                                                                       // 1947
        createContainer: function () {                                                                                 // 1948
            var container = $(document.createElement("div")).attr({                                                    // 1949
                "class": "select2-container"                                                                           // 1950
            }).html([                                                                                                  // 1951
                "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>",                                  // 1952
                "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>",      // 1953
                "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>",               // 1954
                "</a>",                                                                                                // 1955
                "<label for='' class='select2-offscreen'></label>",                                                    // 1956
                "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", // 1957
                "<div class='select2-drop select2-display-none'>",                                                     // 1958
                "   <div class='select2-search'>",                                                                     // 1959
                "       <label for='' class='select2-offscreen'></label>",                                             // 1960
                "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'",
                "       aria-autocomplete='list' />",                                                                  // 1962
                "   </div>",                                                                                           // 1963
                "   <ul class='select2-results' role='listbox'>",                                                      // 1964
                "   </ul>",                                                                                            // 1965
                "</div>"].join(""));                                                                                   // 1966
            return container;                                                                                          // 1967
        },                                                                                                             // 1968
                                                                                                                       // 1969
        // single                                                                                                      // 1970
        enableInterface: function() {                                                                                  // 1971
            if (this.parent.enableInterface.apply(this, arguments)) {                                                  // 1972
                this.focusser.prop("disabled", !this.isInterfaceEnabled());                                            // 1973
            }                                                                                                          // 1974
        },                                                                                                             // 1975
                                                                                                                       // 1976
        // single                                                                                                      // 1977
        opening: function () {                                                                                         // 1978
            var el, range, len;                                                                                        // 1979
                                                                                                                       // 1980
            if (this.opts.minimumResultsForSearch >= 0) {                                                              // 1981
                this.showSearch(true);                                                                                 // 1982
            }                                                                                                          // 1983
                                                                                                                       // 1984
            this.parent.opening.apply(this, arguments);                                                                // 1985
                                                                                                                       // 1986
            if (this.showSearchInput !== false) {                                                                      // 1987
                // IE appends focusser.val() at the end of field :/ so we manually insert it at the beginning using a range
                // all other browsers handle this just fine                                                            // 1989
                                                                                                                       // 1990
                this.search.val(this.focusser.val());                                                                  // 1991
            }                                                                                                          // 1992
            if (this.opts.shouldFocusInput(this)) {                                                                    // 1993
                this.search.focus();                                                                                   // 1994
                // move the cursor to the end after focussing, otherwise it will be at the beginning and               // 1995
                // new text will appear *before* focusser.val()                                                        // 1996
                el = this.search.get(0);                                                                               // 1997
                if (el.createTextRange) {                                                                              // 1998
                    range = el.createTextRange();                                                                      // 1999
                    range.collapse(false);                                                                             // 2000
                    range.select();                                                                                    // 2001
                } else if (el.setSelectionRange) {                                                                     // 2002
                    len = this.search.val().length;                                                                    // 2003
                    el.setSelectionRange(len, len);                                                                    // 2004
                }                                                                                                      // 2005
            }                                                                                                          // 2006
                                                                                                                       // 2007
            // initializes search's value with nextSearchTerm (if defined by user)                                     // 2008
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter                           // 2009
            if(this.search.val() === "") {                                                                             // 2010
                if(this.nextSearchTerm != undefined){                                                                  // 2011
                    this.search.val(this.nextSearchTerm);                                                              // 2012
                    this.search.select();                                                                              // 2013
                }                                                                                                      // 2014
            }                                                                                                          // 2015
                                                                                                                       // 2016
            this.focusser.prop("disabled", true).val("");                                                              // 2017
            this.updateResults(true);                                                                                  // 2018
            this.opts.element.trigger($.Event("select2-open"));                                                        // 2019
        },                                                                                                             // 2020
                                                                                                                       // 2021
        // single                                                                                                      // 2022
        close: function () {                                                                                           // 2023
            if (!this.opened()) return;                                                                                // 2024
            this.parent.close.apply(this, arguments);                                                                  // 2025
                                                                                                                       // 2026
            this.focusser.prop("disabled", false);                                                                     // 2027
                                                                                                                       // 2028
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2029
                this.focusser.focus();                                                                                 // 2030
            }                                                                                                          // 2031
        },                                                                                                             // 2032
                                                                                                                       // 2033
        // single                                                                                                      // 2034
        focus: function () {                                                                                           // 2035
            if (this.opened()) {                                                                                       // 2036
                this.close();                                                                                          // 2037
            } else {                                                                                                   // 2038
                this.focusser.prop("disabled", false);                                                                 // 2039
                if (this.opts.shouldFocusInput(this)) {                                                                // 2040
                    this.focusser.focus();                                                                             // 2041
                }                                                                                                      // 2042
            }                                                                                                          // 2043
        },                                                                                                             // 2044
                                                                                                                       // 2045
        // single                                                                                                      // 2046
        isFocused: function () {                                                                                       // 2047
            return this.container.hasClass("select2-container-active");                                                // 2048
        },                                                                                                             // 2049
                                                                                                                       // 2050
        // single                                                                                                      // 2051
        cancel: function () {                                                                                          // 2052
            this.parent.cancel.apply(this, arguments);                                                                 // 2053
            this.focusser.prop("disabled", false);                                                                     // 2054
                                                                                                                       // 2055
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2056
                this.focusser.focus();                                                                                 // 2057
            }                                                                                                          // 2058
        },                                                                                                             // 2059
                                                                                                                       // 2060
        // single                                                                                                      // 2061
        destroy: function() {                                                                                          // 2062
            $("label[for='" + this.focusser.attr('id') + "']")                                                         // 2063
                .attr('for', this.opts.element.attr("id"));                                                            // 2064
            this.parent.destroy.apply(this, arguments);                                                                // 2065
                                                                                                                       // 2066
            cleanupJQueryElements.call(this,                                                                           // 2067
                "selection",                                                                                           // 2068
                "focusser"                                                                                             // 2069
            );                                                                                                         // 2070
        },                                                                                                             // 2071
                                                                                                                       // 2072
        // single                                                                                                      // 2073
        initContainer: function () {                                                                                   // 2074
                                                                                                                       // 2075
            var selection,                                                                                             // 2076
                container = this.container,                                                                            // 2077
                dropdown = this.dropdown,                                                                              // 2078
                idSuffix = nextUid(),                                                                                  // 2079
                elementLabel;                                                                                          // 2080
                                                                                                                       // 2081
            if (this.opts.minimumResultsForSearch < 0) {                                                               // 2082
                this.showSearch(false);                                                                                // 2083
            } else {                                                                                                   // 2084
                this.showSearch(true);                                                                                 // 2085
            }                                                                                                          // 2086
                                                                                                                       // 2087
            this.selection = selection = container.find(".select2-choice");                                            // 2088
                                                                                                                       // 2089
            this.focusser = container.find(".select2-focusser");                                                       // 2090
                                                                                                                       // 2091
            // add aria associations                                                                                   // 2092
            selection.find(".select2-chosen").attr("id", "select2-chosen-"+idSuffix);                                  // 2093
            this.focusser.attr("aria-labelledby", "select2-chosen-"+idSuffix);                                         // 2094
            this.results.attr("id", "select2-results-"+idSuffix);                                                      // 2095
            this.search.attr("aria-owns", "select2-results-"+idSuffix);                                                // 2096
                                                                                                                       // 2097
            // rewrite labels from original element to focusser                                                        // 2098
            this.focusser.attr("id", "s2id_autogen"+idSuffix);                                                         // 2099
                                                                                                                       // 2100
            elementLabel = $("label[for='" + this.opts.element.attr("id") + "']");                                     // 2101
                                                                                                                       // 2102
            this.focusser.prev()                                                                                       // 2103
                .text(elementLabel.text())                                                                             // 2104
                .attr('for', this.focusser.attr('id'));                                                                // 2105
                                                                                                                       // 2106
            // Ensure the original element retains an accessible name                                                  // 2107
            var originalTitle = this.opts.element.attr("title");                                                       // 2108
            this.opts.element.attr("title", (originalTitle || elementLabel.text()));                                   // 2109
                                                                                                                       // 2110
            this.focusser.attr("tabindex", this.elementTabIndex);                                                      // 2111
                                                                                                                       // 2112
            // write label for search field using the label from the focusser element                                  // 2113
            this.search.attr("id", this.focusser.attr('id') + '_search');                                              // 2114
                                                                                                                       // 2115
            this.search.prev()                                                                                         // 2116
                .text($("label[for='" + this.focusser.attr('id') + "']").text())                                       // 2117
                .attr('for', this.search.attr('id'));                                                                  // 2118
                                                                                                                       // 2119
            this.search.on("keydown", this.bind(function (e) {                                                         // 2120
                if (!this.isInterfaceEnabled()) return;                                                                // 2121
                                                                                                                       // 2122
                // filter 229 keyCodes (input method editor is processing key input)                                   // 2123
                if (229 == e.keyCode) return;                                                                          // 2124
                                                                                                                       // 2125
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {                                            // 2126
                    // prevent the page from scrolling                                                                 // 2127
                    killEvent(e);                                                                                      // 2128
                    return;                                                                                            // 2129
                }                                                                                                      // 2130
                                                                                                                       // 2131
                switch (e.which) {                                                                                     // 2132
                    case KEY.UP:                                                                                       // 2133
                    case KEY.DOWN:                                                                                     // 2134
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);                                             // 2135
                        killEvent(e);                                                                                  // 2136
                        return;                                                                                        // 2137
                    case KEY.ENTER:                                                                                    // 2138
                        this.selectHighlighted();                                                                      // 2139
                        killEvent(e);                                                                                  // 2140
                        return;                                                                                        // 2141
                    case KEY.TAB:                                                                                      // 2142
                        this.selectHighlighted({noFocus: true});                                                       // 2143
                        return;                                                                                        // 2144
                    case KEY.ESC:                                                                                      // 2145
                        this.cancel(e);                                                                                // 2146
                        killEvent(e);                                                                                  // 2147
                        return;                                                                                        // 2148
                }                                                                                                      // 2149
            }));                                                                                                       // 2150
                                                                                                                       // 2151
            this.search.on("blur", this.bind(function(e) {                                                             // 2152
                // a workaround for chrome to keep the search field focussed when the scroll bar is used to scroll the dropdown.
                // without this the search field loses focus which is annoying                                         // 2154
                if (document.activeElement === this.body.get(0)) {                                                     // 2155
                    window.setTimeout(this.bind(function() {                                                           // 2156
                        if (this.opened()) {                                                                           // 2157
                            this.search.focus();                                                                       // 2158
                        }                                                                                              // 2159
                    }), 0);                                                                                            // 2160
                }                                                                                                      // 2161
            }));                                                                                                       // 2162
                                                                                                                       // 2163
            this.focusser.on("keydown", this.bind(function (e) {                                                       // 2164
                if (!this.isInterfaceEnabled()) return;                                                                // 2165
                                                                                                                       // 2166
                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {          // 2167
                    return;                                                                                            // 2168
                }                                                                                                      // 2169
                                                                                                                       // 2170
                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {                                        // 2171
                    killEvent(e);                                                                                      // 2172
                    return;                                                                                            // 2173
                }                                                                                                      // 2174
                                                                                                                       // 2175
                if (e.which == KEY.DOWN || e.which == KEY.UP                                                           // 2176
                    || (e.which == KEY.ENTER && this.opts.openOnEnter)) {                                              // 2177
                                                                                                                       // 2178
                    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;                                      // 2179
                                                                                                                       // 2180
                    this.open();                                                                                       // 2181
                    killEvent(e);                                                                                      // 2182
                    return;                                                                                            // 2183
                }                                                                                                      // 2184
                                                                                                                       // 2185
                if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {                                               // 2186
                    if (this.opts.allowClear) {                                                                        // 2187
                        this.clear();                                                                                  // 2188
                    }                                                                                                  // 2189
                    killEvent(e);                                                                                      // 2190
                    return;                                                                                            // 2191
                }                                                                                                      // 2192
            }));                                                                                                       // 2193
                                                                                                                       // 2194
                                                                                                                       // 2195
            installKeyUpChangeEvent(this.focusser);                                                                    // 2196
            this.focusser.on("keyup-change input", this.bind(function(e) {                                             // 2197
                if (this.opts.minimumResultsForSearch >= 0) {                                                          // 2198
                    e.stopPropagation();                                                                               // 2199
                    if (this.opened()) return;                                                                         // 2200
                    this.open();                                                                                       // 2201
                }                                                                                                      // 2202
            }));                                                                                                       // 2203
                                                                                                                       // 2204
            selection.on("mousedown touchstart", "abbr", this.bind(function (e) {                                      // 2205
                if (!this.isInterfaceEnabled()) return;                                                                // 2206
                this.clear();                                                                                          // 2207
                killEventImmediately(e);                                                                               // 2208
                this.close();                                                                                          // 2209
                this.selection.focus();                                                                                // 2210
            }));                                                                                                       // 2211
                                                                                                                       // 2212
            selection.on("mousedown touchstart", this.bind(function (e) {                                              // 2213
                // Prevent IE from generating a click event on the body                                                // 2214
                reinsertElement(selection);                                                                            // 2215
                                                                                                                       // 2216
                if (!this.container.hasClass("select2-container-active")) {                                            // 2217
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2218
                }                                                                                                      // 2219
                                                                                                                       // 2220
                if (this.opened()) {                                                                                   // 2221
                    this.close();                                                                                      // 2222
                } else if (this.isInterfaceEnabled()) {                                                                // 2223
                    this.open();                                                                                       // 2224
                }                                                                                                      // 2225
                                                                                                                       // 2226
                killEvent(e);                                                                                          // 2227
            }));                                                                                                       // 2228
                                                                                                                       // 2229
            dropdown.on("mousedown touchstart", this.bind(function() {                                                 // 2230
                if (this.opts.shouldFocusInput(this)) {                                                                // 2231
                    this.search.focus();                                                                               // 2232
                }                                                                                                      // 2233
            }));                                                                                                       // 2234
                                                                                                                       // 2235
            selection.on("focus", this.bind(function(e) {                                                              // 2236
                killEvent(e);                                                                                          // 2237
            }));                                                                                                       // 2238
                                                                                                                       // 2239
            this.focusser.on("focus", this.bind(function(){                                                            // 2240
                if (!this.container.hasClass("select2-container-active")) {                                            // 2241
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2242
                }                                                                                                      // 2243
                this.container.addClass("select2-container-active");                                                   // 2244
            })).on("blur", this.bind(function() {                                                                      // 2245
                if (!this.opened()) {                                                                                  // 2246
                    this.container.removeClass("select2-container-active");                                            // 2247
                    this.opts.element.trigger($.Event("select2-blur"));                                                // 2248
                }                                                                                                      // 2249
            }));                                                                                                       // 2250
            this.search.on("focus", this.bind(function(){                                                              // 2251
                if (!this.container.hasClass("select2-container-active")) {                                            // 2252
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2253
                }                                                                                                      // 2254
                this.container.addClass("select2-container-active");                                                   // 2255
            }));                                                                                                       // 2256
                                                                                                                       // 2257
            this.initContainerWidth();                                                                                 // 2258
            this.opts.element.addClass("select2-offscreen");                                                           // 2259
            this.setPlaceholder();                                                                                     // 2260
                                                                                                                       // 2261
        },                                                                                                             // 2262
                                                                                                                       // 2263
        // single                                                                                                      // 2264
        clear: function(triggerChange) {                                                                               // 2265
            var data=this.selection.data("select2-data");                                                              // 2266
            if (data) { // guard against queued quick consecutive clicks                                               // 2267
                var evt = $.Event("select2-clearing");                                                                 // 2268
                this.opts.element.trigger(evt);                                                                        // 2269
                if (evt.isDefaultPrevented()) {                                                                        // 2270
                    return;                                                                                            // 2271
                }                                                                                                      // 2272
                var placeholderOption = this.getPlaceholderOption();                                                   // 2273
                this.opts.element.val(placeholderOption ? placeholderOption.val() : "");                               // 2274
                this.selection.find(".select2-chosen").empty();                                                        // 2275
                this.selection.removeData("select2-data");                                                             // 2276
                this.setPlaceholder();                                                                                 // 2277
                                                                                                                       // 2278
                if (triggerChange !== false){                                                                          // 2279
                    this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });          // 2280
                    this.triggerChange({removed:data});                                                                // 2281
                }                                                                                                      // 2282
            }                                                                                                          // 2283
        },                                                                                                             // 2284
                                                                                                                       // 2285
        /**                                                                                                            // 2286
         * Sets selection based on source element's value                                                              // 2287
         */                                                                                                            // 2288
        // single                                                                                                      // 2289
        initSelection: function () {                                                                                   // 2290
            var selected;                                                                                              // 2291
            if (this.isPlaceholderOptionSelected()) {                                                                  // 2292
                this.updateSelection(null);                                                                            // 2293
                this.close();                                                                                          // 2294
                this.setPlaceholder();                                                                                 // 2295
            } else {                                                                                                   // 2296
                var self = this;                                                                                       // 2297
                this.opts.initSelection.call(null, this.opts.element, function(selected){                              // 2298
                    if (selected !== undefined && selected !== null) {                                                 // 2299
                        self.updateSelection(selected);                                                                // 2300
                        self.close();                                                                                  // 2301
                        self.setPlaceholder();                                                                         // 2302
                        self.nextSearchTerm = self.opts.nextSearchTerm(selected, self.search.val());                   // 2303
                    }                                                                                                  // 2304
                });                                                                                                    // 2305
            }                                                                                                          // 2306
        },                                                                                                             // 2307
                                                                                                                       // 2308
        isPlaceholderOptionSelected: function() {                                                                      // 2309
            var placeholderOption;                                                                                     // 2310
            if (this.getPlaceholder() === undefined) return false; // no placeholder specified so no option should be considered
            return ((placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.prop("selected"))
                || (this.opts.element.val() === "")                                                                    // 2313
                || (this.opts.element.val() === undefined)                                                             // 2314
                || (this.opts.element.val() === null);                                                                 // 2315
        },                                                                                                             // 2316
                                                                                                                       // 2317
        // single                                                                                                      // 2318
        prepareOpts: function () {                                                                                     // 2319
            var opts = this.parent.prepareOpts.apply(this, arguments),                                                 // 2320
                self=this;                                                                                             // 2321
                                                                                                                       // 2322
            if (opts.element.get(0).tagName.toLowerCase() === "select") {                                              // 2323
                // install the selection initializer                                                                   // 2324
                opts.initSelection = function (element, callback) {                                                    // 2325
                    var selected = element.find("option").filter(function() { return this.selected && !this.disabled });
                    // a single select box always has a value, no need to null check 'selected'                        // 2327
                    callback(self.optionToData(selected));                                                             // 2328
                };                                                                                                     // 2329
            } else if ("data" in opts) {                                                                               // 2330
                // install default initSelection when applied to hidden input and data is local                        // 2331
                opts.initSelection = opts.initSelection || function (element, callback) {                              // 2332
                    var id = element.val();                                                                            // 2333
                    //search in data by id, storing the actual matching item                                           // 2334
                    var match = null;                                                                                  // 2335
                    opts.query({                                                                                       // 2336
                        matcher: function(term, text, el){                                                             // 2337
                            var is_match = equal(id, opts.id(el));                                                     // 2338
                            if (is_match) {                                                                            // 2339
                                match = el;                                                                            // 2340
                            }                                                                                          // 2341
                            return is_match;                                                                           // 2342
                        },                                                                                             // 2343
                        callback: !$.isFunction(callback) ? $.noop : function() {                                      // 2344
                            callback(match);                                                                           // 2345
                        }                                                                                              // 2346
                    });                                                                                                // 2347
                };                                                                                                     // 2348
            }                                                                                                          // 2349
                                                                                                                       // 2350
            return opts;                                                                                               // 2351
        },                                                                                                             // 2352
                                                                                                                       // 2353
        // single                                                                                                      // 2354
        getPlaceholder: function() {                                                                                   // 2355
            // if a placeholder is specified on a single select without a valid placeholder option ignore it           // 2356
            if (this.select) {                                                                                         // 2357
                if (this.getPlaceholderOption() === undefined) {                                                       // 2358
                    return undefined;                                                                                  // 2359
                }                                                                                                      // 2360
            }                                                                                                          // 2361
                                                                                                                       // 2362
            return this.parent.getPlaceholder.apply(this, arguments);                                                  // 2363
        },                                                                                                             // 2364
                                                                                                                       // 2365
        // single                                                                                                      // 2366
        setPlaceholder: function () {                                                                                  // 2367
            var placeholder = this.getPlaceholder();                                                                   // 2368
                                                                                                                       // 2369
            if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {                                     // 2370
                                                                                                                       // 2371
                // check for a placeholder option if attached to a select                                              // 2372
                if (this.select && this.getPlaceholderOption() === undefined) return;                                  // 2373
                                                                                                                       // 2374
                this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(placeholder));                      // 2375
                                                                                                                       // 2376
                this.selection.addClass("select2-default");                                                            // 2377
                                                                                                                       // 2378
                this.container.removeClass("select2-allowclear");                                                      // 2379
            }                                                                                                          // 2380
        },                                                                                                             // 2381
                                                                                                                       // 2382
        // single                                                                                                      // 2383
        postprocessResults: function (data, initial, noHighlightUpdate) {                                              // 2384
            var selected = 0, self = this, showSearchInput = true;                                                     // 2385
                                                                                                                       // 2386
            // find the selected element in the result list                                                            // 2387
                                                                                                                       // 2388
            this.findHighlightableChoices().each2(function (i, elm) {                                                  // 2389
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {                               // 2390
                    selected = i;                                                                                      // 2391
                    return false;                                                                                      // 2392
                }                                                                                                      // 2393
            });                                                                                                        // 2394
                                                                                                                       // 2395
            // and highlight it                                                                                        // 2396
            if (noHighlightUpdate !== false) {                                                                         // 2397
                if (initial === true && selected >= 0) {                                                               // 2398
                    this.highlight(selected);                                                                          // 2399
                } else {                                                                                               // 2400
                    this.highlight(0);                                                                                 // 2401
                }                                                                                                      // 2402
            }                                                                                                          // 2403
                                                                                                                       // 2404
            // hide the search box if this is the first we got the results and there are enough of them for search     // 2405
                                                                                                                       // 2406
            if (initial === true) {                                                                                    // 2407
                var min = this.opts.minimumResultsForSearch;                                                           // 2408
                if (min >= 0) {                                                                                        // 2409
                    this.showSearch(countResults(data.results) >= min);                                                // 2410
                }                                                                                                      // 2411
            }                                                                                                          // 2412
        },                                                                                                             // 2413
                                                                                                                       // 2414
        // single                                                                                                      // 2415
        showSearch: function(showSearchInput) {                                                                        // 2416
            if (this.showSearchInput === showSearchInput) return;                                                      // 2417
                                                                                                                       // 2418
            this.showSearchInput = showSearchInput;                                                                    // 2419
                                                                                                                       // 2420
            this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput);              // 2421
            this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput);                  // 2422
            //add "select2-with-searchbox" to the container if search box is shown                                     // 2423
            $(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput);                   // 2424
        },                                                                                                             // 2425
                                                                                                                       // 2426
        // single                                                                                                      // 2427
        onSelect: function (data, options) {                                                                           // 2428
                                                                                                                       // 2429
            if (!this.triggerSelect(data)) { return; }                                                                 // 2430
                                                                                                                       // 2431
            var old = this.opts.element.val(),                                                                         // 2432
                oldData = this.data();                                                                                 // 2433
                                                                                                                       // 2434
            this.opts.element.val(this.id(data));                                                                      // 2435
            this.updateSelection(data);                                                                                // 2436
                                                                                                                       // 2437
            this.opts.element.trigger({ type: "select2-selected", val: this.id(data), choice: data });                 // 2438
                                                                                                                       // 2439
            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());                                   // 2440
            this.close();                                                                                              // 2441
                                                                                                                       // 2442
            if ((!options || !options.noFocus) && this.opts.shouldFocusInput(this)) {                                  // 2443
                this.focusser.focus();                                                                                 // 2444
            }                                                                                                          // 2445
                                                                                                                       // 2446
            if (!equal(old, this.id(data))) {                                                                          // 2447
                this.triggerChange({ added: data, removed: oldData });                                                 // 2448
            }                                                                                                          // 2449
        },                                                                                                             // 2450
                                                                                                                       // 2451
        // single                                                                                                      // 2452
        updateSelection: function (data) {                                                                             // 2453
                                                                                                                       // 2454
            var container=this.selection.find(".select2-chosen"), formatted, cssClass;                                 // 2455
                                                                                                                       // 2456
            this.selection.data("select2-data", data);                                                                 // 2457
                                                                                                                       // 2458
            container.empty();                                                                                         // 2459
            if (data !== null) {                                                                                       // 2460
                formatted=this.opts.formatSelection(data, container, this.opts.escapeMarkup);                          // 2461
            }                                                                                                          // 2462
            if (formatted !== undefined) {                                                                             // 2463
                container.append(formatted);                                                                           // 2464
            }                                                                                                          // 2465
            cssClass=this.opts.formatSelectionCssClass(data, container);                                               // 2466
            if (cssClass !== undefined) {                                                                              // 2467
                container.addClass(cssClass);                                                                          // 2468
            }                                                                                                          // 2469
                                                                                                                       // 2470
            this.selection.removeClass("select2-default");                                                             // 2471
                                                                                                                       // 2472
            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {                                         // 2473
                this.container.addClass("select2-allowclear");                                                         // 2474
            }                                                                                                          // 2475
        },                                                                                                             // 2476
                                                                                                                       // 2477
        // single                                                                                                      // 2478
        val: function () {                                                                                             // 2479
            var val,                                                                                                   // 2480
                triggerChange = false,                                                                                 // 2481
                data = null,                                                                                           // 2482
                self = this,                                                                                           // 2483
                oldData = this.data();                                                                                 // 2484
                                                                                                                       // 2485
            if (arguments.length === 0) {                                                                              // 2486
                return this.opts.element.val();                                                                        // 2487
            }                                                                                                          // 2488
                                                                                                                       // 2489
            val = arguments[0];                                                                                        // 2490
                                                                                                                       // 2491
            if (arguments.length > 1) {                                                                                // 2492
                triggerChange = arguments[1];                                                                          // 2493
            }                                                                                                          // 2494
                                                                                                                       // 2495
            if (this.select) {                                                                                         // 2496
                this.select                                                                                            // 2497
                    .val(val)                                                                                          // 2498
                    .find("option").filter(function() { return this.selected }).each2(function (i, elm) {              // 2499
                        data = self.optionToData(elm);                                                                 // 2500
                        return false;                                                                                  // 2501
                    });                                                                                                // 2502
                this.updateSelection(data);                                                                            // 2503
                this.setPlaceholder();                                                                                 // 2504
                if (triggerChange) {                                                                                   // 2505
                    this.triggerChange({added: data, removed:oldData});                                                // 2506
                }                                                                                                      // 2507
            } else {                                                                                                   // 2508
                // val is an id. !val is true for [undefined,null,'',0] - 0 is legal                                   // 2509
                if (!val && val !== 0) {                                                                               // 2510
                    this.clear(triggerChange);                                                                         // 2511
                    return;                                                                                            // 2512
                }                                                                                                      // 2513
                if (this.opts.initSelection === undefined) {                                                           // 2514
                    throw new Error("cannot call val() if initSelection() is not defined");                            // 2515
                }                                                                                                      // 2516
                this.opts.element.val(val);                                                                            // 2517
                this.opts.initSelection(this.opts.element, function(data){                                             // 2518
                    self.opts.element.val(!data ? "" : self.id(data));                                                 // 2519
                    self.updateSelection(data);                                                                        // 2520
                    self.setPlaceholder();                                                                             // 2521
                    if (triggerChange) {                                                                               // 2522
                        self.triggerChange({added: data, removed:oldData});                                            // 2523
                    }                                                                                                  // 2524
                });                                                                                                    // 2525
            }                                                                                                          // 2526
        },                                                                                                             // 2527
                                                                                                                       // 2528
        // single                                                                                                      // 2529
        clearSearch: function () {                                                                                     // 2530
            this.search.val("");                                                                                       // 2531
            this.focusser.val("");                                                                                     // 2532
        },                                                                                                             // 2533
                                                                                                                       // 2534
        // single                                                                                                      // 2535
        data: function(value) {                                                                                        // 2536
            var data,                                                                                                  // 2537
                triggerChange = false;                                                                                 // 2538
                                                                                                                       // 2539
            if (arguments.length === 0) {                                                                              // 2540
                data = this.selection.data("select2-data");                                                            // 2541
                if (data == undefined) data = null;                                                                    // 2542
                return data;                                                                                           // 2543
            } else {                                                                                                   // 2544
                if (arguments.length > 1) {                                                                            // 2545
                    triggerChange = arguments[1];                                                                      // 2546
                }                                                                                                      // 2547
                if (!value) {                                                                                          // 2548
                    this.clear(triggerChange);                                                                         // 2549
                } else {                                                                                               // 2550
                    data = this.data();                                                                                // 2551
                    this.opts.element.val(!value ? "" : this.id(value));                                               // 2552
                    this.updateSelection(value);                                                                       // 2553
                    if (triggerChange) {                                                                               // 2554
                        this.triggerChange({added: value, removed:data});                                              // 2555
                    }                                                                                                  // 2556
                }                                                                                                      // 2557
            }                                                                                                          // 2558
        }                                                                                                              // 2559
    });                                                                                                                // 2560
                                                                                                                       // 2561
    MultiSelect2 = clazz(AbstractSelect2, {                                                                            // 2562
                                                                                                                       // 2563
        // multi                                                                                                       // 2564
        createContainer: function () {                                                                                 // 2565
            var container = $(document.createElement("div")).attr({                                                    // 2566
                "class": "select2-container select2-container-multi"                                                   // 2567
            }).html([                                                                                                  // 2568
                "<ul class='select2-choices'>",                                                                        // 2569
                "  <li class='select2-search-field'>",                                                                 // 2570
                "    <label for='' class='select2-offscreen'></label>",                                                // 2571
                "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                "  </li>",                                                                                             // 2573
                "</ul>",                                                                                               // 2574
                "<div class='select2-drop select2-drop-multi select2-display-none'>",                                  // 2575
                "   <ul class='select2-results'>",                                                                     // 2576
                "   </ul>",                                                                                            // 2577
                "</div>"].join(""));                                                                                   // 2578
            return container;                                                                                          // 2579
        },                                                                                                             // 2580
                                                                                                                       // 2581
        // multi                                                                                                       // 2582
        prepareOpts: function () {                                                                                     // 2583
            var opts = this.parent.prepareOpts.apply(this, arguments),                                                 // 2584
                self=this;                                                                                             // 2585
                                                                                                                       // 2586
            // TODO validate placeholder is a string if specified                                                      // 2587
                                                                                                                       // 2588
            if (opts.element.get(0).tagName.toLowerCase() === "select") {                                              // 2589
                // install the selection initializer                                                                   // 2590
                opts.initSelection = function (element, callback) {                                                    // 2591
                                                                                                                       // 2592
                    var data = [];                                                                                     // 2593
                                                                                                                       // 2594
                    element.find("option").filter(function() { return this.selected && !this.disabled }).each2(function (i, elm) {
                        data.push(self.optionToData(elm));                                                             // 2596
                    });                                                                                                // 2597
                    callback(data);                                                                                    // 2598
                };                                                                                                     // 2599
            } else if ("data" in opts) {                                                                               // 2600
                // install default initSelection when applied to hidden input and data is local                        // 2601
                opts.initSelection = opts.initSelection || function (element, callback) {                              // 2602
                    var ids = splitVal(element.val(), opts.separator);                                                 // 2603
                    //search in data by array of ids, storing matching items in a list                                 // 2604
                    var matches = [];                                                                                  // 2605
                    opts.query({                                                                                       // 2606
                        matcher: function(term, text, el){                                                             // 2607
                            var is_match = $.grep(ids, function(id) {                                                  // 2608
                                return equal(id, opts.id(el));                                                         // 2609
                            }).length;                                                                                 // 2610
                            if (is_match) {                                                                            // 2611
                                matches.push(el);                                                                      // 2612
                            }                                                                                          // 2613
                            return is_match;                                                                           // 2614
                        },                                                                                             // 2615
                        callback: !$.isFunction(callback) ? $.noop : function() {                                      // 2616
                            // reorder matches based on the order they appear in the ids array because right now       // 2617
                            // they are in the order in which they appear in data array                                // 2618
                            var ordered = [];                                                                          // 2619
                            for (var i = 0; i < ids.length; i++) {                                                     // 2620
                                var id = ids[i];                                                                       // 2621
                                for (var j = 0; j < matches.length; j++) {                                             // 2622
                                    var match = matches[j];                                                            // 2623
                                    if (equal(id, opts.id(match))) {                                                   // 2624
                                        ordered.push(match);                                                           // 2625
                                        matches.splice(j, 1);                                                          // 2626
                                        break;                                                                         // 2627
                                    }                                                                                  // 2628
                                }                                                                                      // 2629
                            }                                                                                          // 2630
                            callback(ordered);                                                                         // 2631
                        }                                                                                              // 2632
                    });                                                                                                // 2633
                };                                                                                                     // 2634
            }                                                                                                          // 2635
                                                                                                                       // 2636
            return opts;                                                                                               // 2637
        },                                                                                                             // 2638
                                                                                                                       // 2639
        // multi                                                                                                       // 2640
        selectChoice: function (choice) {                                                                              // 2641
                                                                                                                       // 2642
            var selected = this.container.find(".select2-search-choice-focus");                                        // 2643
            if (selected.length && choice && choice[0] == selected[0]) {                                               // 2644
                                                                                                                       // 2645
            } else {                                                                                                   // 2646
                if (selected.length) {                                                                                 // 2647
                    this.opts.element.trigger("choice-deselected", selected);                                          // 2648
                }                                                                                                      // 2649
                selected.removeClass("select2-search-choice-focus");                                                   // 2650
                if (choice && choice.length) {                                                                         // 2651
                    this.close();                                                                                      // 2652
                    choice.addClass("select2-search-choice-focus");                                                    // 2653
                    this.opts.element.trigger("choice-selected", choice);                                              // 2654
                }                                                                                                      // 2655
            }                                                                                                          // 2656
        },                                                                                                             // 2657
                                                                                                                       // 2658
        // multi                                                                                                       // 2659
        destroy: function() {                                                                                          // 2660
            $("label[for='" + this.search.attr('id') + "']")                                                           // 2661
                .attr('for', this.opts.element.attr("id"));                                                            // 2662
            this.parent.destroy.apply(this, arguments);                                                                // 2663
                                                                                                                       // 2664
            cleanupJQueryElements.call(this,                                                                           // 2665
                "searchContainer",                                                                                     // 2666
                "selection"                                                                                            // 2667
            );                                                                                                         // 2668
        },                                                                                                             // 2669
                                                                                                                       // 2670
        // multi                                                                                                       // 2671
        initContainer: function () {                                                                                   // 2672
                                                                                                                       // 2673
            var selector = ".select2-choices", selection;                                                              // 2674
                                                                                                                       // 2675
            this.searchContainer = this.container.find(".select2-search-field");                                       // 2676
            this.selection = selection = this.container.find(selector);                                                // 2677
                                                                                                                       // 2678
            var _this = this;                                                                                          // 2679
            this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function (e) {                   // 2680
                //killEvent(e);                                                                                        // 2681
                _this.search[0].focus();                                                                               // 2682
                _this.selectChoice($(this));                                                                           // 2683
            });                                                                                                        // 2684
                                                                                                                       // 2685
            // rewrite labels from original element to focusser                                                        // 2686
            this.search.attr("id", "s2id_autogen"+nextUid());                                                          // 2687
                                                                                                                       // 2688
            this.search.prev()                                                                                         // 2689
                .text($("label[for='" + this.opts.element.attr("id") + "']").text())                                   // 2690
                .attr('for', this.search.attr('id'));                                                                  // 2691
                                                                                                                       // 2692
            this.search.on("input paste", this.bind(function() {                                                       // 2693
                if (this.search.attr('placeholder') && this.search.val().length == 0) return;                          // 2694
                if (!this.isInterfaceEnabled()) return;                                                                // 2695
                if (!this.opened()) {                                                                                  // 2696
                    this.open();                                                                                       // 2697
                }                                                                                                      // 2698
            }));                                                                                                       // 2699
                                                                                                                       // 2700
            this.search.attr("tabindex", this.elementTabIndex);                                                        // 2701
                                                                                                                       // 2702
            this.keydowns = 0;                                                                                         // 2703
            this.search.on("keydown", this.bind(function (e) {                                                         // 2704
                if (!this.isInterfaceEnabled()) return;                                                                // 2705
                                                                                                                       // 2706
                ++this.keydowns;                                                                                       // 2707
                var selected = selection.find(".select2-search-choice-focus");                                         // 2708
                var prev = selected.prev(".select2-search-choice:not(.select2-locked)");                               // 2709
                var next = selected.next(".select2-search-choice:not(.select2-locked)");                               // 2710
                var pos = getCursorInfo(this.search);                                                                  // 2711
                                                                                                                       // 2712
                if (selected.length &&                                                                                 // 2713
                    (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
                    var selectedChoice = selected;                                                                     // 2715
                    if (e.which == KEY.LEFT && prev.length) {                                                          // 2716
                        selectedChoice = prev;                                                                         // 2717
                    }                                                                                                  // 2718
                    else if (e.which == KEY.RIGHT) {                                                                   // 2719
                        selectedChoice = next.length ? next : null;                                                    // 2720
                    }                                                                                                  // 2721
                    else if (e.which === KEY.BACKSPACE) {                                                              // 2722
                        if (this.unselect(selected.first())) {                                                         // 2723
                            this.search.width(10);                                                                     // 2724
                            selectedChoice = prev.length ? prev : next;                                                // 2725
                        }                                                                                              // 2726
                    } else if (e.which == KEY.DELETE) {                                                                // 2727
                        if (this.unselect(selected.first())) {                                                         // 2728
                            this.search.width(10);                                                                     // 2729
                            selectedChoice = next.length ? next : null;                                                // 2730
                        }                                                                                              // 2731
                    } else if (e.which == KEY.ENTER) {                                                                 // 2732
                        selectedChoice = null;                                                                         // 2733
                    }                                                                                                  // 2734
                                                                                                                       // 2735
                    this.selectChoice(selectedChoice);                                                                 // 2736
                    killEvent(e);                                                                                      // 2737
                    if (!selectedChoice || !selectedChoice.length) {                                                   // 2738
                        this.open();                                                                                   // 2739
                    }                                                                                                  // 2740
                    return;                                                                                            // 2741
                } else if (((e.which === KEY.BACKSPACE && this.keydowns == 1)                                          // 2742
                    || e.which == KEY.LEFT) && (pos.offset == 0 && !pos.length)) {                                     // 2743
                                                                                                                       // 2744
                    this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last());           // 2745
                    killEvent(e);                                                                                      // 2746
                    return;                                                                                            // 2747
                } else {                                                                                               // 2748
                    this.selectChoice(null);                                                                           // 2749
                }                                                                                                      // 2750
                                                                                                                       // 2751
                if (this.opened()) {                                                                                   // 2752
                    switch (e.which) {                                                                                 // 2753
                    case KEY.UP:                                                                                       // 2754
                    case KEY.DOWN:                                                                                     // 2755
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);                                             // 2756
                        killEvent(e);                                                                                  // 2757
                        return;                                                                                        // 2758
                    case KEY.ENTER:                                                                                    // 2759
                        this.selectHighlighted();                                                                      // 2760
                        killEvent(e);                                                                                  // 2761
                        return;                                                                                        // 2762
                    case KEY.TAB:                                                                                      // 2763
                        this.selectHighlighted({noFocus:true});                                                        // 2764
                        this.close();                                                                                  // 2765
                        return;                                                                                        // 2766
                    case KEY.ESC:                                                                                      // 2767
                        this.cancel(e);                                                                                // 2768
                        killEvent(e);                                                                                  // 2769
                        return;                                                                                        // 2770
                    }                                                                                                  // 2771
                }                                                                                                      // 2772
                                                                                                                       // 2773
                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)                                    // 2774
                 || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {                                                // 2775
                    return;                                                                                            // 2776
                }                                                                                                      // 2777
                                                                                                                       // 2778
                if (e.which === KEY.ENTER) {                                                                           // 2779
                    if (this.opts.openOnEnter === false) {                                                             // 2780
                        return;                                                                                        // 2781
                    } else if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {                                     // 2782
                        return;                                                                                        // 2783
                    }                                                                                                  // 2784
                }                                                                                                      // 2785
                                                                                                                       // 2786
                this.open();                                                                                           // 2787
                                                                                                                       // 2788
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {                                            // 2789
                    // prevent the page from scrolling                                                                 // 2790
                    killEvent(e);                                                                                      // 2791
                }                                                                                                      // 2792
                                                                                                                       // 2793
                if (e.which === KEY.ENTER) {                                                                           // 2794
                    // prevent form from being submitted                                                               // 2795
                    killEvent(e);                                                                                      // 2796
                }                                                                                                      // 2797
                                                                                                                       // 2798
            }));                                                                                                       // 2799
                                                                                                                       // 2800
            this.search.on("keyup", this.bind(function (e) {                                                           // 2801
                this.keydowns = 0;                                                                                     // 2802
                this.resizeSearch();                                                                                   // 2803
            })                                                                                                         // 2804
            );                                                                                                         // 2805
                                                                                                                       // 2806
            this.search.on("blur", this.bind(function(e) {                                                             // 2807
                this.container.removeClass("select2-container-active");                                                // 2808
                this.search.removeClass("select2-focused");                                                            // 2809
                this.selectChoice(null);                                                                               // 2810
                if (!this.opened()) this.clearSearch();                                                                // 2811
                e.stopImmediatePropagation();                                                                          // 2812
                this.opts.element.trigger($.Event("select2-blur"));                                                    // 2813
            }));                                                                                                       // 2814
                                                                                                                       // 2815
            this.container.on("click", selector, this.bind(function (e) {                                              // 2816
                if (!this.isInterfaceEnabled()) return;                                                                // 2817
                if ($(e.target).closest(".select2-search-choice").length > 0) {                                        // 2818
                    // clicked inside a select2 search choice, do not open                                             // 2819
                    return;                                                                                            // 2820
                }                                                                                                      // 2821
                this.selectChoice(null);                                                                               // 2822
                this.clearPlaceholder();                                                                               // 2823
                if (!this.container.hasClass("select2-container-active")) {                                            // 2824
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2825
                }                                                                                                      // 2826
                this.open();                                                                                           // 2827
                this.focusSearch();                                                                                    // 2828
                e.preventDefault();                                                                                    // 2829
            }));                                                                                                       // 2830
                                                                                                                       // 2831
            this.container.on("focus", selector, this.bind(function () {                                               // 2832
                if (!this.isInterfaceEnabled()) return;                                                                // 2833
                if (!this.container.hasClass("select2-container-active")) {                                            // 2834
                    this.opts.element.trigger($.Event("select2-focus"));                                               // 2835
                }                                                                                                      // 2836
                this.container.addClass("select2-container-active");                                                   // 2837
                this.dropdown.addClass("select2-drop-active");                                                         // 2838
                this.clearPlaceholder();                                                                               // 2839
            }));                                                                                                       // 2840
                                                                                                                       // 2841
            this.initContainerWidth();                                                                                 // 2842
            this.opts.element.addClass("select2-offscreen");                                                           // 2843
                                                                                                                       // 2844
            // set the placeholder if necessary                                                                        // 2845
            this.clearSearch();                                                                                        // 2846
        },                                                                                                             // 2847
                                                                                                                       // 2848
        // multi                                                                                                       // 2849
        enableInterface: function() {                                                                                  // 2850
            if (this.parent.enableInterface.apply(this, arguments)) {                                                  // 2851
                this.search.prop("disabled", !this.isInterfaceEnabled());                                              // 2852
            }                                                                                                          // 2853
        },                                                                                                             // 2854
                                                                                                                       // 2855
        // multi                                                                                                       // 2856
        initSelection: function () {                                                                                   // 2857
            var data;                                                                                                  // 2858
            if (this.opts.element.val() === "" && this.opts.element.text() === "") {                                   // 2859
                this.updateSelection([]);                                                                              // 2860
                this.close();                                                                                          // 2861
                // set the placeholder if necessary                                                                    // 2862
                this.clearSearch();                                                                                    // 2863
            }                                                                                                          // 2864
            if (this.select || this.opts.element.val() !== "") {                                                       // 2865
                var self = this;                                                                                       // 2866
                this.opts.initSelection.call(null, this.opts.element, function(data){                                  // 2867
                    if (data !== undefined && data !== null) {                                                         // 2868
                        self.updateSelection(data);                                                                    // 2869
                        self.close();                                                                                  // 2870
                        // set the placeholder if necessary                                                            // 2871
                        self.clearSearch();                                                                            // 2872
                    }                                                                                                  // 2873
                });                                                                                                    // 2874
            }                                                                                                          // 2875
        },                                                                                                             // 2876
                                                                                                                       // 2877
        // multi                                                                                                       // 2878
        clearSearch: function () {                                                                                     // 2879
            var placeholder = this.getPlaceholder(),                                                                   // 2880
                maxWidth = this.getMaxSearchWidth();                                                                   // 2881
                                                                                                                       // 2882
            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");                                              // 2884
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                // we could call this.resizeSearch(), but we do not because that requires a sizer and we do not want to create one so early because of a firefox bug, see #944
                this.search.width(maxWidth > 0 ? maxWidth : this.container.css("width"));                              // 2887
            } else {                                                                                                   // 2888
                this.search.val("").width(10);                                                                         // 2889
            }                                                                                                          // 2890
        },                                                                                                             // 2891
                                                                                                                       // 2892
        // multi                                                                                                       // 2893
        clearPlaceholder: function () {                                                                                // 2894
            if (this.search.hasClass("select2-default")) {                                                             // 2895
                this.search.val("").removeClass("select2-default");                                                    // 2896
            }                                                                                                          // 2897
        },                                                                                                             // 2898
                                                                                                                       // 2899
        // multi                                                                                                       // 2900
        opening: function () {                                                                                         // 2901
            this.clearPlaceholder(); // should be done before super so placeholder is not used to search               // 2902
            this.resizeSearch();                                                                                       // 2903
                                                                                                                       // 2904
            this.parent.opening.apply(this, arguments);                                                                // 2905
                                                                                                                       // 2906
            this.focusSearch();                                                                                        // 2907
                                                                                                                       // 2908
            // initializes search's value with nextSearchTerm (if defined by user)                                     // 2909
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter                           // 2910
            if(this.search.val() === "") {                                                                             // 2911
                if(this.nextSearchTerm != undefined){                                                                  // 2912
                    this.search.val(this.nextSearchTerm);                                                              // 2913
                    this.search.select();                                                                              // 2914
                }                                                                                                      // 2915
            }                                                                                                          // 2916
                                                                                                                       // 2917
            this.updateResults(true);                                                                                  // 2918
            if (this.opts.shouldFocusInput(this)) {                                                                    // 2919
                this.search.focus();                                                                                   // 2920
            }                                                                                                          // 2921
            this.opts.element.trigger($.Event("select2-open"));                                                        // 2922
        },                                                                                                             // 2923
                                                                                                                       // 2924
        // multi                                                                                                       // 2925
        close: function () {                                                                                           // 2926
            if (!this.opened()) return;                                                                                // 2927
            this.parent.close.apply(this, arguments);                                                                  // 2928
        },                                                                                                             // 2929
                                                                                                                       // 2930
        // multi                                                                                                       // 2931
        focus: function () {                                                                                           // 2932
            this.close();                                                                                              // 2933
            this.search.focus();                                                                                       // 2934
        },                                                                                                             // 2935
                                                                                                                       // 2936
        // multi                                                                                                       // 2937
        isFocused: function () {                                                                                       // 2938
            return this.search.hasClass("select2-focused");                                                            // 2939
        },                                                                                                             // 2940
                                                                                                                       // 2941
        // multi                                                                                                       // 2942
        updateSelection: function (data) {                                                                             // 2943
            var ids = [], filtered = [], self = this;                                                                  // 2944
                                                                                                                       // 2945
            // filter out duplicates                                                                                   // 2946
            $(data).each(function () {                                                                                 // 2947
                if (indexOf(self.id(this), ids) < 0) {                                                                 // 2948
                    ids.push(self.id(this));                                                                           // 2949
                    filtered.push(this);                                                                               // 2950
                }                                                                                                      // 2951
            });                                                                                                        // 2952
            data = filtered;                                                                                           // 2953
                                                                                                                       // 2954
            this.selection.find(".select2-search-choice").remove();                                                    // 2955
            $(data).each(function () {                                                                                 // 2956
                self.addSelectedChoice(this);                                                                          // 2957
            });                                                                                                        // 2958
            self.postprocessResults();                                                                                 // 2959
        },                                                                                                             // 2960
                                                                                                                       // 2961
        // multi                                                                                                       // 2962
        tokenize: function() {                                                                                         // 2963
            var input = this.search.val();                                                                             // 2964
            input = this.opts.tokenizer.call(this, input, this.data(), this.bind(this.onSelect), this.opts);           // 2965
            if (input != null && input != undefined) {                                                                 // 2966
                this.search.val(input);                                                                                // 2967
                if (input.length > 0) {                                                                                // 2968
                    this.open();                                                                                       // 2969
                }                                                                                                      // 2970
            }                                                                                                          // 2971
                                                                                                                       // 2972
        },                                                                                                             // 2973
                                                                                                                       // 2974
        // multi                                                                                                       // 2975
        onSelect: function (data, options) {                                                                           // 2976
                                                                                                                       // 2977
            if (!this.triggerSelect(data) || data.text === "") { return; }                                             // 2978
                                                                                                                       // 2979
            this.addSelectedChoice(data);                                                                              // 2980
                                                                                                                       // 2981
            this.opts.element.trigger({ type: "selected", val: this.id(data), choice: data });                         // 2982
                                                                                                                       // 2983
            // keep track of the search's value before it gets cleared                                                 // 2984
            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());                                   // 2985
                                                                                                                       // 2986
            this.clearSearch();                                                                                        // 2987
            this.updateResults();                                                                                      // 2988
                                                                                                                       // 2989
            if (this.select || !this.opts.closeOnSelect) this.postprocessResults(data, false, this.opts.closeOnSelect===true);
                                                                                                                       // 2991
            if (this.opts.closeOnSelect) {                                                                             // 2992
                this.close();                                                                                          // 2993
                this.search.width(10);                                                                                 // 2994
            } else {                                                                                                   // 2995
                if (this.countSelectableResults()>0) {                                                                 // 2996
                    this.search.width(10);                                                                             // 2997
                    this.resizeSearch();                                                                               // 2998
                    if (this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize()) {   // 2999
                        // if we reached max selection size repaint the results so choices                             // 3000
                        // are replaced with the max selection reached message                                         // 3001
                        this.updateResults(true);                                                                      // 3002
                    } else {                                                                                           // 3003
                        // initializes search's value with nextSearchTerm and update search result                     // 3004
                        if(this.nextSearchTerm != undefined){                                                          // 3005
                            this.search.val(this.nextSearchTerm);                                                      // 3006
                            this.updateResults();                                                                      // 3007
                            this.search.select();                                                                      // 3008
                        }                                                                                              // 3009
                    }                                                                                                  // 3010
                    this.positionDropdown();                                                                           // 3011
                } else {                                                                                               // 3012
                    // if nothing left to select close                                                                 // 3013
                    this.close();                                                                                      // 3014
                    this.search.width(10);                                                                             // 3015
                }                                                                                                      // 3016
            }                                                                                                          // 3017
                                                                                                                       // 3018
            // since its not possible to select an element that has already been                                       // 3019
            // added we do not need to check if this is a new element before firing change                             // 3020
            this.triggerChange({ added: data });                                                                       // 3021
                                                                                                                       // 3022
            if (!options || !options.noFocus)                                                                          // 3023
                this.focusSearch();                                                                                    // 3024
        },                                                                                                             // 3025
                                                                                                                       // 3026
        // multi                                                                                                       // 3027
        cancel: function () {                                                                                          // 3028
            this.close();                                                                                              // 3029
            this.focusSearch();                                                                                        // 3030
        },                                                                                                             // 3031
                                                                                                                       // 3032
        addSelectedChoice: function (data) {                                                                           // 3033
            var enableChoice = !data.locked,                                                                           // 3034
                enabledItem = $(                                                                                       // 3035
                    "<li class='select2-search-choice'>" +                                                             // 3036
                    "    <div></div>" +                                                                                // 3037
                    "    <a href='#' class='select2-search-choice-close' tabindex='-1'></a>" +                         // 3038
                    "</li>"),                                                                                          // 3039
                disabledItem = $(                                                                                      // 3040
                    "<li class='select2-search-choice select2-locked'>" +                                              // 3041
                    "<div></div>" +                                                                                    // 3042
                    "</li>");                                                                                          // 3043
            var choice = enableChoice ? enabledItem : disabledItem,                                                    // 3044
                id = this.id(data),                                                                                    // 3045
                val = this.getVal(),                                                                                   // 3046
                formatted,                                                                                             // 3047
                cssClass;                                                                                              // 3048
                                                                                                                       // 3049
            formatted=this.opts.formatSelection(data, choice.find("div"), this.opts.escapeMarkup);                     // 3050
            if (formatted != undefined) {                                                                              // 3051
                choice.find("div").replaceWith("<div>"+formatted+"</div>");                                            // 3052
            }                                                                                                          // 3053
            cssClass=this.opts.formatSelectionCssClass(data, choice.find("div"));                                      // 3054
            if (cssClass != undefined) {                                                                               // 3055
                choice.addClass(cssClass);                                                                             // 3056
            }                                                                                                          // 3057
                                                                                                                       // 3058
            if(enableChoice){                                                                                          // 3059
              choice.find(".select2-search-choice-close")                                                              // 3060
                  .on("mousedown", killEvent)                                                                          // 3061
                  .on("click dblclick", this.bind(function (e) {                                                       // 3062
                  if (!this.isInterfaceEnabled()) return;                                                              // 3063
                                                                                                                       // 3064
                  this.unselect($(e.target));                                                                          // 3065
                  this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");      // 3066
                  killEvent(e);                                                                                        // 3067
                  this.close();                                                                                        // 3068
                  this.focusSearch();                                                                                  // 3069
              })).on("focus", this.bind(function () {                                                                  // 3070
                  if (!this.isInterfaceEnabled()) return;                                                              // 3071
                  this.container.addClass("select2-container-active");                                                 // 3072
                  this.dropdown.addClass("select2-drop-active");                                                       // 3073
              }));                                                                                                     // 3074
            }                                                                                                          // 3075
                                                                                                                       // 3076
            choice.data("select2-data", data);                                                                         // 3077
            choice.insertBefore(this.searchContainer);                                                                 // 3078
                                                                                                                       // 3079
            val.push(id);                                                                                              // 3080
            this.setVal(val);                                                                                          // 3081
        },                                                                                                             // 3082
                                                                                                                       // 3083
        // multi                                                                                                       // 3084
        unselect: function (selected) {                                                                                // 3085
            var val = this.getVal(),                                                                                   // 3086
                data,                                                                                                  // 3087
                index;                                                                                                 // 3088
            selected = selected.closest(".select2-search-choice");                                                     // 3089
                                                                                                                       // 3090
            if (selected.length === 0) {                                                                               // 3091
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";                            // 3092
            }                                                                                                          // 3093
                                                                                                                       // 3094
            data = selected.data("select2-data");                                                                      // 3095
                                                                                                                       // 3096
            if (!data) {                                                                                               // 3097
                // prevent a race condition when the 'x' is clicked really fast repeatedly the event can be queued     // 3098
                // and invoked on an element already removed                                                           // 3099
                return;                                                                                                // 3100
            }                                                                                                          // 3101
                                                                                                                       // 3102
            var evt = $.Event("select2-removing");                                                                     // 3103
            evt.val = this.id(data);                                                                                   // 3104
            evt.choice = data;                                                                                         // 3105
            this.opts.element.trigger(evt);                                                                            // 3106
                                                                                                                       // 3107
            if (evt.isDefaultPrevented()) {                                                                            // 3108
                return false;                                                                                          // 3109
            }                                                                                                          // 3110
                                                                                                                       // 3111
            while((index = indexOf(this.id(data), val)) >= 0) {                                                        // 3112
                val.splice(index, 1);                                                                                  // 3113
                this.setVal(val);                                                                                      // 3114
                if (this.select) this.postprocessResults();                                                            // 3115
            }                                                                                                          // 3116
                                                                                                                       // 3117
            selected.remove();                                                                                         // 3118
                                                                                                                       // 3119
            this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });                  // 3120
            this.triggerChange({ removed: data });                                                                     // 3121
                                                                                                                       // 3122
            return true;                                                                                               // 3123
        },                                                                                                             // 3124
                                                                                                                       // 3125
        // multi                                                                                                       // 3126
        postprocessResults: function (data, initial, noHighlightUpdate) {                                              // 3127
            var val = this.getVal(),                                                                                   // 3128
                choices = this.results.find(".select2-result"),                                                        // 3129
                compound = this.results.find(".select2-result-with-children"),                                         // 3130
                self = this;                                                                                           // 3131
                                                                                                                       // 3132
            choices.each2(function (i, choice) {                                                                       // 3133
                var id = self.id(choice.data("select2-data"));                                                         // 3134
                if (indexOf(id, val) >= 0) {                                                                           // 3135
                    choice.addClass("select2-selected");                                                               // 3136
                    // mark all children of the selected parent as selected                                            // 3137
                    choice.find(".select2-result-selectable").addClass("select2-selected");                            // 3138
                }                                                                                                      // 3139
            });                                                                                                        // 3140
                                                                                                                       // 3141
            compound.each2(function(i, choice) {                                                                       // 3142
                // hide an optgroup if it doesn't have any selectable children                                         // 3143
                if (!choice.is('.select2-result-selectable')                                                           // 3144
                    && choice.find(".select2-result-selectable:not(.select2-selected)").length === 0) {                // 3145
                    choice.addClass("select2-selected");                                                               // 3146
                }                                                                                                      // 3147
            });                                                                                                        // 3148
                                                                                                                       // 3149
            if (this.highlight() == -1 && noHighlightUpdate !== false){                                                // 3150
                self.highlight(0);                                                                                     // 3151
            }                                                                                                          // 3152
                                                                                                                       // 3153
            //If all results are chosen render formatNoMatches                                                         // 3154
            if(!this.opts.createSearchChoice && !choices.filter('.select2-result:not(.select2-selected)').length > 0){ // 3155
                if(!data || data && !data.more && this.results.find(".select2-no-results").length === 0) {             // 3156
                    if (checkFormatter(self.opts.formatNoMatches, "formatNoMatches")) {                                // 3157
                        this.results.append("<li class='select2-no-results'>" + evaluate(self.opts.formatNoMatches, self.opts.element, self.search.val()) + "</li>");
                    }                                                                                                  // 3159
                }                                                                                                      // 3160
            }                                                                                                          // 3161
                                                                                                                       // 3162
        },                                                                                                             // 3163
                                                                                                                       // 3164
        // multi                                                                                                       // 3165
        getMaxSearchWidth: function() {                                                                                // 3166
            return this.selection.width() - getSideBorderPadding(this.search);                                         // 3167
        },                                                                                                             // 3168
                                                                                                                       // 3169
        // multi                                                                                                       // 3170
        resizeSearch: function () {                                                                                    // 3171
            var minimumWidth, left, maxWidth, containerLeft, searchWidth,                                              // 3172
                sideBorderPadding = getSideBorderPadding(this.search);                                                 // 3173
                                                                                                                       // 3174
            minimumWidth = measureTextWidth(this.search) + 10;                                                         // 3175
                                                                                                                       // 3176
            left = this.search.offset().left;                                                                          // 3177
                                                                                                                       // 3178
            maxWidth = this.selection.width();                                                                         // 3179
            containerLeft = this.selection.offset().left;                                                              // 3180
                                                                                                                       // 3181
            searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;                                       // 3182
                                                                                                                       // 3183
            if (searchWidth < minimumWidth) {                                                                          // 3184
                searchWidth = maxWidth - sideBorderPadding;                                                            // 3185
            }                                                                                                          // 3186
                                                                                                                       // 3187
            if (searchWidth < 40) {                                                                                    // 3188
                searchWidth = maxWidth - sideBorderPadding;                                                            // 3189
            }                                                                                                          // 3190
                                                                                                                       // 3191
            if (searchWidth <= 0) {                                                                                    // 3192
              searchWidth = minimumWidth;                                                                              // 3193
            }                                                                                                          // 3194
                                                                                                                       // 3195
            this.search.width(Math.floor(searchWidth));                                                                // 3196
        },                                                                                                             // 3197
                                                                                                                       // 3198
        // multi                                                                                                       // 3199
        getVal: function () {                                                                                          // 3200
            var val;                                                                                                   // 3201
            if (this.select) {                                                                                         // 3202
                val = this.select.val();                                                                               // 3203
                return val === null ? [] : val;                                                                        // 3204
            } else {                                                                                                   // 3205
                val = this.opts.element.val();                                                                         // 3206
                return splitVal(val, this.opts.separator);                                                             // 3207
            }                                                                                                          // 3208
        },                                                                                                             // 3209
                                                                                                                       // 3210
        // multi                                                                                                       // 3211
        setVal: function (val) {                                                                                       // 3212
            var unique;                                                                                                // 3213
            if (this.select) {                                                                                         // 3214
                this.select.val(val);                                                                                  // 3215
            } else {                                                                                                   // 3216
                unique = [];                                                                                           // 3217
                // filter out duplicates                                                                               // 3218
                $(val).each(function () {                                                                              // 3219
                    if (indexOf(this, unique) < 0) unique.push(this);                                                  // 3220
                });                                                                                                    // 3221
                this.opts.element.val(unique.length === 0 ? "" : unique.join(this.opts.separator));                    // 3222
            }                                                                                                          // 3223
        },                                                                                                             // 3224
                                                                                                                       // 3225
        // multi                                                                                                       // 3226
        buildChangeDetails: function (old, current) {                                                                  // 3227
            var current = current.slice(0),                                                                            // 3228
                old = old.slice(0);                                                                                    // 3229
                                                                                                                       // 3230
            // remove intersection from each array                                                                     // 3231
            for (var i = 0; i < current.length; i++) {                                                                 // 3232
                for (var j = 0; j < old.length; j++) {                                                                 // 3233
                    if (equal(this.opts.id(current[i]), this.opts.id(old[j]))) {                                       // 3234
                        current.splice(i, 1);                                                                          // 3235
                        if(i>0){                                                                                       // 3236
                        	i--;                                                                                          // 3237
                        }                                                                                              // 3238
                        old.splice(j, 1);                                                                              // 3239
                        j--;                                                                                           // 3240
                    }                                                                                                  // 3241
                }                                                                                                      // 3242
            }                                                                                                          // 3243
                                                                                                                       // 3244
            return {added: current, removed: old};                                                                     // 3245
        },                                                                                                             // 3246
                                                                                                                       // 3247
                                                                                                                       // 3248
        // multi                                                                                                       // 3249
        val: function (val, triggerChange) {                                                                           // 3250
            var oldData, self=this;                                                                                    // 3251
                                                                                                                       // 3252
            if (arguments.length === 0) {                                                                              // 3253
                return this.getVal();                                                                                  // 3254
            }                                                                                                          // 3255
                                                                                                                       // 3256
            oldData=this.data();                                                                                       // 3257
            if (!oldData.length) oldData=[];                                                                           // 3258
                                                                                                                       // 3259
            // val is an id. !val is true for [undefined,null,'',0] - 0 is legal                                       // 3260
            if (!val && val !== 0) {                                                                                   // 3261
                this.opts.element.val("");                                                                             // 3262
                this.updateSelection([]);                                                                              // 3263
                this.clearSearch();                                                                                    // 3264
                if (triggerChange) {                                                                                   // 3265
                    this.triggerChange({added: this.data(), removed: oldData});                                        // 3266
                }                                                                                                      // 3267
                return;                                                                                                // 3268
            }                                                                                                          // 3269
                                                                                                                       // 3270
            // val is a list of ids                                                                                    // 3271
            this.setVal(val);                                                                                          // 3272
                                                                                                                       // 3273
            if (this.select) {                                                                                         // 3274
                this.opts.initSelection(this.select, this.bind(this.updateSelection));                                 // 3275
                if (triggerChange) {                                                                                   // 3276
                    this.triggerChange(this.buildChangeDetails(oldData, this.data()));                                 // 3277
                }                                                                                                      // 3278
            } else {                                                                                                   // 3279
                if (this.opts.initSelection === undefined) {                                                           // 3280
                    throw new Error("val() cannot be called if initSelection() is not defined");                       // 3281
                }                                                                                                      // 3282
                                                                                                                       // 3283
                this.opts.initSelection(this.opts.element, function(data){                                             // 3284
                    var ids=$.map(data, self.id);                                                                      // 3285
                    self.setVal(ids);                                                                                  // 3286
                    self.updateSelection(data);                                                                        // 3287
                    self.clearSearch();                                                                                // 3288
                    if (triggerChange) {                                                                               // 3289
                        self.triggerChange(self.buildChangeDetails(oldData, self.data()));                             // 3290
                    }                                                                                                  // 3291
                });                                                                                                    // 3292
            }                                                                                                          // 3293
            this.clearSearch();                                                                                        // 3294
        },                                                                                                             // 3295
                                                                                                                       // 3296
        // multi                                                                                                       // 3297
        onSortStart: function() {                                                                                      // 3298
            if (this.select) {                                                                                         // 3299
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }                                                                                                          // 3301
                                                                                                                       // 3302
            // collapse search field into 0 width so its container can be collapsed as well                            // 3303
            this.search.width(0);                                                                                      // 3304
            // hide the container                                                                                      // 3305
            this.searchContainer.hide();                                                                               // 3306
        },                                                                                                             // 3307
                                                                                                                       // 3308
        // multi                                                                                                       // 3309
        onSortEnd:function() {                                                                                         // 3310
                                                                                                                       // 3311
            var val=[], self=this;                                                                                     // 3312
                                                                                                                       // 3313
            // show search and move it to the end of the list                                                          // 3314
            this.searchContainer.show();                                                                               // 3315
            // make sure the search container is the last item in the list                                             // 3316
            this.searchContainer.appendTo(this.searchContainer.parent());                                              // 3317
            // since we collapsed the width in dragStarted, we resize it here                                          // 3318
            this.resizeSearch();                                                                                       // 3319
                                                                                                                       // 3320
            // update selection                                                                                        // 3321
            this.selection.find(".select2-search-choice").each(function() {                                            // 3322
                val.push(self.opts.id($(this).data("select2-data")));                                                  // 3323
            });                                                                                                        // 3324
            this.setVal(val);                                                                                          // 3325
            this.triggerChange();                                                                                      // 3326
        },                                                                                                             // 3327
                                                                                                                       // 3328
        // multi                                                                                                       // 3329
        data: function(values, triggerChange) {                                                                        // 3330
            var self=this, ids, old;                                                                                   // 3331
            if (arguments.length === 0) {                                                                              // 3332
                 return this.selection                                                                                 // 3333
                     .children(".select2-search-choice")                                                               // 3334
                     .map(function() { return $(this).data("select2-data"); })                                         // 3335
                     .get();                                                                                           // 3336
            } else {                                                                                                   // 3337
                old = this.data();                                                                                     // 3338
                if (!values) { values = []; }                                                                          // 3339
                ids = $.map(values, function(e) { return self.opts.id(e); });                                          // 3340
                this.setVal(ids);                                                                                      // 3341
                this.updateSelection(values);                                                                          // 3342
                this.clearSearch();                                                                                    // 3343
                if (triggerChange) {                                                                                   // 3344
                    this.triggerChange(this.buildChangeDetails(old, this.data()));                                     // 3345
                }                                                                                                      // 3346
            }                                                                                                          // 3347
        }                                                                                                              // 3348
    });                                                                                                                // 3349
                                                                                                                       // 3350
    $.fn.select2 = function () {                                                                                       // 3351
                                                                                                                       // 3352
        var args = Array.prototype.slice.call(arguments, 0),                                                           // 3353
            opts,                                                                                                      // 3354
            select2,                                                                                                   // 3355
            method, value, multiple,                                                                                   // 3356
            allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
            valueMethods = ["opened", "isFocused", "container", "dropdown"],                                           // 3358
            propertyMethods = ["val", "data"],                                                                         // 3359
            methodsMap = { search: "externalSearch" };                                                                 // 3360
                                                                                                                       // 3361
        this.each(function () {                                                                                        // 3362
            if (args.length === 0 || typeof(args[0]) === "object") {                                                   // 3363
                opts = args.length === 0 ? {} : $.extend({}, args[0]);                                                 // 3364
                opts.element = $(this);                                                                                // 3365
                                                                                                                       // 3366
                if (opts.element.get(0).tagName.toLowerCase() === "select") {                                          // 3367
                    multiple = opts.element.prop("multiple");                                                          // 3368
                } else {                                                                                               // 3369
                    multiple = opts.multiple || false;                                                                 // 3370
                    if ("tags" in opts) {opts.multiple = multiple = true;}                                             // 3371
                }                                                                                                      // 3372
                                                                                                                       // 3373
                select2 = multiple ? new window.Select2["class"].multi() : new window.Select2["class"].single();       // 3374
                select2.init(opts);                                                                                    // 3375
            } else if (typeof(args[0]) === "string") {                                                                 // 3376
                                                                                                                       // 3377
                if (indexOf(args[0], allowedMethods) < 0) {                                                            // 3378
                    throw "Unknown method: " + args[0];                                                                // 3379
                }                                                                                                      // 3380
                                                                                                                       // 3381
                value = undefined;                                                                                     // 3382
                select2 = $(this).data("select2");                                                                     // 3383
                if (select2 === undefined) return;                                                                     // 3384
                                                                                                                       // 3385
                method=args[0];                                                                                        // 3386
                                                                                                                       // 3387
                if (method === "container") {                                                                          // 3388
                    value = select2.container;                                                                         // 3389
                } else if (method === "dropdown") {                                                                    // 3390
                    value = select2.dropdown;                                                                          // 3391
                } else {                                                                                               // 3392
                    if (methodsMap[method]) method = methodsMap[method];                                               // 3393
                                                                                                                       // 3394
                    value = select2[method].apply(select2, args.slice(1));                                             // 3395
                }                                                                                                      // 3396
                if (indexOf(args[0], valueMethods) >= 0                                                                // 3397
                    || (indexOf(args[0], propertyMethods) >= 0 && args.length == 1)) {                                 // 3398
                    return false; // abort the iteration, ready to return first matched value                          // 3399
                }                                                                                                      // 3400
            } else {                                                                                                   // 3401
                throw "Invalid arguments to select2 plugin: " + args;                                                  // 3402
            }                                                                                                          // 3403
        });                                                                                                            // 3404
        return (value === undefined) ? this : value;                                                                   // 3405
    };                                                                                                                 // 3406
                                                                                                                       // 3407
    // plugin defaults, accessible to users                                                                            // 3408
    $.fn.select2.defaults = {                                                                                          // 3409
        width: "copy",                                                                                                 // 3410
        loadMorePadding: 0,                                                                                            // 3411
        closeOnSelect: true,                                                                                           // 3412
        openOnEnter: true,                                                                                             // 3413
        containerCss: {},                                                                                              // 3414
        dropdownCss: {},                                                                                               // 3415
        containerCssClass: "",                                                                                         // 3416
        dropdownCssClass: "",                                                                                          // 3417
        formatResult: function(result, container, query, escapeMarkup) {                                               // 3418
            var markup=[];                                                                                             // 3419
            markMatch(result.text, query.term, markup, escapeMarkup);                                                  // 3420
            return markup.join("");                                                                                    // 3421
        },                                                                                                             // 3422
        formatSelection: function (data, container, escapeMarkup) {                                                    // 3423
            return data ? escapeMarkup(data.text) : undefined;                                                         // 3424
        },                                                                                                             // 3425
        sortResults: function (results, container, query) {                                                            // 3426
            return results;                                                                                            // 3427
        },                                                                                                             // 3428
        formatResultCssClass: function(data) {return data.css;},                                                       // 3429
        formatSelectionCssClass: function(data, container) {return undefined;},                                        // 3430
        minimumResultsForSearch: 0,                                                                                    // 3431
        minimumInputLength: 0,                                                                                         // 3432
        maximumInputLength: null,                                                                                      // 3433
        maximumSelectionSize: 0,                                                                                       // 3434
        id: function (e) { return e == undefined ? null : e.id; },                                                     // 3435
        matcher: function(term, text) {                                                                                // 3436
            return stripDiacritics(''+text).toUpperCase().indexOf(stripDiacritics(''+term).toUpperCase()) >= 0;        // 3437
        },                                                                                                             // 3438
        separator: ",",                                                                                                // 3439
        tokenSeparators: [],                                                                                           // 3440
        tokenizer: defaultTokenizer,                                                                                   // 3441
        escapeMarkup: defaultEscapeMarkup,                                                                             // 3442
        blurOnChange: false,                                                                                           // 3443
        selectOnBlur: false,                                                                                           // 3444
        adaptContainerCssClass: function(c) { return c; },                                                             // 3445
        adaptDropdownCssClass: function(c) { return null; },                                                           // 3446
        nextSearchTerm: function(selectedObject, currentSearchTerm) { return undefined; },                             // 3447
        searchInputPlaceholder: '',                                                                                    // 3448
        createSearchChoicePosition: 'top',                                                                             // 3449
        shouldFocusInput: function (instance) {                                                                        // 3450
            // Attempt to detect touch devices                                                                         // 3451
            var supportsTouchEvents = (('ontouchstart' in window) ||                                                   // 3452
                                       (navigator.msMaxTouchPoints > 0));                                              // 3453
                                                                                                                       // 3454
            // Only devices which support touch events should be special cased                                         // 3455
            if (!supportsTouchEvents) {                                                                                // 3456
                return true;                                                                                           // 3457
            }                                                                                                          // 3458
                                                                                                                       // 3459
            // Never focus the input if search is disabled                                                             // 3460
            if (instance.opts.minimumResultsForSearch < 0) {                                                           // 3461
                return false;                                                                                          // 3462
            }                                                                                                          // 3463
                                                                                                                       // 3464
            return true;                                                                                               // 3465
        }                                                                                                              // 3466
    };                                                                                                                 // 3467
                                                                                                                       // 3468
    $.fn.select2.locales = [];                                                                                         // 3469
                                                                                                                       // 3470
    $.fn.select2.locales['en'] = {                                                                                     // 3471
         formatMatches: function (matches) { if (matches === 1) { return "One result is available, press enter to select it."; } return matches + " results are available, use up and down arrow keys to navigate."; },
         formatNoMatches: function () { return "No matches found"; },                                                  // 3473
         formatAjaxError: function (jqXHR, textStatus, errorThrown) { return "Loading failed"; },                      // 3474
         formatInputTooShort: function (input, min) { var n = min - input.length; return "Please enter " + n + " or more character" + (n == 1 ? "" : "s"); },
         formatInputTooLong: function (input, max) { var n = input.length - max; return "Please delete " + n + " character" + (n == 1 ? "" : "s"); },
         formatSelectionTooBig: function (limit) { return "You can only select " + limit + " item" + (limit == 1 ? "" : "s"); },
         formatLoadMore: function (pageNumber) { return "Loading more results…"; },                                    // 3478
         formatSearching: function () { return "Searching…"; },                                                        // 3479
    };                                                                                                                 // 3480
                                                                                                                       // 3481
    $.extend($.fn.select2.defaults, $.fn.select2.locales['en']);                                                       // 3482
                                                                                                                       // 3483
    $.fn.select2.ajaxDefaults = {                                                                                      // 3484
        transport: $.ajax,                                                                                             // 3485
        params: {                                                                                                      // 3486
            type: "GET",                                                                                               // 3487
            cache: false,                                                                                              // 3488
            dataType: "json"                                                                                           // 3489
        }                                                                                                              // 3490
    };                                                                                                                 // 3491
                                                                                                                       // 3492
    // exports                                                                                                         // 3493
    window.Select2 = {                                                                                                 // 3494
        query: {                                                                                                       // 3495
            ajax: ajax,                                                                                                // 3496
            local: local,                                                                                              // 3497
            tags: tags                                                                                                 // 3498
        }, util: {                                                                                                     // 3499
            debounce: debounce,                                                                                        // 3500
            markMatch: markMatch,                                                                                      // 3501
            escapeMarkup: defaultEscapeMarkup,                                                                         // 3502
            stripDiacritics: stripDiacritics                                                                           // 3503
        }, "class": {                                                                                                  // 3504
            "abstract": AbstractSelect2,                                                                               // 3505
            "single": SingleSelect2,                                                                                   // 3506
            "multi": MultiSelect2                                                                                      // 3507
        }                                                                                                              // 3508
    };                                                                                                                 // 3509
                                                                                                                       // 3510
}(jQuery));                                                                                                            // 3511
                                                                                                                       // 3512


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['natestrauser:select2'] = {};

})();
