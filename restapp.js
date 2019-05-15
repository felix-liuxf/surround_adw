
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var restify = require('restify');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/api/getCustomerPie', function (req, res, next) {
    console.log("getCustomerPie");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select * from customer', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            res.send(result.rows);
            return next();
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    });
  
});
server.get('/api/getYearLine', function (req, res, next) {
    console.log("getYearLine");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select * from linedata', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            res.send(result.rows);
            return next();
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    });
  
});
server.get('/api/getRegionBar', function (req, res, next) {
    console.log("getRegionBar");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select * from regionorder', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            res.send(result.rows);
            return next();
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    });
  
});
server.get('/api/getUserIndustry', function (req, res, next) {
    console.log("getUserIndustry");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select industry ,count(industry) ICount from sur_user group by industry', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            let data={};
            data.chart="bar";
            data.data=[];
            data.labels=[];
           
            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
                data.labels[i]=(result.rows[i].shift());
                data.data[i]=(result.rows[i].shift());
              
            }

            //data.data=dataICount;
            //data.labels=dataIndustry;
            //res.send(result.rows);
            res.send(data);
            
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
                return next();
            });
        })
    });

});


server.get('/api/getUserSalaryLevel', function (req, res, next) {
    console.log("getUserSalaryLevel");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select salary_level ,count(salary_level) ICount from sur_user group by salary_level', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            let data={};
            data.chart="bar";
            data.data=[];
            data.labels=[];
           
            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
                data.labels[i]=(result.rows[i].shift());
                data.data[i]=(result.rows[i].shift());
              
            }

            //data.data=dataICount;
            //data.labels=dataIndustry;
            //res.send(result.rows);
            res.send(data);
            
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
                return next();
            });
        })
    });

});
server.get('/api/getPaymodePie', function (req, res, next) {
    console.log("getPaymodePie");
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute('select paymode ,count(paymode) ICount from sur_order group by paymode', [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            let data={};
            data.chart="pie";
            data.data=[];
            data.labels=[];
            let per100=0;
            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
                data.labels[i]=(result.rows[i].shift());
                data.data[i]=(result.rows[i].shift());
                per100+=data.data[i];
              
            }

            for(let p=0;p<data.data.length;p++)
            {
                data.data[p]=(Math.round(data.data[p] * 100)/per100).toFixed(2)-0;
            }
            //data.data=dataICount;
            //data.labels=dataIndustry;
            //res.send(result.rows);
            res.send(data);
            
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
                return next();
            });
        })
    });

});

server.get('/api/getBillAmount', function (req, res, next) {
    console.log("getBillamount:day:"+req.query.day+",week:"+req.query.week);
    
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) {
        if (err) {
            error = err;
            return;
        }
        connection.execute("select sum(billamount) billTotal from sur_order where '2019-02-08'=finishtime", [], function(err, result) {
            if (err) {
                error = err;
                return;
            }
            console.log(result);
            let data={};
         
            if(result.rows.length>=1)
            {
                data.billamount=result.rows[0].shift();
            }
            
            //res.send(result.rows);
            res.send(data);
            
            connection.close(function(err) {
                if (err) {
                    console.log(err);
                }
                return next();
            });
        })
    });

});

server.listen(3050, function () {
  console.log('%s listening at %s', server.name, server.url);
});

