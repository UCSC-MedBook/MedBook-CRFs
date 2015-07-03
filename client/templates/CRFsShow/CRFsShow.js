Template.CRFsShow.rendered = function() {
  LastSubmit = null;

  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
};
Template.CRFsShow.helpers({
  currentDoc: function () {
    return Session.get("CurrentDoc");
  },

  getType: function() {
    if (TableNeedsSample_ID.indexOf(this._id) >= 0)
        return "readonly"
    return "update";
  },

  phaseIs: function(phase) {
    var cd = Session.get("CurrentDoc");
    switch (phase) {
        case "none": return $('form').find("[name='Patient_ID']").val() == "DTB-000";
        case "success": return cd != null && LastSubmit != null && cd.Patient_ID == LastSubmit.Patient_ID && cd.Sampleient_ID == LastSubmit.Sample_ID;
        case "updating": return cd != null;
        case "inserting": return cd == null;
    }
    alert("Unknown phase", phase);
    return false;
  },


  editing: function () {
    return Session.get(EDITING_KEY);
  },

  CRFsReady: function () {
    return Router.current().CRFsHandle.ready();
  },

  CRFs: function () {
    return CRFs.find({listId: this._id}, {sort: {createdAt: -1}});
  },

  fieldOrder: function () {
    var fieldOrder = CRFfieldOrder[this._id];


    if (fieldOrder && fieldOrder.length > 0)
        return fieldOrder.join(",")
    return "";
  },

  currentForm: function () {
    Session.set("currentForm", this._id);
    return this._id;
  },

  readOnly: function () {
      return this._id in OncoreTable_NeedsSample_ID;
  },

  currentCollection: function () {
    return CRFcollections[this._id];
  },
  snowball: function () {
    var data = UI._templateInstance().data || {};
    data.collection = window[this._id];
    data.id = this._id;
    data.type = "insert";
    alert("snowball: " + data)
    return data;
  },

  previousEntries: function () {
    console.log("previousEntries", this);

    if (this._id == null) return false;
    var coll = window[this._id];
    if (coll == null) return false;
    return coll;
  }
});

Template.CRFsShow.events({

  'change select[name="Patient_ID"]': Patient_ID_Update_Sample_ID,

  'change input[name="Patient_ID"]':  Patient_ID_Update_Sample_ID,

  'change input[name="Sample_ID"]': function (event) {
      SetCurrentDoc('Sample_ID', $('input[name="Sample_ID"]').val());
  },

  'change select[name="core"]': function (event) {
    // Session.set("CurrentDoc", currentDoc());
  },

  'click .js-cancel': function() {
    Session.set(EDITING_KEY, false);
  },

  'keydown input[type=text]': function(event) {
    // ESC
    if (27 === event.which) {
      event.preventDefault();
      $(event.target).blur();
    }
  },

  'blur input[type=text]': function(event, template) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (Session.get(EDITING_KEY))
      saveList(this, template);
  },

  'submit .js-edit-form': function(event, template) {
    event.preventDefault();
    saveList(this, template);
  },

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel': function(event) {
    event.preventDefault();
    Session.set(EDITING_KEY, false);
  },

  'change .list-edit': function(event, template) {
    if ($(event.target).val() === 'edit') {
      editList(this, template);
    } else if ($(event.target).val() === 'delete') {
      deleteList(this, template);
    } else {
      toggleListPrivacy(this, template);
    }

    event.target.selectedIndex = 0;
  },

  'click .js-edit-list': function(event, template) {
    editList(this, template);
  },

  'click .js-toggle-list-privacy': function(event, template) {
    toggleListPrivacy(this, template);
  },

  'click .js-delete-list': function(event, template) {
    deleteList(this, template);
  },

  'click .js-CRF-add': function(event, template) {
    template.$('.js-CRF-new input').focus();
  },

  'submit .js-CRF-new': function(event) {
    event.preventDefault();

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;

    CRFs.insert({
      listId: this._id,
      text: $input.val(),
      checked: false,
      createdAt: new Date()
    });
    CRFmetadataCollection.update(this._id, {$inc: {incompleteCount: 1}});
    $input.val('');
  }
});
