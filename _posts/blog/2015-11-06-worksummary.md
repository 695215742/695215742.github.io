---
layout: post
title: 工作总结
description: 
category: blog
---

实习已经过去四个月了，也是时候反思一下自己在实习过程里的收获了。

#####编程规范

首先就是编程规范的问题，对比较大的项目来说，编程规范确实很重要，其实对于普通的，不是为了防护异常的编程规范问题来说，主要是为了方便进行维护和别人写作，如果代码都是自己写的，各种异常又考虑到了，其实也无所谓。

但是能一个人写大项目的人毕竟还是太少了，总是要和别人一起协作来写代码。所以编程规范还是要学习的，其实注意编程规范除了方便维护扩展以外，最重要地还是看起来清楚，就容易减少遗漏的异常，能够更方便地进行异常防护。

#####深入思考

以前考虑问题还是不够全面，实习以后发现其实很多看起来很简单的问题仔细想一想都有很多没有注意到的点啊，项目组即使很小的问题都会几个人在白板上进行很详细的讨论，虽然感觉有些讨论没有意义，但是讨论过后还是会把大部分问题给考虑全面。

#####一些技能

另一种物联网：我之前对物联网的概念局限在智能家居这种个人场景的应用上，没有想到做这种为企业来提供解决方案的物联网应用，实习期间也对这种物联网的应用场景，设计，架构什么的学习了很多。感觉这一类物联网项目，差不多就是底层有大量的设备，设备通过各种形式各种协议进行通信，顶层是用来进行管理的系统，管理系统和底层设备之间会有其他几层用来处理并发，调度给设备安排任务，缓存，负载均衡，底层偏上还会有协议的适配等等。

pyunit框架：用来做python测试。
[pyunit website](https://wiki.python.org/moin/PyUnit)

PL\SQL脚本: 一种ORACLE提供的可执行程序语言，可以用来写一些ORACLE的测试脚本之类的，之前用这个做了一些大数据的数据库性能测试。
[pl/sql examples](http://docs.oracle.com/cd/A97630_01/appdev.920/a96624/a_samps.htm)

Python queue urlib2 : 由于项目里面有restful接口（虽然不是严格意义上的restful接口），于是就用django+queue+urlli2写了一个简单的用来测试restful接口的页面。
想法就是可以多线程或者定时地来发送restful请求，定义了一些宏来发送可定制的json数据。后来也确实实现了，但是数据量大之后就开始出现了很多问题，都是自己之前从来没有考虑过的
之后在另一个小项目里也感受到了python的速度和C++速度的差别，确实是慢很多。
[ajax form subission](https://realpython.com/blog/python/django-and-ajax-form-submissions/)
[python http request](http://stackoverflow.com/questions/2632520/what-is-the-fastest-way-to-send-100-000-http-requests-in-python)
[python threading](https://docs.python.org/2/library/threading.html)

redis：用来做缓存，
