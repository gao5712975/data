// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);

// var gen = function* (){
//   var r1 = yield readFileThunk('./1.txt');
//   console.log(r1.toString());
//   var r2 = yield readFileThunk('./2.txt');
//   console.log(r2.toString());
// };

// var g = gen();

// var r1 = g.next();
// r1.value(function (err, data) {
//   if (err) throw err;
//   var r2 = g.next(data);
//   r2.value(function (err, data) {
//     if (err) throw err;
//     g.next(data);
//   });
// });

// var Thunk = function(fn) {
//   return function (...args) {
//     return function (callback) {
//       return  fn.bind(this)(...args, callback);
//     }
//   };
// };


// function a( a , b ,cb){
//     setTimeout(function() {
//         // console.info(a + b);
//         cb(a + b)
//     }, 2000);
// }

// let t = Thunk(a);


// t(1,1)(function(a){
//     console.info(a);
// })


// function timeout(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value)
// }

// asyncPrint('hello world', 50);

async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)

function ass(a,num) {
    return new Promise((reslove, reject) => {
        setTimeout(function () {
            reslove(a);
        }, a.num);
    })
}




async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await ass(url);
        return response;
    });

    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}

async function logInOrder(urls) {
  for (const url of urls) {
    const response = await ass(url);
    console.log(await response);
  }
}
