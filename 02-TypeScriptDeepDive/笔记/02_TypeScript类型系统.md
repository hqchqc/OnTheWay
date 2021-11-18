## 📘 TypeScript Deep Dive  

### ✨开始咯
### 02-TypeScript类型系统  
#### 概览  
1. TypeScript类型系统  
   - TypeScript的类型系统被设计为可选的，因此，你的JavaScript就是TypeScript
   - TypeScript不会阻止JavaScript的运行，即使存在类型错误也不例外，这能让JavaScript逐步迁移至TypeScript  

2. 基本注解  
   指的是``:TypeAnnotation``语法，例如 ``const num: number = 123``这个``:``后面的是TypeScript的类型  
  
3. 原始类型  
   指的是``number boolean string``三种类型的数据用作类型注解
   ```typescript
   let num: number;
   let str: string;
   let bool: boolean;

   num = 123;
   str = 'string';
   bool = true;
   ```  
4. 数组  
   如何声明数组类型呢，很简单啦
   ```typescript
   let arr: boolean[]
   
   arr = [false, true]
   ```  
  
5. 接口  
   接口类型可以很方便的处理复杂的数据类型啦，它能合并众多类型声明至一个类型声明
   ```typescript
   interface Name {
     first: stirng;
     second: string;
   }

   let name: Name;
   name = {
     first: 'bean',
     second: 'bag'
   }
   ```  

6. 内联类型注解  
   这个就是平时经常用的，感觉是没有办法的办法
   ```typescript
   let name: {
     first: string;
     second: string;
   }

   name = {
     first: 'bean',
     second: 'bag'
   }
   ```  

7. 特殊类型  
   包含三种类型： ``any null和undefined void``  
   - any相当于告诉TypeScript不需要检查这个类型，我们要京可能减少对它的依赖哦
   - null和undefined指的不是类型，而是指他们能够赋值给任何类型的数据类型的变量哦
   - void一般用来表示一个函数没有返回值  

8. 泛型  
   泛型这个类型很灵活，指的是有时候我们需要根据传入的数据类型来确定返回值的类型，这个在一些算法中是很常用的  
   ```typescript
   function reverse<T>(items: T[]): T[] {
     const toreturn = [];
     for(let i = items.length - 1; i >= 0; i--) {
       toreturn.push(items[i]);
     }
     return toreturn
   }

   const sample = [1,2,3];
   let reversed = reverse(sample);
   console.log(sample);

   // Safety
    reversed[0] = '1'; // Error
    reversed = ['1', '2']; // Error

    reversed[0] = 1; // ok
    reversed = [1, 2]; // ok
   ```  
   在这个例子中，函数reverse接收一个类型为T的数组（items: T[]），返回值为类型T的一个数组，函数reverse的返回值类型与它接受的参数的类型一样  

9. 联合类型  
   有时候我们希望属性为多种类型之一，如字符转或者是数组，这时候就可以使用联合类型`` | ``  
   ```typescript
  function formatCommandline(command: string[] | string) {
    let line = '';
    if (typeof command === 'string') {
      line = command.trim();
    } else {
      line = command.join(' ').trim();
    }

    // Do stuff with line: string
  }
   ```  
  
10. 交叉类型  
    在JavaScript中，``extend``是一种非常常见的模式，在这种模式中，你可以从两个对象中创建一个新对象，新对象拥有两个对象所有功能，交叉类型可以让你安全的使用此种模式  
    ```typescript
    function extend<T exends object, U extend object>(first: T, second: U): T & U {
      const result = <T & U>{};
      for(let id in first) {
        (<T>result)[id] = first[id];
      }
      for(let id in second) {
        if (!result.hasOwnProperty(id)) {
          (<U>result)[id] = second[id];
        }
      }

      return result
    }
    const x = extend({a: 'hello'}, {b: 42})

    // 现在 x 拥有了 a 属性与 b 属性
    const a = x.a;
    const b = x.b;
    ```  

11. 元组类型  
    JavaScript 并不支持元组，开发者们通常只能使用数组来表示元组。而 TypeScript 支持它，开发者可以使用 ``:[typeofmember1, typeofmember2]`` 的形式，为元组添加类型注解，元组可以包含任意数量的成员，示例：
    ```typescript
    let nameNumber: [string, number];

    // Ok
    nameNumber = ['Jenny', 221345];

    // Error
    nameNumber = ['Jenny', '221345'];
    ```  

12. 类型别名  
    TypeScript提供了为类型注解设置别名的便捷语法，可以使用``type someName = someValidTypeAnnotation``来创建别名 与接口不同，你可以为任意的类型注解提供类型别名(在联合类型和交叉类型中比较实用)
    ```typescript
    type Text = string | {text: string};
    type Coordinates = [number, number];
    type Callback = (data: string) => void;
    ```

#### 从JavaScript迁移  
1. 步骤如下：
   - 添加一个``tsconfig.json``文件
   - 把文件扩展名从``.js``改成``.ts``，开始使用``any``来减少错误
   - 开始在TypeScript中写代码，尽可能的减少``any``的使用
   - 回到旧代码，开始添加类型注解，并修复已识别的错误
   - 为第三方JavaScript代码定义环境声明  

2. 减少错误
   - 刚开始迁移的时候我们可以设置为``any``，但是要逐步减少对其的依赖  

3. 第三方代码  
   你可以将你的 JavaScript 代码改成 TypeScript 代码，但是你不能让整个世界都使用 TypeScript。这正是 TypeScript 环境声明支持的地方。我建议你以创建一个``vendor.d.ts`` 文件作为开始（.d.ts 文件扩展名指定这个文件是一个声明文件），然后我向文件里添加东西。或者，你也可以创建一个针对于特定库的声明文件，如为 jquery 创建 jquery.d.ts 文件  

4. 第三方的NPM模块  
   与全局变量声明相似，你可以快速的定义一个全局模块，如：对于 jquery，如果你想把它作为一个模块来使用（NPM），可以自己通过以下方式实现：
   `` declare module 'jquery' ``  
   `` import * as $ from 'jquery' ``  

5. 额外的非JavaScript资源  
   在 TypeScript 中，甚至可以允许你导入任何文件，例如 .css 文件（如果你使用的是 webpack 样式加载器或 css 模块），你只要添加如下代码（放在 global.d.ts）：
   `` declare module '*.css'; ``  

#### 接口  
1. TypeScript接口是开放式的，这是TypeScript的一个重要原则，它允许你使用接口来模仿JavaScript的可扩展性  

2. 类可以实现接口， 如果你希望在类中使用必须要遵循的接口或别人定义的对象结构，可以使用``implements``关键字来确保其兼容性
   ```typescript
    interface Point {
      x: number;
      y: number;
    }

    class MyPoint implements Point {
      x: number;
      y: number; // Same as Point
    }
   ```  
   基本上，在``implements``存在的情况下，该外部``Point``接口的任何更改都将导致代码库中的编译错误，因此可以轻松保持同步  
   ```typescript
    interface Point {
      x: number;
      y: number;
      z: number; // New member
    }

    class MyPoint implements Point {
      // ERROR : missing member `z`
      x: number;
      y: number;
    }
   ```
   注意，implements 限制了类实例的结构，如下所示:
   `` let foo: Point = new MyPoint() ``

#### 枚举  
1. 枚举是组织手机有关变量的一种方式
   ```typescript
  enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
  }

  // 简单的使用枚举类型
  let Card = CardSuit.Clubs;

  // 类型安全
  Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
   ```
   这些枚举类型的值都是数字类型，因此他们被称为数字类型枚举  
  
2. 数字类型枚举与数字类型  
   数字类型枚举，允许我们将数字或者其他任何与数字类型兼容的类型赋值给枚举类型的实例  
   ```typescript
    enum Color {
      Red,
      Green,
      Blue
    }

    let col = Color.Red;
    col = 0; // 有效的，这也是 Color.Red
   ```  

3. 数字类型枚举与字符串类型  
   首先了解它编译之后的JavaScript
   ```typescript
    enum Tristate {
      False,
      True,
      Unknown
    }
   ```
   其被编译成JavaScript后如下：
   ```typescript
    var Tristate;
    (function(Tristate) {
      Tristate[(Tristate['False'] = 0)] = 'False';
      Tristate[(Tristate['True'] = 1)] = 'True';
      Tristate[(Tristate['Unknown'] = 2)] = 'Unknown';
    })(Tristate || (Tristate = {}));
   ```  

4. 改变与数字枚举关联的数字  
   默认情况下，第一个枚举是 0 ，然后每个后续值一次递增 1

5. 使用数字类型作为标志  
   枚举的一个很好用途是使用枚举作为标志。这些标志允许你检查一组条件中的某个条件是否为真。  
   - 我们使用``|=``来添加一个标志  
   - 组合使用``&=``和``~``来清理一个标志  
   - ``|``来合并标志  

6. 字符串枚举  
   在上文中，我们只看到了数字类型的枚举，实际上，枚举类型的值，也可以是字符串类型。  
   ```typescript
    export enum EvidenceTypeEnum {
      UNKNOWN = '',
      PASSPORT_VISA = 'passport_visa',
      PASSPORT = 'passport',
      SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
      SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
      SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card'
    }
   ```  
   这些可以更容易被处理和调试，因为他们提供有有意义 / 可调式的字符串  

7. 常量枚举  
   ```typescript
    enum Tristate {
      False,
      True,
      Unknown
    }

    const lie = Tristate.False;
   ```  

8. 常量枚举 preserveConstEnums 选项  
   > 使用内联语法对性能有明显的提升作用。运行时没有 Tristate 变量的事实，是因为编译器帮助你把一些在运行时没有用到的不编译成 JavaScript。然而，你可能想让编译器仍然把枚举类型编译成 JavaScript，用于如上例子中从字符串到数字，或者是从数字到字符串的查找。在这种情景下，你可以使用编译选项 --preserveConstEnums，它会编译出 var Tristate 的定义，因此你在运行时，手动使用 Tristate['False'] 和 Tristate[0]。并且这不会以任何方式影响内联  

9. 有静态方法的枚举  
   你可以使用`` enum + namespace ``的声明的方式向枚举类型添加静态方法。如下例所示，我们将静态成员`` isBusinessDay ``添加到枚举上： 
   ```typescript
    enum Weekday {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
    }

    namespace Weekday {
      export function isBusinessDay(day: Weekday) {
        switch (day) {
          case Weekday.Saturday:
          case Weekday.Sunday:
            return false;
          default:
            return true;
        }
      }
    }

    const mon = Weekday.Monday;
    const sun = Weekday.Sunday;

    console.log(Weekday.isBusinessDay(mon)); // true
    console.log(Weekday.isBusinessDay(sun));
   ```  

10. 开放式枚举  
    你只有在不使用模块时，开放式的枚举才有意义，你应该使用模块，因此这部分在文章最后