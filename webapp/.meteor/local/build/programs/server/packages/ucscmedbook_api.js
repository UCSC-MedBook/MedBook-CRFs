(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTTP = Package['cfs:http-methods'].HTTP;
var HTML = Package.htmljs.HTML;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ucscmedbook:api/server/genelist/genelist.js                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
console.log("Before HTTP Methods");                                                                             // 1
HTTP.methods({                                                                                                  // 2
                                                                                                                // 3
    genes: function(data){                                                                                      // 4
        console.log("IN HTTP Method genes");                                                                    // 5
        var items = [];                                                                                         // 6
        var seen = {}                                                                                           // 7
        Expression.find( {gene: {$regex: "^"+ this.query.q + ".*" }}, { sort: {gene:1 }, fields: {"gene":1 }}). // 8
            forEach(function(f) {                                                                               // 9
                if (!(f.gene in seen)) {                                                                        // 10
                    items.push({id: f.gene, text: f.gene});                                                     // 11
                    seen[f.gene] = 1;                                                                           // 12
                }                                                                                               // 13
            });                                                                                                 // 14
        items = _.unique(items);                                                                                // 15
        this.setContentType("application/javascript");                                                          // 16
        return JSON.stringify({                                                                                 // 17
            items:items                                                                                         // 18
        });                                                                                                     // 19
    },                                                                                                          // 20
                                                                                                                // 21
    quick: function(data){                                                                                      // 22
        console.log("IN HTTP Method quick");                                                                    // 23
                                                                                                                // 24
        var items = [];                                                                                         // 25
        var term = this.query.q;                                                                                // 26
        var collection = this.query.c;                                                                          // 27
        var fieldName = this.query.f;                                                                           // 28
        var fields = {};                                                                                        // 29
        fields[fieldName] = 1;                                                                                  // 30
                                                                                                                // 31
        GeneSets.find( {name: {$regex: "^"+ term + ".*" }}, { sort: fields, fields: fields}).                   // 32
            forEach(function(f) {                                                                               // 33
                items.push({id: f._id, text: f[fieldName]});                                                    // 34
            });                                                                                                 // 35
        this.setContentType("application/javascript");                                                          // 36
                                                                                                                // 37
        return JSON.stringify({                                                                                 // 38
            items:items                                                                                         // 39
        });                                                                                                     // 40
    },                                                                                                          // 41
});                                                                                                             // 42
console.log("After HTTP Methods");                                                                              // 43
                                                                                                                // 44
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ucscmedbook:api'] = {};

})();

//# sourceMappingURL=ucscmedbook_api.js.map
