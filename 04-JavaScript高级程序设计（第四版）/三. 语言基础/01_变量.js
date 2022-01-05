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
