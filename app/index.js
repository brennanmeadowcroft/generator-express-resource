'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ExpressResource') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'resourceName',
      message: 'What is the name of your resource?',
      default: true
    },
    {
      type: 'input',
      name: 'basePath',
      message: 'What is the route for the resource (excluding the resource name)?',
      default: '/api/'
    },
    {
      type: 'input',
      name: 'controllerFolder',
      message: 'What is the folder that contains your controllers?',
      default: 'app/controllers/'
    },
    {
      type: 'input',
      name: 'modelFolder',
      message: 'What is the folder that contains your models?',
      default: 'app/models/'
    },
    {
      type: 'input',
      name: 'testFolder',
      message: 'What is the folder that contains your tests?',
      default: 'test/'
    }];

    this.prompt(prompts, function (props) {
      props.capitalizedResource = props.resourceName.charAt(0).toUpperCase() + props.resourceName.substring(1)
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var capitalizedResourceName = this.props.resourceName;

      this.fs.copyTpl(
        this.templatePath('controllerTemplate.js'),
        this.destinationPath(this.props.controllerFolder + this.props.resourceName.toLowerCase() + '.js'),
        { resource: this.props.resourceName.toLowerCase(), 
          resourceUpper: this.props.capitalizedResource,
          baseRoute: this.props.basePath.toLowerCase() }
      );
      this.fs.copyTpl(
        this.templatePath('modelTemplate.js'),
        this.destinationPath(this.props.modelFolder + this.props.resourceName.toLowerCase() + '.js'),
        { resource: this.props.resourceName.toLowerCase(), 
          resourceUpper: this.props.capitalizedResource }
      );
      this.fs.copyTpl(
        this.templatePath('testTemplate.js'),
        this.destinationPath(this.props.testFolder + this.props.resourceName.toLowerCase() + 'Spec.js'),
        { resource: this.props.resourceName.toLowerCase(), 
          resourceUpper: this.props.capitalizedResource,
          baseRoute: this.props.basePath.toLowerCase() }
      );
    }
  },

  install: function () {
    this.npmInstall(['sequelize'], { 'save': true });
    this.npmInstall(['should', 'assert', 'supertest'], { 'save-dev': true });
  },

  end: function() {
    this.log(yosay(
      "Your " + this.props.capitalizedResource + " has been created! " + 
      "Don't forget to add " + 
      chalk.red("require('./controllers/" + this.props.resourceName.toLowerCase() + "')(app, models);") +  
      " to your index.js to register the new resource."
    ));

  }
});
