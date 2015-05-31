(function(){
Template.__checkName("dashboard");
Template["dashboard"] = new Template("Template.dashboard", (function() {
  var view = this;
  return HTML.Raw('<div class="outer">\n    <div class="logo"></div>\n    <h1 class="title" style="margin:20px;">Cohort Overview</h1>\n    <div class="subtitle" style="margin:20px;">click</div>\n    <div style="margin:20px;border:3px solid\n      black;background:white;width:1300;height:800">\n      <div id="dashboard"></div>\n    </div>\n  </div>');
}));

})();
