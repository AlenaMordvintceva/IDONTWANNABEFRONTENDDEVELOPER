var todoModel = (function () {

    var _data = [];

    function _addItem(name, duedate, description, completed) {
        _data.push({
            id: getCurrentId(),
            name: name,
            duedate: duedate,
            description: description,
            completed: completed
        });
    }

    function _removeItem(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })
    }

    function _updateItem(id, value) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index] = value;
            }
        })
        console.log('updated:', id);
    }

    function _save() {       
        window.localStorage["tasks"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    function dateStringToObject(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].duedate = new Date(data[i].duedate);
        }
        return data;
    }

   
    function _read() {
        var temp = window.localStorage["tasks"]

        if (!temp) _data = [];
        else {
            _data = JSON.parse(temp);
            dateStringToObject(_data);
        }
        return _data;
    }

    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return _data[_data.length - 1].id + 1;
    }

    return {
        data: _data,
        addItem: _addItem,
        updateItem: _updateItem,
        removeItem: _removeItem,
        save: _save,
        read: _read
    };

})();