# watchthis

Run a command on file system changes.

Isn't there enough of "watchers" already? There is, but I failed to
find a small one that doesn't react erratically on a big amount of
file system changes.

	$ npm install watchthis

* watches directories recursively
* [anymatch](https://github.com/es128/anymatch) style exclude patterns
* debounces events
* ignores all new events while a user-provided command is running
  (if there were changes during the run, it reruns the command 1 time
  once more)


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


## Bugs

Tested under Fedora only.

## License

MIT.
