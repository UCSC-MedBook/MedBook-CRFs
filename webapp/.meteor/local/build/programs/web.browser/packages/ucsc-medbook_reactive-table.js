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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var i18n = Package['anti:i18n'].i18n;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var getFilterQuery;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ucsc-medbook:reactive-table/lib/template.reactive_table.js                                          //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
                                                                                                                // 1
Template.__checkName("reactiveTable");                                                                          // 2
Template["reactiveTable"] = new Template("Template.reactiveTable", (function() {                                // 3
  var view = this;                                                                                              // 4
  return Spacebars.With(function() {                                                                            // 5
    return Spacebars.call(view.lookup("context"));                                                              // 6
  }, function() {                                                                                               // 7
    return [ "\n  ", Blaze.If(function() {                                                                      // 8
      return Spacebars.call(view.lookup("ready"));                                                              // 9
    }, function() {                                                                                             // 10
      return [ "\n    ", HTML.DIV({                                                                             // 11
        "class": "clearfix"                                                                                     // 12
      }, "\n      ", HTML.DIV({                                                                                 // 13
        "class": "reactive-table-options col-sm-8 pull-right"                                                   // 14
      }, "\n        ", Blaze.If(function() {                                                                    // 15
        return Spacebars.call(view.lookup("showFilter"));                                                       // 16
      }, function() {                                                                                           // 17
        return [ "\n          ", HTML.DIV({                                                                     // 18
          "class": "form-group reactive-table-filter col-sm-8 pull-right"                                       // 19
        }, "\n            ", HTML.DIV({                                                                         // 20
          "class": "input-group"                                                                                // 21
        }, "\n                ", HTML.LABEL(" Filter nulls"), "\n                ", HTML.INPUT({                // 22
          type: "checkbox",                                                                                     // 23
          checked: "",                                                                                          // 24
          "class": "filterNulls"                                                                                // 25
        }), "\n              ", HTML.SPAN({                                                                     // 26
          "class": "input-group-addon"                                                                          // 27
        }, "\n                ", Blaze.If(function() {                                                          // 28
          return Spacebars.call(view.lookup("useFontAwesome"));                                                 // 29
        }, function() {                                                                                         // 30
          return [ "\n                  ", HTML.I({                                                             // 31
            "class": "fa fa-filter"                                                                             // 32
          }), "\n                " ];                                                                           // 33
        }, function() {                                                                                         // 34
          return [ "\n                  ", Blaze.View("lookup:i18n", function() {                               // 35
            return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.filter");                             // 36
          }), "\n                " ];                                                                           // 37
        }), "\n              "), "\n                  ", Blaze.If(function() {                                  // 38
          return Spacebars.call(view.lookup("useFontAwesome"));                                                 // 39
        }, function() {                                                                                         // 40
          return [ "\n                    ", HTML.INPUT({                                                       // 41
            "class": "reactive-table-input form-control",                                                       // 42
            type: "text",                                                                                       // 43
            value: function() {                                                                                 // 44
              return Spacebars.mustache(view.lookup("filter"));                                                 // 45
            },                                                                                                  // 46
            placeholder: function() {                                                                           // 47
              return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.filter");                           // 48
            }                                                                                                   // 49
          }), "\n                  " ];                                                                         // 50
        }, function() {                                                                                         // 51
          return [ "\n                    ", HTML.INPUT({                                                       // 52
            "class": "reactive-table-input form-control",                                                       // 53
            type: "text",                                                                                       // 54
            value: function() {                                                                                 // 55
              return Spacebars.mustache(view.lookup("filter"));                                                 // 56
            }                                                                                                   // 57
          }), "\n                  " ];                                                                         // 58
        }), "\n            "), "\n          "), "\n        " ];                                                 // 59
      }), "\n        ", Blaze.If(function() {                                                                   // 60
        return Spacebars.call(view.lookup("showColumnToggles"));                                                // 61
      }, function() {                                                                                           // 62
        return [ "\n          ", HTML.DIV({                                                                     // 63
          "class": "reactive-table-columns-dropdown col-sm-4 pull-right"                                        // 64
        }, "\n            ", HTML.BUTTON({                                                                      // 65
          "class": "btn btn-default dropdown-toggle",                                                           // 66
          id: function() {                                                                                      // 67
            return [ "reactive-table-add-column-", Spacebars.mustache(view.lookup("id")) ];                     // 68
          },                                                                                                    // 69
          "data-toggle": "dropdown"                                                                             // 70
        }, "\n              ", Blaze.View("lookup:i18n", function() {                                           // 71
          return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.columns");                              // 72
        }), "\n            "), "\n            ", HTML.UL({                                                      // 73
          "class": "dropdown-menu dropdown-menu-right",                                                         // 74
          role: "menu",                                                                                         // 75
          "aria-labelledby": function() {                                                                       // 76
            return [ "reactive-table-add-column-", Spacebars.mustache(view.lookup("id")) ];                     // 77
          }                                                                                                     // 78
        }, "\n              ", Blaze.Each(function() {                                                          // 79
          return Spacebars.call(view.lookup("fields"));                                                         // 80
        }, function() {                                                                                         // 81
          return [ "\n                ", Blaze.Unless(function() {                                              // 82
            return Spacebars.call(view.lookup("hideToggle"));                                                   // 83
          }, function() {                                                                                       // 84
            return [ "\n                  ", HTML.LI({                                                          // 85
              role: "presentation"                                                                              // 86
            }, HTML.A({                                                                                         // 87
              role: "menuitem",                                                                                 // 88
              tabindex: "-1",                                                                                   // 89
              "data-target": "#"                                                                                // 90
            }, "\n                    ", HTML.LABEL("\n                      ", Blaze.If(function() {           // 91
              return Spacebars.call(view.lookup("isVisible"));                                                  // 92
            }, function() {                                                                                     // 93
              return [ "\n                        ", HTML.INPUT({                                               // 94
                type: "checkbox",                                                                               // 95
                checked: "",                                                                                    // 96
                "data-fieldid": function() {                                                                    // 97
                  return Spacebars.mustache(view.lookup("fieldId"));                                            // 98
                }                                                                                               // 99
              }), "\n                      " ];                                                                 // 100
            }, function() {                                                                                     // 101
              return [ "\n                        ", HTML.INPUT({                                               // 102
                type: "checkbox",                                                                               // 103
                "data-fieldid": function() {                                                                    // 104
                  return Spacebars.mustache(view.lookup("fieldId"));                                            // 105
                }                                                                                               // 106
              }), "\n                      " ];                                                                 // 107
            }), "\n                      ", Blaze.If(function() {                                               // 108
              return Spacebars.call(view.lookup("labelIsTemplate"));                                            // 109
            }, function() {                                                                                     // 110
              return Spacebars.With(function() {                                                                // 111
                return Spacebars.call(view.lookup("labelData"));                                                // 112
              }, function() {                                                                                   // 113
                return Spacebars.include(function() {                                                           // 114
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                             // 115
                });                                                                                             // 116
              });                                                                                               // 117
            }, function() {                                                                                     // 118
              return Blaze.View("lookup:getLabel", function() {                                                 // 119
                return Spacebars.mustache(view.lookup("getLabel"));                                             // 120
              });                                                                                               // 121
            }), "\n                    "), "\n                  ")), "\n                " ];                    // 122
          }), "\n              " ];                                                                             // 123
        }), "\n            "), "\n          "), "\n        " ];                                                 // 124
      }), "\n      "), "\n    "), "\n    ", HTML.TABLE({                                                        // 125
        id: function() {                                                                                        // 126
          return Spacebars.mustache(view.lookup("id"));                                                         // 127
        },                                                                                                      // 128
        "class": function() {                                                                                   // 129
          return [ Spacebars.mustache(view.lookup("class")), " reactive-table" ];                               // 130
        }                                                                                                       // 131
      }, "\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", Blaze.Each(function() {                   // 132
        return Spacebars.call(view.lookup("fields"));                                                           // 133
      }, function() {                                                                                           // 134
        return [ "\n            ", Blaze.If(function() {                                                        // 135
          return Spacebars.call(view.lookup("isVisible"));                                                      // 136
        }, function() {                                                                                         // 137
          return [ "\n              ", Blaze.If(function() {                                                    // 138
            return Spacebars.call(view.lookup("isSortKey"));                                                    // 139
          }, function() {                                                                                       // 140
            return [ "\n                ", HTML.TH({                                                            // 141
              "class": function() {                                                                             // 142
                return [ "sortable ", Spacebars.mustache(view.lookup("getHeaderClass")) ];                      // 143
              },                                                                                                // 144
              fieldid: function() {                                                                             // 145
                return Spacebars.mustache(view.lookup("getFieldFieldId"));                                      // 146
              }                                                                                                 // 147
            }, "\n                  ", Blaze.If(function() {                                                    // 148
              return Spacebars.call(view.lookup("labelIsTemplate"));                                            // 149
            }, function() {                                                                                     // 150
              return Spacebars.With(function() {                                                                // 151
                return Spacebars.call(view.lookup("labelData"));                                                // 152
              }, function() {                                                                                   // 153
                return Spacebars.include(function() {                                                           // 154
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                             // 155
                });                                                                                             // 156
              });                                                                                               // 157
            }, function() {                                                                                     // 158
              return Blaze.View("lookup:getLabel", function() {                                                 // 159
                return Spacebars.mustache(view.lookup("getLabel"));                                             // 160
              });                                                                                               // 161
            }), HTML.CharRef({                                                                                  // 162
              html: "&nbsp;",                                                                                   // 163
              str: " "                                                                                          // 164
            }), HTML.CharRef({                                                                                  // 165
              html: "&nbsp;",                                                                                   // 166
              str: " "                                                                                          // 167
            }), "\n                  ", Blaze.If(function() {                                                   // 168
              return Spacebars.call(view.lookup("isAscending"));                                                // 169
            }, function() {                                                                                     // 170
              return [ "\n                    ", Blaze.If(function() {                                          // 171
                return Spacebars.call(Spacebars.dot(view.lookup(".."), "useFontAwesome"));                      // 172
              }, function() {                                                                                   // 173
                return [ "\n                      ", HTML.I({                                                   // 174
                  "class": "fa fa-sort-asc"                                                                     // 175
                }), "\n                    " ];                                                                 // 176
              }, function() {                                                                                   // 177
                return [ "\n                      ", HTML.CharRef({                                             // 178
                  html: "&#x25B2;",                                                                             // 179
                  str: "▲"                                                                                      // 180
                }), "\n                    " ];                                                                 // 181
              }), "\n                  " ];                                                                     // 182
            }, function() {                                                                                     // 183
              return [ "\n                    ", Blaze.If(function() {                                          // 184
                return Spacebars.call(Spacebars.dot(view.lookup(".."), "useFontAwesome"));                      // 185
              }, function() {                                                                                   // 186
                return [ "\n                      ", HTML.I({                                                   // 187
                  "class": "fa fa-sort-desc"                                                                    // 188
                }), "\n                    " ];                                                                 // 189
              }, function() {                                                                                   // 190
                return [ "\n                      ", HTML.CharRef({                                             // 191
                  html: "&#x25BC;",                                                                             // 192
                  str: "▼"                                                                                      // 193
                }), "\n                    " ];                                                                 // 194
              }), "\n                  " ];                                                                     // 195
            }), "\n                "), "\n              " ];                                                    // 196
          }, function() {                                                                                       // 197
            return [ "\n                ", Blaze.If(function() {                                                // 198
              return Spacebars.call(view.lookup("isSortable"));                                                 // 199
            }, function() {                                                                                     // 200
              return [ "\n                  ", HTML.TH({                                                        // 201
                "class": function() {                                                                           // 202
                  return [ Spacebars.mustache(view.lookup("getHeaderClass")), " sortable" ];                    // 203
                },                                                                                              // 204
                fieldid: function() {                                                                           // 205
                  return Spacebars.mustache(view.lookup("getFieldFieldId"));                                    // 206
                }                                                                                               // 207
              }, Blaze.If(function() {                                                                          // 208
                return Spacebars.call(view.lookup("labelIsTemplate"));                                          // 209
              }, function() {                                                                                   // 210
                return Spacebars.With(function() {                                                              // 211
                  return Spacebars.call(view.lookup("labelData"));                                              // 212
                }, function() {                                                                                 // 213
                  return Spacebars.include(function() {                                                         // 214
                    return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                           // 215
                  });                                                                                           // 216
                });                                                                                             // 217
              }, function() {                                                                                   // 218
                return Blaze.View("lookup:getLabel", function() {                                               // 219
                  return Spacebars.mustache(view.lookup("getLabel"));                                           // 220
                });                                                                                             // 221
              })), "\n                " ];                                                                      // 222
            }, function() {                                                                                     // 223
              return [ "\n                  ", HTML.TH({                                                        // 224
                "class": function() {                                                                           // 225
                  return Spacebars.mustache(view.lookup("getHeaderClass"));                                     // 226
                },                                                                                              // 227
                fieldid: function() {                                                                           // 228
                  return Spacebars.mustache(view.lookup("getFieldFieldId"));                                    // 229
                }                                                                                               // 230
              }, Blaze.If(function() {                                                                          // 231
                return Spacebars.call(view.lookup("labelIsTemplate"));                                          // 232
              }, function() {                                                                                   // 233
                return Spacebars.With(function() {                                                              // 234
                  return Spacebars.call(view.lookup("labelData"));                                              // 235
                }, function() {                                                                                 // 236
                  return Spacebars.include(function() {                                                         // 237
                    return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                           // 238
                  });                                                                                           // 239
                });                                                                                             // 240
              }, function() {                                                                                   // 241
                return Blaze.View("lookup:getLabel", function() {                                               // 242
                  return Spacebars.mustache(view.lookup("getLabel"));                                           // 243
                });                                                                                             // 244
              })), "\n                " ];                                                                      // 245
            }), "\n              " ];                                                                           // 246
          }), "\n            " ];                                                                               // 247
        }), "\n          " ];                                                                                   // 248
      }), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n        ", Blaze.Each(function() {              // 249
        return Spacebars.call(view.lookup("sortedRows"));                                                       // 250
      }, function() {                                                                                           // 251
        return [ "\n          ", HTML.TR({                                                                      // 252
          "class": function() {                                                                                 // 253
            return Spacebars.mustache(Spacebars.dot(view.lookup(".."), "rowClass"), view.lookup("."));          // 254
          }                                                                                                     // 255
        }, "\n            ", Blaze.Each(function() {                                                            // 256
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "fields"));                                    // 257
        }, function() {                                                                                         // 258
          return [ "\n              ", Blaze.If(function() {                                                    // 259
            return Spacebars.call(view.lookup("isVisible"));                                                    // 260
          }, function() {                                                                                       // 261
            return [ "\n                ", HTML.TD({                                                            // 262
              "class": function() {                                                                             // 263
                return Spacebars.mustache(view.lookup("getCellClass"), view.lookup(".."));                      // 264
              }                                                                                                 // 265
            }, Blaze.If(function() {                                                                            // 266
              return Spacebars.call(view.lookup("tmpl"));                                                       // 267
            }, function() {                                                                                     // 268
              return Spacebars.With(function() {                                                                // 269
                return Spacebars.call(view.lookup(".."));                                                       // 270
              }, function() {                                                                                   // 271
                return Spacebars.include(function() {                                                           // 272
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "tmpl"));                              // 273
                });                                                                                             // 274
              });                                                                                               // 275
            }, function() {                                                                                     // 276
              return Blaze.View("lookup:getField", function() {                                                 // 277
                return Spacebars.mustache(view.lookup("getField"), view.lookup(".."));                          // 278
              });                                                                                               // 279
            })), "\n              " ];                                                                          // 280
          }), "\n            " ];                                                                               // 281
        }), "\n          "), "\n        " ];                                                                    // 282
      }), "\n      "), "\n    "), "\n    ", Blaze.If(function() {                                               // 283
        return Spacebars.call(view.lookup("showNavigation"));                                                   // 284
      }, function() {                                                                                           // 285
        return [ "\n      ", HTML.DIV({                                                                         // 286
          "class": "reactive-table-navigation"                                                                  // 287
        }, "\n        ", Blaze.If(function() {                                                                  // 288
          return Spacebars.call(view.lookup("showNavigationRowsPerPage"));                                      // 289
        }, function() {                                                                                         // 290
          return [ "\n          ", HTML.DIV({                                                                   // 291
            "class": "form-inline form-group rows-per-page"                                                     // 292
          }, "\n            ", HTML.LABEL(Blaze.View("lookup:i18n", function() {                                // 293
            return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.show");                               // 294
          }), HTML.CharRef({                                                                                    // 295
            html: "&nbsp;",                                                                                     // 296
            str: " "                                                                                            // 297
          }), HTML.INPUT({                                                                                      // 298
            "class": "form-control",                                                                            // 299
            type: "text",                                                                                       // 300
            value: function() {                                                                                 // 301
              return Spacebars.mustache(view.lookup("getRowsPerPage"));                                         // 302
            }                                                                                                   // 303
          }), HTML.CharRef({                                                                                    // 304
            html: "&nbsp;",                                                                                     // 305
            str: " "                                                                                            // 306
          }), Blaze.View("lookup:i18n", function() {                                                            // 307
            return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.rowsPerPage");                        // 308
          })), "\n          "), "\n        " ];                                                                 // 309
        }), "\n        ", HTML.DIV({                                                                            // 310
          "class": "form-inline form-group page-number"                                                         // 311
        }, "\n          ", Blaze.If(function() {                                                                // 312
          return Spacebars.call(view.lookup("isntFirstPage"));                                                  // 313
        }, function() {                                                                                         // 314
          return [ "\n            ", HTML.LABEL({                                                               // 315
            "class": "previous-page"                                                                            // 316
          }, HTML.CharRef({                                                                                     // 317
            html: "&lt;",                                                                                       // 318
            str: "<"                                                                                            // 319
          })), HTML.CharRef({                                                                                   // 320
            html: "&nbsp;",                                                                                     // 321
            str: " "                                                                                            // 322
          }), HTML.CharRef({                                                                                    // 323
            html: "&nbsp;",                                                                                     // 324
            str: " "                                                                                            // 325
          }), "\n          " ];                                                                                 // 326
        }), "\n          ", HTML.LABEL(Blaze.View("lookup:i18n", function() {                                   // 327
          return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.page");                                 // 328
        }), HTML.CharRef({                                                                                      // 329
          html: "&nbsp;",                                                                                       // 330
          str: " "                                                                                              // 331
        }), HTML.INPUT({                                                                                        // 332
          "class": "form-control",                                                                              // 333
          type: "text",                                                                                         // 334
          value: function() {                                                                                   // 335
            return Spacebars.mustache(view.lookup("getCurrentPage"));                                           // 336
          }                                                                                                     // 337
        }), HTML.CharRef({                                                                                      // 338
          html: "&nbsp;",                                                                                       // 339
          str: " "                                                                                              // 340
        }), Blaze.View("lookup:i18n", function() {                                                              // 341
          return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.of");                                   // 342
        }), " ", Blaze.View("lookup:getPageCount", function() {                                                 // 343
          return Spacebars.mustache(view.lookup("getPageCount"));                                               // 344
        })), "\n          ", Blaze.If(function() {                                                              // 345
          return Spacebars.call(view.lookup("isntLastPage"));                                                   // 346
        }, function() {                                                                                         // 347
          return [ "\n            ", HTML.LABEL({                                                               // 348
            "class": "next-page"                                                                                // 349
          }, HTML.CharRef({                                                                                     // 350
            html: "&nbsp;",                                                                                     // 351
            str: " "                                                                                            // 352
          }), HTML.CharRef({                                                                                    // 353
            html: "&nbsp;",                                                                                     // 354
            str: " "                                                                                            // 355
          }), HTML.CharRef({                                                                                    // 356
            html: "&gt;",                                                                                       // 357
            str: ">"                                                                                            // 358
          })), "\n          " ];                                                                                // 359
        }), "\n        "), "\n      "), "\n    " ];                                                             // 360
      }), "\n  " ];                                                                                             // 361
    }), "\n  " ];                                                                                               // 362
  });                                                                                                           // 363
}));                                                                                                            // 364
                                                                                                                // 365
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ucsc-medbook:reactive-table/lib/reactive_table_i18n.js                                              //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
i18n.map('en', {                                                                                                // 1
    reactiveTable: {                                                                                            // 2
        filter: 'Filter',                                                                                       // 3
        columns: 'Columns',                                                                                     // 4
        show: 'Show',                                                                                           // 5
        rowsPerPage: 'rows per page',                                                                           // 6
        page: 'Page',                                                                                           // 7
        of: 'of'                                                                                                // 8
    }                                                                                                           // 9
});                                                                                                             // 10
                                                                                                                // 11
i18n.map('fr', {                                                                                                // 12
    reactiveTable: {                                                                                            // 13
        filter: 'Filtre',                                                                                       // 14
        show: 'Voir',                                                                                           // 15
        rowsPerPage: 'lignes par page',                                                                         // 16
        page: 'page',                                                                                           // 17
        of: 'sur'                                                                                               // 18
    }                                                                                                           // 19
});                                                                                                             // 20
                                                                                                                // 21
i18n.map('ru', {                                                                                                // 22
    reactiveTable: {                                                                                            // 23
        filter: 'Фильтр',                                                                                       // 24
        show: 'Показать',                                                                                       // 25
        rowsPerPage: 'линий на странице',                                                                       // 26
        page: 'Страница',                                                                                       // 27
        of: 'из'                                                                                                // 28
    }                                                                                                           // 29
});                                                                                                             // 30
                                                                                                                // 31
i18n.map('es', {                                                                                                // 32
    reactiveTable: {                                                                                            // 33
        filter: 'Filtro',                                                                                       // 34
        show:   'Mostrar',                                                                                      // 35
        rowsPerPage: 'filas por página',                                                                        // 36
        page: 'Página',                                                                                         // 37
        of: 'de'                                                                                                // 38
    }                                                                                                           // 39
});                                                                                                             // 40
                                                                                                                // 41
i18n.map('nl', {                                                                                                // 42
    reactiveTable: {                                                                                            // 43
        filter: 'Filter',                                                                                       // 44
        show:   'Toon',                                                                                         // 45
        rowsPerPage: 'regels per pagina',                                                                       // 46
        page: 'Pagina',                                                                                         // 47
        of: 'van'                                                                                               // 48
    }                                                                                                           // 49
});                                                                                                             // 50
                                                                                                                // 51
i18n.map('pt-br', {                                                                                             // 52
    reactiveTable: {                                                                                            // 53
        filter: 'Filtro',                                                                                       // 54
        show: 'Mostrar',                                                                                        // 55
        rowsPerPage: 'linhas por página',                                                                       // 56
        page: 'Página',                                                                                         // 57
        of: 'de'                                                                                                // 58
    }                                                                                                           // 59
});                                                                                                             // 60
                                                                                                                // 61
i18n.map('it', {                                                                                                // 62
    reactiveTable: {                                                                                            // 63
        filter: 'Filtra',                                                                                       // 64
        show: 'Mostra',                                                                                         // 65
        rowsPerPage: 'righe per pagina',                                                                        // 66
        page: 'Pagina',                                                                                         // 67
        of: 'di'                                                                                                // 68
    }                                                                                                           // 69
});                                                                                                             // 70
                                                                                                                // 71
i18n.map('sv', {                                                                                                // 72
    reactiveTable: {                                                                                            // 73
        filter: 'Filter',                                                                                       // 74
        show: 'Visa',                                                                                           // 75
        rowsPerPage: 'rader per sida',                                                                          // 76
        page: 'Sida',                                                                                           // 77
        of: 'av'                                                                                                // 78
    }                                                                                                           // 79
});                                                                                                             // 80
                                                                                                                // 81
i18n.map('ua', {                                                                                                // 82
    reactiveTable: {                                                                                            // 83
        filter: 'Фільтр',                                                                                       // 84
        show: 'Показати',                                                                                       // 85
        rowsPerPage: 'рядків на сторінці',                                                                      // 86
        page: 'Сторінка',                                                                                       // 87
        of: 'з'                                                                                                 // 88
    }                                                                                                           // 89
});                                                                                                             // 90
                                                                                                                // 91
i18n.map('tr', {                                                                                                // 92
    reactiveTable: {                                                                                            // 93
        filter: 'Süz',                                                                                          // 94
        columns: 'Sütunlar',                                                                                    // 95
        show: 'Sayfa başına',                                                                                   // 96
        rowsPerPage: 'satır göster',                                                                            // 97
        page: 'Sayfa',                                                                                          // 98
        of: ' / '                                                                                               // 99
    }                                                                                                           // 100
});                                                                                                             // 101
                                                                                                                // 102
i18n.map('sk', {                                                                                                // 103
    reactiveTable: {                                                                                            // 104
        filter: 'Filter',                                                                                       // 105
        show: 'Zobraz',                                                                                         // 106
        rowsPerPage: 'riadkov na stranu',                                                                       // 107
        page: 'Strana',                                                                                         // 108
        of: 'z'                                                                                                 // 109
    }                                                                                                           // 110
});                                                                                                             // 111
                                                                                                                // 112
i18n.map('cs', {                                                                                                // 113
    reactiveTable: {                                                                                            // 114
        filter: 'Filter',                                                                                       // 115
        show: 'Zobraz',                                                                                         // 116
        rowsPerPage: 'řádků na stranu',                                                                         // 117
        page: 'Strana',                                                                                         // 118
        of: 'z'                                                                                                 // 119
    }                                                                                                           // 120
});                                                                                                             // 121
                                                                                                                // 122
i18n.map('he', {                                                                                                // 123
    reactiveTable: {                                                                                            // 124
        filter: 'פילטר',                                                                                        // 125
        show: 'הצג',                                                                                            // 126
        rowsPerPage: 'שורות לעמוד',                                                                             // 127
        page: 'עמוד',                                                                                           // 128
        of: 'מתוך'                                                                                              // 129
    }                                                                                                           // 130
});                                                                                                             // 131
                                                                                                                // 132
i18n.map('de', {                                                                                                // 133
    reactiveTable: {                                                                                            // 134
        filter: 'Filter',                                                                                       // 135
        columns: 'Spalten',                                                                                     // 136
        show: 'Zeige',                                                                                          // 137
        rowsPerPage: 'Zeilen pro Seite',                                                                        // 138
        page: 'Seite',                                                                                          // 139
        of: 'von'                                                                                               // 140
    }                                                                                                           // 141
});                                                                                                             // 142
                                                                                                                // 143
i18n.map('fi', {                                                                                                // 144
    reactiveTable: {                                                                                            // 145
        filter: 'Suodata',                                                                                      // 146
        show: 'Näytä',                                                                                          // 147
        rowsPerPage: 'riviä sivulla',                                                                           // 148
        page: 'Sivu',                                                                                           // 149
        of: ' / '                                                                                               // 150
    }                                                                                                           // 151
});                                                                                                             // 152
                                                                                                                // 153
i18n.map('no', {                                                                                                // 154
    reactiveTable: {                                                                                            // 155
        filter: 'Filter',                                                                                       // 156
        show: 'Vis',                                                                                            // 157
        rowsPerPage: 'rader per side',                                                                          // 158
        page: 'Side',                                                                                           // 159
        of: 'av'                                                                                                // 160
    }                                                                                                           // 161
});                                                                                                             // 162
                                                                                                                // 163
i18n.map('pl', {                                                                                                // 164
    reactiveTable: {                                                                                            // 165
        filter: 'Szukaj',                                                                                       // 166
        columns: 'Kolumny',                                                                                     // 167
        show: 'Pokaż',                                                                                          // 168
        rowsPerPage: 'pozycji na stronie',                                                                      // 169
        page: 'Strona',                                                                                         // 170
        of: 'z'                                                                                                 // 171
    }                                                                                                           // 172
});                                                                                                             // 173
                                                                                                                // 174
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ucsc-medbook:reactive-table/lib/reactive_table.js                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var ReactiveTableCounts = new Mongo.Collection("reactive-table-counts");                                        // 1
                                                                                                                // 2
var get = function(obj, field) {                                                                                // 3
  var keys = field.split('.');                                                                                  // 4
  var value = obj;                                                                                              // 5
                                                                                                                // 6
  _.each(keys, function (key) {                                                                                 // 7
      if (_.isObject(value) && _.isFunction(value[key])) {                                                      // 8
          value = value[key]();                                                                                 // 9
      } else if (_.isObject(value) && !_.isUndefined(value[key])) {                                             // 10
          value = value[key];                                                                                   // 11
      } else {                                                                                                  // 12
          value = null;                                                                                         // 13
      }                                                                                                         // 14
  });                                                                                                           // 15
                                                                                                                // 16
  return value;                                                                                                 // 17
};                                                                                                              // 18
                                                                                                                // 19
                                                                                                                // 20
var updateFilter = _.debounce(function (template, filterText) {                                                 // 21
    console.log("filterText", filterText);                                                                      // 22
    template.context.filter.set(filterText);                                                                    // 23
    Session.set("CRF_filter", filterText);                                                                      // 24
    template.context.currentPage.set(0);                                                                        // 25
}, 200);                                                                                                        // 26
                                                                                                                // 27
var updateHandle = _.debounce(function () {                                                                     // 28
    var context = this;                                                                                         // 29
    if (context.server) {                                                                                       // 30
        var newHandle;                                                                                          // 31
                                                                                                                // 32
        // Could use the table id, but this way we can wait to change the                                       // 33
        // page until the new data is ready, so it doesn't move around                                          // 34
        // while rows are added and removed                                                                     // 35
        var publicationId = _.uniqueId();                                                                       // 36
        var newPublishedRows = new Mongo.Collection('reactive-table-rows-' + publicationId);                    // 37
        context.nextPublicationId.set(publicationId);                                                           // 38
                                                                                                                // 39
        var rowsPerPage = context.rowsPerPage.get();                                                            // 40
        var currentPage = context.currentPage.get();                                                            // 41
        var currentIndex = currentPage * rowsPerPage;                                                           // 42
                                                                                                                // 43
        var options = {                                                                                         // 44
            skip: currentIndex,                                                                                 // 45
            limit: rowsPerPage                                                                                  // 46
        };                                                                                                      // 47
        var sortQuery = {};                                                                                     // 48
                                                                                                                // 49
        var currentSortField = _.findWhere(context.fields, {fieldId: context.sortKey.get()});                   // 50
        if (currentSortField) {                                                                                 // 51
            sortQuery[currentSortField.key] = context.sortDirection.get();                                      // 52
        }                                                                                                       // 53
        options.sort = sortQuery;                                                                               // 54
        var filter = context.filter.get();                                                                      // 55
                                                                                                                // 56
        var onReady = function () {                                                                             // 57
            if (publicationId === context.nextPublicationId.get()) {                                            // 58
                context.ready.set(true);                                                                        // 59
                context.publicationId.set(publicationId);                                                       // 60
                context.publishedRows = newPublishedRows;                                                       // 61
                var oldHandle = context.handle;                                                                 // 62
                context.handle = newHandle;                                                                     // 63
                                                                                                                // 64
                if (oldHandle) {                                                                                // 65
                    oldHandle.stop();                                                                           // 66
                }                                                                                               // 67
            } else {                                                                                            // 68
                // another handle was created after this one                                                    // 69
                newHandle.stop();                                                                               // 70
            }                                                                                                   // 71
        };                                                                                                      // 72
        var onError = function (error) {                                                                        // 73
            console.log("ReactiveTable subscription error: " + error);                                          // 74
        };                                                                                                      // 75
        newHandle = Meteor.subscribe(                                                                           // 76
            "reactive-table-" + context.collection,                                                             // 77
            publicationId,                                                                                      // 78
            filter,                                                                                             // 79
            context.fields,                                                                                     // 80
            options,                                                                                            // 81
            context.rowsPerPage.get(),                                                                          // 82
            {onReady: onReady, onError: onError}                                                                // 83
        );                                                                                                      // 84
    }                                                                                                           // 85
}, 200);                                                                                                        // 86
                                                                                                                // 87
                                                                                                                // 88
var getDefaultFalseSetting = function (key, templateData) {                                                     // 89
    if (!_.isUndefined(templateData[key]) &&                                                                    // 90
        templateData[key]) {                                                                                    // 91
        return true;                                                                                            // 92
    }                                                                                                           // 93
    if (!_.isUndefined(templateData.settings) &&                                                                // 94
        !_.isUndefined(templateData.settings[key]) &&                                                           // 95
        templateData.settings[key]) {                                                                           // 96
        return true;                                                                                            // 97
    }                                                                                                           // 98
    return false;                                                                                               // 99
};                                                                                                              // 100
                                                                                                                // 101
var getDefaultTrueSetting = function (key, templateData) {                                                      // 102
    if (!_.isUndefined(templateData[key]) &&                                                                    // 103
        !templateData[key]) {                                                                                   // 104
        return false;                                                                                           // 105
    }                                                                                                           // 106
    if (!_.isUndefined(templateData.settings) &&                                                                // 107
        !_.isUndefined(templateData.settings[key]) &&                                                           // 108
        !templateData.settings[key]) {                                                                          // 109
        return false;                                                                                           // 110
    }                                                                                                           // 111
    return true;                                                                                                // 112
};                                                                                                              // 113
                                                                                                                // 114
/*                                                                                                              // 115
if (Meter.isClient)                                                                                             // 116
    Template.registerHelper("CRF_filter", function() {                                                          // 117
        var val = Session.get("CRF_filter");                                                                    // 118
        if (/^\s+$/.test(val))                                                                                  // 119
            return null;                                                                                        // 120
        return val;                                                                                             // 121
    });                                                                                                         // 122
*/                                                                                                              // 123
                                                                                                                // 124
var setup = function () {                                                                                       // 125
    var context = {};                                                                                           // 126
    var oldContext = this.context || {};                                                                        // 127
    context.templateData = this.data;                                                                           // 128
    this.data.settings = this.data.settings || {};                                                              // 129
    var collection = this.data.collection || this.data.settings.collection || this.data;                        // 130
                                                                                                                // 131
    if (!(collection instanceof Mongo.Collection)) {                                                            // 132
        if (_.isArray(collection)) {                                                                            // 133
            // collection is an array                                                                           // 134
            // create a new collection from the data                                                            // 135
            var data = collection;                                                                              // 136
            collection = new Mongo.Collection(null);                                                            // 137
            _.each(data, function (doc) {                                                                       // 138
                collection.insert(doc);                                                                         // 139
            });                                                                                                 // 140
        } else if (_.isFunction(collection.fetch)) {                                                            // 141
            // collection is a cursor                                                                           // 142
            // create a new collection that will reactively update                                              // 143
            var cursor = collection;                                                                            // 144
            collection = new Mongo.Collection(null);                                                            // 145
                                                                                                                // 146
            // copy over transforms from collection-helper package                                              // 147
            collection._transform = cursor._transform;                                                          // 148
            collection._name = cursor.collection._name;                                                         // 149
                                                                                                                // 150
            var addedCallback = function (doc) {                                                                // 151
                collection.insert(doc);                                                                         // 152
            };                                                                                                  // 153
            var changedCallback = function (doc, oldDoc) {                                                      // 154
                collection.update(oldDoc._id, doc);                                                             // 155
            };                                                                                                  // 156
            var removedCallback = function (oldDoc) {                                                           // 157
                collection.remove(oldDoc._id);                                                                  // 158
            };                                                                                                  // 159
            cursor.observe({added: addedCallback, changed: changedCallback, removed: removedCallback});         // 160
        } else if (_.isString(collection)) {                                                                    // 161
            // server side publication                                                                          // 162
            context.server = true;                                                                              // 163
            context.publicationId = new ReactiveVar();                                                          // 164
            context.nextPublicationId = new ReactiveVar();                                                      // 165
            context.publishedRows = new Mongo.Collection(null);                                                 // 166
        } else {                                                                                                // 167
            console.error("reactiveTable error: argument is not an instance of Mongo.Collection, a cursor, or an array");
            collection = new Mongo.Collection(null);                                                            // 169
        }                                                                                                       // 170
    }                                                                                                           // 171
    context.collection = collection;                                                                            // 172
                                                                                                                // 173
    var fields = this.data.fields || this.data.settings.fields || {};                                           // 174
    if (_.keys(fields).length < 1 ||                                                                            // 175
        (_.keys(fields).length === 1 &&                                                                         // 176
         _.keys(fields)[0] === 'hash')) {                                                                       // 177
        fields = _.without(_.keys(collection.findOne() || {}), '_id');                                          // 178
    }                                                                                                           // 179
                                                                                                                // 180
    var fieldIdsArePresentAndUnique = function (fields) {                                                       // 181
        var uniqueFieldIds = _.chain(fields)                                                                    // 182
            .filter(function (field) {                                                                          // 183
                return !_.isUndefined(field.fieldId)                                                            // 184
            })                                                                                                  // 185
            .map(function (field) {                                                                             // 186
                return field.fieldId;                                                                           // 187
            })                                                                                                  // 188
            .uniq()                                                                                             // 189
            .value();                                                                                           // 190
        return uniqueFieldIds.length === fields.length;                                                         // 191
    };                                                                                                          // 192
                                                                                                                // 193
    // If at least one field specifies a fieldId, all fields must specify a                                     // 194
    // fieldId with a unique value                                                                              // 195
    if (_.find(fields, function (field) {                                                                       // 196
        return !_.isUndefined(field.fieldId)                                                                    // 197
        }) && !fieldIdsArePresentAndUnique(fields)) {                                                           // 198
        console.error("reactiveTable error: all fields must have a unique-valued fieldId if at least one has a fieldId attribute");
        fields = [];                                                                                            // 200
    }                                                                                                           // 201
                                                                                                                // 202
    var sortKey = null;                                                                                         // 203
    var sortDirection = 1;                                                                                      // 204
    var filterNulls = true;                                                                                     // 205
                                                                                                                // 206
    var normalizeField = function (field) {                                                                     // 207
        if (typeof field === 'string') {                                                                        // 208
            return {key: field, label: field};                                                                  // 209
        } else {                                                                                                // 210
            return field;                                                                                       // 211
        }                                                                                                       // 212
    };                                                                                                          // 213
                                                                                                                // 214
    var parseField = function (field, i) {                                                                      // 215
        var normalizedField = normalizeField(field);                                                            // 216
        if (!_.has(normalizedField, 'fieldId')) {                                                               // 217
            // Default fieldId to index in fields array if not present                                          // 218
            normalizedField.fieldId = i.toString();                                                             // 219
        }                                                                                                       // 220
        if (normalizedField.sort) {                                                                             // 221
            sortKey = normalizedField.fieldId;                                                                  // 222
            if (normalizedField.sort === 'desc' || normalizedField.sort === 'descending'  || normalizedField.sort === -1) {
                sortDirection = -1;                                                                             // 224
            }                                                                                                   // 225
        }                                                                                                       // 226
        return normalizedField;                                                                                 // 227
    };                                                                                                          // 228
                                                                                                                // 229
    fields = _.map(fields, parseField);                                                                         // 230
    if (!sortKey) {                                                                                             // 231
        // Default to sort of first column                                                                      // 232
        sortKey = (fields[0]) ? fields[0].fieldId : null;                                                       // 233
    }                                                                                                           // 234
    context.fields = fields;                                                                                    // 235
    context.sortKey = !_.isUndefined(oldContext.sortKey) ? oldContext.sortKey : new ReactiveVar(sortKey);       // 236
    context.sortDirection = !_.isUndefined(oldContext.sortDirection) ? oldContext.sortDirection : new ReactiveVar(sortDirection);
    context.filterNulls = !_.isUndefined(oldContext.filterNulls) ? oldContext.sortDirection : new ReactiveVar(filterNulls);
                                                                                                                // 239
    var visibleFields = [];                                                                                     // 240
    _.each(fields, function (field, i) {                                                                        // 241
        visibleFields.push({fieldId:field.fieldId, isVisible:getDefaultFieldVisibility(field)});                // 242
    });                                                                                                         // 243
    context.visibleFields = (!_.isUndefined(oldContext.visibleFields) && !_.isEmpty(oldContext.visibleFields)) ? oldContext.visibleFields : new ReactiveVar(visibleFields);
                                                                                                                // 245
                                                                                                                // 246
    var rowClass = this.data.rowClass || this.data.settings.rowClass || function() {return ''};                 // 247
    if (typeof rowClass === 'string') {                                                                         // 248
        var tmp = rowClass;                                                                                     // 249
        rowClass = function(obj) { return tmp; };                                                               // 250
    }                                                                                                           // 251
    context.rowClass = rowClass;                                                                                // 252
                                                                                                                // 253
    context.class = this.data.class || this.data.settings.class || 'table table-striped table-hover col-sm-12'; // 254
    context.id = this.data.id || this.data.settings.id || _.uniqueId('reactive-table-');                        // 255
                                                                                                                // 256
    context.showNavigation = this.data.showNavigation || this.data.settings.showNavigation || 'always';         // 257
    context.showNavigationRowsPerPage = getDefaultTrueSetting('showNavigationRowsPerPage', this.data);          // 258
    context.rowsPerPage =  !_.isUndefined(oldContext.rowsPerPage) ? oldContext.rowsPerPage : new ReactiveVar(this.data.rowsPerPage || this.data.settings.rowsPerPage || 10);
    context.currentPage = !_.isUndefined(oldContext.currentPage) ? oldContext.currentPage : new ReactiveVar(0); // 260
                                                                                                                // 261
    context.filter = !_.isUndefined(oldContext.filter) ? oldContext.filter : new ReactiveVar(null);             // 262
    context.showFilter = getDefaultTrueSetting('showFilter', this.data);                                        // 263
                                                                                                                // 264
    context.showColumnToggles = getDefaultFalseSetting('showColumnToggles', this.data);                         // 265
                                                                                                                // 266
    if (_.isUndefined(this.data.useFontAwesome)) {                                                              // 267
        if (!_.isUndefined(this.data.settings.useFontAwesome)) {                                                // 268
            context.useFontAwesome = this.data.settings.useFontAwesome;                                         // 269
        } else if (!_.isUndefined(Package['fortawesome:fontawesome'])) {                                        // 270
            context.useFontAwesome = true;                                                                      // 271
        } else {                                                                                                // 272
            context.useFontAwesome = false;                                                                     // 273
        }                                                                                                       // 274
    } else {                                                                                                    // 275
        context.useFontAwesome = this.data.useFontAwesome;                                                      // 276
    }                                                                                                           // 277
    context.enableRegex = getDefaultFalseSetting('enableRegex', this.data);                                     // 278
                                                                                                                // 279
    context.ready = new ReactiveVar(true);                                                                      // 280
                                                                                                                // 281
    if (context.server) {                                                                                       // 282
        context.ready.set(false);                                                                               // 283
        updateHandle.call(context);                                                                             // 284
    }                                                                                                           // 285
                                                                                                                // 286
    context.reactiveTableSetup = true;                                                                          // 287
                                                                                                                // 288
    context.filter.set(Session.get("CRF_filter"));                                                              // 289
                                                                                                                // 290
    this.context = context;                                                                                     // 291
};                                                                                                              // 292
                                                                                                                // 293
                                                                                                                // 294
var getDefaultFieldVisibility = function (field) {                                                              // 295
    return !field.hidden || (_.isFunction(field.hidden) && !field.hidden());                                    // 296
}                                                                                                               // 297
                                                                                                                // 298
var getPageCount = function () {                                                                                // 299
    var count;                                                                                                  // 300
    var rowsPerPage = this.rowsPerPage.get();                                                                   // 301
    if (this.server) {                                                                                          // 302
        count = ReactiveTableCounts.findOne(this.publicationId.get());                                          // 303
        return Math.ceil((count ? count.count : 0) / rowsPerPage);                                              // 304
    } else {                                                                                                    // 305
        var filterQuery = getFilterQuery(this.filter.get(), this.fields, {enableRegex: this.enableRegex});      // 306
        count = this.collection.find(filterQuery).count();                                                      // 307
        return Math.ceil(count / rowsPerPage);                                                                  // 308
    }                                                                                                           // 309
};                                                                                                              // 310
                                                                                                                // 311
function excludeNulls(filterQuery, sortKeyField_key) {                                                          // 312
    if (sortKeyField_key in filterQuery) {                                                                      // 313
        var previousQuery = filterQuery[sortKeyField_key];                                                      // 314
        filterQuery[sortKeyField_key] =                                                                         // 315
            {$and: [                                                                                            // 316
                    previousQuery,                                                                              // 317
                    { $ne: null }                                                                               // 318
                ]                                                                                               // 319
            };                                                                                                  // 320
    } else                                                                                                      // 321
        filterQuery[sortKeyField_key] = { $ne: null }                                                           // 322
}                                                                                                               // 323
                                                                                                                // 324
                                                                                                                // 325
Template.reactiveTable.helpers({                                                                                // 326
                                                                                                                // 327
    'context': function () {                                                                                    // 328
        if (!Template.instance().context ||                                                                     // 329
            !_.isEqual(this, Template.instance().context.templateData)) {                                       // 330
            setup.call(Template.instance());                                                                    // 331
        }                                                                                                       // 332
        return Template.instance().context;                                                                     // 333
    },                                                                                                          // 334
                                                                                                                // 335
    'ready' : function () {                                                                                     // 336
        return this.ready.get();                                                                                // 337
    },                                                                                                          // 338
                                                                                                                // 339
    'getField': function (object) {                                                                             // 340
        var fn = this.fn || function (value) { return value; };                                                 // 341
        var key = this.key || this;                                                                             // 342
        var value = get(object, key);                                                                           // 343
        return fn(value, object);                                                                               // 344
    },                                                                                                          // 345
                                                                                                                // 346
    'getFieldIndex': function () {                                                                              // 347
        return _.indexOf(Template.parentData(1).fields, this);                                                  // 348
    },                                                                                                          // 349
                                                                                                                // 350
    'getFieldFieldId': function () {                                                                            // 351
        return this.fieldId;                                                                                    // 352
    },                                                                                                          // 353
                                                                                                                // 354
    'getKey': function () {                                                                                     // 355
        return this.key || this;                                                                                // 356
    },                                                                                                          // 357
                                                                                                                // 358
    'getHeaderClass': function () {                                                                             // 359
        if (_.isUndefined(this.headerClass)) {                                                                  // 360
            return this.key;                                                                                    // 361
        }                                                                                                       // 362
        var css;                                                                                                // 363
        if (_.isFunction(this.headerClass)) {                                                                   // 364
            css = this.headerClass();                                                                           // 365
        } else {                                                                                                // 366
            css = this.headerClass;                                                                             // 367
        }                                                                                                       // 368
        return css;                                                                                             // 369
    },                                                                                                          // 370
                                                                                                                // 371
    'getCellClass': function (object) {                                                                         // 372
        if (_.isUndefined(this.cellClass)) {                                                                    // 373
            return this.key;                                                                                    // 374
        }                                                                                                       // 375
        var css;                                                                                                // 376
        if (_.isFunction(this.cellClass)) {                                                                     // 377
            var value = get(object, this.key);                                                                  // 378
            css = this.cellClass(value, object);                                                                // 379
        } else {                                                                                                // 380
            css = this.cellClass;                                                                               // 381
        }                                                                                                       // 382
        return css;                                                                                             // 383
    },                                                                                                          // 384
                                                                                                                // 385
    'labelIsTemplate': function () {                                                                            // 386
        return this.label && _.isObject(this.label) && this.label instanceof Blaze.Template;                    // 387
    },                                                                                                          // 388
                                                                                                                // 389
    'getLabel': function () {                                                                                   // 390
        return _.isString(this.label) ? this.label : this.label();                                              // 391
    },                                                                                                          // 392
                                                                                                                // 393
    'isSortKey': function () {                                                                                  // 394
        var parentData = Template.parentData(1);                                                                // 395
        return parentData.sortKey.get() === this.fieldId;                                                       // 396
    },                                                                                                          // 397
                                                                                                                // 398
    'isSortable': function () {                                                                                 // 399
        return (this.sortable == undefined) ? true : this.sortable;                                             // 400
    },                                                                                                          // 401
                                                                                                                // 402
    'isVisible': function () {                                                                                  // 403
        var self = this; // is a field object                                                                   // 404
        var topLevelData;                                                                                       // 405
        if (Template.parentData(2) && Template.parentData(2).reactiveTableSetup) {                              // 406
          topLevelData = Template.parentData(2);                                                                // 407
        } else {                                                                                                // 408
          topLevelData = Template.parentData(1);                                                                // 409
        }                                                                                                       // 410
        var visibleFields = topLevelData.visibleFields.get();                                                   // 411
        var fields = topLevelData.fields;                                                                       // 412
                                                                                                                // 413
        var visibleField = _.findWhere(visibleFields, {fieldId: self.fieldId});                                 // 414
        if (visibleField) {                                                                                     // 415
            return visibleField.isVisible;                                                                      // 416
        } else {                                                                                                // 417
            // Add field to visibleFields list                                                                  // 418
            var _isVisible = getDefaultFieldVisibility(self);                                                   // 419
            visibleFields.push({fieldId:self.fieldId, isVisible:_isVisible});                                   // 420
            topLevelData.visibleFields.set(visibleFields);                                                      // 421
            return _isVisible;                                                                                  // 422
        }                                                                                                       // 423
    },                                                                                                          // 424
                                                                                                                // 425
    'isAscending' : function () {                                                                               // 426
        var sortDirection = Template.parentData(1).sortDirection.get();                                         // 427
        return (sortDirection === 1);                                                                           // 428
    },                                                                                                          // 429
                                                                                                                // 430
    'sortedRows': function () {                                                                                 // 431
        if (this.server) {                                                                                      // 432
            return this.publishedRows.find({                                                                    // 433
              "reactive-table-id": this.publicationId.get()                                                     // 434
            }, {                                                                                                // 435
              sort: {                                                                                           // 436
                "reactive-table-sort": 1                                                                        // 437
              }                                                                                                 // 438
            });                                                                                                 // 439
        } else  {                                                                                               // 440
            var sortDirection = this.sortDirection.get();                                                       // 441
            var filterNulls = this.filterNulls.get();                                                           // 442
            var sortKeyFieldId = this.sortKey.get();                                                            // 443
            var sortKeyField = _.findWhere(this.fields, {fieldId: sortKeyFieldId});                             // 444
                                                                                                                // 445
            var limit = this.rowsPerPage.get();                                                                 // 446
            var currentPage = this.currentPage.get();                                                           // 447
            var skip = currentPage * limit;                                                                     // 448
            var filterQuery = getFilterQuery(this.filter.get(), this.fields, {enableRegex: this.enableRegex});  // 449
                                                                                                                // 450
                                                                                                                // 451
            if (!sortKeyField) {                                                                                // 452
                // No sort field set, return unsorted collection                                                // 453
                return this.collection.find(filterQuery, {                                                      // 454
                    skip: skip,                                                                                 // 455
                    limit: limit                                                                                // 456
                });                                                                                             // 457
            } else if (sortKeyField.fn && !sortKeyField.sortByValue) {                                          // 458
                                                                                                                // 459
                if (filterNulls)                                                                                // 460
                    excludeNulls(filterQuery, sortKeyField.key);                                                // 461
                                                                                                                // 462
                var data = this.collection.find(filterQuery).fetch();                                           // 463
                var sorted =_.sortBy(data, function (object) {                                                  // 464
                    return sortKeyField.fn(object[sortKeyField.key], object);                                   // 465
                });                                                                                             // 466
                if (sortDirection === -1) {                                                                     // 467
                    sorted = sorted.reverse();                                                                  // 468
                }                                                                                               // 469
                return sorted.slice(skip, skip + limit);                                                        // 470
            } else {                                                                                            // 471
                var sortKey = sortKeyField.key || sortKeyField;                                                 // 472
                var sortQuery = {};                                                                             // 473
                                                                                                                // 474
                excludeNulls(filterQuery, sortKeyField.key);                                                    // 475
                                                                                                                // 476
                filterQuery[sortKeyField.key]  = { $ne: null };  // don't let nulls in                          // 477
                                                                                                                // 478
                return this.collection.find(filterQuery, {                                                      // 479
                    sort: sortQuery,                                                                            // 480
                    skip: skip,                                                                                 // 481
                    limit: limit                                                                                // 482
                });                                                                                             // 483
            }                                                                                                   // 484
        }                                                                                                       // 485
    },                                                                                                          // 486
                                                                                                                // 487
    'filter' : function () {                                                                                    // 488
        return this.filter.get() || '';                                                                         // 489
    },                                                                                                          // 490
                                                                                                                // 491
    'getPageCount' : getPageCount,                                                                              // 492
                                                                                                                // 493
    'getRowsPerPage' : function () {                                                                            // 494
        return this.rowsPerPage.get();                                                                          // 495
    },                                                                                                          // 496
                                                                                                                // 497
    'getCurrentPage' : function () {                                                                            // 498
        return 1 + this.currentPage.get();                                                                      // 499
    },                                                                                                          // 500
                                                                                                                // 501
    'isntFirstPage' : function () {                                                                             // 502
        return this.currentPage.get() > 0;                                                                      // 503
    },                                                                                                          // 504
                                                                                                                // 505
    'isntLastPage' : function () {                                                                              // 506
        var currentPage = 1 + this.currentPage.get();                                                           // 507
        var pageCount = getPageCount.call(this);                                                                // 508
        return currentPage < pageCount;                                                                         // 509
    },                                                                                                          // 510
                                                                                                                // 511
    'showNavigation' : function () {                                                                            // 512
        if (this.showNavigation === 'always') return true;                                                      // 513
        if (this.showNavigation === 'never') return false;                                                      // 514
        return getPageCount.call(this) > 1;                                                                     // 515
    }                                                                                                           // 516
});                                                                                                             // 517
                                                                                                                // 518
Template.reactiveTable.events({                                                                                 // 519
    'change .filterNulls': function (event) {                                                                   // 520
        var template = Template.instance();                                                                     // 521
        console.log("filterNulls", event.target.value);                                                         // 522
        template.context.filterNulls.set(event.target.checked);                                                 // 523
    },                                                                                                          // 524
    'click .reactive-table .sortable': function (event) {                                                       // 525
        var template = Template.instance();                                                                     // 526
        var target = $(event.target).is('i') ? $(event.target).parent() : $(event.target);                      // 527
        var sortFieldId = target.attr('fieldid');                                                               // 528
        var currentSortFieldId = template.context.sortKey.get();                                                // 529
        if (currentSortFieldId === sortFieldId) {                                                               // 530
            var sortDirection = -1 * template.context.sortDirection.get();                                      // 531
            template.context.sortDirection.set(sortDirection);                                                  // 532
        } else {                                                                                                // 533
            template.context.sortKey.set(sortFieldId);                                                          // 534
        }                                                                                                       // 535
        updateHandle.call(template.context);                                                                    // 536
    },                                                                                                          // 537
                                                                                                                // 538
    'change .reactive-table-columns-dropdown input': function (event) {                                         // 539
        var template = Template.instance();                                                                     // 540
        var target = $(event.target);                                                                           // 541
        var fieldId = target.attr('data-fieldid');                                                              // 542
        var visibleFields = template.context.visibleFields.get();                                               // 543
        var visibleField = _.findWhere(visibleFields, {fieldId: fieldId});                                      // 544
        if (visibleField) {                                                                                     // 545
            // Toggle visibility                                                                                // 546
            visibleField.isVisible = !visibleField.isVisible;                                                   // 547
            template.context.visibleFields.set(visibleFields);                                                  // 548
        }                                                                                                       // 549
    },                                                                                                          // 550
                                                                                                                // 551
    'keyup .reactive-table-filter .reactive-table-input, input .reactive-table-filter .reactive-table-input': function (event) {
        var template = Template.instance();                                                                     // 553
        var filterText = $(event.target).val();                                                                 // 554
        updateFilter(template, filterText);                                                                     // 555
        updateHandle.call(template.context);                                                                    // 556
    },                                                                                                          // 557
                                                                                                                // 558
    'change .reactive-table-navigation .rows-per-page input': function (event) {                                // 559
        var rowsPerPage = Math.max(~~$(event.target).val(), 1);                                                 // 560
        Template.instance().context.rowsPerPage.set(rowsPerPage);                                               // 561
        $(event.target).val(rowsPerPage);                                                                       // 562
        updateHandle.call(Template.instance().context);                                                         // 563
    },                                                                                                          // 564
                                                                                                                // 565
    'change .reactive-table-navigation .page-number input': function (event) {                                  // 566
        var currentPage = Math.max(~~$(event.target).val(), 1);                                                 // 567
        var pageCount = getPageCount.call(this);                                                                // 568
        if (currentPage > pageCount) {                                                                          // 569
          currentPage = pageCount;                                                                              // 570
        }                                                                                                       // 571
        if (currentPage < 0) {                                                                                  // 572
          currentPage = 1;                                                                                      // 573
        }                                                                                                       // 574
        Template.instance().context.currentPage.set(currentPage - 1);                                           // 575
        $(event.target).val(currentPage);                                                                       // 576
        updateHandle.call(Template.instance().context);                                                         // 577
    },                                                                                                          // 578
                                                                                                                // 579
    'click .reactive-table-navigation .previous-page': function (event) {                                       // 580
        var template = Template.instance();                                                                     // 581
        var currentPage = template.context.currentPage.get();                                                   // 582
        template.context.currentPage.set(currentPage - 1);                                                      // 583
        updateHandle.call(template.context);                                                                    // 584
    },                                                                                                          // 585
                                                                                                                // 586
    'click .reactive-table-navigation .next-page': function (event) {                                           // 587
        var template = Template.instance();                                                                     // 588
        var currentPage = template.context.currentPage.get();                                                   // 589
        template.context.currentPage.set(currentPage + 1);                                                      // 590
        updateHandle.call(template.context);                                                                    // 591
    }                                                                                                           // 592
});                                                                                                             // 593
                                                                                                                // 594
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ucsc-medbook:reactive-table/lib/filter.js                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var parseFilterString = function (filterString) {                                                               // 1
  var startQuoteRegExp = /^[\'\"]/;                                                                             // 2
  var endQuoteRegExp = /[\'\"]$/;                                                                               // 3
  var filters = [];                                                                                             // 4
  var words = filterString.split(' ');                                                                          // 5
                                                                                                                // 6
  var inQuote = false;                                                                                          // 7
  var quotedWord = '';                                                                                          // 8
  _.each(words, function (word) {                                                                               // 9
    if (inQuote) {                                                                                              // 10
      if (endQuoteRegExp.test(word)) {                                                                          // 11
        filters.push(quotedWord + ' ' + word.slice(0, word.length - 1));                                        // 12
        inQuote = false;                                                                                        // 13
        quotedWord = '';                                                                                        // 14
      } else {                                                                                                  // 15
        quotedWord = quotedWord + ' ' + word;                                                                   // 16
      }                                                                                                         // 17
    } else if (startQuoteRegExp.test(word)) {                                                                   // 18
      if (endQuoteRegExp.test(word)) {                                                                          // 19
        filters.push(word.slice(1, word.length - 1));                                                           // 20
      } else {                                                                                                  // 21
        inQuote = true;                                                                                         // 22
        quotedWord = word.slice(1, word.length);                                                                // 23
      }                                                                                                         // 24
    } else {                                                                                                    // 25
      filters.push(word);                                                                                       // 26
    }                                                                                                           // 27
  });                                                                                                           // 28
  return filters;                                                                                               // 29
};                                                                                                              // 30
                                                                                                                // 31
var escapeRegex = function(text) {                                                                              // 32
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");                                                      // 33
};                                                                                                              // 34
                                                                                                                // 35
getFilterQuery = function (filter, fields, settings) {                                                          // 36
  settings = settings || {};                                                                                    // 37
  if (settings.enableRegex === undefined) {                                                                     // 38
    settings.enableRegex = false;                                                                               // 39
  }                                                                                                             // 40
  if (settings.fields) {                                                                                        // 41
    if (_.any(settings.fields, function (include) { return include; })) {                                       // 42
      fields = _.filter(fields, function (field) {                                                              // 43
        return settings.fields[field.key];                                                                      // 44
      });                                                                                                       // 45
    } else {                                                                                                    // 46
      fields = _.filter(fields, function (field) {                                                              // 47
        return _.isUndefined(settings.fields[field.key]) || settings.fields[field.key];                         // 48
      });                                                                                                       // 49
    }                                                                                                           // 50
  }                                                                                                             // 51
  var numberRegExp = /^\d+$/;                                                                                   // 52
  var queryList = [];                                                                                           // 53
  if (filter) {                                                                                                 // 54
    var filters = parseFilterString(filter);                                                                    // 55
    _.each(filters, function (filterWord) {                                                                     // 56
      if (settings.enableRegex === false) {                                                                     // 57
        filterWord = escapeRegex(filterWord);                                                                   // 58
      }                                                                                                         // 59
      var filterQueryList = [];                                                                                 // 60
      _.each(fields, function (field) {                                                                         // 61
        var filterRegExp = new RegExp(filterWord, 'i');                                                         // 62
        var query = {};                                                                                         // 63
        query[field.key || field] = filterRegExp;                                                               // 64
        filterQueryList.push(query);                                                                            // 65
                                                                                                                // 66
        if (numberRegExp.test(filterWord)) {                                                                    // 67
          var numberQuery = {};                                                                                 // 68
          numberQuery[field.key || field] = parseInt(filterWord, 10);                                           // 69
          filterQueryList.push(numberQuery);                                                                    // 70
        }                                                                                                       // 71
      });                                                                                                       // 72
      if (filterQueryList.length) {                                                                             // 73
        var filterQuery = {'$or': filterQueryList};                                                             // 74
        queryList.push(filterQuery);                                                                            // 75
      }                                                                                                         // 76
    });                                                                                                         // 77
  }                                                                                                             // 78
  return queryList.length ? {'$and': queryList} : {};                                                           // 79
};                                                                                                              // 80
                                                                                                                // 81
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ucsc-medbook:reactive-table'] = {};

})();
