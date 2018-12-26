const fs = require('fs');
const path = require('path');

function matchPath(pattern, basePath, fullPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(fullPath, {withFileTypes: true}, (err, paths) => {
			if (err) {
				return reject(err);
			}

			const results = [];

			const promises = paths.map(async fpath => {
				const fullNestedPath = path.join(fullPath, fpath.name);

				if (fpath.isDirectory()) {
					const nested = await matchPath(pattern, basePath, fullNestedPath);
					results.push(...nested);
					return;
				}

				if (fpath.isFile() || fpath.isSocket() || fpath.isFIFO()) {
					const testPath = path.relative(basePath, fullNestedPath);
					if (pattern.test(testPath)) {
						results.push(testPath);
					}
				}
			});

			Promise.all(promises)
				.then(() => resolve(results))
				.catch(reject);
		});
	});
}

async function matchFileTree(pattern, rootDir = process.cwd()) {
	return matchPath(pattern, rootDir, rootDir);
}

module.exports = matchFileTree;
