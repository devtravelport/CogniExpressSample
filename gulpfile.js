var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


//wiredep --it wires bower dependency to your source code
//its like adding script files in index.html
gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;

var options = {
    directory: 'public/lib',
    bowerJson: require('./bower.json'),
    ignorePath: '../../public'
}

var gulpInject  = require('gulp-inject');//to inject our own css file 
var sources = gulp.src(['./public/js/*.js', './public/css/*.css'], {read:false})
var optionInject = {
    ignorePath: '/public/'

}
    gulp.src('./src/views/*.html')
        .pipe(wiredep(options))//plugin is wiredep
        .pipe(gulpInject(sources, optionInject))
        .pipe(gulp.dest('./src/views'));
});



gulp.task('default',['inject'], function() {//if u name this task something else like default1 than u have to run like gulp <taskname>
   nodemon({
       script: 'app.js',
       ext: 'js',
       env: {
           PORT:9090
       },
       ignore:['./node_modules/**','./bower_components/**']
   })
   .on('restart', function(){
       console.log('Server resatrted');
   })
});
