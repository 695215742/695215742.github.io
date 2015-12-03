


redissentinel简介

#####配置文件

sentinel monitor mymaster 10.171.91.230 6379 2

sentinel known-sentinel mymaster 10.171.149.13 26379 44ae696dbb28f997d6a1993f514cca8d4999fea0
#sentinel known-slave mymaster 10.171.91.230 6379
sentinel known-slave mymaster 10.171.91.230 6379

#####工作流程

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
