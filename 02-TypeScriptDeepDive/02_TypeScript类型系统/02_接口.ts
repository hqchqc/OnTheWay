// 示例 A
declare const myPoint: { x: number; y: number };

// 示例 B
// 好处是如果有人创建了一个基于 myPoints 的库来添加新成员，那么它可以轻松将此成员添加到 myPoints 的现有声明中
interface Point {
  x: number;
  y: number;
}

declare const myPoints: Point;

interface Point {
  z: number;
}
myPoints.z; // Allowed!

// TypeScript 接口是开放式的，这是TypeScript的一个重要原则，它允许你使用接口来模仿JavaScript的可扩展性

// 类可以实现接口
// implements 关键字

interface Point {
  x: number;
  y: number;
}
class MyPoint implements Point {
  x: number;
  y: number;
  z: number;
}
let foo: Point = new MyPoint();

interface Crazy {
  new (): {
    hello: number;
  };
}

// class CrazyClass implements Crazy {
//   constructor() {
//     return {
//       hello: 123,
//     };
//   }
// }

// const crazy = new CrazyClass();
