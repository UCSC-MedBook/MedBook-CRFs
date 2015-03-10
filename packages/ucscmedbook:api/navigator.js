Meteor.startup(function() {
    if (Meteor.isClient) {
            UI.registerHelper("MedBookNavigator", function () {
                    return Template.MedBookNavigator;
            });
            Template.MedBookNavigator.events({
            'click #logout': function (e) {
                    e.preventDefault();
                    Meteor.logout();
                },
            'click .navigation-wrapper' : function (e) {
                $('.navigation-wrapper').removeClass('show-menu');
                $('.navigation').hide();
                $('.navigation li').removeClass('small-padding');
            },
            'mouseover .MedBookLink': function (e) {
                        if ($('#MedBookAbs').length == 0)
                            $.ajax({
                                url: "/menu",
                                success: function (data) { 
                                    $(data).appendTo('body');
                                },
                                dataType: 'html'
                            });
                    event.preventDefault();
                    /*
                    if($('.navigation-wrapper').hasClass('show-menu')) {
                            $('.navigation-wrapper').removeClass('show-menu');
                            $('.navigation').hide();
                            $('.navigation li').removeClass('small-padding');
                    } else {
                            $('.navigation-wrapper').addClass('show-menu');
                            $('.navigation').fadeIn();
                            $('.navigation li').addClass('small-padding');
                    }
                    */
                }

        })
    }
});
