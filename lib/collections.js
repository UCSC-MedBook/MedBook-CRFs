CRFmetadataCollection = new Meteor.Collection('CRFmetadataCollection');

// Calculate a default name for a list in the form of 'List A'
CRFmetadataCollection.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (CRFmetadataCollection.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'CRF ' + nextLetter;
  }

  return nextName;
};

CRFs = new Meteor.Collection('CRFs');