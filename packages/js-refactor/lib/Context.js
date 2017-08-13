'use babel'

import {parse}	from 'babylon'
import traverse	from 'babel-traverse'
import debug	from './debug'
const d = debug('js-refactor:context')

export default class Context {
	setCode(code, options) {
		this._ast = parse(code, options)
	}
	identify(loc) {
		d('identify', loc)
		let binding
		traverse(this._ast, {
			enter(path) {
				const {start, end, name} = path.node
				if (end < loc)	return void path.skip()
				if (start > loc)	return void path.stop()
				if (test(path)) {
					binding = path.scope.getBinding(name)
					return void path.stop()
				}
			},
		})
		if (!binding) d('global?')
		return binding
	}
}

function test(path) {
	if (path.isReferencedIdentifier()) return true
	if (path.isBindingIdentifier()) return true

	// for import, do not need now
	// const p = path.parentPath
	// if (p.isImportSpecifier()) return path.node === p.node.local

	// for Method/ArrowFunction, seems babel's bug
	if (path.isIdentifier()) {
		const binding = path.scope.getBinding(path.node.name)
		if (binding && binding.identifier === path.node) {
			d('babel bug', path)
			return true
		}
	}

	// d('WTF', path,
	// 	path.isIdentifier(),
	// 	path.isReferencedIdentifier(),
	// 	path.isBindingIdentifier(),
	// 	path.isImportSpecifier(),
	// 	path.isFunction(),
	// 	path.scope.getBinding(path.node.name)
	// )
	return false
}
