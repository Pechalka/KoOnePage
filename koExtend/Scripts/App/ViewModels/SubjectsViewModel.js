function SubjectsViewModel(data, app) {
    var self = this;
    self.nameToAdd = ko.observable("");
    self.subjects = ko.observableArray(data.subjects || []);


    self.deltet = function (item) {
        $.post(app.deleteSubjectLink, { id: item.Id },
            function (responseData) {
                self.subjects.remove(item);
            });
        };

    self.add = function() {
        $.post(app.addSubjectLink, { name: self.nameToAdd() },
            function(newItem) {
                self.subjects.push(newItem);
                self.nameToAdd("");
            }
        );
    };
}