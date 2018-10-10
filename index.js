var underscoreTemplate = require('underscore.template');
var request = require('request');

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
    context.import = function (url) {
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
            sources[source] = template(context)
            for (var i = 0; i > context.imports.length; i++) {
                request.get(context.imports[i], function (error, response, contract) {
                    if (!error && response.statusCode == 200) {
                        sources[context.imports[i]] = contract; // Does the newly added contract get preprocessed as well in this loop?
                    } else {
                        console.log("Error remote importing: " + context.imports[i])
                    }
                });
            }
        }
    }
    return {sources, context};
}