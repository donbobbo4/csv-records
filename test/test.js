const assert = require('assert');
const expect = require('chai').expect;
const parser = require('../parser.js');


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('parser tests', function () {
    let commaData;
    let pipeData;
    let spaceData;

    context('parse file types', function () {
        before(function () {
            let commaArgs = {
                filename: "comma.txt",
                fileType: "comma"
            };
            commaData = parser.main(commaArgs);
            let pipeArgs = {
                filename: "pipe.txt",
                fileType: "pipe"
            };
            pipeData = parser.main(pipeArgs);
            let spaceArgs = {
                filename: "space.txt",
                fileType: "space"
            };
            spaceData = parser.main(spaceArgs);
        });
        it('Do comma files parse', function () {
            //const cli = require('../csv-cli.js');
            let args = {
                filename: "comma.txt",
                fileType: "comma"
            }
            assert(Array.isArray(commaData));

        });
        it('Do pipe files parse', function () {
            //const cli = require('../csv-cli.js');
            let args = {
                filename: "pipe.txt",
                fileType: "pipe"
            }

            assert(Array.isArray(pipeData));

        });
        it('Do space files parse', function () {
            //const cli = require('../csv-cli.js');
            let args = {
                filename: "space.txt",
                fileType: "space"
            }

            assert(Array.isArray(spaceData));

        });
    });
});




