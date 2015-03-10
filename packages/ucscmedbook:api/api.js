// Write your package code here!
/**
 * Created by ted on 11/3/14.
 */

/* AppState stores the the state of an application for restoration by the restore route */

AppState = new Meteor.Collection("AppState");

/*
var postObject = {
    userId: this.userId,
    collaboration: collaboration,
    title:  title,
    content: content,
    url: url,
    blobs: blobs,
    appStateId: appStateId,
}
*/

MedBookPost = function(telescopeHost, authToken, postObject, returnFunction) {
    var json = JSON.stringify(postObject);

    HTTP.post(telescopeHost + '/medbookPost', {
        params:  {
            json: json,
            token: authToken
        }
    }, returnFunction);
}

if (Meteor.server) {

    var serverMedBookPost = function (telescopeHost, authToken, postObject) {
        console.log("serverMedBookPost", telescopeHost, authToken, postObject);
        MedBookPost(telescopeHost, authToken, postObject, function (err, ret) {
            console.log("callBack", err, ret);
        })
    };

    Meteor.methods({ServerMedBookPost: serverMedBookPost});
}
