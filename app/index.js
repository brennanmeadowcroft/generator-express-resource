'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  method1: function() {
    console.log('method1 ran');
  },
  method2: function() {
    console.log('method2 ran');
  }

  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  // prompting: function () {
  //   var done = this.async();

  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the impressive ' + chalk.red('ExpressResource') + ' generator!'
  //   ));

  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someOption',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];

  //   this.prompt(prompts, function (props) {
  //     this.props = props;
  //     // To access props later use this.props.someOption;

  //     done();
  //   }.bind(this));
  // },

  // writing: {
  //   app: function () {
  //     this.fs.copy(
  //       this.templatePath('_package.json'),
  //       this.destinationPath('package.json')
  //     );
  //     this.fs.copy(
  //       this.templatePath('_bower.json'),
  //       this.destinationPath('bower.json')
  //     );
  //   },

  //   projectfiles: function () {
  //     this.fs.copy(
  //       this.templatePath('editorconfig'),
  //       this.destinationPath('.editorconfig')
  //     );
  //     this.fs.copy(
  //       this.templatePath('jshintrc'),
  //       this.destinationPath('.jshintrc')
  //     );
  //   }
  // },

  // install: function () {
  //   this.installDependencies();
  // }
});
