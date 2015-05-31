var EDITING_KEY = 'EDITING_CRF_ID';

Template.CRFsItem.helpers({
  checkedClass: function() {
    return this.checked && 'checked';
  },
  editingClass: function() {
    return Session.equals(EDITING_KEY, this._id) && 'editing';
  }
});

Template.CRFsItem.events({
  'change [type=checkbox]': function(event) {
    var checked = $(event.target).is(':checked');
    CRFs.update(this._id, {$set: {checked: checked}});
    CRFmetadataCollection.update(this.listId, {$inc: {incompleteCount: checked ? -1 : 1}});
  },
  
  'focus input[type=text]': function(event) {
    Session.set(EDITING_KEY, this._id);
  },
  
  'blur input[type=text]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },
  
  'keydown input[type=text]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },
  
  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once 
  // every 300ms)
  'keyup input[type=text]': _.throttle(function(event) {
    CRFs.update(this._id, {$set: {text: event.target.value}});
  }, 300),
  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-delete-item, click .js-delete-item': function() {
    CRFs.remove(this._id);
    if (! this.checked)
      CRFmetadataCollection.update(this.listId, {$inc: {incompleteCount: -1}});
  }
});