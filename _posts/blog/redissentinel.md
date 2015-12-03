


redissentinel简介

redis sentinel是一种特殊的redis服务器，但仍然是一种redis服务器，在启动过程中，会将运行代码从redis代码替换为sentinel代码。

sentinel的主要作用是在主从环境下，在主redis宕机后，在从redis中选出新的主redis，保证分布式缓存能正常工作。

#####配置文件

主redis：master
从redis: slave

在sentinel的配置中，通过monitor来配置监听哪一个ip port的redis服务器作为master，mymaster只是一个名字

sentinel monitor mymaster 10.171.91.230 6379 2(quorum)

启动后，sentinel会读取配置文件并且将当前的配置保存在一个结构体中，还会通过向该redis发送info信息获取master的状态，同时获取当前的slave以及其他监听此master的sentinel的信息，保存在结构体中并更新sentinel.conf文件，发现新的slave会增加 known-slave 信息，发现新的监听同一master的sentinel会增加know-sentinel信息。

sentinel known-sentinel mymaster 10.171.149.13 26379 44ae696dbb28f997d6a1993f514cca8d4999fea0
sentinel known-slave mymaster 10.171.91.230 6379

这部分是sentinel自己维护的，但是我们也可以提前设置有哪些slave,要注意的一个问题（也算是bug）是，如果know-slave 的ip port和监听的master ip port 相同的话，sentinel仍然会将master设置成slave（sentinel的设置流程下面会提到），也就是master会变成自己的slave，这是一个很悲惨的事情，master的状态会变成down，因为master自身连不上master（它在连的master就是它自己），如果sentinel们选出了新的master，那么一切会恢复正常，如果没有，= =

#####工作流程

sentinel启动后，加载配置文件，将当前的配置保存在一个结构体中，还会通过向该redis发送info信息获取master的状态，同时获取当前的slave以及其他监听此master的sentinel的信息，保存在结构体中并更新sentinel.conf文件，发现新的slave会增加 known-slave 信息，发现新的监听同一master的sentinel会增加know-sentinel信息。

主观下线和客观下线
在认为主观下线后，会向其他sentinel确认，全部通过后认为客观下线

之后选举领头sentinel，领头sentinel更改master

配置纪元

关键的配置信息
fail-over
time-out

21012:X 03 Dec 09:47:00.480 # +sdown slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
21012:X 03 Dec 09:47:00.480 # +sdown sentinel 10.171.149.13:26379 10.171.149.13 26379 @ mymaster 10.171.91.230 6379

21012:X 03 Dec 10:02:33.667 # -sdown slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
21012:X 03 Dec 10:02:43.681 * +convert-to-slave slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379

21012:X 03 Dec 09:46:30.451 # Sentinel runid is 078aa98768d01727ccc8078ad67a9bfbbd65fb1b
21012:X 03 Dec 09:46:30.451 # +monitor master mymaster 10.171.91.230 6379 quorum 2

21012:X 03 Dec 10:21:32.991 # +sdown master mymaster 10.171.91.230 6379

21012:X 03 Dec 10:22:47.741 * +sentinel sentinel 10.171.91.230:26379 10.171.91.230 26379 @ mymaster 10.171.91.230 6379
21012:X 03 Dec 10:23:15.810 # +new-epoch 6634
21012:X 03 Dec 10:23:15.813 # +vote-for-leader ae03e9c7965d0182d42ba9472c7c238f99caf40a 6634
21012:X 03 Dec 10:23:16.715 # +odown master mymaster 10.171.91.230 6379 #quorum 2/2
21012:X 03 Dec 10:23:16.715 # Next failover delay: I will not start a failover before Thu Dec  3 10:29:16 2015
21012:X 03 Dec 10:23:17.008 # +config-update-from sentinel 10.171.91.230:26379 10.171.91.230 26379 @ mymaster 10.171.91.230 6379
21012:X 03 Dec 10:23:17.008 # +switch-master mymaster 10.171.91.230 6379 10.171.144.224 6379
21012:X 03 Dec 10:23:17.008 * +slave slave 10.171.91.230:6379 10.171.91.230 6379 @ mymaster 10.171.144.224 6379
21012:X 03 Dec 10:23:47.066 # +sdown slave 10.171.91.230:6379 10.171.91.230 6379 @ mymaster 10.171.144.224 6379

28944:X 03 Dec 10:23:21.274 # +new-epoch 6634
28944:X 03 Dec 10:23:21.274 # +try-failover master mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:21.278 # +vote-for-leader ae03e9c7965d0182d42ba9472c7c238f99caf40a 6634
28944:X 03 Dec 10:23:21.294 # 10.171.144.224:26379 voted for ae03e9c7965d0182d42ba9472c7c238f99caf40a 6634
28944:X 03 Dec 10:23:21.345 # +elected-leader master mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:21.345 # +failover-state-select-slave master mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:21.404 # +selected-slave slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:21.404 * +failover-state-send-slaveof-noone slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:21.495 * +failover-state-wait-promotion slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:22.322 # +promoted-slave slave 10.171.144.224:6379 10.171.144.224 6379 @ mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:22.322 # +failover-state-reconf-slaves master mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:22.403 # +failover-end master mymaster 10.171.91.230 6379
28944:X 03 Dec 10:23:22.403 # +switch-master mymaster 10.171.91.230 6379 10.171.144.224 6379
28944:X 03 Dec 10:23:22.403 * +slave slave 10.171.91.230:6379 10.171.91.230 6379 @ mymaster 10.171.144.224 6379
28944:X 03 Dec 10:23:52.422 # +sdown slave 10.171.91.230:6379 10.171.91.230 6379 @ mymaster 10.171.144.224 6379
