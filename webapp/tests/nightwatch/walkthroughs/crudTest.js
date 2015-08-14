/*
var histologyResearchRecord = {
  sampleId: "DTB‑999",
  histologyCall: "Adeno",
  adeno: "Adeno",
  smallCell: "Not Small Cell",
  trichotomy: "Adeno"
}


var screenshotDir = "tests/nightwatch/screenshots/desktop/crudTest/";

module.exports = {
  "SignIn" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 1200)
      .saveScreenshot(screenshotDir + "B-SignIn.png")
      .signIn("house@test.org","house")
      .saveScreenshot(screenshotDir + "C-HomePage.png")
  },
  "Histology Research Form" : function (client) {
    client
      //.sectionBreak("Histology Research Form")
      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .saveScreenshot(screenshotDir + "E-HistologyResearchForm.png")

      // create
      //.url("http://localhost:3000/CRF/new/Histology_Research")
      //.verify.collectionIsEmpty("Histology_Research")
      //.reviewHistologyResearchForm()
      //.completeHistologyResearchForm(histologyResearchRecord)
      //.verify.collectionIsNotEmpty("Histology_Research")
      //.verify.collectionContains("Histology_Research", histologyResearchRecord)

      // list
      //.url("http://localhost:3000/CRF/lists/Histology_Research")
      //.reviewHistologyResearchTable()

      // view
      //.url("http://localhost:3000/CRF/view/Histology_Research")
      //.reviewHistologyResearchForm(histologyResearchRecord)

      // update
      //.url("http://localhost:3000/CRF/update/Histology_Research/123")
      //.completeHistologyResearchForm(newHistologyResearchRecord)
      //.reviewHistologyResearchForm(histologyResearchRecord)

      // delete
      //.url("http://localhost:3000/CRF/delete/Histology_Research/123")
      //.reviewHistologyResearchForm(histologyResearchRecord)


      .reviewHistologyResearchForm()
      .completeHistologyResearchForm(histologyResearchRecord)
      .reviewHistologyResearchRow(histologyResearchRecord, 1)

      .signOut()
      .reviewSignInPage()
      .end();
  }
};*/
