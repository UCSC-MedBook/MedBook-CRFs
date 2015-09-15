
fieldOrder = function(collName) {
   var meta = Collections.Metadata.findOne({name: collName});
   if (meta)
       return meta.fieldOrder;
   return [];
}

schema = function(collName) {
   var meta = Collections.Metadata.findOne({name: collName});
   if (meta) {
       Object.keys(meta.schema).map(function(fn) {
       	  var f = meta.schema[fn]
	  if (f.autoform == null)
	  	f.autoform = {};
	  if (f.allowedValues)
	     f.allowedValues = _.union(f.allowedValues);
       });
       return new SimpleSchema( meta.schema );
   }
   return null;
}