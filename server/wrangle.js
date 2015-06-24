
Meteor.methods({
    wrangleTSV : function(file_id) {
        var file = Collections.Blobs.findOne({_id: file_id});
        var rs = byline(file.createReadStream());
        var firstline = null;
        var schema = {};
        var fieldOrder = null;
        var rows = [];

        function firstPass(line) {
            rows.push(line.split("\t").map(function(f){ return f.trim()}));
        }

        function secondPass(n, m) {
            for (var i =  n; i < m; i++) {
                var row = rows[i];
                if (fieldOrder == null) {
                    fieldOrder = row;
                    console.log("fo", fieldOrder);
                    fieldOrder.map(function(field) {
                       schema[field] = {
                           name: field, type: "unknown", histogram: {}, min: Infinity, max: -Infinity,
                           count: 0, mean: 0, median: 0, values: [], 
                           total: 0, na_count: 0, null_count: 0, number_count: 0,
                       }
                    });
                } else {
                    data = row;
                    var obj = {};
                    data.map(function(datum, i) {

                        if (i < fieldOrder.length) 
                            fieldName = fieldOrder[i]
                        else
                            return;
                        obj[fieldName] = datum;
                        sche = schema[fieldName];

                        if (datum == null) {
                            sche.null_count += 1;
                            return;
                        }
                        if (datum == "N/A") {
                            sche.na_count += 1;
                            return;
                        }
                        sche.total += 1;

                        var f = parseFloat(datum);
                        if (!isNaN(f)) {
                            sche.number_count += 1;
                            sche.total += f;
                            if (sche.max < f)
                                sche.max = f;
                            if (sche.min > f)
                                sche.min = f;

                            sche.values.push(f);

                        } else {
                            if (datum in sche.histogram) 
                                sche.histogram[datum] = 1 + sche.histogram[datum];
                            else
                                sche.histogram[datum] = 1;
                        }
                    }); // data.map
                } // else
            } // for
        } // secondPass

        function thirdPass() {
           fieldOrder.map(function (field)  {
               var sche = schema[field];

               if (sche.number_count > 0)
                   sche.mean = sche.total / sche.number_count;

               if (sche.values.length > 0) {
                   values = sche.values.sort(function(a, b){return a-b});
                   delete sche["values"];
                   var midway = values.length/2;
                   sche.median = values[midway];

                   var NUMBUCKETS = 11;
                   var bucketsize = (sche.max - sche.min) / NUMBUCKETS;

                   var buckets = [];
                   for (var i = 0; i < (NUMBUCKETS + 1); i++)  {
                       var b = sche.min + (i * bucketsize);
                       buckets.push(b);
                       sche.histogram[b] = 0;
                   }

                   var i = 0;
                   values.map(function(f) {
                       while (i < buckets.length) {
                           if (buckets[i] <= f && f < (buckets[i] + bucketsize)) {
                               sche.histogram[buckets[i]] = 1 + sche.histogram[buckets[i]];
                               return;
                           } else
                               i++;
                       }
                   });
                   console.log("field", field, sche);
               }
           });
        } // thirdPass

        rs.on("end", function() {
            secondPass(0, rows.length);
            thirdPass();
        });

        rs.on("data", function(line) {
            firstPass(String(line));
        }) // on data
     } // wrangleTSV
}); // methods
