var paper = null;

Template.dashboard.helpers( {
  dashboard: function() {
    var currentStudy = Session.get("CurrentStudy");

    console.log("call dashboard");
    if ($('#dashboard').length == 0)
    return "";

    if (paper)
    paper.remove();
    paper = Raphael("dashboard", 1600, 800);

    Meteor.call("dashboard", currentStudy, function(err, dashboard) {
      var labels = dashboard._allLabels;
      delete  dashboard["_allLabels"];

      var n = labels.length;
      console.log("length", n);;

      var x = 300;
      var w = 1100/n;

      var h = 30;

      var forms = Object.keys(dashboard);

      var textAttrCols = { "font-size": 16, "font-family": "Arial, Helvetica, sans-serif", "text-anchor":"middle"};
      var textAttrRows = { "font-size": 20, "font-family": "Arial, Helvetica, sans-serif", "text-anchor":"end"};

      for (var i = 0; i < n; i++) {
        var y = 100;
        var xx = x+(i*w);
        var s = labels[i]
        if ((i % 5) == 0){
          paper.text(xx, 40, s).attr(textAttrCols).transform("r90");
        }

        for (var j = 0; j < forms.length; j++) {
          var form = forms[j];
          var yy = y + (j*h);

          if (i == 0){
            paper.text(x-10, yy+(0.33*h), form).attr(textAttrRows);
          }

          if (dashboard[form][s]){
            paper.rect(xx, yy, w/2, h*0.75).attr({fill:"blue", stroke:"blue", title: s + "/" + form});
          }else{
            paper.rect(xx, yy, w/2, h*0.75).attr({fill:"red", stroke:"red", title: s + "/" + form});
          }
        }
      }
    });
    return "";
  }
});
