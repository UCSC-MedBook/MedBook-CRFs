
Collections.CRFs.allow({
    insert: function (userId, doc) {
	console.log("allow insert called");
	// the user must be logged in, and the document must be owned by the user
	return true || (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
	console.log("allow update called");
	// can only change your own documents
	return true || doc.owner === userId;
    },
    remove: function (userId, doc) {
	console.log("allow remove called");
	// can only remove your own documents
	return true || doc.owner === userId;
    } //,
    // fetch: ['owner']
});

Collections.CRFs.after.insert(function (userId, doc) { 
    var transactionRecord = {
	date: Date.now(),
	type: "insert",
        userId: userId,
	doc: doc
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, doc, "inserted");
});


Collections.CRFs.after.update(function (userId, fieldNames, modifier, options) {  

    function noDollar(obj) {
	Object.keys(obj).map(function(key) {
	   if (typeof(obj[key]) == "object")
	       noDollar(obj[key]);

	   if (key[0] == '$') {
	       var keyNoDollar = key.substring(1);
	       obj[keyNoDollar] = obj[key];
	       delete obj[key];
	   }
	})
    }

    noDollar(options);

    var transactionRecord = {
	date: Date.now(),
	type: "update",
        userId: userId,
        fieldNames: fieldNames,
	modifier: modifier,
	previous: this.previous,
	options: options,
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, this.previous, "updated");
});

Collections.CRFs.after.remove(function (userId, doc) { 
    var transactionRecord = {
	date: Date.now(),
	type: "removed",
        userId: userId,
	doc: doc
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, doc, "removed");
});



Collections.studies.allow({
    insert: function (userId, doc) {
	console.log("allow insert called");
	// the user must be logged in, and the document must be owned by the user
	return true || (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
	console.log("allow update called");
	// can only change your own documents
	return true || doc.owner === userId;
    },
    remove: function (userId, doc) {
	console.log("allow remove called");
	// can only remove your own documents
	return true || doc.owner === userId;
    } //,
    // fetch: ['owner']
});
