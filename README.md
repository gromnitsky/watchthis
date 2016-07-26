# watchthis

Run a command on file system changes.

Isn't there enough of "watchers" already? There is, but I failed to
find a small one that doesn't react erratically on a big amount of
file system changes.

	$ npm install watchthis

* Watches directories recursively.
* [anymatch](https://github.com/es128/anymatch) style exclude patterns
* Debounces events.
* Ignores all new events while a user-provided command is running
  (if there were changes during the run, it reruns the command 1 time
  once more).
* Uses [chokidar](https://github.com/paulmillr/chokidar) under the hood.

## Requirements

* Nodejs 6.3

## Examples

Watch the current dir & print "hello, dude" on each change:

	$ watchthis echo hello, dude

Watch the whole `/tmp` dir + just a file `foo` in the current dir:

	$ watchthis echo hello -a /tmp -a foo

Ignore `foo` & all `*.less` files:

	$ watchthis echo hello -e foo -e \*.less

Be verbose:

	$ watchthis -v echo hello --debounce 400

Separate watchthis options from the options of an external command
(otherwise they may clash, like with `-e` in the example below):

	./watchthis -e \*.less -- make -e

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

## Bugs

Tested under Fedora only.

## License

MIT.
