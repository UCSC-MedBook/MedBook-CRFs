/**
 * Created by ted on 10/18/14.
 */

Meteor.methods({
    addCRF : function(insertDoc, updateDoc) {
       var crf = insertDoc.crf;
        delete insertDoc["crf"];
        var coll = CRFcollections[crf];
        insertDoc._id = insertDoc["Patient_ID"];
        console.log(insertDoc);
        if (coll.findOne({Patient_ID: insertDoc.Patient_ID}))
            coll.update({Patient_ID: insertDoc.Patient_ID}, updateDoc);
        else
            coll.insert(insertDoc);
        //var ret = coll.upsert({_id: insertDoc._id}, {$set: insertDoc});
        // console.log("upsert", ret)
    }
})
