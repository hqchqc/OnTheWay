{
  // var message; // undefined
  var message = "Hi~";
  message = 100; // 合法但是不推荐
}
{
  function global() {
    message = "lalala";
  }
  global();
  console.log(message);
  var a = 1,
    b = 2,
    c = 3;
}

{
  function foo() {
    console.log(a);
    var a = 3;
  }
  foo();
}

{
  // var 是函数作用域
  if (true) {
    var test = "fun";
    console.log(test);
  }
  console.log(test);

  // let 是块级作用域
  if (true) {
    let test2 = "aa";
    console.log(test2);
  }
  // console.log(test2);

  var name;
  var name;
  let names;
  // let names;
  // let name;
  let a;
}

{
  // 1. 声明提升  -> 暂时性死区 指的是在let声明之前的执行瞬间 在此阶段引用后面才声明的变量都会报出引用异常
  console.log(msg);
  var msg = "improve";

  // console.log(msg1);
  // let msg1 = "down";
}

{
  // 2. 全局声明
  var msg = 1;
  // console.log(window.msg);
}

{
  // 3. 条件声明 -> try catch / typeof 都不行哦 限制在块级作用域中

  let name = "john";
  var age = 20;

  if (typeof name === "undefined") {
    let name; // name被限制在块级作用域中
  }
  name = "lalala";
  console.log(name);

  try {
    console.log(age);
  } catch {
    let age = 121; // age 被限制在 catch 中
  }
  console.log(age);
}

{
  // 4. 循环中的let声明
  for (var i = 0; i < 5; ++i) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }

  for (let i = 0; i < 5; ++i) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
}

{
  // const
  // for (const i = 0; i < 5; ++i) {
  //   console.log(i);
  // }
  for (const key in { name: "jo", age: 12 }) {
    console.log(key);
  }

  for (const value of [11, 22, 33, 44, 55]) {
    console.log(value);
  }
}

{
  let message;
  console.log(message == undefined);
  console.log(message === undefined);
  console.log(typeof ages);
}

{
  // number类型
  // undefined是null的派生类
  // 都为假值 但是null的NaN为false
}
