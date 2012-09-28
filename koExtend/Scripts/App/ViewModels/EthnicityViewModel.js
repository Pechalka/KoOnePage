function EthnicityViewModel(data, app) {
    var self = this;
    self.nameToAdd = ko.observable("");
    self.ethnicities = ko.observableArray(data.ethnicities || []);

    self.add = function() {
        self.ethnicities.push({ Name: self.nameToAdd(), Id: self.nameToAdd() });
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



