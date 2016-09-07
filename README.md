# watchthis

Run a command on file system changes.

Isn't there enough of "watchers" already? There is, but I failed to
find a small one that doesn't react erratically on a big amount of
file system changes.

	$ npm install watchthis

* Watches directories recursively.
* Has post-run hooks.
* [anymatch](https://github.com/es128/anymatch) style exclude patterns
* Debounces events.
* Ignores all new events while a user-provided command is running (if
  there were changes during the run, it (by default, but it's
  configurable) reruns the command 1 time once more).
* Uses [chokidar](https://github.com/paulmillr/chokidar) under the hood.

## Requirements

* Nodejs 6.3+

## Examples

Watch the current dir & print "hello, dude" on each change:

	$ watchthis echo hello, dude

Watch the whole `/tmp` dir + just a file `foo` in the current dir:

	$ watchthis echo hello -a /tmp -a foo

Ignore `foo` & all `*.less` files:

	$ watchthis echo hello -e foo -e \*.less

Be verbose & change the number of milliseconds for a debounce delay:

	$ watchthis -v echo hello --debounce 400

Separate watchthis options from the options of an external command
(otherwise they may clash, like with `-e` in the example below):

	$ watchthis -e \*.less -- make -e

Don't rerun the external command if, during its run, some files were
modified:

	$ watchthis --norerun -a ../foo/src -- make -f ../foo/Makefile

View the list of watchers in realtime:

(terminal #1)

	$ cd ~/Desktop
	$ mkdir 1
	$ watchthis echo alrigth -a 1 -S 8888

(terminal #2)

~~~
$ curl -s http://127.0.0.1:8888 | json
{
  "/home/alex/Desktop": [
	"1"
  ],
  "/home/alex/Desktop/1": []
}
~~~

~~~
$ touch ~/Desktop/1/omglol
$ curl -s http://127.0.0.1:8888 | json
{
  "/home/alex/Desktop": [
	"1"
  ],
  "/home/alex/Desktop/1": [
	"omglol"
  ]
}
~~~

## Post-run hooks

* `exit0`, runs when a user-provided command returns 0 exit status;
* `exit1`, when the exit status != 0.

~~~
$ watchthis echo hello, dude --exit0 'play -V1 -q /usr/share/sounds/freedesktop/stereo/message.oga' --exit1 'play -V1 -q /usr/share/sounds/freedesktop/stereo/bell.oga'
~~~

Both `--exit0` & `--exit0` require ∃1 arg that is internally parsed
via [shell-quote](https://github.com/substack/node-shell-quote)
regardless of your underline OS shell.


## A config file?

You don't need one & the world doesn't need another rc file. Use shell
aliasing, for example, add to `~/.bashrc`:

~~~
alias watchthis.sound='watchthis \
	--exit0 "play -V1 -q /usr/share/sounds/freedesktop/stereo/message.oga" \
	--exit1 "play -V1 -q /usr/share/sounds/freedesktop/stereo/bell.oga"'
~~~

& run the program like

	$ watchthis.sound echo hello


## Bugs

Tested under Fedora only.

## License

MIT.
