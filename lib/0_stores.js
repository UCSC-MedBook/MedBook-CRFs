Stores = {};

if (Meteor.isServer) {
    var mime = Npm.require("mime");
    Stores.blobs = new FS.Store.GridFS("blobs",
        {
            beforeWrite: function(fileObj) { 

            // HANDLE SPECIAL MEDBOOK MIME TYPES
                if (fileObj.original.type == "") {
                    var name = fileObj.name();
                    var type;

                    if (name.match(/\.tab$/))
                        type = 'text/tab-separated-values';
                    else
                        type = mime.lookup(name);

                    fileObj.type(type);

                }
            }
        }
    );
} else
    Stores.blobs = new FS.Store.GridFS("blobs");

