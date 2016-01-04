/** @license
  * RequireJS EJS Plug-in
  * Copyright(c) 2013 Brad Whitcomb <git@bradwhitcomb.com>
  * MIT Licensed
  */

define(["text", "ejs"], function (text, ejs) {

  "use strict";

  var rejs,
    extension,
    includeRegex,
    buildMap,
    buildTemplate;

  // The template extension. Change if you want to use something else (e.g. 'html').
  extension = 'ejs';

  // Matches the include statements (i.e. '<% include path/to/file %>').
  includeRegex = new RegExp(/\<\%\sinclude\s(\S+)\s\%\>/g);

  // Holds the raw templates, keyed by relative path.
  buildMap = {};

  // This is written to the output file during optimizations.
  buildTemplate = 'define("<%= plugin %>!<%= module %>", ["ejs"], function(e) { return e.compile(<%- template %>); }); \n';

  function injectIncludesRecurse(req, template, callback, self) {

    function done (template) {
      if (template.match(includeRegex)) {
        return exec(template, done);
      }
      callback(template);
    }

    function exec (template, done) {
      injectIncludes(req, template, done, self);
    }
    exec(template, done);
  }

  // Loops over every include statment and replaces
  // the include with the template.
  // TODO: Add error handling for incorrect paths or missing templates.
  function injectIncludes(req, template, callback, self) {
    var matches,
      match,
      index;

    index = 0;
    matches = [];

    // Fetches and replaces for each match.
    function fetchAndReplace(index) {
      var url;
      url = req.toUrl(matches[index][1] + "." + extension);
      text.get(url, function (includeTemplate) {
        template = template.replace(matches[index][0], includeTemplate);
        index++;
        if (index === matches.length) {
          callback.call(self, template);
        } else {
          fetchAndReplace(index);
        }
      });
    }

    // Gather Matches
    while (match = includeRegex.exec(template)) {
      matches.push(match);
    }

    // Fetch additional includes or call callback
    if (matches.length) {
      fetchAndReplace(index);
    } else {
      callback.call(self, template);
    }

  }

  rejs = {

    version: '0.3',

    write: function (plugin, module, write) {
      var rendered;
      if (buildMap.hasOwnProperty(module)) {
        rendered = ejs.render(buildTemplate, {
          plugin   : plugin,
          module   : module,
          template : buildMap[module]
        });
        write(rendered);
      }
    },

    load: function (name, req, load, config) {
      var url;
      url = req.toUrl(name + "." + extension);
      text.get(url, function(template) {
        injectIncludesRecurse(req, template, function (processedTemplate) {
          if (config.isBuild) {
            buildMap[name] = JSON.stringify(processedTemplate);
          }
          load(ejs.compile(processedTemplate));
        }, this);
      });
    }
  };

  return rejs;

});
