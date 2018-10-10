var underscoreTemplate = require('underscore.template');
var request = require('sync-request');

module.exports = function(sources, context, config) {
    if(typeof config === "object") {
        if(typeof config.settings === "object") {
            underscoreTemplate._.templateSettings = config.settings;
        }
        if(typeof config.context === "object") {
            context = Object.assign(context, config.context)
        }
    }
    context.imports = [];
    context.get = function (url) {
        var exists = false;
        for (var i = 0; i < this.imports.length; i++) {
            if(this.imports[i] === url) {
                exists = true;
            }
        }
        if(!exists) {
            this.imports.push(url);
        }
        return 'import "' + url + '";'
    }
    for (source in sources) {
        if(source.endsWith('.psol')) {
            let template = underscoreTemplate(sources[source]);
            context.contractName = source;
            sources[source] = template(context)
            for (var i = 0; i < context.imports.length; i++) {
                if(typeof sources[context.imports[i]] != "string") {
                    try {
                        var contract = request('GET', context.imports[i]).getBody().toString();
                        sources[context.imports[i]] = contract;
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }
    return {sources, context};
}