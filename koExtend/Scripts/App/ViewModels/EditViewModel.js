function EditViewModel(data, app) {
    var self = this;
    self.cansel = function () {
        app.goToList();
    };

    self.save = function (page) {
        $.post(app.updateTemplateLink, { content: page.Content, templateId: page.Id },
                        function () {
                            app.goToList();
                        });
    };
}