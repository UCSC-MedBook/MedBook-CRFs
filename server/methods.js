/**
 * Created by ted on 10/18/14.
 */

Meteor.methods({
    addCRF : function(bundle) {
       var crf = bundle.crf;
        delete bundle["crf"];
        var coll = CRFcollections[crf];
        bundle._id = bundle["Patient_ID"];
        console.log(bundle._id);
        // coll.update({_id: bundle._id}, bundle, {upsert:true});
        coll.insert(bundle);


    }
})
