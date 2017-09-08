const assert = require('assert');
const Converter = require('../js/convert.js');
const fs = require('fs');

describe('ppt-png', function() {
    describe('normal', function() {
        this.timeout(10000);
        it('Test if the ppt file can convert to a jpg.', function(done) {
            new Converter({
                files:          ['test/OPW 733 Tienduizend redenen.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'jpg',
                logLevel:       3,
                fileNameFormat: '_vers_%d',
                callback:       function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done('converting failed');
                    } else {
                        done();
                    }
                }
            }).run();
        });
    });

    describe('promise', function() {
        this.timeout(10000);
        it('Test with the promise.', function(done) {
            new Converter({
                files:  ['test/OPW 733 Tienduizend redenen.ppt'],
                output: 'output/test/'
            })
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done(data.failed);
                    } else {
                        done();
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('failed', function() {
        this.timeout(10000);
        it('Test if the fail function works on not existing files.', function(done) {
            new Converter({
                files:          ['x.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            })
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('add files', function() {
        this.timeout(10000);
        it('Test the addFiles function.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(['test/OPW 733 Tienduizend redenen.ppt']);

            convertTest
                .wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done(data.failed);
                    } else {
                        done();
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('reset failed', function() {
        this.timeout(10000);
        it('Test the resetFailed function.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       2,
                fileNameFormat: '_vers_%d'
            });

            convertTest.failed = [{
                file: 'test/OPW 733 Tienduizend redenen.ppt'
            }];
            convertTest.resetFailed();

            convertTest
                .wait()
                .then(function(data) {
                    if(data.success.length > 0) {
                        done();
                    } else {
                        done(data.failed);
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('fail', function() {
        this.timeout(10000);
        it('Test if the fail function works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       3,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(['test/OPW 733 Tienduizend redenen.ppt']);

            convertTest
                .wait()
                .then(function(data) {
                    convertTest.fail('test');
                    if(data.failed.length > 0) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('convert to png', function() {
        this.timeout(10000);
        it('Check if the convert to png works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       3,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(['test/OPW 733 Tienduizend redenen.ppt']);

            convertTest
                .wait()
                .then(function(data) {
                    file = convertTest.convertedToPdf(1, [733], false, 'test');

                    fs.readFile(file, function(error, data) {
                        if (error) {
                            done(error);
                        } else {
                            done();
                        }
                    });
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('process page', function() {
        this.timeout(10000);
        it('Check if the process page to png works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       3,
                fileNameFormat: '_vers_%d'
            });

            convertTest.processPage('test/OPW 733 Tienduizend redenen.ppt', true, null);

            convertTest.wait()
                .then(function(data) {
                    if(data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('convert', function() {
        this.timeout(10000);
        it('Check if the convert fail works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       3,
                fileNameFormat: '_vers_%d'
            });

            if(convertTest.convert()) {
                done('error');
            } else {
                done();
            }
        });
    });
});
