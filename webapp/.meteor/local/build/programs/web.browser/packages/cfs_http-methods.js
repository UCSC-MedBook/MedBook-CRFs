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

/* Package-scope variables */
var HTTP, _methodHTTP;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/cfs:http-methods/http.methods.client.api.js              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
HTTP = Package.http && Package.http.HTTP || {};                      // 1
                                                                     // 2
// Client-side simulation is not yet implemented                     // 3
HTTP.methods = function() {                                          // 4
  throw new Error('HTTP.methods not implemented on client-side');    // 5
};                                                                   // 6
                                                                     // 7
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:http-methods'] = {
  HTTP: HTTP,
  _methodHTTP: _methodHTTP
};

})();
