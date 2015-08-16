call nvmw.bat use v0.10.37
forever start -w --watchDirectory . --watchIgnore *.log --watchIgnore node-modules/* -a -l C:/projects/listen/log/listen.log -o C:/projects/listen/log/output.log -e C:/projects/listen/log/error.log app.js
