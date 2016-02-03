
fieldOrder = function(collName) {
   var meta = Collections.Metadata.findOne({name: collName});
   if (meta)
       return meta.fieldOrder;
   return [];
}

schema = function(collName) {
   var meta = Collections.Metadata.findOne({name: collName});
   if (meta) {
       var schema = JSON.parse(meta.schema);
       Object.keys(schema).map(function(fn) {
       	  var f = schema[fn]
	  if (f.type == "Array")
	     f.type = Array;
	  if (f.autoform == null)
	  	f.autoform = {};
	  if (f.allowedValues)
	     f.allowedValues = _.union(f.allowedValues);
       });
       return new SimpleSchema( schema );
   }
   return null;
}
