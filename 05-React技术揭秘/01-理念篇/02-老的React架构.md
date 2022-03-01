# React15架构
react15的架构可以分为两层  
- Reconciler(协调器) —— 负责找出变化的组件
- Render(渲染器) —— 负责将变化的组件渲染到页面上  

## Reconciler(协调器)
每当有更新时，Reconciler会做如下工作
- 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知Render将变化的虚拟DOM渲染到页面上

## Render(渲染器)
由于``React``支持跨平台，所以渲染器的作用是在不同平台下渲染出对应支持的组件

## React15架构的缺点  
在 Reconciler 中，mount的组件会调用mountComponent，update的组件会调用updateComponent。这两个方法都会递归更新子组件。

## 递归更新的缺点  
由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。  
能不能中断呢？ 这里作者举了一个例子，其实在React15中Reconciler和Render是交替执行的，只有将Render渲染到页面上之后，才会有新的执行进入Reconciler，所以并不能够中断，中断之后就会给用户一部分更新一部分未更新的结果，基于这个原因React决定重写整个架构。
