
SetCurrentDoc = function(field, value) {
    var CurrentStudy = Session.get("CurrentStudy");
    var currentForm = Session.get("currentForm");

    if (CurrentStudy == null || currentForm == null)
        return null;

    var queryPattern = {};
    queryPattern[field] = value;
    queryPattern["CRF"] = currentForm;
    queryPattern["study"] = CurrentStudy;
    var currentDoc = Collections.CRFs.findOne(queryPattern);

    Session.set("CurrentDoc", currentDoc);
    console.log("SetCurrentDoc", currentDoc);

    return currentDoc;
}
