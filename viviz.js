var fs       = require('fs');
var http     = require('http'); http.globalAgent.maxSockets = 100;  // Most Apache servers have this set at 100.
var request  = require("request");
var	express  = require('express');
var	app      = express().use(express.bodyParser());
var	server   = require("http").createServer(app);
var qs       = require('querystring');
var fs       = require('fs');
var xml2js   = require('xml2js');
var port     = process.argv[2] || 8005;
var mkdirp   = require("mkdirp");
var readdirp = require("readdirp");

var debug = true;

function handleRequest(req, res) {
	var options = parseOptions(req);
	console.log("File content: " + JSON.stringify(options));

	var tmpa = options.id.split("/");
	console.log(tmpa)
	if (tmpa.length < 3)
		res.send(400);
	
	var path  = tmpa.slice(0,tmpa.length-1).join("/");
	console.log("path: " +__dirname+"/"+ path+"/");

	var xfname = tmpa[tmpa.length-1];
	console.log("fname: " + xfname);

	console.log("Creating: "+__dirname+"/uploads/"+path)
	mkdirp(__dirname+"/uploads/"+path,cb);

	function cb() {
		var zfname = "/uploads/"+path+"/"+xfname+".json";
		console.log("Saving: " + __dirname + zfname)
		fs.writeFileSync(__dirname + "var cataloginfo=" + zfname,JSON.stringify(options));
		if (debug) console.log("Sent response.");
		res.send("Catalog saved to "+req.headers.host+zfname+"\n");
	}
}

function parseOptions(req) {
	var options = {};
    
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	options.id				= req.query.id				|| req.body.id				|| "test/file/id";
	options.name				= req.query.name				|| req.body.name				|| "";
	options.title			= req.query.title			|| req.body.title			|| "Test Catalog";
	options.about			= req.query.about			|| req.body.about			|| "";
	options.script			= req.query.script			|| req.body.script			|| "";
	options.attributes		= req.query.attibutes		|| req.body.attributes		|| "";
	options.sprintf			= req.query.sprintf			|| req.body.sprintf			|| "";
	options.sprintfstart		= req.query.sprintfstart		|| req.body.sprintfstart		|| "";
	options.sprintfstop		= req.query.sprintfstop		|| req.body.sprintfstop		|| "";
	options.strftime			= req.query.strftime			|| req.body.strftime			|| "";
	options.strftimestart	= req.query.strftimestart	|| req.body.strftimestart	|| "";
	options.strftimestop		= req.query.strftimestop		|| req.body.strftimestop     || "";

	options.fulldir			= req.query.fulldir 			|| req.body.fulldir			|| "";
	options.thumbdir			= req.query.thumbdir			|| req.body.thumbdir			|| "";
	options.fullwidth		= req.query.fullwidth 		|| req.body.fullwidth		|| "";
	options.thumbwidth		= req.query.thumbwidth		|| req.body.thumbwidth		|| "200";
	options.fullheight		= req.query.fullheight 		|| req.body.fullheight		|| "";
	options.thumbheight		= req.query.thumbheight		|| req.body.thumbheight		|| "";
	options.fullpreprocess	= req.query.fullpreprocess	|| req.body.fullpreprocess	|| "http://imgconvert.org/";
	options.thumbpreprocess	= req.query.thumbpreprocess	|| req.body.thumbpreprocess	|| "http://imgconvert.org/";
	
	return options;

}
var hourMs = 1000*60*60;
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads',express.directory(__dirname + '/uploads'));

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js',express.directory(__dirname + '/js'));
app.use('/css',express.directory(__dirname + '/css'));

app.post('/save', function (req, res) {handleRequest(req,res)});
app.get('/save', function (req, res) {handleRequest(req,res)});
app.get('/catalogs', function (req, res) {
	var files = [];
	var catalogs = [];
	readdirp({ root: './uploads', fileFilter: '*.json'})
	  	.on('data', function (entry) {
	  		console.log(entry);
	  		var data = fs.readFileSync(entry.fullPath,'utf8');
	  		//console.log(require(entry.fullPath))
	  		catalogs.push(require(entry.fullPath))
	  		files.push(entry.path)
	  	})
	  	.on('end', function () {
	  		//console.log(files);
	  		//console.log(catalogs);
	  		res.contentType('application/json');
	  		res.send("catalogjson="+JSON.stringify(catalogs));
	  		//res.send(JSON.stringify(files));
	  	})
	
});

app.get('/', function (req, res) {
	res.write(fs.readFileSync(__dirname+"/indexrelative.htm","utf8"));
	res.end();
});

server.listen(port);