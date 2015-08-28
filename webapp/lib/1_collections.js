Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Collections.Blobs = new FS.Collection("blobs", {
  stores: [Stores.blobs],
  chunkSize: 4 * 1024 * 1024
});


Collections.CRFs = new Meteor.Collection("CRFs");

