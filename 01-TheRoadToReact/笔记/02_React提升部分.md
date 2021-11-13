## 📘 The Road To React  

### 🐱‍🚀前言
> 这一部分包括了书中的额外介绍的语法和React维护、性能优化、css以及测试和部署，对于CSS部分，个人觉得了解即可，主要专注于性能优化这一块。  

### 🥇React start insert  
1. 介绍了``async/await``语法，await关键字后面的动作会等到promise正常返回后才会执行。  

2. 然后是介绍了React中的表单，将输入框等封装为一个表单组件，``button``按钮的``type``为``submit``,并且需要在处理表单事件的函数中增加``event.preventDefault()``用来防止提交表单后页面刷新这一默认行为。  

3. React性能优化
   1. 不要在第一次渲染时运行
   ```javascript
    const useSemiPersistentState = (key, initialState) => {
    const isMounted = React.useRef(false);
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );
    React.useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        console.log('A');
        localStorage.setItem(key, value);
     }
    }, [value, key]);
      return [value, setValue];
    }

   ```
  > 我们正在将 ref 及其可变的 current 属性用于状态管理，该操作并不会触发重新渲染。一旦 Hook 在组件第一次渲染时被调用，那么就会用一个名为 isMounted 的 false 布尔变量初始化 ref 的 current 值。结果是，并没有调用 useEffet 中的副作用函数，而副作用函数只有当布尔变量 isMounted 变为 true 后才会被调用。每当 Hook 再次运行（或重新渲染组件）时，都会在副作用中判断布尔值变量，只有当变量为 true 时，才会执行副作用函数。在组件的整个生命周期中，isMounted 布尔值将一直为 true，这样做是为了避免第一次使用我们的自定义 Hook 时调用副作用函数。

  > 以上只是关于防止组件第一次渲染时调用一个简单的函数的问题，但是想象一下在副作用函数中有一个开销很大的计算，或者自定义 Hook 在应用中被频繁的使用，那么使用这种方法就可以更实用地避免不必要的函数调用。  

    2. 不要进行不必要的渲染   
  > 使用memo和useCallback来减少渲染次数
  > 在React中父组件的重新渲染会导致子组件也进行重新渲染，因此我们可以使用memo来对props进行相等性检查，一旦props中有回调函数，子组件仍然会重新渲染，这时候就要使用useCallback来阻止这一行为 （仅在组件重新渲染并且依赖项中有改变时才创建一个函数）  

    3. 不要反复运行大开销的计算  
  > 使用useMemo,仅当依赖项的数组发生改变时才会再次运行
  ```javascript
      const App = () => {
      ...
      const sumComments = React.useMemo(() => getSumComments(stories), [
      stories,
      ]);
      return ( ... );
      };
  ```  

4. 在React中使用TypeScript  
5. React测试相关(略过)  
6. 将App.js文件中的各个模块抽离出单独的组件，这也是真正的项目开发应有的项目结构  
7. 最后就是三个实际案例让我们对React有一个整体认识，一个是排序，然后是逆序，然后是记住上一次的搜索记录，最后是分页，这里也略过了。  

### 🎉总结  
> 花了一星期，终于还是草草的过了一遍，个人感觉这本书还是适合初学者来读，就是巩固一下React基础，后面的案例感觉没有很精彩，哈哈哈哈，还有性能提升部分也没有讲的很细，总之还是对基础的一些巩固吧，加油加油！




