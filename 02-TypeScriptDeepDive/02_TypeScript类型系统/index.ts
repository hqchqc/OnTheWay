// TypeScript的两大特点
//  1. TypeScript的类型系统被设计为可选的，因此，你的Javascript就是TypeScript
//  2. TypeScript不会阻止JavaScript的运行，即使存在类型错误也不例外，这能让你的JavaScript逐步迁移至TypeScript

// 1. 基本注解 ：TypeAnnotation语法
const num: number = 123;

function identity(num: number): number {
  return num;
}

// 2. 原始类型
let num1: number;
let str: string;
let bool: boolean;

num1 = 123;
num1 = 123.456;
// num1 = '123'; //Error

str = "123";
// str = 123; // Error

bool = true;
bool = false;
// bool = 'false'; // Error

// 3. 数组
let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

// boolArray[0] = "false"; //Error
// boolArray = 'false' // Error
// boolArray = [true, 'false']; //Error

// 4. 接口
interface Name {
  first: string;
  second: string;
}
let name1: Name;
name1 = {
  first: "John",
  second: "Done",
};

// name1 = {
//   // Error: 'Second is missing'
//   first: "John",
// };

// name1 = {
//   // Error: 'Second is the wrong type'
//   first: "John",
//   second: 123,
// };

// 5. 内联类型注解
let name2: {
  first: string;
  second: string;
};

name2 = {
  first: "John",
  second: "Doe",
};

// name2 = {
//   // Error: 'Second is missing'
//   first: "John",
// };

// name2 = {
//   // Error: 'Second is the wrong type'
//   first: "John",
//   second: 123,
// };

// 6. 特殊类型
//   6.1 any
let power: any;
power = "123";
power = 123;

let num3: number;
power = num3;
num3 = power;

// 6.2 null 和 undefined
let num4: number;
let str2: string;

num4 = null;
str2 = undefined;

// 6.3 void
function log(message: string): void {
  console.log(message);
}

// 7. 泛型
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);
console.log(sample); // 3 2 1

// reversed[0] = "1"; // Error
// reversed = ['1', '2']; // Error

reversed[0] = 1; // ok
reversed = [1, 2]; // ok

// 8. 联合类型
function formatCommandline(command: string[] | string) {
  let line = "";
  if (typeof command === "string") {
    line = command.trim();
  } else {
    line = command.join(" ").trim();
  }
}

// 9. 交叉类型
function extend<T extends object, U extends object>(
  first: T,
  second: U
): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }
  return result;
}

const x = extend({ a: "hello" }, { b: 42 });
const a = x.a;
const b = x.b;

// 10. 元组类型
let nameNumber: [string, number];

nameNumber = ["John", 21212];
// nameNumber = ["John", '21212']; //Error
const [name4, num5] = nameNumber;

// 11. 类型别名
type StrOrNum = string | number;
let samples: StrOrNum;
samples = 123;
samples = "123";
// sample = true; // Error

type test = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
