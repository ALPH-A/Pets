var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var express = require('express');
const mysql=require('mysql2');
var app = express();






const pool=mysql.createPool({
  host:"51.89.167.87",
    user:"elife",
    password:"elife",
    database:"Server",
    port:"4002",
    waitForConnections:true
});

//LOST AND FOUND QUERY
//LOST
app.post('/insertLostpet',function(req,res){
  pool.query("insert into Lost (name,breed,adress,phoneNumber,message) values (?,?,?,?,?)",
              [req.body.name,req.body.breed,req.body.adress,req.body.phoneNumber,req.body.message],
              function(error,queryResult,fields){
                  if(error){
                      res.send("erreur");
                  }
                  else {
                      res.send(queryResult);
                  }
              }
  );
  })

app.put('/updateLostpet',function(req,res){
  pool.query("insert into Lost (name,breed,adress,phoneNumber,message) values (?,?,?,?,?)",
              [req.params.name,req.params.breed,req.body.adress,req.body.phoneNumber,req.body.message],
              function(error,queryResult,fields){
                  if(error){
                      res.send("erreur");
                  }
                  else {
                      res.send(queryResult);
                  }
              }
  );
  })

  app.delete('/deleteLostpet/:name',function(req,res){
    pool.query("delete from Lost where name ='name'",
                [req.params.name],
                function(error,queryResult,fields){
                    if(error){
                        res.send("erreur");
                    }
                    else {
                        res.send(queryResult);
                    }
                }
    );
    })
  
  
  
  app.get('/getAllLost',function(req,res){
      pool.query("select * from Lost ",
              
              function(error,queryResult,fields){
                  if(error){
                      res.send("erreur");
                  }
                  else {
                      res.send(queryResult);
                  }
              }
  );
  })

  //FOUND
  app.post('/insertFoundpet',function(req,res){
    pool.query("insert into Found (name,breed,adress,phoneNumber,message) values (?,?,?,?,?)",
                [req.body.name,req.body.breed,req.body.adress,req.body.phoneNumber,req.body.message],
                function(error,queryResult,fields){
                    if(error){
                        res.send("erreur");
                    }
                    else {
                        res.send(queryResult);
                    }
                }
    );
    })
  
  app.put('/updateFoundpet',function(req,res){
    pool.query("insert into Found (name,breed,adress,phoneNumber,message) values (?,?,?,?,?)",
                [req.params.name,req.params.breed,req.body.adress,req.body.phoneNumber,req.body.message],
                function(error,queryResult,fields){
                    if(error){
                        res.send("erreur");
                    }
                    else {
                        res.send(queryResult);
                    }
                }
    );
    })
  
    app.delete('/deleteFoundpet/:name',function(req,res){
      pool.query("delete from Found where name ='name'",
                  [req.params.name],
                  function(error,queryResult,fields){
                      if(error){
                          res.send("erreur");
                      }
                      else {
                          res.send(queryResult);
                      }
                  }
      );
      })
    
    
    
    app.get('/getAllFound',function(req,res){
        pool.query("select * from Found ",
                
                function(error,queryResult,fields){
                    if(error){
                        res.send("erreur");
                    }
                    else {
                        res.send(queryResult);
                    }
                }
    );
    })
  

    //server listening
  app.listen(3200, function (){
      console.log("server listening on 3200");
  });
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
