# loadpet

A very dumb load-testing tool that uses Puppet to load a given URL
(with an optional "NUMBER" parameter that gets replaced) in a
configurable number of browser windows.

The `remote_control` folder has scripts you can use to control a
set of load testing machines from your terminal.

Each of these machines must have the load testing code loaded at
a specific location; see `remote_control/c2lt`.

Typical use is to run multiple invocations of c2lt, each in its
own terminal window, each for a different load testing machine.