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

Megagear.prototype.exec = function(params, action, cb){
  var err;
  if((err = this.missingParams(params))) {
    return cb(err);
  }
  var self = this;
  var command = '/usr/bin/env';
  childProcess.execFile(command, ['bash', '-c', this.metadata.scripts.env], {}, function(err, stdout){
    var env = process.env;
    stdout = stdout || '';
    stdout.split('\n').forEach(function(line){
      var arr = line.split('=');
      if (arr.length < 2) return;
      var key = arr[0].trim();
      var value = arr[1].trim();
      env[key] = value;
    });

    var script = self.metadata.scripts[action];
    var args = ['bash', '-c', script];

    var shell = childProcess.spawn(command, args, {env: env, stdio: 'inherit'});
    shell.on('exit', function(code){
      if(code !== 0) {
        return cb(new Error('Exit code ' + code + ' != 0'), code);
      }
      cb();
    });
  });
};

Megagear.prototype.missingParams = function(params){
  var diff = _.difference(this.metadata.params, Object.keys(params));
  if(diff.length){
    return new Error('Please set the following params [' + diff.join(', ')+ ']');
  }
};

function debug(env, str){
  if(process.env.DEBUG){
    _(env).forEach(function(v, k){
      console.log(k + '=' + v);
    });
  }
}
