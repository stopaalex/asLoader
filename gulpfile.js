const { src, dest, series }   = require('gulp');
const jeditor                 = require('gulp-json-editor');
const uglify                  = require('gulp-uglify');
const stripDebug              = require('gulp-strip-debug');
const babel                   = require('gulp-babel')
const rename                  = require('gulp-rename');
const stringReplace           = require('gulp-string-replace');

const config = require('./config.json');
const buildHistory = require('./buildHistory.json');

var buildVersion = 0;
var previousBuildVersion = 0;

/** update the build history file */
function buildHistoryFile() {
    let version = process.argv[process.argv.length - 1];
    // create the versions array
    let versions = [];
    buildHistory.history.forEach(v => {
        versions.push(parseFloat(v.version));
    });
    // get max version
    let maxVersion = Math.max.apply(Math, versions);
    // determine version
    if (version === 'build' || typeof parseFloat(version) !== 'number') {
        version = parseFloat(maxVersion + 0.1);
        // checking if the verions get fucked up
        if (version.toString().indexOf('00000') !== -1) {
            version = parseFloat(version.toFixed(2));
        }
    }
    // push the new build history
    history = {
        history: [
            {
                version: parseFloat(version),
                createdBy: config.createdBy,
                createdOn: (new Date()).toString()
            }
        ]
    }
    // set the build version var
    buildVersion = parseFloat(version);
    previousBuildVersion = parseFloat(maxVersion);
    console.log(previousBuildVersion);
    // return the history file
    return src('buildHistory.json')
        .pipe(jeditor(history))
        .pipe(dest('./'));
}
/** update the config file in the dist folder */
function configFile() {
    // return the config file with the proper version history
    return src('config.json')
        .pipe(jeditor({
            name: 'asLoader-' + buildVersion + '-min.js',
            version: buildVersion,
            createdOn: (new Date()).toString()
        }))
        .pipe(dest('./'));
}

function moveNormalFile() {
    return src('src/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(stripDebug())
        .pipe(rename('asLoader-' + buildVersion + '.js'))
        .pipe(dest('dist/'));
}

function buildMinFile() {
    return src('src/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename('asLoader-' + buildVersion + '-min.js'))
        .pipe(dest('dist/'));
}
function updateExmaples() {
    return src('examples/index.html')
        .pipe(stringReplace('asLoader-' + previousBuildVersion + '-min.js', 'asLoader-' + buildVersion + '-min.js'))
        .pipe(dest('examples/'))
}

exports.build = series(buildHistoryFile, configFile, moveNormalFile, buildMinFile, updateExmaples);