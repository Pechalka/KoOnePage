////an observable that retrieves its value when first bound
//ko.onDemandObservable = function (callback, target) {
//    var _value = ko.observable();  //private observable

//    var result = ko.dependentObservable({
//        read: function () {
//            //if it has not been loaded, execute the supplied function
//            if (!result.loaded()) {
//                callback.call(target);
//            }
//            //always return the current value
//            return _value();
//        },
//        write: function (newValue) {
//            //indicate that the value is now loaded and set it
//            result.loaded(true);
//            _value(newValue);
//        },
//        deferEvaluation: true  //do not evaluate immediately when created
//    });

//    //expose the current state, which can be bound against
//    result.loaded = ko.observable();
//    //load it again
//    result.refresh = function () {
//        result.loaded(false);
//    };

//    return result;
//};


////wrapper for a computed observable that can pause its subscriptions
//ko.pauseableComputed = function (evaluatorFunction, evaluatorFunctionTarget) {
//    var _cachedValue = "";
//    var _isPaused = ko.observable(false);

//    //the computed observable that we will return
//    var result = ko.computed(function () {
//        if (!_isPaused()) {
//            //call the actual function that was passed in
//            return evaluatorFunction.call(evaluatorFunctionTarget);
//        }
//        return _cachedValue;
//    }, evaluatorFunctionTarget);

//    //keep track of our current value and set the pause flag to release our actual subscriptions
//    result.pause = function () {
//        _cachedValue = this();
//        _isPaused(true);
//    } .bind(result);

//    //clear the cached value and allow our computed observable to be re-evaluated
//    result.resume = function () {
//        _cachedValue = "";
//        _isPaused(false);
//    }

//    return result;
//};

function EthnicityViewModel(data, app) {
    var self = this;
    self.nameToAdd = ko.observable("");

    self.ethnicities = ko.observableArray(data.ethnicities || []);



    self.add = function () {
        self.ethnicities.push({ Name: self.nameToAdd(), Id: self.nameToAdd() });
        self.nameToAdd("");
    };

    self.deltet = function(item) {
        if (!confirm("are you sure?")) return;

        self.ethnicities.remove(item);
    };

    ko.computed(function () {
        var request = ko.toJSON(self.ethnicities);

        $.ajax({
            url: app.ethnicityUpdateLink,
            type: 'POST',
            data: request,
            contentType: 'application/json'
        });
    }, self).extend({ throttle: 500 });
}

//.extend({ notFirst : {} });
//{ deferEvaluation: true }  extend({ throttle: 500 });




