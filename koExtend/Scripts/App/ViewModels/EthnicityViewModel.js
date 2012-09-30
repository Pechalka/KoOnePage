function EthnicityViewModel(data, app) {
    var self = this;
    self.nameToAdd = ko.observable("");
    self.ethnicities = ko.observableArray(data.ethnicities || []);

    self.ethnicitiesSort = ko.computed(function () {
        return self.ethnicities.sort(function (left, right) {
            return left.Name < right.Name ? -1 : 1;
        });
    }, self);

    self.add = function () {
        var name = self.nameToAdd();

        if (name == '') return;

        var duplicateItem = ko.utils.arrayFirst(self.ethnicities(), function (item) {
            return item.Name.toLowerCase() == name.toLowerCase();
        });

        if (duplicateItem != null) {
            app.resultProccesor.Fail('Ethnicity with such name already exists');
            return;
        }

        self.ethnicities.push({ Name: self.nameToAdd(), Id: self.nameToAdd() });
        app.resultProccesor.Succes('Ethnicity was added successfully');
        self.nameToAdd("");
    };

    self.deltet = function(item) {
        if (!confirm("are you sure?")) return;

        self.ethnicities.remove(item);
    };


    self.ethnicities.subscribe(function() {
        var request = ko.toJSON(self.ethnicities);
        $.ajax({
            url: app.ethnicityUpdateLink,
            type: 'POST',
            data: request,
            contentType: 'application/json'
        });
    });
}



