"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

var _xcodeNode = require("xcode-node");

var _xcodeNode2 = _interopRequireDefault(_xcodeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

if (argv._.length == 0) {
    process.exit(1);
}

var project = new _xcodeNode2.default(argv._[0]);

if (argv['duplicate-environment']) {
    if (typeof argv['duplicate-environment'] == "string") {
        var _argv$duplicateEnvir = argv['duplicate-environment'].split("->"),
            _argv$duplicateEnvir2 = _slicedToArray(_argv$duplicateEnvir, 2),
            key = _argv$duplicateEnvir2[0],
            value = _argv$duplicateEnvir2[1];

        project.configuration.duplicateConfiguration(key, value);
    } else {
        for (var i = 0; i < argv['duplicate-environment'].length; i++) {
            var _argv$duplicateEnvir3 = argv['duplicate-environment'][i].split("->"),
                _argv$duplicateEnvir4 = _slicedToArray(_argv$duplicateEnvir3, 2),
                _key = _argv$duplicateEnvir4[0],
                _value = _argv$duplicateEnvir4[1];

            project.configuration.duplicateConfiguration(_key, _value);
        }
    }
}

if (argv['set-user-defined']) {
    if (typeof argv['set-user-defined'] == "string") {
        var _argv$setUserDefine = argv['set-user-defined'].split("->"),
            _argv$setUserDefine2 = _slicedToArray(_argv$setUserDefine, 2),
            _key2 = _argv$setUserDefine2[0],
            _value2 = _argv$setUserDefine2[1];

        project.getTargets().forEach(function (tg) {
            project.configuration.setUserDefinedTarget(tg.name, _key2, _value2);
        });
    } else {
        var _loop = function _loop(_i) {
            var _argv$setUserDefine3 = argv['set-user-defined'][_i].split("->"),
                _argv$setUserDefine4 = _slicedToArray(_argv$setUserDefine3, 2),
                key = _argv$setUserDefine4[0],
                value = _argv$setUserDefine4[1];

            project.getTargets().forEach(function (tg) {
                project.configuration.setUserDefinedTarget(tg.name, key, value);
            });
        };

        for (var _i = 0; _i < argv['set-user-defined'].length; _i++) {
            _loop(_i);
        }
    }
}

if (argv['set-headers-path']) {
    if (typeof argv['set-headers-path'] == "string") {
        project.getTargets().forEach(function (tg) {
            project.configuration.setHeadersPathTarget(tg.name, argv['set-headers-path'].split());
        });
    } else {
        project.getTargets().forEach(function (tg) {
            project.configuration.setHeadersPathTarget(tg.name, argv['set-headers-path']);
        });
    }
}

if (argv['output'] && typeof argv['output'] == "string") {
    project.save(argv['output']);
} else {
    process.stdout.write(project.toString());
}