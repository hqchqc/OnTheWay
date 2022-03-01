# React16的架构  
React16的架构可以分为三层  
- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler  
- Reconciler（协调器）—— 负责找出变化的组件  
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上  

## Scheduler（调度器）  
既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。其实部分浏览器已经实现了这个API，这就是``requestIdleCallback``。但是由于以下因素，React放弃使用：
- 浏览器兼容性  
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的``requestIdleCallback``触发的频率会变得很低  

基于以上原因，React实现了功能更完备的``requestIdleCallbackpolyfill``，这就是``Scheduler``。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。  

## Reconciler（协调器)
我们知道，在React15中Reconciler是递归处理虚拟DOM的。让我们看看React16的Reconciler。

我们可以看见，更新工作从递归变成了可以中断的循环过程。每次循环都会调用shouldYield判断当前是否有剩余时间。  

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的``标记``  

## Renderer（渲染器）
Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。  

## 总结  
其实React把原本马上就展示在DOM上的操作转变为在内存中先进行最终DOM的生成，最后展示在界面上。