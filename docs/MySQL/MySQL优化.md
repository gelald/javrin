## 分页优化

t表中包含100w条数据，现在按每页20条数据分页查询serllerid为100的第10w页数据，索引是serllerid

普通做法：limit M, N

```mysql
select * from t where serllerid = 100 limit 100000, 20;

!-- 20 rows in set(90 sec)
```

可以看到时间成本巨大，在普通的limit M, N翻页写法，往往在越往后翻页的过程中速度越慢，原因是MySQL会读取表中的前M+N条数据，M越大，性能越差



优化做法：先查询翻页中需要的N条数据的主键id，再根据id回表查询所需要的N条数据。查询N条数据的主键在索引中完成的，所以速度更快

```mysql
select * from t t1, (select id from t where serllerid = 100 limit 100000, 20) t2 where t1.id = t2.id;
!-- 20 rows in set(4.25 sec)
```

可以看到由于走了索引后再回表，速度大大提升