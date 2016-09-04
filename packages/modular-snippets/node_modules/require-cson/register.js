var
	cson = module.exports = require('cson'),
	Module = require('module'),
	_load = Module._load;
Module._load = function (filename) {
	if (/\.cson/i.test(filename)) {
		return cson.load(filename);
	}
	return _load.apply(this, arguments)
};
