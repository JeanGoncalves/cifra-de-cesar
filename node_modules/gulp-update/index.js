'use strict';

var _         = require('underscore'),
    through2  = require('through2'),
    fs        = require('fs'),
    hdiff     = require('hdiff'),
    spawn     = require('child_process').spawn,
    which     = require('which'),
    gutil     = require('gulp-util'),
    path      = require('path');

module.exports = function () {
  var diffMapper = jsonDiffMapper();
  return through2(
    {objectMode: true},
    function (file, enc, cb) {
      log('Checking ' + file.path + 'for updates');
      execCommands(_.map(_.filter(mapDiffToCommands(diffMapper(file)), filterEmptyCommands), commandToCurrentCwdMapper(path.dirname(file.path))), cb);
      this.push(file);
    }
  )
}


function log() {
  return gutil.log.apply(gutil, [].slice.call(arguments));
}

function filterEmptyCommands(cmd) {
  return !!cmd.length;
}

function execCommands(cmds, cb) {
  if (!cmds.length) return cb();

  var cmd = cmds.shift();
  which(cmd[0], function (err, cmdpath) {
    if (err) {
      log("Couldn't find the path to " + cmd[0]);
      return cb(err);
    }


    log(cmd[0] + ' ' + cmd[1].join(' '));
    cmd[0] = cmdpath;
    cmd[2].stdio = 'inherit';
    cmd = spawn.apply(spawn, cmd);
    cmd.on('close', function onClose() { return execCommands(cmds, cb); })
  })
}

function jsonDiffMapper() {
  var cache = {};

  return function (file) {
    var oldJson = cache[file.path];
    var newJson = JSON.parse(fs.readFileSync(file.path, {encoding: 'utf8'}));
    cache[file.path] = newJson;

    if (!oldJson)
      return {'$new': newJson}

    return hdiff(oldJson, newJson, {unchanged: false});
  }
}

function commandToCurrentCwdMapper(cwd) {
  return function (cmd) {
    if (!cmd) return;
    cmd[2] = cmd[2] || {};
    cmd[2].cwd = cwd;
    return cmd;
  }
}

function mapDiffToCommands(diff) {
  if (!diff) return [];

  var mappers = [mapInstallToCmd, mapRemoveToCmd, mapUpdateToCmd];
  return _.union(
    mapNewToCmds(diff),
    mapDependenciesToCmds(diff.dependencies, mappers),
    _.map(mapDependenciesToCmds(diff.devDependencies, mappers), mapDevCmds)
  );
}

function mapNewToCmds(diff) {
  if (!diff['$new']) return [];

  return [createCommand('npm',['install'])];
}

function mapDependenciesToCmds(deps, mappers) {
  if (!_.isObject(deps)) return [];
  var cmds = [];
  _.each(mappers,function(mapper) {
    cmds.push(_mapDependenciesToCmds(deps, mapper));
  })

  return _.union.apply(_, cmds);
}

function _mapDependenciesToCmds(deps, mapper) {
  if (!_.isObject(deps)) return [];
  var cmds = [];
  _.each(deps,function(diff, pkg) {
    var cmd = mapper(diff, pkg);
    if (cmd)
      cmds.push(cmd);
  })

  return cmds;
}

function mapRemoveToCmd(diff, pkg) {
  if (!isRemove(diff)) return;

  return createCommand('npm',['remove', pkg]);
}

function mapInstallToCmd(diff, pkg) {
  if (!isInstall(diff)) return [];

  return createCommand('npm',['install', resolveFullPackageName(diff, pkg)]);
}

function mapUpdateToCmd(diff, pkg) {
  if (!isUpdate(diff)) return [];

  return createCommand('npm',['install', resolveFullPackageName(diff, pkg)]);
}

function mapDevCmds(cmd) {
  if (cmd.length)
    cmd[1].push('--save-dev');
  return cmd;
}

function isUpdate(diff){ return diff['$add'] && diff['$del']; }
function isInstall(diff){ return diff['$add'] && !diff['$del']; }
function isRemove(diff){ return !diff['$add'] && diff['$del']; }

function resolveFullPackageName(diff, pkg) {
  if (!diff['$add']) return pkg;
  return pkg + '@' + diff['$add'];
}

function createCommand(cmd, args, opts) {
  return [cmd, args, opts || {}];
}
