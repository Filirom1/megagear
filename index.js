var path = require('path');
var assert = require('assert');
var childProcess = require('child_process');
var _ = require('underscore');
var bashInterpolation = {
  interpolate : /\$\{(.+?)\}/g
};

require('js-yaml');

module.exports = Megagear;

function Megagear(metadataPath){
  this.metadata = require(path.resolve(metadataPath));
}

['admindo', 'build', 'start', 'status'].forEach(function(action){
  Megagear.prototype[action] = function(params, cb){
    this.exec(params, action, cb);
  };
});

Megagear.prototype.exec = function(params, action, cb){
  var err;
  if((err = this.missingParams(params))) {
    return cb(err);
  }
  var env = this.generateEnv(params);
  var script = 'set -e \n' + this.metadata.scripts[action];
  console.log(_.template(script, env, bashInterpolation));
  var shell = childProcess.spawn('/bin/sh', ['-c', script], {env: env, stdio: 'inherit'});
  shell.on('exit', function(code){
    if(code !== 0) {
      return cb(new Error('Exit code ' + code + ' != 0'), code);
    }
    cb();
  });
};


Megagear.prototype.missingParams = function(params){
  var diff = _.difference(this.metadata.params, Object.keys(params));
  if(diff.length){
    return new Error('Please set the following params [' + diff.join(', ')+ ']');
  }
};

// union of process.env, metadata.params and generated metadata.env
Megagear.prototype.generateEnv = function(params){
  var env = _.extend({}, process.env, params);
  _(this.metadata.env).forEach(function(value, key){
    env[key] = _.template(value, env, bashInterpolation);
  });
  return env;
};
