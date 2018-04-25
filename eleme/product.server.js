var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var appData = require('./data.json'); //加载本地数据文件
var seller = appData.seller; //获取对应的本地数据
var goods = appData.goods;//获取对应的本地数据
var ratings = appData.ratings; //获取对应的本地数据
var apiRoutes = express.Router(); //定义一个路由

apiRoutes.get('/seller', (req, res) => {
	res.json({
		errno: 0,
		data: seller
	}) //接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
apiRoutes.get('/goods', (req, res) => {
	res.json({
		errno: 0,
		data: goods
	})
});
apiRoutes.get('/ratings', (req, res) => {
	res.json({
		errno: 0,
		data: ratings
	})
});
app.use('/api', apiRoutes); //通过路由请求数据

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port);
});
