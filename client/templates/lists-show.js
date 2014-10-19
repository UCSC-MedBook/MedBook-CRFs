var EDITING_KEY = 'editingList';
Session.setDefault(EDITING_KEY, false);

Template.CRFsShow.rendered = function() {

 $('#CRFquickForm').change(function (event) {
   var coll =  window[Session.get("currentForm")];
   var patient_id = $('*[name="Patient_ID"]').val();
   col.findOne({"Patient_id": patient_id})

 });

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
  editing: function () {
    return Session.get(EDITING_KEY);
  },

  CRFsReady: function () {
    return Router.current().CRFsHandle.ready();
  },

  CRFs: function () {
    return CRFs.find({listId: this._id}, {sort: {createdAt: -1}});
  },

  fieldOrder: function() {
    return CRFfieldOrder[this._id];
  },

  currentForm: function() {
    console.log("currentForm", this._id);
    Session.set("currentForm", this._id);
    return this._id;
  },

  snowball: function () {
    var data = UI._templateInstance().data || {};
    data.collection = window[this._id];
    data.id = this._id;
    data.type = "insert";
    console.log(data)
    alert(data)
    return data;
  },

  dataTable: function () {
    var data = window[this._id].find().fetch();
    var schema = window[this._id]
    HOTload(data)

  }
});

var editList = function(list, template) {
  Session.set(EDITING_KEY, true);
  
  // force the template to redraw based on the reactive change
  Tracker.flush();
  template.$('.js-edit-form input[type=text]').focus();
};

var saveList = function(list, template) {
  Session.set(EDITING_KEY, false);
  CRFmetadataCollection.update(list._id, {$set: {name: template.$('[name=name]').val()}});
}

var deleteList = function(list) {
  // ensure the last public list cannot be deleted.
  if (! list.userId && CRFmetadataCollection.find({userId: {$exists: false}}).count() === 1) {
    return alert("Sorry, you cannot delete the final public list!");
  }
  
  var message = "Are you sure you want to delete the list " + list.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    CRFs.find({listId: list._id}).forEach(function(todo) {
      CRFs.remove(todo._id);
    });
    CRFmetadataCollection.remove(list._id);

    Router.go('home');
    return true;
  } else {
    return false;
  }
};

var toggleListPrivacy = function(list) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to make private lists.");
  }

  if (list.userId) {
    CRFmetadataCollection.update(list._id, {$unset: {userId: true}});
  } else {
    // ensure the last public list cannot be made private
    if (CRFmetadataCollection.find({userId: {$exists: false}}).count() === 1) {
      return alert("Sorry, you cannot make the final public list private!");
    }

    CRFmetadataCollection.update(list._id, {$set: {userId: Meteor.userId()}});
  }
};

Template.CRFsShow.events({
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
  
  'click .js-todo-add': function(event, template) {
    template.$('.js-todo-new input').focus();
  },

  'submit .js-todo-new': function(event) {
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


function HOTload(schema, data) {
  var settings = { minSpareRows:0, data:data };
  setHOTsettingsFromSchema(firstRow, settings)
  $('#HOTdiv').handsontable(settings);
}

function setHOTsettingsFromSchema(schema, settings) {
  var columns = [];
  var colHeaders = [];

  for (var i = 0; i < firstRow.length; i++) {
    var fieldName = firstRow[i];
    colHeaders.push(fieldName);
    var HOTcolumn = {
      readOnly : true,
      type: 'numeric',
      format: '0,0.00'
    };
    columns.push(HOTcolumn);
  }

  if (columns.length > 0) {
    settings.columns = columns;
    settings.colHeaders = colHeaders;
  }
}



