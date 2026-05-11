# MySQL 归档

## Undo Log 归档

### insert Undo Log

insert 操作产生的 Undo Log，**insert 操作在事务提交前只对当前事务可见，因此 insert Undo Log 在该事务提交后就删除**。

#### insert 操作

insert 操作产生的 Undo Log 格式大致如下：

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215094744.png" style="zoom: 50%;" />

- next record：下一个 Undo Log 地址
- undo type：对应的日志类型，这里是 insert 操作的日志类型，所以是 trx_undo_insert_rec
- undo no：Undo Log 日志编号，每一个新的事务，这个编号都会 +1
- table id：表的标识
- prev record：上一个 Undo Log 地址
- primary key field：记录主键对应字段的长度和内容，如果主键由多个字段组成，那么这里会有多组 length 和 value



当发生 insert 操作后，向表中插入数据，并且向 Undo Log 中插入一个 TRX_UNDO_INSERT_REC 类型的 Undo Log，同时插入的这条新纪录中的 roll_pointer 会指向这个 Undo Log。Undo Log 中只会记录这行数据的主键信息，因为当发生回滚需要逆向操作时只需要通过主键定位到数据行然后删除对应的数据。

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230216000301.png" style="zoom:50%;" />




### update Undo Log

update、delete 操作产生的 Undo Log，**update / delete 需要维护多版本信息，它是实现 MVCC 乐观锁的机制，事务提交后不一定会立刻删除**。

#### delete 操作

delete 操作产生的 Undo Log 格式大致如下：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215221542.png)

- trx_id：记录了产生这个历史版本事务 id，用作后续 MVCC 中的版本可见性判断
- roll_pointer：指向的是该记录的上一个版本的位置，沿着 roll_pointer 可以找到一个 Record 的所有历史版本
- index field：记录所有索引列的位置、长度、内容信息
- undo type：delete Undo Log 的 undo type 是 trx_undo_del_mark_rec



当发生 delete 操作时，由于 MVCC 需要保留记录的多个历史版本，这条记录的历史版本有可能正在使用，因此这条记录不能被直接删除，只能先修改 delete_mask 为已删除的状态；当事务提交后，会有后台线程把这条记录在适当的时间删除。

如果这条记录是同一个事务内新增的，那么 delete Undo Log 的roll_pointer 会指向这个 insert Undo Log，形成一个链表。

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230216000454.png" style="zoom:50%;" />



#### update 操作

update 操作产生的 Undo Log 格式大致如下：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215222745.png)

- update field：记录被修改的字段的位置、长度、被修改前的值，用于回滚恢复，因为要回滚每一个被修改的字段



其中 update 操作还可以分成两类：

- 更新主键字段

  如果 update 操作更新主键字段，那么总体分两步走：

  - 在事务提交前，不会直接把旧记录删除，因为 MVCC 机制的存在，有可能其他的事务将要访问到这条记录，**所以是修改这条记录的 delete_mask**，标记为已被删除（相当于做一个逻辑删除），本次操作生成一份 delete Undo Log
  - 根据 update 语句上的各项更新值，**创建一条新的记录插入到表中**，本次操作生成一份 insert Undo Log

  

- 更新其他字段

  如果 update 操作更新其他字段，也可以细分为两个情况

  - 更新的列所占用的存储空间没有发生变化，那么可以直接在原来的记录上修改。这种 update Undo Log 的 undo type 是 trx_undo_upd_exist_rec

  - 更新的列所占用的存储空间发生了变化，那么需要先在聚簇索引树上删除旧记录，然后根据更新后的值创建一条新的记录插入到聚簇索引树中

    > 注意，这里的删除，就不是像前面那样直接修改 delete_mask， 而是由用户线程同步执行真正的删除，因为这里有锁的保护，不存在并发问题。

