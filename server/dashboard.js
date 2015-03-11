Meteor.methods({
    dashboard: function() {
        _allLabels = {};

        var inventory = {}
        CRFmetadataCollection.find({}, {name:1}).forEach(function(coll) {
            var name = coll.name;
            var inv = {};
            inventory[name] = inv;
            var coll = CRFcollections[name].find({}, { fields: {Patient_ID:1, Sample_ID: 1}});
            console.log("dashboard", name, coll.count());
            coll.forEach(function(obj) {
                var id = null;
                if (obj.Sample_ID) {
                    id = obj.Sample_ID.substring(0,7)
                } else if (obj.Patient_ID) {
                    id = [obj.Patient_ID];
                }

                if (id) {
                    inv[id] = true;
                    _allLabels[id] = true;
                }
           });
       });
       inventory._allLabels = Object.keys(_allLabels).sort();
       return inventory;
   }
});

