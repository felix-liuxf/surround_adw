# surround_adw


### 用户所属行业的柱状图
http://129.213.117.204:3050/api/getUserIndustry
### 用户收入的柱状图
http://129.213.117.204:3050/api/getUserSalaryLevel
### 支付方式的饼状图
http://129.213.117.204:3050/api/getPaymodePie
### 品牌销售情况报表
http://129.213.117.204:3050/api/getBrandSale


### 不比较指定一天

http://129.213.117.204:3050/api/getBillAmount?vdate=1558330080000

### 不比较本周，上周，上上周

- http://129.213.117.204:3050/api/getBillAmount?vweek=本周

- http://129.213.117.204:3050/api/getBillAmount?vweek=上周

- http://129.213.117.204:3050/api/getBillAmount?vweek=上上周


### 当第一次输入今日销量，对比的时候输入了上周。那应该直接显示上周的销量报表。
http://129.213.117.204:3050/api/getBillAmount?vdate=1558506360000&vweek=&comparedate=&compareweek=%E4%B8%8A%E5%91%A8&iscompare=Y


### 比较指定天
http://129.213.117.204:3050/api/getBillAmount?iscompare=Y&vdate=1558330080000&comparedate=1558157280000

### 比较指定周
http://129.213.117.204:3050/api/getBillAmount?iscompare=Y&vweek=上上周&compareweek=本周

***
### 更新数据库里面的时间字段finishtime
```
update sur_order set finishtime = to_char(to_date(finishtime,'yyyy-mm-dd')-10,'yyyy-mm-dd') 

```
