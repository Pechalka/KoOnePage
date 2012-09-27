function ListViewModel(data, app) {
    var self = this;
    
    self.goToEdit = function (item) {
        app.goToEdit(item.Id);
    };

    self.updateSchooloptions = function (page) {
        var data = {
            whenCreated: page.WhenCreated,
            whenComplited: page.WhenComplited
        };
        $.post(app.updateShcoolOptions, $.param(data, true), null);
    };
}