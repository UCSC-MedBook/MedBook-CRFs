(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/ucsc-medbook:reactive-table/lib/filter.js                                                         //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var parseFilterString = function (filterString) {                                                             // 1
  var startQuoteRegExp = /^[\'\"]/;                                                                           // 2
  var endQuoteRegExp = /[\'\"]$/;                                                                             // 3
  var filters = [];                                                                                           // 4
  var words = filterString.split(' ');                                                                        // 5
                                                                                                              // 6
  var inQuote = false;                                                                                        // 7
  var quotedWord = '';                                                                                        // 8
  _.each(words, function (word) {                                                                             // 9
    if (inQuote) {                                                                                            // 10
      if (endQuoteRegExp.test(word)) {                                                                        // 11
        filters.push(quotedWord + ' ' + word.slice(0, word.length - 1));                                      // 12
        inQuote = false;                                                                                      // 13
        quotedWord = '';                                                                                      // 14
      } else {                                                                                                // 15
        quotedWord = quotedWord + ' ' + word;                                                                 // 16
      }                                                                                                       // 17
    } else if (startQuoteRegExp.test(word)) {                                                                 // 18
      if (endQuoteRegExp.test(word)) {                                                                        // 19
        filters.push(word.slice(1, word.length - 1));                                                         // 20
      } else {                                                                                                // 21
        inQuote = true;                                                                                       // 22
        quotedWord = word.slice(1, word.length);                                                              // 23
      }                                                                                                       // 24
    } else {                                                                                                  // 25
      filters.push(word);                                                                                     // 26
    }                                                                                                         // 27
  });                                                                                                         // 28
  return filters;                                                                                             // 29
};                                                                                                            // 30
                                                                                                              // 31
var escapeRegex = function(text) {                                                                            // 32
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");                                                    // 33
};                                                                                                            // 34
                                                                                                              // 35
getFilterQuery = function (filter, fields, settings) {                                                        // 36
  settings = settings || {};                                                                                  // 37
  if (settings.enableRegex === undefined) {                                                                   // 38
    settings.enableRegex = false;                                                                             // 39
  }                                                                                                           // 40
  if (settings.fields) {                                                                                      // 41
    if (_.any(settings.fields, function (include) { return include; })) {                                     // 42
      fields = _.filter(fields, function (field) {                                                            // 43
        return settings.fields[field.key];                                                                    // 44
      });                                                                                                     // 45
    } else {                                                                                                  // 46
      fields = _.filter(fields, function (field) {                                                            // 47
        return _.isUndefined(settings.fields[field.key]) || settings.fields[field.key];                       // 48
      });                                                                                                     // 49
    }                                                                                                         // 50
  }                                                                                                           // 51
  var numberRegExp = /^\d+$/;                                                                                 // 52
  var queryList = [];                                                                                         // 53
  if (filter) {                                                                                               // 54
    var filters = parseFilterString(filter);                                                                  // 55
    _.each(filters, function (filterWord) {                                                                   // 56
      if (settings.enableRegex === false) {                                                                   // 57
        filterWord = escapeRegex(filterWord);                                                                 // 58
      }                                                                                                       // 59
      var filterQueryList = [];                                                                               // 60
      _.each(fields, function (field) {                                                                       // 61
        var filterRegExp = new RegExp(filterWord, 'i');                                                       // 62
        var query = {};                                                                                       // 63
        query[field.key || field] = filterRegExp;                                                             // 64
        filterQueryList.push(query);                                                                          // 65
                                                                                                              // 66
        if (numberRegExp.test(filterWord)) {                                                                  // 67
          var numberQuery = {};                                                                               // 68
          numberQuery[field.key || field] = parseInt(filterWord, 10);                                         // 69
          filterQueryList.push(numberQuery);                                                                  // 70
        }                                                                                                     // 71
      });                                                                                                     // 72
      if (filterQueryList.length) {                                                                           // 73
        var filterQuery = {'$or': filterQueryList};                                                           // 74
        queryList.push(filterQuery);                                                                          // 75
      }                                                                                                       // 76
    });                                                                                                       // 77
  }                                                                                                           // 78
  return queryList.length ? {'$and': queryList} : {};                                                         // 79
};                                                                                                            // 80
                                                                                                              // 81
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/ucsc-medbook:reactive-table/lib/server.js                                                         //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
ReactiveTable = {};                                                                                           // 1
                                                                                                              // 2
ReactiveTable.publish = function (name, collectionOrFunction, selectorOrFunction, settings) {                 // 3
    Meteor.publish("reactive-table-" + name, function (publicationId, filter, fields, options, rowsPerPage) { // 4
      var collection;                                                                                         // 5
      var selector;                                                                                           // 6
                                                                                                              // 7
      if (_.isFunction(collectionOrFunction)) {                                                               // 8
        collection = collectionOrFunction.call(this);                                                         // 9
      } else {                                                                                                // 10
        collection = collectionOrFunction;                                                                    // 11
      }                                                                                                       // 12
                                                                                                              // 13
      if (!(collection instanceof Mongo.Collection)) {                                                        // 14
        console.log("ReactiveTable.publish: no collection to publish");                                       // 15
        return [];                                                                                            // 16
      }                                                                                                       // 17
                                                                                                              // 18
      if (_.isFunction(selectorOrFunction)) {                                                                 // 19
        selector = selectorOrFunction.call(this);                                                             // 20
      } else {                                                                                                // 21
        selector = selectorOrFunction;                                                                        // 22
      }                                                                                                       // 23
      var self = this;                                                                                        // 24
      var filterQuery = _.extend(getFilterQuery(filter, fields, settings), selector);                         // 25
      if (settings && settings.fields) {                                                                      // 26
        options.fields = settings.fields;                                                                     // 27
      }                                                                                                       // 28
      var cursor = collection.find(filterQuery, options);                                                     // 29
      var count = cursor.count();                                                                             // 30
                                                                                                              // 31
      var getRow = function (row, index) {                                                                    // 32
        return _.extend({                                                                                     // 33
          "reactive-table-id": publicationId,                                                                 // 34
          "reactive-table-sort": index                                                                        // 35
        }, row);                                                                                              // 36
      };                                                                                                      // 37
                                                                                                              // 38
      var getRows = function () {                                                                             // 39
        return _.map(cursor.fetch(), getRow);                                                                 // 40
      };                                                                                                      // 41
      var rows = {};                                                                                          // 42
      _.each(getRows(), function (row) {                                                                      // 43
        rows[row._id] = row;                                                                                  // 44
      });                                                                                                     // 45
                                                                                                              // 46
      var updateRows = function () {                                                                          // 47
        var newRows = getRows();                                                                              // 48
        _.each(newRows, function (row, index) {                                                               // 49
          var oldRow = rows[row._id];                                                                         // 50
          if (oldRow) {                                                                                       // 51
            if (!_.isEqual(oldRow, row)) {                                                                    // 52
              self.changed("reactive-table-rows-" + publicationId, row._id, row);                             // 53
              rows[row._id] = row;                                                                            // 54
            }                                                                                                 // 55
          } else {                                                                                            // 56
            self.added("reactive-table-rows-" + publicationId, row._id, row);                                 // 57
            rows[row._id] = row;                                                                              // 58
          }                                                                                                   // 59
        });                                                                                                   // 60
      };                                                                                                      // 61
                                                                                                              // 62
      self.added("reactive-table-counts", publicationId, {count: count});                                     // 63
      _.each(rows, function (row) {                                                                           // 64
        self.added("reactive-table-rows-" + publicationId, row._id, row);                                     // 65
      });                                                                                                     // 66
                                                                                                              // 67
      var initializing = true;                                                                                // 68
                                                                                                              // 69
      var handle = cursor.observeChanges({                                                                    // 70
        added: function (id, fields) {                                                                        // 71
          if (!initializing) {                                                                                // 72
            self.changed("reactive-table-counts", publicationId, {count: cursor.count()});                    // 73
            updateRows();                                                                                     // 74
          }                                                                                                   // 75
        },                                                                                                    // 76
                                                                                                              // 77
        removed: function (id, fields) {                                                                      // 78
          self.changed("reactive-table-counts", publicationId, {count: cursor.count()});                      // 79
          self.removed("reactive-table-rows-" + publicationId, id);                                           // 80
          delete rows[id];                                                                                    // 81
          updateRows();                                                                                       // 82
        },                                                                                                    // 83
                                                                                                              // 84
        changed: function (id, fields) {                                                                      // 85
          updateRows();                                                                                       // 86
        }                                                                                                     // 87
                                                                                                              // 88
      });                                                                                                     // 89
      initializing = false;                                                                                   // 90
                                                                                                              // 91
      self.ready();                                                                                           // 92
                                                                                                              // 93
      self.onStop(function () {                                                                               // 94
        handle.stop();                                                                                        // 95
      });                                                                                                     // 96
    });                                                                                                       // 97
};                                                                                                            // 98
                                                                                                              // 99
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
