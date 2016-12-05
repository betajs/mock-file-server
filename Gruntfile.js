module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');
	var gruntHelper = require('betajs-compile/grunt.js');

	gruntHelper.init(pkg, grunt);

	gruntHelper
	.lintTask(null, ['*.js', 'tasks/*.js', 'src/*.js'])
	
    /* External Configurations */
    .codeclimateTask()
    
    /* Package */
    .packageTask()
    
    /* Markdown Files */
	.readmeTask()
    .licenseTask();
    
	grunt.initConfig(gruntHelper.config);	

	grunt.registerTask('default', ['package', 'lint', 'readme', 'license', 'codeclimate']);	
	
};
