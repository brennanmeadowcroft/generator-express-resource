'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('express-resource:app', function () {
  var myResource = 'test';

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      // .withPrompts({ resourceName: myResource,
      //                 basePath: ,
      //                 controllerFolder: '',
      //                 modelFolder: '',
      //                 testFolder: '' })
      .withPrompts({ resourceName: myResource })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/controllers/'+myResource+'.js',
      'app/models/'+myResource+'.js',
      'test/'+myResource+'Spec.js',
    ]);
  });
});
