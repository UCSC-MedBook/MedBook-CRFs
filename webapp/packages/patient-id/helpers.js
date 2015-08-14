
SetCurrentDoc = function(field, value) {
    var currentForm = Session.get("currentForm");
    var currentFormData = window[currentForm];
    var queryPattern = {};
    queryPattern[field] = value;
    var currentDoc = currentFormData.findOne(queryPattern);

    Session.set("CurrentDoc", currentDoc);
    console.log("SetCurrentDoc", currentDoc);

    return currentDoc;
}
