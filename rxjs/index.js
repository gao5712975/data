// var button = document.querySelector('#click');
// Rx.Observable.fromEvent(button, 'click')
// .subscribe(() => console.log('Clicked!'));

// var r = Rx.Observable.of('hello world')


// document.querySelector('#click').addEventListener('click',function(){
//     r.subscribe(function(x) { console.log(x); });
// })

// function clickFun(){
//     r.subscribe(function(x) { console.log(x); });
// }
var b = document.querySelector('#click');
var cl = Rx.Observable.fromEvent(b, 'click');

var requestStream = cl
    .map(function () {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });
var input = document.querySelector('#input')
Rx.Observable.fromEvent(input, 'input')
    // .map(() => input.value.trim())
    // .filter(text => !!text.trim())
    // .delay(1000)
    .debounce(300)
    .pluck('target', 'value')
    .subscribe((x) => {
        console.info(x)
    })

var avg = Rx.Observable.range(0, 5)
    .reduce(function (prev, cur) {
        console.info(prev);
        console.info(cur);
        return {
            sum: prev.sum + cur,
            count: prev.count + 1,
            sub: 0
        };
    }, {
        sum: 0,
        count: 0,
        sub: 0
    })

var observable = Rx.Observable.create(function subscribe(observer) {
    var id = setInterval(() => {
        observer.next('hi')
    }, 1000);
});