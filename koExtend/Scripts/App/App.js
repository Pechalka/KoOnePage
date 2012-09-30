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

    app.subjectsPage = ko.observable().extend({ page: { viewModel: SubjectsViewModel, context: app} });

    app.menu = [
        new MenuItem("Letter Templates", "LetterTemplate"),
        new MenuItem("Ethnicity Labels", "EthnicityLabels"),
        new MenuItem("Subjects", "Subjects")
    ];

    app.selectedMenuItem = ko.observable("LetterTemplate");

    app.goToPage = function (item) {
        app.selectedMenuItem(item.url);
        location.hash = item.url;
    };

    app.resultProccesor = {
        cleanMessages: function () {
            $('#alert_placeholder').empty();
        },
        Procces: function (data) {
            if (data.isSuccess) {
                app.resultProccesor.Succes(data.message);
            } else
                app.resultProccesor.Fail(data.message);
        },
        Succes: function (message) {
            $('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>');
        },
        Fail: function (message) {
            $('#alert_placeholder').html('<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>');
        }
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

    app.clearPages = function () {
        app.listTemplatesPage(null);
        app.editTemplatePage(null);
        app.ethnicityPage(null);
        app.subjectsPage(null);
    };

    Sammy(function () {
        this.get('#LetterTemplate', function () {
            app.clearPages();
            $.get(options.listTemplatesPageLink, app.listTemplatesPage);
            app.selectedMenuItem("LetterTemplate");
        });

        this.get('#LetterTemplate/:id', function () {
            app.clearPages();
            $.get(options.editTemplatePageLink, { id: this.params.id }, app.editTemplatePage);
            app.selectedMenuItem("LetterTemplate");
        });
        this.get('#EthnicityLabels', function () {
            app.clearPages();
            $.get(options.ethnicityLink, app.ethnicityPage);
            app.selectedMenuItem("EthnicityLabels");
        });
        this.get('#Subjects', function () {
            app.clearPages();
            $.get(options.subjectsLink, app.subjectsPage);
            app.selectedMenuItem("Subjects");
        });
        this.get('', function () {
            app.goToList();
        });
    }).run();
}
