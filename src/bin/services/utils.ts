export function basename(path: string) {
	return path.split('/').reverse()[0];
}

export function dirname(path: string) {
	return path.split('/').slice(0, -1).join('/');
}
