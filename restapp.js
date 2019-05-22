
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
			data.labels=[];
			data.datasets=[];
			data.datasets[0]={};
			data.datasets[0].name="客户数量";
			data.datasets[0].data=[];

            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
            	data.labels[i]=(result.rows[i].shift());
            	data.datasets[0].data[i]=(result.rows[i].shift());

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
			data.labels=[];
			data.datasets=[];
			data.datasets[0]={};
			data.datasets[0].name="客户数量";
			data.datasets[0].data=[];

            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
            	data.labels[i]=(result.rows[i].shift());
            	data.datasets[0].data[i]=(result.rows[i].shift());

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
			data.labels=[];
			data.datasets=[];
			data.datasets[0]={};
			data.datasets[0].name="foo";
			data.datasets[0].data=[];

			let per100=0;
            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
            	data.labels[i]=(result.rows[i].shift());
            	data.datasets[0].data[i]=(result.rows[i].shift());
            	per100+=data.datasets[0].data[i];

            }

            for(let p=0;p<data.datasets[0].data.length;p++)
            {
            	data.datasets[0].data[p]=(Math.round(data.datasets[0].data[p] * 100)/per100).toFixed(2)-0;
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
server.get('/api/getBrandSale', function (req, res, next) {
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
		connection.execute('select brandname,sum(billamount) billamount ,count(orderid) orderamount from  sur_order_item group by brandname', [], function(err, result) {
			if (err) {
				error = err;
				return;
			}
			console.log(result);
			let data={};
			data.chart="table";
			data.labels=["品牌","销售额", "订单量"];
			data.datasets=[];
			data.datasets[0]={};
			data.datasets[0].name="品牌";
			data.datasets[0].data=[];
			data.datasets[1]={};
			data.datasets[1].name="销售额";
			data.datasets[1].data=[];
			data.datasets[2]={};
			data.datasets[2].name="订单量";
			data.datasets[2].data=[];

            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {

            	data.datasets[0].data[i]=(result.rows[i].shift());
            	data.datasets[1].data[i]=(result.rows[i].shift());
            	data.datasets[2].data[i]=(result.rows[i].shift());


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
	console.log("getBillamount:vdate:"+req.query.vdate+",vweek:"+req.query.vweek+",comparedate:"+req.query.comparedate+",compareweek:"+req.query.compareweek+",iscompare:"+req.query.iscompare);

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
		if(req.query.iscompare!="Y"){

			let vdate=req.query.vdate+"";

			if (vdate!=''&&vdate!='undefined'){

				let date= new Date(vdate-0);



				let formattedDate = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) +"-"+ ('0' + date.getDate()).slice(-2) ;
				console.log(formattedDate);



				connection.execute("select finishtime,sum(billamount) billTotal from sur_order where finishtime='"+formattedDate+"' group by finishtime", [], function(err, result) {
					if (err) {
						error = err;
						return;
					}
					console.log(result);
					let data={};

					if(result.rows.length>=1)
					{
						data=result.rows[0].shift() +"销量为"+result.rows[0].shift()+"元";
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

			}else{
				
				let curDate= new Date();
				let vweek=req.query.vweek;
				console.log("week:"+curDate.getDay());
				let formattedDate="";
				if(vweek=='本周'){

					for(let w=0;w<curDate.getDay();w++)
					{
						let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*w);
						let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
						console.log(formattedTmpDate);
						formattedDate=formattedDate+"'"+formattedTmpDate+"',";
					}

				}
				if(vweek=='上周'){
					let curDay=curDate.getDay();

					for(let w=0;w<7;w++)
					{
						let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*(w+curDay));
						let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
						console.log(formattedTmpDate);
						formattedDate=formattedDate+"'"+formattedTmpDate+"',";
					}

				}
				if(vweek=='上上周'){
					let curDay=curDate.getDay();

					for(let w=0;w<7;w++)
					{
						let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*(w+7+curDay));
						let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
						console.log(formattedTmpDate);
						formattedDate=formattedDate+"'"+formattedTmpDate+"',";
					}

				}
				formattedDate=formattedDate+"''";
				console.log(formattedDate);
				
				connection.execute("select finishtime,sum(billamount) billTotal from sur_order where finishtime in ("+formattedDate +") group by finishtime order by finishtime" , [], function(err, result) {
					if (err) {
						error = err;
						console.log("error"+error);
						return;
					}
					console.log(result);
					let data={};
					data.chart="line";
					data.labels=[];
					data.datasets=[];
					data.datasets[0]={};
					data.datasets[0].name="foo";
					data.datasets[0].data=[];

            //data.data[0]="11";
            for(let i=0;i<result.rows.length;i++)
            {
            	data.labels[i]=(result.rows[i].shift());
            	data.datasets[0].data[i]=(result.rows[i].shift());

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

			}
		}else{
			let vdate=req.query.vdate+"";
			let comparedate=req.query.comparedate;
			let vweek=req.query.vweek;
			let compareweek=req.query.compareweek;
			// compare data
			if(vdate!=''&&vdate!='undefined'){
				console.log("vdate:"+vdate);
				console.log("comparedate:"+comparedate);
				let formattedDate =""
				let date1= new Date(vdate-0);
				let formattedDate1 = date1.getFullYear() + "-" + ('0' + (date1.getMonth() + 1)).slice(-2) +"-"+ ('0' + date1.getDate()).slice(-2) ;
				let date2= new Date(comparedate-0);

				let formattedDate2 = date2.getFullYear() + "-" + ('0' + (date2.getMonth() + 1)).slice(-2) +"-"+ ('0' + date2.getDate()).slice(-2) ;
				formattedDate ="'"+formattedDate1+"','"+formattedDate2+"'";
				console.log("formattedDate:"+formattedDate);



				connection.execute("select finishtime,sum(billamount) billTotal from sur_order where finishtime in("+formattedDate+") group by finishtime order by finishtime", [], function(err, result) {
					if (err) {
						error = err;
						return;
					}
					console.log(result);
					let data={};
					let date1="";
					let date2="";
					let date1amount=0;
					let date2amount=0;
					if(result.rows.length>=1)
					{
						date1=result.rows[0].shift();
						date1amount=result.rows[0].shift();
						data.vdate=date1+"销量为"+date1amount+"元";

					}
					if(result.rows.length>=2)
					{
						date2=result.rows[1].shift();
						date2amount=result.rows[1].shift();
						data.comparedate=date2+"销量为"+date2amount+"元";
						let per=Math.round((date2amount-date1amount) / date1amount * 10000) / 100.00;

						data.compareper="增长"+per+"%";

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
			}else{

			//compare week
			console.log("vweek:"+vweek);
			console.log("compareweek:"+compareweek);

			let vweekDay="";
			let compareweekDay="";
			let curDate= new Date();
			let formattedDate="";
			if(vweek=='本周'||compareweek=='本周'){

				for(let w=0;w<curDate.getDay();w++)
				{
					let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*w);
					let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
					console.log(formattedTmpDate);
					formattedDate=formattedDate+"'"+formattedTmpDate+"',";
				}
				if(vweek=='本周'){
					vweekDay=formattedDate;
				}
				if(compareweek=='本周'){
					compareweekDay=formattedDate;
				}
				formattedDate="";

			}
			if(vweek=='上周'||compareweek=='上周'){
				let curDay=curDate.getDay();

				for(let w=0;w<7;w++)
				{
					let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*(w+curDay));
					let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
					console.log(formattedTmpDate);
					formattedDate=formattedDate+"'"+formattedTmpDate+"',";
				}
				if(vweek=='上周'){
					vweekDay=formattedDate;
					console.log("vweekDay:上周"+vweekDay);
				}
				if(compareweek=='上周'){
					compareweekDay=formattedDate;
				}
				formattedDate="";

			}
			if(vweek=='上上周'||compareweek=='上上周'){
				let curDay=curDate.getDay();

				for(let w=0;w<7;w++)
				{
					let tmpDate=new Date(curDate.getTime() - 24*60*60*1000*(w+7+curDay));
					let formattedTmpDate = tmpDate.getFullYear() + "-" + ('0' + (tmpDate.getMonth() + 1)).slice(-2) +"-"+ ('0' + tmpDate.getDate()).slice(-2) ;
					console.log(formattedTmpDate);
					formattedDate=formattedDate+"'"+formattedTmpDate+"',";
				}
				if(vweek=='上上周'){
					vweekDay=formattedDate;
				}
				if(compareweek=='上上周'){
					compareweekDay=formattedDate;
				}
				formattedDate="";

			}
			vweekDay=vweekDay+"''";
			compareweekDay=compareweekDay+"''";
			console.log("vweekDay:"+vweekDay);
			console.log("compareweekDay:"+compareweekDay);
			connection.execute("select finishtime,sum(billamount) billTotal from sur_order where finishtime in("+vweekDay+","+compareweekDay+") group by finishtime order by finishtime", [], function(err, result) {
				if (err) {
					error = err;
					return;
				}
				console.log(result);
				let data={};
				
				data.chart="line";
				data.labels=["周一","周二","周三","周四","周五","周六","周日"];
				data.datasets=[];
				data.datasets[0]={};
				data.datasets[0].name="foo";
				data.datasets[0].data=[];

				data.datasets[1]={};
				data.datasets[1].name="foo";
				data.datasets[1].data=[];
				let tmpResult=[];

				for(let i=0;i<result.rows.length;i++)
				{
					let tmp={};
					tmp.day = result.rows[i].shift();
					tmp.amount = result.rows[i].shift();
					tmpResult[i]=tmp;

				}

				let f=0;
				let s=0;
				for(let i=0;i<tmpResult.length;i++){

					if(vweekDay.indexOf(tmpResult[i].day)>=0){
						data.datasets[0].data[f]=tmpResult[i].amount;
						f++;
					}
					if(compareweekDay.indexOf(tmpResult[i].day)>=0){
						data.datasets[1].data[s]=tmpResult[i].amount;
						s++;
					}
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


		}
	}


});

});

server.listen(3050, function () {
	console.log('%s listening at %s', server.name, server.url);
});

