ko.extenders.page = function (target, options) {
    var result = ko.computed({
        read: function () {
            return target();
        },
        write: function (newValue) {
            if (newValue) {
                var page = new options.viewModel(newValue, options.context);
                target($.extend(newValue, page));
            } else
                target(null);
        }
    });
    return result;
};
