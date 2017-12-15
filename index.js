// anthor: wing

;(function(global) {

    var toString = Object.prototype.toString;
    var _isFunction = function(obj) {
        return typeof(obj) === 'function';
    };
    var _isObject = function(obj) {
        return obj === Object(obj);
    };
    var _isArray = function(obj) {
        return toString.call(obj) === '[object Array]';
    };
    var _isDate = function(obj) {
        return toString.call(obj) === '[object Date]';
    };
    var _isRegExp = function(obj) {
        return toString.call(obj) === '[object RegExp]';
    };
    var _isBoolean = function(obj) {
        return toString.call(obj) === '[object Boolean]';
    };
    var _isNumberical = function(obj) {
        obj = obj - 0;
        return obj === obj;
    };

    var camelize = function(string) {
        if(_isNumberical(string)) {
            return string;
        }
        string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        });
        return string.substr(0, 1).toLowerCase() + string.substr(1);
    }

    var pascalize = function(string) {
        var camelized = camelize(string);
        return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
    }
    
    var seperateWords = function(string, options) {
        options = options || {};
        var separator = options.separator || '_';
        var split = options.split || /(?=[A-Z])/;

        return string.split(split).join(separator);
    }

    var decamelize = function(string, options) {
        return seperateWords(string, options).toLowerCase();
    }
    
    var _processor = function(convert, options) {
        var callback = options && 'process' in options ? options.process : options;

        if(typeof(callback) !== 'function') {
        return convert;
        }

        return function(string, options) {
        return callback(string, convert, options);
        }
    };
    
    var _processKeys = function(convert, obj, options) {
        if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
        return obj;
        }

        var output,
            i = 0,
            l = 0;

        if(_isArray(obj)) {
        output = [];
        for(l=obj.length; i<l; i++) {
            output.push(_processKeys(convert, obj[i], options));
        }
        }
        else {
        output = {};
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
            output[convert(key, options)] = _processKeys(convert, obj[key], options);
            }
        }
        }
        return output;
    };
    
    var underscore2camelCase = {
        camelize: camelize,
        decamelize: decamelize,
        pascalize: pascalize,
        depascalize: decamelize,
        camelizeKeys: function(object, options) {
        return _processKeys(_processor(camelize, options), object);
        },
        decamelizeKeys: function(object, options) {
        return _processKeys(_processor(decamelize, options), object, options);
        },
        pascalizeKeys: function(object, options) {
        return _processKeys(_processor(pascalize, options), object);
        },
        depascalizeKeys: function () {
        return this.decamelizeKeys.apply(this, arguments);
        }
    };

    if(typeof define === 'function' && define.amd) {
        define(underscore2camelCase);
    } else if(typeof module !== 'undefined' && module.exports) {
        module.exports = underscore2camelCase;
    } else {
        global.underscore2camelCase = underscore2camelCase;
    }

})(this);
