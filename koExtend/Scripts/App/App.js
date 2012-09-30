function MenuItem(name, url) {
    this.name = name;
    this.url = url;
}

var ResultProccesor = function () {
    var self = this;
    this.cleanMessages = function () {
        $('#alert_placeholder').empty();
    };
    this.Procces = function (data) {
        if (data.isSuccess) {
            self.Succes(data.message);
        } else
            self.Fail(data.message);
    };
    this.Succes = function (message) {
        $('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>');
    };
    this.Fail = function (message) {
        $('#alert_placeholder').html('<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>');
    };
};

function App(options) {
    var app = this;
    $.extend(app, options);

    app.selectedView = ko.observable(null);

    app.listTemplatesPage = new View({
        initLink        : options.listTemplatesPageLink,
        templateName    : 'letterTemplatesTemp',
        viewModel       : ListViewModel,
        context         : app
    }); 
    
    app.editTemplatePage = new View({
        initLink        : options.editTemplatePageLink,
        templateName    : 'letterTemplateEditTemp',
        viewModel       : EditViewModel,
        context         : app
    }); 

    app.ethnicityPage = new View({
        initLink        : options.ethnicityLink,
        templateName    :   'ethnicityLabelsTemp',
        viewModel       :   EthnicityViewModel,
        context         :   app        
    }); 


    app.subjectsPage = new View({
        initLink        :   options.subjectsLink,
        templateName    :   'subjectsTemp',
        viewModel       :   SubjectsViewModel,
        context         :   app
    });
        


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

    app.resultProccesor = new ResultProccesor;
    
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
            app.listTemplatesPage.activate();
            app.selectedMenuItem("LetterTemplate");
        });

        this.get('#LetterTemplate/:id', function () {
            app.editTemplatePage.activate({ id: this.params.id });
            app.selectedMenuItem("LetterTemplate");
        });
        this.get('#EthnicityLabels', function () {
            app.ethnicityPage.activate();
            app.selectedMenuItem("EthnicityLabels");
        });
        this.get('#Subjects', function () {
            app.subjectsPage.activate();
            app.selectedMenuItem("Subjects");
        });
        this.get('', function () {
                app.goToList();
        });
    }).run();
    
}


var View = function (options) {
    var app = options.context;
    this.activate = function (requestData) {
        $.get(options.initLink, requestData, function (responseData) {
            var _data = $.extend(responseData, new options.viewModel(responseData, app));
            app.selectedView({
                data: _data,
                templateName: options.templateName
            });
        });
    };
};