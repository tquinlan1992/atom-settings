'use babel'

export function activate() {
	console.time('activate js-refactor')
	if (!atom.packages.isPackageLoaded('refactor')) {
		atom.notifications.addWarning(
			'js-refactor package requires refactor package',
			{
				detail: 'You can install and activate refactor package using the preference pane.'
			}
		)
	}
	console.timeEnd('activate js-refactor')
}

export Ripper from './ripper'
