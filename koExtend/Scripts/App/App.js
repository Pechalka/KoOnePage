function App(options) {
    var app = this;
    $.extend(app, options);


    app.listTemplatesPage = ko.observable().extend({ page: { viewModel: ListViewModel, context: app} });
    app.editTemplatePage = ko.observable().extend({ page: { viewModel: EditViewModel, context: app} });
    
    app.ethnicityPage = ko.observable().extend({ page: { viewModel: EthnicityViewModel, context: app} });


    app.menu = ["Letter Templates", "Ethnicity Labels"];
    app.selectedMenuItem = ko.observable("Letter Templates");

    app.goToPage = function (pageName) {
        if (pageName == "Letter Templates")
            app.goToList();
        if (pageName == "Ethnicity Labels")
            app.goToEthnicity();
        app.selectedMenuItem(pageName);
    };

    app.goToList = function () {
        $.get(options.listTemplatesPageLink, app.listTemplatesPage);
        app.editTemplatePage(null);
        app.ethnicityPage(null);
    };


    app.goToEdit = function (id) {
        $.get(options.editTemplatePageLink, { id: id }, app.editTemplatePage);
        app.listTemplatesPage(null);
        app.ethnicityPage(null);
    };

    app.goToEthnicity = function () {
        $.get(options.ethnicityLink, app.ethnicityPage);
        app.listTemplatesPage(null);
        app.editTemplatePage(null);
    };


    app.goToList();
}