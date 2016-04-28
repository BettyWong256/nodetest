var express = require('express');
var crypto = require('crypto');
var router = express.Router();


function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '毕业设计'});
});

router.get('/home', function (req, res, next) {
    res.render('home', {title: '格拉夫BI数据可视化'});
});


/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/home");
});


/* GET loginHome page. */
router.get("/loginHome", function (req, res) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
        return;
    }
    res.render("loginHome", {title: '格拉夫BI数据可视化'});         //已登录则渲染home页面
});


/* GET login page. */
router.route('/login').get(function (req, res) {
    res.render('login', {title: '登录'});
}).post(function (req, res) {
    //  get user info
    //  user是从model中获取user对象，通过global.dbHandel全局方法
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname; //获取post上来data数据中的uname的值
    User.findOne({name: uname}, function (err, doc) {
        if (err) {
            res.send(500);
            console.log(err );
        } else if (!doc) {
            req.session.error = '用户名不存在';
            res.send(500);
        } else {
            if (md5(req.body.upwd) != doc.password) {
                req.session.error = '密码错误';
                res.send(500);

            } else {
                req.session.user = doc;
                res.send(200);
            }
        }
    });
});


/* GET signIn page. */
router.route("/signIn").get(function (req, res) {    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("sign", {title: '注册'});
}).post(function (req, res) {
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = md5(req.body.upwd);
    User.findOne({name: uname}, function (err, doc) {   // 同理 /login 路径的处理方式
        if (err) {
            req.session.error = '网络异常错误！';
            res.send(500);
            console.log(err + '***注册网络异常***');
        } else if (doc) {
            req.session.error = '用户名已存在！';
            res.send(500);
            console.log(err + '***注册用户名存在***');
        } else {
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            }, function (err, doc) {
                if (err) {
                    console.log(err + '***用户名创建失败***');
                } else {
                    req.session.success = '用户名创建成功！请登录';
                    res.send(200);
                }
            });
        }
    });
});


/* GET draw page. */
router.route("/draw").get(function (req, res) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
        return;
    }
    res.render('draw', {title: '格拉夫绘制图表', test: "123"});
}).post(function (req, res) {
    var File = global.dbHandel.getModel('file');
    var fileId = req.body.fileId;
    var userName = req.body.userName;
    var fileName = req.body.fileName;
    var fileTime = req.body.fileTime;
    var graphData = req.body.graphData;
    var divData = req.body.divData;
    File.findOne({_id: fileId}, function (err, doc) {
        if (doc) {
            File.update({_id: fileId},{                             // 创建一组file对象置入model
                $set: {user_name: userName,
                file_name: fileName,
                file_time: fileTime,
                graph_data: graphData,
                div_data: divData}
            }, function (err, obj) {
                if (err) {
                    console.log(err);
                    res.send(500);
                } else {
                    res.json({id: doc["_id"]});
                }
            })
        } else {
            File.create({                             // 创建一组file对象置入model
                user_name: userName,
                file_name: fileName,
                file_time: fileTime,
                graph_data: graphData,
                div_data: divData
            }, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.send(500);
                } else {
                    res.json({id: doc["_id"]})
                }
            });
        }
    })

});

/* GET personal page. */
router.route('/personal').get(function (req, res) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
        return;
    }
    var File = global.dbHandel.getModel('file');
    var personalMeg = '';
    var status = 0;
    var personalArr = [];
    File.find({user_name: req.session.user.name}, function (err, docs) {
        if (err) {
            status = 1;
            personalMeg = '还没有作品哦~快去绘制你的图表吧！';
        } else {
            docs.forEach(function(e){
                var d = e.file_time;
                e.date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            });
            if (docs.length == 0) {
                status = 1;
                personalMeg = '还没有作品哦~快去绘制你的图表吧！';
            } else {
                personalArr = docs;
            }
        }
        res.render('personal', {title: '格拉夫-个人中心', msg: personalMeg, status: status, doc: personalArr});
    });

}).post(function (req, res) {
    var File = global.dbHandel.getModel('file');
    var fileId = req.body.id;
    File.findOne({_id: fileId}, function (err, doc) {
        if (err) {
            res.send(500);
            req.session.error = '删除失败，请重试……';
        } else if (!doc) {
            req.session.error = '删除失败，请重试……';
            res.send(500);
        } else {
            File.remove({_id: fileId}, function (err) {
                if (err) {
                    res.send(500);
                    req.session.error = '删除失败，请重试……';
                } else {
                    req.session.success = '删除成功';
                    res.send(200);
                }
            });

        }
    })
});


/* GET show page. */
router.route('/show').get( function (req, res, next) {
    if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
        return;
    }
    var id = req.param("fileId");
    var File = global.dbHandel.getModel('file');
    if(!id){ res.redirect("/personal");}
    else{
        File.findOne({_id: id}, function (err, doc) {
            if (err) {
                req.session.error = '系统错误，请刷新页面';
                res.redirect("/personal");
            } else if (!doc) {
                req.session.error = '未查询到数据，请联系管理员……';
                res.redirect("/personal");
            } else {
                res.render("show",{"title":doc.file_name,"doc":JSON.stringify(doc),"layout":false});
            }
        })
    }

});


module.exports = router;
