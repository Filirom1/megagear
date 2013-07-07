var Path = require('path');
var assert = require('assert');
var childProcess = require('child_process');
var _ = require('underscore');
var async = require('async');
var bashInterpolation = {
  interpolate : /\$\{(.+?)\}/g
};

require('js-yaml');

module.exports = Megagear;

function Megagear(metadataPath){
  this.metadata = require(Path.resolve(metadataPath));

  // setup defaults
  this.metadata.scaling = this.metadata.scaling || {};
  this.metadata.scaling.min = this.metadata.scaling.min || 1;
  this.metadata.scaling.max = this.metadata.scaling.max || 1;
}

Megagear.prototype.exec = function(env, action, cb){
  var err;
  if((err = this.missingParams(env))) {
    return cb(err);
  }
  env.PATH = Path.resolve(__dirname, 'bin') + ':' + env.PATH 
  var self = this;
  var command = '/bin/bash';
  childProcess.execFile(command, ['-xc', this.metadata.scripts.env], {env: env}, function(err, stdout){
    stdout = stdout || '';
    stdout.split('\n').forEach(function(line){
      var arr = line.split('=');
      if (arr.length < 2) return;
      var key = arr[0].trim();
      var value = arr[1].trim();
      env[key] = value;
    });
    var testScriptNames = Object.keys(self.metadata.scripts).filter(function(name){
      return /IS_[A-Z-9_]*/.test(name);
    });
    async.each(testScriptNames, function(scriptName, cb){
      var script = 'set -e\n' + self.metadata.scripts[scriptName];
      childProcess.execFile(command, ['-xc', script], {env: env, stdio: 'inherit'}, function(err, stdout){
        if(err){ 
          // swallow the error
        }else{
          env[scriptName] = stdout;
        }
        cb();
      });
    }, function(err){
      if(err) return cb(err);
      var script = 'set -e\n' + self.metadata.scripts[action];
      var args = ['-xc', script];

      var shell = childProcess.spawn(command, args, {env: env});
      shell.on('exit', function(code){
        if(code !== 0) {
          return cb(new Error('Exit code ' + code + ' != 0'), code);
        }
        cb();
      });
      shell.stdout.on('data', function(data){
        process.stdout.write(data.toString().replace(/\n/, '\n' + env.INSTANCE_NUMBER + ' '));
      });
      shell.stderr.on('data', function(data){
        process.stderr.write(data.toString().replace(/\n/, '\n' + env.INSTANCE_NUMBER + '\t'));
      })
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
