var express = require('express');
var bodyParser = require('body-parser');  
var router = express.Router();
var app = express();  
var path = require('path');
var fs = require('fs');
var multer  = require('multer');
var db = require('../config/db');
const upload = multer({ dest: 'C:/Users/Administrator/Desktop/image' })

app.use(bodyParser.urlencoded({ extended: false }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(200, {
    test : "success"
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body.singleSelectQuestions[0].data);
  res.json(200, {
    test : "success"
  });
});

router.post('/register', function(req, res, next) {
  const sql = 'insert into `users`(`uid`, `passwd`, `nickname`, `signature`, `img_url`, `tel`, `school`, `money`, `credit`) values("'+
  req.body.uid + '","' +
  req.body.passwd + '","' +
  req.body.nickname + '","' +
  req.body.signature + '","' +
  req.body.img_url + '","' +
  req.body.tel + '","' +
  req.body.school + '",' +
  req.body.money + ',' +
  req.body.credit + ')';
  db.query(sql, function(err, rows) {
    if(err){
      res.json(200, {
        msg : "user exists"
      });
    }else {
      res.json(200, {
        msg : "success"
      });
    }
  });
});

router.put('/login', function(req, res, next) {
  const sql = 'select * from `users` where uid="' + req.body.uid + '"';
  db.query(sql, function(err, rows) {
    var count = 0;
    for (var object in rows) {
      count++;
    }
    if (count == 0) {
      res.json(200, {
        msg : "user not found"
      });
    } else {
      if (rows[0].passwd == req.body.passwd) {
        res.json(200, {
          msg : "success"
        });
      } else {
        res.json(200, {
          msg : "wrong password"
        });
      }
    }
  }); 
});

router.get('/user', function(req, res, next) {
  var sql = 'select * from `users` where uid="' + req.query.uid + '"';
  var userInfo;
  var publish;
  var participate;
  db.query(sql, function(err, rows) {
    userInfo = rows[0];
    sql = 'select `mid` from `missions` where uid="' + req.query.uid + '"';
    db.query(sql, function(err, rows) {
      var count = 0;
      for (var object in rows) {
        count++;
      }
      if (count == 0) {
        publish = [];
      } else {
        publish = rows;
      }
      sql = 'select `mid`, `finish` from `operations` where uid="' + req.query.uid + '"';
      db.query(sql, function(err, rows) {
        var count = 0;
        for (var object in rows) {
          count++;
        }
        if (count == 0) {
          participate = [];
        } else {
          participate = rows;
        }        
        res.json(200, {
          userInfo,
          publish : publish,
          participate : participate
        });
      });
    });
  });
});

router.put('/user', function(req, res, next) {
  const sql = 'update `users` set `uid`="' + req.body.uid +
   '",`passwd`="' + req.body.passwd + 
   '",`nickname`="' + req.body.nickname + 
   '",`signature`="' + req.body.signature + 
   '",`img_url`="' + req.body.img_url + 
   '",`tel`="' + req.body.tel + 
   '",`school`="' + req.body.school + 
   '",`money`=' + req.body.money + 
   ',`credit`=' + req.body.credit + 
   ' where uid="' + req.body.uid + '"';
  db.query(sql, function(err, rows) {
    if(err){
      res.json(200, {
        msg : err
      });
    }else {
      res.json(200, {
        msg : "success"
      });
    }
  });
});

router.get('/users', function(req, res, next) {
  const sql = 'select `uid` from `operations` where mid=' + req.query.mid + ';';
  db.query(sql, function(err, rows) {
    if (err) {
      res.json(200, {
        msg : "mission not exists"
      });
    } else {
      res.json(200, rows);
    }
  });
});

router.get('/mission', function(req, res, next) {
  const sql = 'select * from `missions` where mid=' + req.query.mid + ';';
  db.query(sql, function(err, rows) {
    if (err) {
      res.json(200, {
        msg : "mission not exists"
      });
    } else {
      res.json(200, rows[0]);
    }
  });
});

router.get('/missions', function(req, res, next) {
  const sql = 'select * from `missions`';
  db.query(sql, function(err, rows) {
    var count = 0;
    for (var object in rows) {
      count++;
    }
    res.json(200, {
      count : count,
      data : rows
    });
  });
});

router.post('/mission', function(req, res, next) {
  var sql = 'insert into `missions`(`title`, `uid`, `reward`, `mtype`, `description`, `imgs_url`, `people_limit`, `people`, `ing`, `submit`) values("'+
  req.body.title + '","' +
  req.body.uid + '",' +
  req.body.reward + ',"' +
  req.body.mtype + '","' +
  req.body.description + '","' +
  req.body.imgs_url + '",' +
  req.body.people_limit + ',' +
  req.body.people + ',' +
  req.body.ing + ', 0);';
  /*var count = 0;
  console.log(req.body.singleSelectQuestions[0]);
  var count = 0;
  for (var object in req.body.singleSelectQuestions[0].options){
    count++;
  }
  console.log(count);*/
  db.query(sql, function(err, rows) {
    if(err){
      console.log(err);
    }else {
      if (req.body.mtype == "questionnaire") {
        var singleSelectQuestions = req.body.singleSelectQuestions;
        var multipleSelectQuestions = req.body.multipleSelectQuestions;
        var count1 = 0;
        var count2 = 0;
        for (var object in singleSelectQuestions) {
          count1++;
          sql = 'insert into `questions`(`mid`, `type`, `question`, `no`) values('+
            1 + ',"' +
            singleSelectQuestions[object].type + '","' +
            singleSelectQuestions[object].subject + '",' +
            count1 + ');';
          db.query(sql, function(err, rows) {
            if (err) {
              console.log(err);
            }
          });
        }
        /*
        for (var temp in singleSelectQuestions){
          count2++;
          sql = 'select `qid` from questions where `mid`=' + '1' + ' order by no;';
          console.log(sql);
          db.query(sql, function(err, rows) {
            if (err) {
              console.log(err);
            } else {
              console.log(rows);
              for (var i = 0; i < rows.length; i++) {
                for (var object in singleSelectQuestions[i].options) {
                  sql = 'insert into `options`(`qid`, `opt`) values(' + rows[i] + ',"' + object.name + '");';
                  db.query(sql, function(err, rows) {
                    if (err) {
                      console.log(err);
                    }
                  });
                }
              }
            }
          });
        }*/
      }
    }
  });
  res.json(200, {
    msg : "success"
  });
});

router.delete('/mission', function(req, res, next) {
  var sql = 'delete from `operations` where mid=' + req.body.mid + ';';
  var publish = "";
  var credit = 0;
  db.query(sql, function(err, rows) {
    if(err){
      res.json(200, {
        msg : err
      });
    } else {
      sql = 'select `uid` from `missions` where mid=' + req.body.mid + ';';
      db.query(sql, function(err, rows) {
        if (err) {
          res.json(200, {
            msg : err
          });
        } else {
          publisher = rows[0].uid;
          sql = 'select `credit` from `users` where uid="' + publisher + '";';
          db.query(sql, function(err, rows) {
            if (err) {
              res.json(200, {
                msg : err
              });
            } else {
              credit = rows[0].credit - 1;
              sql = 'update `users` set `credit`=' + credit + ' where uid="' + publisher + '";';
              db.query(sql, function(err, rows) {
                if (err) {
                  res.json(200, {
                    msg : err
                  });
                } else {
                  sql = 'delete from `missions` where mid=' + req.body.mid + ';';
                  db.query(sql, function(err, rows) {
                    if(err){
                      res.json(200, {
                        msg : err
                      });
                    } else {
                      res.json(200, {
                        msg : "success"
                      });
                    }
                  });               
                }
              });
            }
          });
        }
      });
    }
  });
});

/*
router.post('/image', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "C:/Users/Administrator/Desktop/image/"; //改变临时目录
  form.parse(req, function(error, fields, files) {
    for (var key in files) {
      var file = files[key];
      var fName = (new Date()).getTime();
      switch (file.type) {
        case "image/jpeg":
            fName = fName + ".jpg";
            break;
        case "image/png":
            fName = fName + ".png";
            break;
        default:
            fName = fName + ".png";
            break;
      }
      console.log(file, file.size);
      var uploadDir = "C:/Users/Administrator/Desktop/image/" + fName;
      fs.rename(file.path, uploadDir, function(err) {
          if (err) {
              msg : err
          } else {
            msg : "success"
          }                
      });
    }
  });
});*/


router.post('/image', upload.single('file'), function(req, res, next){
    var file = req.file;
    res.json(200, {
      msg : 'success',
      imgs_url : 'http://happyzhier:3000/image/' + file.filename
    });
});

router.get('/image/:name', function(req, res, next) {
  const rs = fs.createReadStream('../../../image/' + req.params.name);
  rs.pipe(res);
});


router.post('/participate', function(req, res, next) {
  var sql = 'select * from `missions` where mid=' + req.body.mid + ';';
  var people = 0;
  db.query(sql, function(err, rows) {
    if (err) {
      res.json(200, {
        msg : err
      });
    } else {
      var count = 0;
      for (var object in rows){
        count++;
      }
      if (count > 0 && rows[0].people_limit > rows[0].people) {
        people = rows[0].people + 1;
        sql = 'insert into `operations`(`uid`, `mid`, `finish`) values("'+ req.body.uid + '",' + req.body.mid + ', false); ';
        db.query(sql, function(err, rows) {
          if(err){
            res.json(200, {
              msg : err
            });
          } else {
            sql = 'update `missions` set `people`=' + people + ' where mid=' + req.body.mid + ';';
            db.query(sql, function(err, rows) {
              if (err) {
                res.json(200, {
                  msg : err
                });
              } else {
                res.json(200, {
                  msg : "success"
                });
              }
            }); 
          }
        });
      } else {
        res.json(200, {
        msg : count == 0 ? "mission not exists" : "participants are full"
      });
      }
    }
  });
});

router.put('/finish', function(req, res, next) {
  var sql = 'select * from `missions` where mid=' + req.body.mid + ';';
  var people_limit = 0;
  var reward = 0;
  var submit = 0;
  var publisher = "";
  var money = 0;
  var credit = 0;
  db.query(sql, function(err, rows) {
    if (err) {
      res.json(200, {
        msg : err
      });
    } else {
      var count = 0;
      for (var object in rows){
        count++;
      }
      if (count > 0) {
        people_limit = rows[0].people_limit;
        reward = rows[0].reward;
        submit = rows[0].submit + 1;
        publisher = rows[0].uid;
        sql = 'update `operations` set `finish`=true where mid =' + req.body.mid + ' and uid="' + req.body.uid + '";';
        db.query(sql, function(err, rows) {
          if(err){
            res.json(200, {
              msg : err
            });
          } else {
            if (people_limit == submit) {
              sql = 'update `missions` set `submit`=' + submit + ', `ing`=false ' + ' where mid=' + req.body.mid + ';';
            } else {
              sql = 'update `missions` set `submit`=' + submit + ' where mid=' + req.body.mid + ';';
            }            
            db.query(sql, function(err, rows) {
              sql = 'select `money`, `credit` from `users` where uid="' + req.body.uid + '";';
              db.query(sql, function(err, rows){
                if (err) {
                  res.json(200, {
                    msg : err
                  });
                } else {
                  money = rows[0].money + reward;
                  credit = rows[0].credit + 1;
                  if (credit > 100) {
                    credit = 100;
                  }
                  sql = 'update `users` set `money`=' + money + ', `credit`= ' + credit + ' where uid="' + req.body.uid + '";';
                  db.query(sql, function(err, rows) {                    
                    sql = 'select `money` from `users` where uid="' + publisher + '";';
                    db.query(sql, function(err, rows){
                      if (err) {
                        res.json(200, {
                          msg : err
                        });
                      } else {
                        money = rows[0].money - reward;
                        sql = 'update `users` set `money`=' + money + ' where uid="' + publisher + '";';
                        db.query(sql, function(err, rows) {
                          if (err) {
                            res.json(200, {
                              msg : err
                            });
                          } else {
                            res.json(200, {
                              msg : "success"
                            });
                          }
                        });
                      }
                    });
                  }); 
                }
              });
            }); 
          }
        });
      } else {
        res.json(200, {
        msg : "mission not exists"
      });
      }
    }
  });
});

router.delete('/participate', function(req, res, next) {
  var sql = 'select * from `missions` where mid=' + req.body.mid + ';';
  var people = 0;
  var credit = 0;
  db.query(sql, function(err, rows) {
    if (err) {
      res.json(200, {
        msg : err
      });
    } else {
      people = rows[0].people - 1;
      sql = 'update `missions` set `people`=' + people + ' where mid=' + req.body.mid + ';';
      db.query(sql, function(err, rows) {
        if (err) {
          res.json(200, {
            msg : err
          });
        } else {
          sql = 'select `credit` from `users` where uid="' + req.body.uid + '";';
          db.query(sql, function(err, rows) {
            if (err) {
              res.json(200, {
                msg : err
              });
            } else {
              credit = rows[0].credit - 1;
              sql = 'update `users` set `credit`=' + credit + ' where uid="' + req.body.uid + '";';
              db.query(sql, function(err, rows) {
                if (err) {
                  res.json(200, {
                    msg : err
                  });
                } else {
                  sql = 'delete from `operations` where mid=' + req.body.mid + ' and uid="' + req.body.uid + '";';
                  db.query(sql, function(err, rows) {
                    if (err) {
                      res.json(200, {
                        msg : err
                      });
                    } else {
                      res.json(200, {
                        msg : 'success'
                      });
                    }
                  });     
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/questionnaire', function(req, res, next) {
  /*const sql = 'insert into `missions`(`title`, `uid`, `reward`, `mtype`, `description`, `imgs_url`, `people_limit`, `people`, `ing`, `submit`) values("'+
  
  db.query(sql, function(err, rows) {
    if(err){
      res.json(200, {
        msg : err
      });
    }else {
      res.json(200, {
        msg : "success"
      });
    }
  });*/  
  res.json(200, {
      mid : req.query.mid,
      singleSelectQuestions : [
        {
          type : "单选",
          subject : "CXK擅长",
          options : [{name :　"唱"},{name :　"跳"},{name :　"rap"},{name :　"篮球"}]
        },
        {
          type : "单选",
          subject : "WYF的巅峰之作",
          options : [{name :　"大碗宽面"},{name :　"bad girl"}]
        }
      ],
      multipleSelectQuestions : [
        {
          type : "多选",
          subject : "以下哪些是你的常用语气词",
          options : [{name :　"啊"},{name :　"哦"},{name :　"咦"},{name :　"哈"}]
        },
        {
          type : "多选",
          subject : "以下哪些是你的常用颜文字",
          options : [{name :　"QAQ"},{name :　"OwO"},{name :　"0.0"}]
        },
        {
          type : "多选",
          subject : "以下哪些是你喜欢的饮品",
          options : [{name :　"冰激凌红茶"},{name :　"奶绿"},{name :　"高山龙井"}]
        },
        {
          type : "多选",
          subject : "你懂得以下哪些数字的意思",
          options : [{name :　"555"},{name :　"666"}]
        }
      ]
  });
});


module.exports = router;
