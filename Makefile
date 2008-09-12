all: docs javascript

docs: index.html
javascript: dtjs.compressed.js dtjs.packed.js dtjs.ob.js

index.html: index.php data.txt
	php index.php > index.html

dtjs.compressed.js: dtjs.js minify.pl
	perl minify.pl > dtjs.compressed.js

dtjs.packed.js: dtjs.js minify.pl
	perl minify.pl pack > dtjs.packed.js

dtjs.ob.js: dtjs.js minify.pl
	perl minify.pl unicode > dtjs.ob.js

