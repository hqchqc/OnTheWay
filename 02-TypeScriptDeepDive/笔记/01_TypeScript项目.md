## 📘 TypeScript Deep Dive  

### 01-TypeScript项目  
#### 编译上下文  
1. 这个概念听起来很熟悉又很陌生，在TypeScript中我们主要用这个概念来给文件分组，告诉TypeScript哪些文件是有效的，哪些是无效的，通常项目中会有一个``tscinfig.json``文件加以区分  

2. 可以通过``compilerOptions``来定制编译选项
```javascript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```  

3. 一般来说IDE都支持对TypeScript的即时编译，但是如果想要手动执行编译我们可以通过一下两种方式：  
  3.1 运行``tsc``，它会在当前目录或者父级目录寻找``tsconfig.json``文件  
  3.2 运行``tsc -p ./path-to-projcet-directory``，当然这个路径也可以是绝对路径或是相对路径  
  3.3 还可以使用``tsc -w``的方式来启用TypeScript的观测模式，在检测到文件改动后，它将重新编译  

4. 可以在``tscinfig.json``文件中显示指定需要编译的文件，同时还可以使用``includes``和``exclude``选项来指定需要包含和排除的文件  

#### 声明空间  
1. 类型声明空间，例如：
  ```typescript
  class Foo {}
  interface Bar {}
  type Bas = {}
  ```  
现在你可以使用``Foo Bar Bas``作为类型注解使用，例如：
  ```typescript
  let foo: Foo;
  let bar: Bar;
  let bas: Bas;
  ```
> 注意： 尽管我们这里定义了 interface Bar ，但是我们并不能把它作为一个变量来使用，因为它没有定义在变量声明空间中

```typescript
  interface Bar {}
  const bar = Bar; // Error: "cannot find name 'Bar'"
```  

2. 变量声明空间  
变量声明空间包含可用作变量的内容，上文中的``Class Foo``提供了一个类型``Foo``到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间，例如：

```typescript
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```  

同理的，一些用``var``声明的变量，也只能用在变量声明空间中，不能用作类型注解
```typescript
const foo = 123;
let bar: foo; // ERROR: "cannot find name 'foo'"
```

3. 这一小节主要讲解了typescript中存在两种声明空间，一种是类型声明空间，一种是变量声明空间，某些特定的操作符可以即存在于类型声明空间中，也可以存在于变量声明空间中，例如``class`` ,但是绝大多数还是只能存在一个空间中，变量就是变量，类型就是类型  

#### 模块  
1. 全局模块，默认情况下我们声明的一些变量始终存在于全局命名空间中，例如``const foo = 123``  如果在项目中，新建了一个文件，则typescript会允许你定义一个相同的变量，毫无疑问，这样是危险的，因为它会与文件内的代码命名冲突，所以引入文件模块的定义；  

2. 文件模块(外部模块) 如果在你的Typescript文件的根级别位置含有``import``或者``export``,那么它会在文件中创建一个本地的作用域，此时使用``import``的文件会将此文件标记为一个模块，文件内的定义的声明也不会污染全局命名空间；  

3. 文件模块详情，ES模块语法
  - 使用``export``关键字导出一个变量或者类型
  ```typescript
  export const someVar = 123;
  export type someType = {
    foo: string;
  }
  ```
  - ``export``的写法除了上面这种，还有另外一种
  ```typescript
  const someVar = 123;
  type someType = {
    type: string;
  };

  export {someVar, someType};
  ```

  - 也可以使用重命名变量的方式导出
  ```typescript
  const someVar = 123;
  export {someVar as aDifferentName}
  ```

  - 使用``import``关键字导入一个变量或者是类型
  ```typescript
  import { someVar, someType } form './foo'
  ```

  - 通过重命名的方式导入变量或者类型
  ```typescript
  import {someVar as aDifferentName} from './foo';
  ```

  - 使用整体加载
  `` import * as foo from './foo' ``
  > 同时也可以使用 foo.someVar 和 foo.someType 以及其它任何从 foo 导出的变量或者类型

  - 只导入模块
  ``import 'core-js' ``

  - 从其他模块导入后整体导出
  `` export * from './foo' ``

  - 从其他模块导入后部分导出
  `` export {someVar} from './foo' ``

  - 通过重命名，部分到处从另一个模块导入的项目
  `` export { someVar as aDifferentName } from './foo' `` 

  - 默认导入导出
  ```typescript
  // 使用 export default
  // 1. 在一个变量之前(不需要使用 let/const/var)
  // 2. 在一个函数之前
  // 3. 在一个类之前
  export default (someVar = 123)
  
  export default function someFunction() {}

  export default class someClass
  ```

  ```typescript
  // 导入使用 import someName from 'someModule' 语法

  import someLocalNameForThisFile from './foo';
  ```  

4. 模块路径  
   - 相对模块路径(路径以 . 开头，例如: ``./someFile 或者 ../../someFolder/someFile等``)  
     按照相对路径来
   - 动态查找  
     模仿Node模块解析策略  
  
5. 什么是``place``  
   指的是我们要告诉TypeScript将会检查哪些内容的文件(例如一个foo的place)  
   - 如果这个place表示一个文件，如``foo.ts``，Nice~  
   - 否则，如果这个place是一个文件夹，并且存在一个文件``foo/index.ts``，Nice~  
   - 否则，如果这个place是一个文件夹，并且存在一个``foo/package.json``，在该文件中指定``types``的文件存在, Nice~  
   - 否则，如果这个place是一个文件夹，并且存在一个``package.json``，在该文件中指定``main``文件的存在，Nice~  
   从文件类型上来说，实际上是指``.ts .d.ts 或者 .js``  

6. 重写类型的动态查找  
   我们可以通过`` declare module 'somePath``声明一个全局模块的方式，来解决查找模块路径的问题
   ```typescript
    // global.d.ts
    declare module 'foo' {
      // some variable declarations
      export var bar: number;
    }
   ```
   接着
   ```typescript
    // anyOtherTsFileInYourProject.ts
    import * as foo from 'foo';
    // TypeScript 将假设（在没有做其他查找的情况下）
    // foo 是 { bar: number }
   ```  
  
7. import / require 仅仅是导入类型
   语句 `` import foo = require('foo') `` 实际上只做了两件事： 
   - 导入foo模块的所有类型信息；
   - 确定foo模块运行时的依赖关系；  
  
8. global.d.ts  
   这个文件只是一种扩充，我们建议使用基于文件的模块，也就是在各个文件中去定义类型，而不是选择污染全局命名空间。

#### 命名空间  
1. 在JavaScript使用命名空间时，有一个常用的语法
   ```javascript
  (function(something) {
    something.foo = 123
  })(something || (something = {}))
   ```
  > something || (something = {}) 允许匿名函数 function (something) {} 向现有对象添加内容，或者创建一个新对象，然后向该对象添加内容，这意味着你可以拥有两个由某些边界拆成的块

  ```javascript
  (function(something) {
    something.foo = 123
  })(something || (something = {}))

  console.log(something) // {foo: 123}

  (function(something) {
    something.bar = 456
  })(something || (something = {}))

  console.log(something) // {foo: 123, bar: 456}
  ```

  >在确保创建的变量不会泄漏至全局命名空间时，这种方式在 JavaScript 中很常见。当基于文件模块使用时，你无须担心这点，但是该模式仍然适用于一组函数的逻辑分组。因此 TypeScript 提供了 namespace 关键字来描述这种分组

  ```typescript
  namespace Utility {
    export function log(msg) {
      console.log(msg)
    }

    export function error(msg) {
      console.log(msg)
    } 
  }

  Utility.log('Call me');
  Utility.error('maybe');
  ```

  ``namespace``实现的原理和上面的javascript代码是一样的  

  ```javascript
  function (Utility) {
    // 添加属性至 Utility
  }(Utility || (Utility = {}))
  ```  

#### 动态导入表达式  
指的是我们可以使用``import()``这个语法，来对模块进行异步加载，返回的是一个Promise，非常方便