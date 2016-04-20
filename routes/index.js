var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '毕业设计' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: '格拉夫BI数据可视化' });
});

router.get('/loginHome', function(req, res, next) {
  res.render('loginHome', { title: '格拉夫BI数据可视化' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});

router.get('/signIn', function(req, res, next) {
  res.render('sign', { title: '注册' });
});

router.get('/draw', function(req, res, next) {
  res.render('draw', { title: '格拉夫绘制图表'});
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: '格拉夫-个人中心' });
});


module.exports = router;
