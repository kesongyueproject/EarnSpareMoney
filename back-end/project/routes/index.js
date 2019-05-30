var express = require('express');
var bodyParser = require("body-parser");  
var router = express.Router();
var app = express();  

app.use(bodyParser.urlencoded({ extended: false }));


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.json(200, {
    account: '132',
    psw: '200'
  });
});

router.post('/', function(req, res, next) {
  res.json(200, {
    account: req.body.user,
    psw: req.body.password,
    id: req.query.id
  });
});

router.param('name', function(req, res, next, name) {
  // 对name进行验证或其他处理……
  console.log(name);
  req.name = name;
  next(); 
});

router.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.name + '!' + "id=" + req.query.id);
});*/

router.post('/register', function(req, res, next) {
  res.json(200, {
    msg: "success",
    user: req.body.user,
    psw: req.body.password,
  });
});

router.put('/login', function(req, res, next) {
  if (req.body.user == "test" && req.body.password == "test"){
    res.json(200, {
    msg: "success",
    user: req.body.user,
    psw: req.body.password,
    });
  } else {
    res.json(200, {
    msg: "wrong password"
    });
  }
});

router.put('/user', function(req, res, next) {
  if (req.body.user == "test" && req.body.password == "test"){
    res.json(200, {
    msg: "success", 
    user: req.body.user,
    nickname: "cxk",
    school: "SYSU",
    phone: "12345678900",
    credit: 100,
    money: 1000,
    release_mission:[
      {
        mid: 1,
        title: "aaa"
      },
      {
        mid: 2,
        title: "bbb"
      }
    ],
    participate_mission:[
      {
        mid: 3,
        title: "ccc"
      },
      {
        mid: 4,
        title: "ddd"
      }
    ]
    });
  } else {
    res.json(200, {
    msg: "wrong password"
    });
  }
});

router.get('/user', function(req, res, next) {
  res.json(200, {
    msg: "success",
    nickname: "cxk",
    school: "SYSU",
    phone: "12345678900",
    credit: 100,
    release_mission:[
      {
        mid: 1,
        title: "aaa"
      },
      {
        mid: 2,
        title: "bbb"
      }
    ],
    participate_mission:[
      {
        mid: 3,
        title: "ccc"
      },
      {
        mid: 4,
        title: "ddd"
      }
    ]
  });
});

router.get('/mission', function(req, res, next) {
  res.json(200, {
    msg: "success",
    mid: req.query.mid,
    publisher: 555,
    title: "aaa",
    details: "喜欢唱、跳、rap还有篮球"
  });
});

router.get('/missions', function(req, res, next) {
  res.json(200, {
    msg: "success",
    count: 2,
    missions: [
    {
      mid: 1,
      publisher: test,
      title: "aaa",
      details: "喜欢唱、跳、rap还有篮球"
    },
    {
      mid:2,
      publisher: test,
      title: "bbb",
      details: "讨厌唱、跳、rap还有篮球"      
    }
    ]
  });
});

router.post('/mission', function(req, res, next) {
  res.json(200, {
    msg: "success",
    publisher: req.body.publisher,
    title: req.body.title,
    details: req.body.details
  });
});

module.exports = router;
