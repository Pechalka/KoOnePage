function EthnicityViewModel(data, app) {
    var self = this;
    self.nameToAdd = ko.observable("");

    self.ethnicities = ko.observableArray(data.ethnicities);

    self.add = function () {
        self.ethnicities.push(self.nameToAdd());
        self.nameToAdd("");
    };

    self.deltet = function (item) {
        if (!confirm("are you sure?")) return;
        
        self.ethnicities.remove(item);
    };

//    ko.computed(function() {
//        

//    }, self);
}