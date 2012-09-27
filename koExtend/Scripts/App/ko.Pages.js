ko.extenders.page = function (target, options) {
    var result = ko.computed({
        read: function () {
            return target();
        },
        write: function (newValue) {
            if (newValue) {
                target($.extend(newValue, new options.viewModel(newValue, options.context)));
            } else
                target(null);
        }
    });
    return result;
};