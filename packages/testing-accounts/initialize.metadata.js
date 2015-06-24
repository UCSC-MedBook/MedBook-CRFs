/*// if the database is empty on server start, create some sample data.
// we create a separate bootstrap.users.js file
// because we'll be wanting to set up a number of patient-scenario test users



Meteor.startup(function () {
  if (Collaboration.find().count() === 0) {
    console.info('No Collaboration records in database!  Adding some initial records...');

      var collaborations = [
        {
          name: "WCDT",
          description: "West Coast Dream Team",
          collaborators: [
            "house@test.org",
            "house"
          ],
          slug: "wcdt",
          isPublic: true,
          requiresAdministratorApprovalToJoin: true,
          isUnlisted: false,
          administrators: [
            "house@test.org",
            "house"
          ],
          requests: []
        }
      ];

      collaborations.forEach(function(record){
        Collaboration.insert(record, function(error, result){
          console.log("Inserted Collaboration record " + result);
        });
      });


  }else{
      console.log("Found " + Collaboration.find().count() + " records in Collaboration collection.");
  }
});*/
