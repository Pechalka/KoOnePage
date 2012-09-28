function MenuItem(name, url) {
    this.name = name;
    this.url = url;
}

function App(options) {
    var app = this;
    $.extend(app, options);


    app.listTemplatesPage = ko.observable().extend({ page: { viewModel: ListViewModel, context: app} });
    app.editTemplatePage = ko.observable().extend({ page: { viewModel: EditViewModel, context: app} });
    
    app.ethnicityPage = ko.observable().extend({ page: { viewModel: EthnicityViewModel, context: app} });


    app.menu = [
        new MenuItem("Letter Templates", "LetterTemplate"),
        new MenuItem("Ethnicity Labels", "EthnicityLabels")
    ];

    app.selectedMenuItem = ko.observable("LetterTemplate");

    app.goToPage = function (item) {
        app.selectedMenuItem(item.url);
        location.hash = item.url;
    };

    app.goToList = function () {
        location.hash = 'LetterTemplate';
    };


    app.goToEdit = function (id) {
        location.hash = 'LetterTemplate/' + id;
    };

    app.goToEthnicity = function () {
        location.hash = 'EthnicityLabels';
    };
    
    Sammy(function () {
        this.get('#LetterTemplate', function () {
            $.get(options.listTemplatesPageLink, app.listTemplatesPage);
            app.editTemplatePage(null);
            app.ethnicityPage(null);
        });

        this.get('#LetterTemplate/:templateId', function () {
            $.get(options.editTemplatePageLink, { id: this.params.templateId }, app.editTemplatePage);
            app.listTemplatesPage(null);
            app.ethnicityPage(null);
        });
        this.get('#EthnicityLabels', function () {
            $.get(options.ethnicityLink, app.ethnicityPage);
            app.listTemplatesPage(null);
            app.editTemplatePage(null);
        });
        this.get('', function () {
            self.goToList();
        });
    }).run();

    app.goToList();
}