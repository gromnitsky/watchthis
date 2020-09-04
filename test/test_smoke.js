#!/usr/bin/env -S mocha --ui=tdd

'use strict';

let assert = require('assert')
let cp = require('child_process')
let path = require('path')

const cmd = path.join(__dirname, '..', 'watchthis')

suite('cli', function(done) {
//    this.timeout(5000)

    setup(function() {
	process.chdir(__dirname)
    })

    test('no debounce', function(done) {
	let child = cp.spawn(cmd, ['--debounce', '0', 'echo', 'omglol'])
	let stdout = ''
	let stderr = ''
	child.stdout.on('data', data => stdout += data.toString())
	child.stderr.on('data', data => stderr += data.toString())

	setTimeout( () => {
	    cp.execSync(`touch a-long-running-task && sleep 0.1 && touch a-long-running-task`)
	}, 600)

	child.on('exit', () => {
//	    console.log(stderr)
//	    console.log(stdout)
	    let r = stdout.trim().split("\n")
	    assert.equal(2+2, r.length)
	    assert(r.every( val => val === "omglol"))

	    done()
	})

	setTimeout( () => {
	    child.stdout.destroy()
	    child.stderr.destroy()
	    child.kill('SIGKILL')
	}, 1000)
    })

    test('debounce', function(done) {
	let child = cp.spawn(cmd, ['--debounce', '100', 'echo', 'omglol'])
	let stdout = ''
	let stderr = ''
	child.stdout.on('data', data => stdout += data.toString())
	child.stderr.on('data', data => stderr += data.toString())

	setTimeout( () => {
	    cp.execSync(`touch a-long-running-task && sleep 0.1 && touch a-long-running-task`)
	}, 600)

	child.on('exit', () => {
//	    console.log(stderr)
//	    console.log(stdout)
	    let r = stdout.trim().split("\n")
	    assert.equal(2+1, r.length)

	    done()
	})

	setTimeout( () => {
	    child.stdout.destroy()
	    child.stderr.destroy()
	    child.kill('SIGKILL')
	}, 1000)
    })

})
