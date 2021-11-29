# Vue 3 + Typescript + Vite

## Vue 3 相比 Vue 2 带来的新特性  

1. 组合式 API  
   在 Vue2 编写代码的过程中，我们会发现一旦项目稍微庞大之后，项目中实现某一块的具体逻辑被拆分到了很多地方，比如说我们现在有一个需求，实现3个功能：  
   - 拉取用户所具有的哪些仓库  
   - 根据用户输入的值过滤这些仓库  
   - 更新用户仓库  
   我们在代码实现的时候会发现，这三个其实是一整块大的逻辑，但是我们在写代码时将其拆分成为了好多部分，比如说在``computed``中发起请求，请求完成之后调用``mothods``里面的相关方法，这样一来同一块逻辑被拆分了很多部分，当后续有人重新看这些代码时需要频繁跳转代码，十分麻烦，为此出现了组合式API， 它提供一个专门的地方让我们统一处理这些逻辑情况  
   - 避免使用``this``，因为它不会找到组件实例。``setup``调用发生在``data``property、``computed``property等被解析之前，故无法获取  
   - 在3.0中，我们可以通过一个新的``ref``函数使任何响应式变量在任何地方起作用，接受参数并将其包裹在一个带有``value``property的对象中返回(coffee.gif)  
   - 在``setup``中注册生命周期钩子，组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 ``mounted`` 看起来会像 ``onMounted``。  
   - ``watch``响应式更改，它接受三个参数
     > 1. 一个想要侦听的响应式引用或 getter 函数 2. 一个回调 3.可选的配置选项  
     ```typescript
      import { ref, watch } from 'vue'

      const counter = ref(0)
      watch(counter, (newValue, oldValue) => {
        console.log('The new counter value is: ' + counter.value)
      })
     ```  
     等效API  
     ```typescript  
     export default {
        data() {
          return {
            counter: 0
          }
        },
        watch: {
          counter(newValue, oldValue) {
            console.log('The new counter value is: ' + this.counter)
          }
        }
      }
     ```  
  - 独立的``computed``属性  
    要注意它输出的是一个只读的响应式引用  
    ```typescript
    import { ref, computed } from 'vue'

    const counter = ref(0)
    const twiceTheCounter = computed(() => counter.value * 2)

    counter.value++
    console.log(counter.value) // 1
    console.log(twiceTheCounter.value) // 2
    ```  

2. Teleport  
   百度翻译为传送，哈哈哈哈，可以说是很形象了，其实就是字面意思，在一个组件中如果有不方便在这个组件展示的部分，我们可以将它用``teleport``包起来，并使用``to``属性告诉它将要挂在到什么元素上面，就跟现在antdesign的``getPopupContainer``一个道理吧  
   1. > 一个常见的场景是创建一个包含全屏模式的组件。在大多数情况下，你希望模态框的逻辑存在于组件中，但是模态框的快速定位就很难通过 CSS 来解决，或者需要更改组件组合。  
   ```html 
    <template>
      <button @click="modalOpen = true">Open full screen modal!</button>
      <teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            I'm a modal!(My parent is "body")
            <HelloWorld msg="teleport" />
            <button @click="modalOpen = false">Close</button>
          </div>
        </div>
      </teleport>
    </template>
    ```  

    2. 当在``teleport``下还有其它子组件时，子组件的挂载点还是会在父组件下面  
    3. 当有多个``teleport``时，顺序就是简单的追加——稍后挂载将位于目标元素中较早的挂载之后  

3. 片段  
   1. 彬彬分手了很难过😤  
  


