const assert = require('assert').strict;
const path = require('path');

const matchFileTree = require('..');

const fixtures = path.join(__dirname, 'fixtures');

const checkFixtures = async (pattern, files) => {
	const result = await matchFileTree(pattern, fixtures);
	result.sort();
	files.sort();
	assert.deepEqual(result, files);
};

exports.findAllFilesInCWD = async () => {
	const result = await matchFileTree(/.*/);
	assert.ok(result.length >= 12);

	assert.ok(result.includes('index.js'));
	assert.ok(result.includes('test/fixtures/foo.js'));
	assert.ok(result.includes('test/fixtures/.foo'));
};

exports.findAllFiles = async () => {
	const result = await matchFileTree(/.*/, fixtures);
	assert.ok(result.length === 11);
};

exports.findAllOfExtension = async () => {
	await checkFixtures(/\.js$/, [
		'bar.js',
		'foo.js'
	]);

	await checkFixtures(/\.jsx?$/, [
		'bar.js',
		'foo.js',
		'foo.jsx'
	]);

	await checkFixtures(/\.(jpe?g|a?png)$/, [
		'foo.apng',
		'foo.jpeg',
		'foo.jpg',
		'foo.png',
		'bar.png'
	]);
};

exports.findAllDotfiles = async () => {
	await checkFixtures(/(^|[\\/])\..+$/, [
		'.foo',
		'a/b/.foo'
	]);
};

exports.findAllNested = async () => {
	await checkFixtures(/^a[\\/].+?\.sh$/, [
		'a/foo.sh'
	]);
};
