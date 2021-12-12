/**
 * Default options example
 *
 */

var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');
var app = koa();

var options = {
	origin: '*';
}

app.use(cors(options));

app.use(route.get('/', function() {
  this.body = { msg: 'Hello World!' };
}));

app.listen(3000);
