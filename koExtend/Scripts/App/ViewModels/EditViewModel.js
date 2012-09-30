function EditViewModel(data, app) {
    var self = this;
    self.cansel = function () {
        app.goToList();
    };

    self.save = function (page) {
        $.post(app.updateTemplateLink, { content: page.Content, templateId: page.Id },
                        function (responseData) {
                            app.resultProccesor.Procces(responseData);
                            if (responseData.isSuccess)
                                app.goToList();
                        });
    };
}