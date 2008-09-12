
sub file_get_contents {
	open FGC, shift;
	my @x = <FGC>;
	close FGC;
	return (join '', @x)
}

use JavaScript;
my $rt = JavaScript::Runtime->new();
my $cx = $rt->create_context();

$cx->bind_function(print => sub { print @_; });
$cx->eval (q/
window = {};
/);
# $cx->eval_file ('./packer/my.js');
# $cx->eval_file ('./packer/base2-jsb-fp.js');
$cx->eval_file ('./packer/base2-p.js');
$cx->eval_file ('./packer/Packer.js');
$cx->eval_file ('./packer/Words.js');
$pf = 0;
$uf = 0;
$pf = 1 if ($ARGV[0] eq 'pack');
$uf = 1 if ($ARGV[0] eq 'unicode');
$cx->eval ("packflag    = $pf;");
$cx->eval ("unicodeflag = $uf;");
$cx->eval (q{
function minify(c) {
	try {
		var packer = new Packer();
		var value = new Function(c).toString().substr(22);
		value = value.substr(0, value.length - 1);
		value = packer.pack(value, packflag, true, unicodeflag);
		if (!packflag) {
			value=value.replace(/(;|\)\{)/g, '$1\n');
		}
		print (value);
	} catch (e) {
		print (e.message);
	}
}
});
print q{/**
 * the DtTvB's JavaScript Library
 * @author the DtTvB (http://dttvb.yi.org/)
 *--------------------------------
 * You may use and edit this script for any purposes, but please do not
 * modify or remove this notice.
 *--------------------------------
 * Get the latest version of this script and read the manual
 * at http://dttvb.yi.org/dtjs/
 *--------------------------------
 * Compressed and packed using packer.
 * (http://dean.edwards.name/packer/)
 */
};
$cx->call ('minify', file_get_contents('dtjs.js'));

