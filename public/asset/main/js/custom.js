
function displayLocalTime(container) {
    $(container).find(".localtime").each(function (i, obj) {
        var element = $(this); // <div> or <span> element.
        var utc = element.data("utc"); // "2018-12-28T02:36:13.6774675Z"
        var d = new Date(utc);
        var l = dayjs(d).format('DD/MM/YYYY h:mm:ss A')
        element.text(l);
    });
}

(function ($) {

    jQuery.fn.extend({
        prependClass: function (newClasses) {
            return this.each(function () {
                var currentClasses = $(this).prop("class");
                $(this).removeClass(currentClasses).addClass(newClasses + " " + currentClasses);
            });
        }
    });

})(jQuery);


/**
 * Toggling password visibility in password input
*/
function passwordVisibilityToggleBindEvents(container) {
    var elements = $(container).find('.password-toggle');

    var _loop = function _loop(i) {
        var passInput = elements[i].querySelector('.form-control'),
            passToggle = elements[i].querySelector('.password-toggle-btn');
        passToggle.addEventListener('click', function (e) {
            if (e.target.type !== 'checkbox') return;

            if (e.target.checked) {
                passInput.type = 'text';
            } else {
                passInput.type = 'password';
            }
        }, false);
    };

    for (var i = 0; i < elements.length; i++) {
        _loop(i);
    }
};