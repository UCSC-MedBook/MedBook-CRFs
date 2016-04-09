
Meteor.startup(function() {
  Collections.DataMigrations = new Meteor.Collection("DataMigrations");
});

Migration = function(migrationName, func) {
  var migration = Collections.DataMigrations.findOne({name: migrationName});
  if (migration == null) {
    console.log("migrating", migrationName);
    try {
      func();
      Collections.DataMigrations.insert({name: migrationName});
      console.log("migrating", migrationName, "success");
    } catch (error) {
      console.log("migrating", migrationName, "FAIL", error);
    }
  }
}

CRFreplace = function(CRF, field, oldPat, newPat) {
  var query = {CRF: CRF};
  var oldReg = new RegExp(oldPath);
  query[field] = oldReg
  var fields = {};
  fields[field] = 1;

  var count = 0;
  db.CRFs.find(query, {fields: fields}).forEach(function(doc) {
    var s = doc[field].replace(oldPat, newPat);
    var t = {};
    t[field] = s;
    count += db.CRFs.update({_id: doc._id}, {$set: t});
  });
  return count;
}
