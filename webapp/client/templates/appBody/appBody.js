var MENU_KEY = 'menuOpen';
Session.setDefault(MENU_KEY, false);

var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);

var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 1000;

Meteor.startup(function () {
  // set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
    },
    preventDefaultEvents: false
  });

  // Don't show the connection error box unless we haven't connected within
  // 1 second of app starting
  setTimeout(function () {
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.rendered = function() {
  $('.notdraggable').each(function(i,e) {
          e.ondragstart = function() { return false; };
  });



  $('.MainCRFLists').sortable( {
      axis:  "y",
      handle: '.handle',

 // get the dragged html element and the one before
      stop: function(e, ui) {
          var pref = personalPreferredTableOrder();
          console.log("stop", pref);

          cur  = $(ui.item.get(0)).data("crfname")
          before = $(ui.item.prev().get(0)).data("crfname")
          after = $(ui.item.next().get(0)).data("crfname")
          console.log("stop", before, cur, after);

          pref.splice(pref.indexOf(cur), 1);

          if (before == null)
              pref.splice(0, 0, cur);
          else
              pref.splice(pref.indexOf(before) + 1, 0, cur);


          console.log("stop", pref);
          Meteor.users.update({_id:Meteor.userId()}, { $set:{"profile.preferredTableOrder": pref}} )
          Session.set("PreferredTableOrder", pref);

        }
  });

  /*this.find('#content-container')._uihooks = {
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
  };*/
};
function stop() {
    console.log("STOP");
}

Template.appBody.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.

  thisArray: function() {
    return [this];
  },

  PersonalTableOrder : function() {
      return Session.get("PersonalTableOrder");
  },
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  emailLocalPart: function() {
    var user = Meteor.user();
    if (user == null) return "";
    var profile = user.profile;
    if (profile == null) return "";
    var email = profile.email
    if (email == null) return "";
    return email.substring(0, email.indexOf('@'));
  },
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  lists: function() {
    var md =  CRFmetadataCollection.find({}, {sort: {n: 1}});
    return md;
  },
  activeListClass: function() {
    var current = Router.current();
    if (current && current.route && current.params &&
        current.route.name === 'CRFsShow' && current.params._crfName === this._crfName) {
          return 'active';
    }
    return null;
  },
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
});

Template.appBody.events({
  'click .js-menu': function() {
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  },

  'click .list-1-CRF' : function(event) {
      event.preventDefault();
      Router.go("CRFsShow", {_crfName: $(event.target).data("crfname") });
   },

  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },

  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },

  'click #sidebarMenu a': function() {
    Session.set(MENU_KEY, false);
  },

  'click .js-logout': function() {
    Meteor.logout();

    // if we are on a private list, we'll need to go to a public one
    var current = Router.current();
    if (current.route.name === 'CRFsShow' && current.data().userId) {
      Router.go('CRFsShow', CRFmetadataCollection.findOne({userId: {$exists: false}}));
    }
  },

  'click .js-new-list': function() {
    var list = {name: defaultName(), incompleteCount: 0};
    list._id = CRFmetadataCollection.insert(list);

    Router.go('CRFsShow', list);
  }
});
