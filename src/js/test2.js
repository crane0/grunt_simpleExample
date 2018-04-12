(function () {
  var arr = [5, 3, 4, 7, 6, 5, 4, 5].filter(function (item, index) {
    return item<=5
  });
  console.log(arr);
})()

// 声明式编程: 做什么,   内部包装命令式编程的代码
// 命令式编程: 流程+做什么