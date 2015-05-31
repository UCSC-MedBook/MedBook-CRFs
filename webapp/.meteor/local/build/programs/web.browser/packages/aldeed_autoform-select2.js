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
var HTML = Package.htmljs.HTML;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/aldeed:autoform-select2/template.autoform-select2.js                                 //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
                                                                                                 // 1
Template.__checkName("afSelect2");                                                               // 2
Template["afSelect2"] = new Template("Template.afSelect2", (function() {                         // 3
  var view = this;                                                                               // 4
  return HTML.SELECT(HTML.Attrs(function() {                                                     // 5
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                      // 6
  }), "\n    ", Blaze.Each(function() {                                                          // 7
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                             // 8
  }, function() {                                                                                // 9
    return [ "\n    ", HTML.OPTION(HTML.Attrs(function() {                                       // 10
      return Spacebars.attrMustache(view.lookup("optionAtts"));                                  // 11
    }), Blaze.View(function() {                                                                  // 12
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                       // 13
    })), "\n    " ];                                                                             // 14
  }), "\n  ");                                                                                   // 15
}));                                                                                             // 16
                                                                                                 // 17
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/aldeed:autoform-select2/autoform-select2.js                                          //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
/* global AutoForm, _, $, Template */                                                            // 1
                                                                                                 // 2
AutoForm.addInputType("select2", {                                                               // 3
  template: "afSelect2",                                                                         // 4
  valueOut: function () {                                                                        // 5
    return this.select2("val");                                                                  // 6
  },                                                                                             // 7
  valueConverters: {                                                                             // 8
    "number": AutoForm.Utility.stringToNumber,                                                   // 9
    "numberArray": function (val) {                                                              // 10
      if (_.isArray(val)) {                                                                      // 11
        return _.map(val, function (item) {                                                      // 12
          item = $.trim(item);                                                                   // 13
          return AutoForm.Utility.stringToNumber(item);                                          // 14
        });                                                                                      // 15
      }                                                                                          // 16
      return val;                                                                                // 17
    },                                                                                           // 18
    "boolean": AutoForm.Utility.stringToBool,                                                    // 19
    "booleanArray": function (val) {                                                             // 20
      if (_.isArray(val)) {                                                                      // 21
        return _.map(val, function (item) {                                                      // 22
          item = $.trim(item);                                                                   // 23
          return AutoForm.Utility.stringToBool(item);                                            // 24
        });                                                                                      // 25
      }                                                                                          // 26
      return val;                                                                                // 27
    },                                                                                           // 28
    "date": AutoForm.Utility.stringToDate,                                                       // 29
    "dateArray": function (val) {                                                                // 30
      if (_.isArray(val)) {                                                                      // 31
        return _.map(val, function (item) {                                                      // 32
          item = $.trim(item);                                                                   // 33
          return AutoForm.Utility.stringToDate(item);                                            // 34
        });                                                                                      // 35
      }                                                                                          // 36
      return val;                                                                                // 37
    }                                                                                            // 38
  },                                                                                             // 39
  contextAdjust: function (context) {                                                            // 40
    //can fix issues with some browsers selecting the firstOption instead of the selected option // 41
    context.atts.autocomplete = "off";                                                           // 42
                                                                                                 // 43
    var itemAtts = _.omit(context.atts, 'firstOption');                                          // 44
    var firstOption = context.atts.firstOption;                                                  // 45
                                                                                                 // 46
    // build items list                                                                          // 47
    context.items = [];                                                                          // 48
                                                                                                 // 49
    // If a firstOption was provided, add that to the items list first                           // 50
    if (firstOption !== false) {                                                                 // 51
      context.items.push({                                                                       // 52
        name: context.name,                                                                      // 53
        label: (typeof firstOption === "string" ? firstOption : "(Select One)"),                 // 54
        value: "",                                                                               // 55
        // _id must be included because it is a special property that                            // 56
        // #each uses to track unique list items when adding and removing them                   // 57
        // See https://github.com/meteor/meteor/issues/2174                                      // 58
        _id: "",                                                                                 // 59
        selected: false,                                                                         // 60
        atts: itemAtts                                                                           // 61
      });                                                                                        // 62
    }                                                                                            // 63
                                                                                                 // 64
    // Add all defined options                                                                   // 65
    _.each(context.selectOptions, function(opt) {                                                // 66
      context.items.push({                                                                       // 67
        name: context.name,                                                                      // 68
        label: opt.label,                                                                        // 69
        value: opt.value,                                                                        // 70
        // _id must be included because it is a special property that                            // 71
        // #each uses to track unique list items when adding and removing them                   // 72
        // See https://github.com/meteor/meteor/issues/2174                                      // 73
        _id: opt.value,                                                                          // 74
        selected: (_.isArray(context.value) ?                                                    // 75
                   _.contains(context.value, opt.value) :                                        // 76
                   opt.value === context.value),                                                 // 77
        atts: itemAtts                                                                           // 78
      });                                                                                        // 79
    });                                                                                          // 80
                                                                                                 // 81
    return context;                                                                              // 82
  }                                                                                              // 83
});                                                                                              // 84
                                                                                                 // 85
Template.afSelect2.helpers({                                                                     // 86
  optionAtts: function afSelectOptionAtts() {                                                    // 87
    var item = this;                                                                             // 88
    var atts = {                                                                                 // 89
      value: item.value                                                                          // 90
    };                                                                                           // 91
    if (item.selected) {                                                                         // 92
      atts.selected = "";                                                                        // 93
    }                                                                                            // 94
    return atts;                                                                                 // 95
  }                                                                                              // 96
});                                                                                              // 97
                                                                                                 // 98
Template.afSelect2.rendered = function () {                                                      // 99
  var template = this;                                                                           // 100
                                                                                                 // 101
  // instanciate select2                                                                         // 102
  template.$('select').select2(template.data.atts.select2Options || {});                         // 103
                                                                                                 // 104
  template.autorun(function () {                                                                 // 105
    var data = Template.currentData();                                                           // 106
                                                                                                 // 107
    var values = [];                                                                             // 108
    _.each(data.items, function (item) {                                                         // 109
      if (item.selected) {                                                                       // 110
        values.push(item.value);                                                                 // 111
      }                                                                                          // 112
    });                                                                                          // 113
                                                                                                 // 114
    template.$('select').select2("val", values);                                                 // 115
  });                                                                                            // 116
};                                                                                               // 117
                                                                                                 // 118
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/aldeed:autoform-select2/themes/template.bootstrap3.js                                //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
                                                                                                 // 1
Template.__checkName("afSelect2_bootstrap3");                                                    // 2
Template["afSelect2_bootstrap3"] = new Template("Template.afSelect2_bootstrap3", (function() {   // 3
  var view = this;                                                                               // 4
  return HTML.SELECT(HTML.Attrs(function() {                                                     // 5
    return Spacebars.attrMustache(view.lookup("atts"));                                          // 6
  }), "\n    ", Blaze.Each(function() {                                                          // 7
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                             // 8
  }, function() {                                                                                // 9
    return [ "\n    ", HTML.OPTION(HTML.Attrs(function() {                                       // 10
      return Spacebars.attrMustache(view.lookup("optionAtts"));                                  // 11
    }), Blaze.View(function() {                                                                  // 12
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                       // 13
    })), "\n    " ];                                                                             // 14
  }), "\n  ");                                                                                   // 15
}));                                                                                             // 16
                                                                                                 // 17
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/aldeed:autoform-select2/themes/bootstrap3.js                                         //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
/* global Template, AutoForm */                                                                  // 1
                                                                                                 // 2
Template.afSelect2_bootstrap3.helpers({                                                          // 3
  optionAtts: function afSelectOptionAtts() {                                                    // 4
    var item = this;                                                                             // 5
    var atts = {                                                                                 // 6
      value: item.value                                                                          // 7
    };                                                                                           // 8
    if (item.selected) {                                                                         // 9
      atts.selected = "";                                                                        // 10
    }                                                                                            // 11
    return atts;                                                                                 // 12
  },                                                                                             // 13
  atts: function addFormControlAtts() {                                                          // 14
    var atts = _.clone(this.atts);                                                               // 15
    // Add bootstrap class                                                                       // 16
    atts = AutoForm.Utility.addClass(atts, "form-control");                                      // 17
    delete atts.select2Options;                                                                  // 18
    return atts;                                                                                 // 19
  }                                                                                              // 20
});                                                                                              // 21
                                                                                                 // 22
Template.afSelect2_bootstrap3.rendered = function () {                                           // 23
  var template = this;                                                                           // 24
                                                                                                 // 25
  // instanciate select2                                                                         // 26
  template.$('select').select2(template.data.atts.select2Options || {});                         // 27
                                                                                                 // 28
  template.autorun(function () {                                                                 // 29
    var data = Template.currentData();                                                           // 30
                                                                                                 // 31
    var values = [];                                                                             // 32
    _.each(data.items, function (item) {                                                         // 33
      if (item.selected) {                                                                       // 34
        values.push(item.value);                                                                 // 35
      }                                                                                          // 36
    });                                                                                          // 37
                                                                                                 // 38
    template.$('select').select2("val", values);                                                 // 39
  });                                                                                            // 40
};                                                                                               // 41
                                                                                                 // 42
///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aldeed:autoform-select2'] = {};

})();
