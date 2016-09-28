var app = angular.module('modal', []);

app.controller('menuCtrl',['$scope',function(){

}])


!function(win){
    function Route(){
        this.regex = {};
        win.top.onhashchange = function(event){
            console.info(event)
        }
    }

    Route.getHash = function(){
        return 
    }

    //name url 
    Route.prototype.reg = function(o){
        if(!o.name || !o.url) return;
        this.regex[o.name] = o.url;
        return this;
    }

    this.$R = new Route();
}(this)


//全局hash路由控制
// var route = {
       
//     start: function () {
//         this.match(top.location.hash);
//         this.listen();
//     },
//     url: function (url) {
//         var tdoc = $(top.document.body),
//             ifr = tdoc.find("#main"),
//             menu = (url.match(this.routeReg) || [])[1];

//         ifr && (tdoc.find(".menu li a").removeClass("current"), tdoc.find(".menu li[data-menu=" + menu + "] a").addClass("current"), ifr.attr("src", url.slice(1)));
//     },
//     routeReg: /^#?(ADManage|SystemManage|ResourceManage|ReportManage|ClientManage)/i,
//     match: function (url) {
//         this.routeReg.test(url) && this.url(url);
//     },
//     listen: function () {
//         var that = this;
//         top.onhashchange = function (event) {
//             that.match(top.location.hash);
//         }
//     },
//     change: function (url) {
//         this.routeReg.test(url) && (top.location.hash = url);
//     }
// };

// var Q = function (W, D, M, HTML, hash, view, arg, LL, i, index, Regex, Q) {
//     HTML = D.getElementsByTagName('html')[0];
//     Regex = [];
//     onhashchange = function () {
//         Q.hash = hash = location.hash;

//         arg = hash.split('/');

//         i = Regex.length;
//         while (i--)
//             if (LL = hash.match(Regex[i])) {
//                 arg[0] = Regex[i];
//                 break;
//             }

//         if (!Q[arg[0]])
//             arg[0] = index;

//         if (Q.pop)
//             Q.pop.apply(W, arg);

//         Q.lash = view = arg.shift();

//         HTML.setAttribute('view', view);

//         Q[view].apply(W, arg);
//     };
//     Q = {
//         init: function (o) {

//             index = o.index || 'V';

//             if (o.pop && typeof o.pop == 'function')
//                 Q.pop = o.pop;

//             onhashchange();

//             return this
//         },
//         reg: function (r, u) {
//             if (!r)
//                 return;

//             if (u == undefined)
//                 u = function () {};

//             if (r instanceof RegExp) {
//                 Q[r] = u;
//                 Regex.push(r);
//             } else if (r instanceof Array) { //数组注册
//                 for (var i in r) {
//                     L = [].concat(r[i]).concat(u);
//                     this.reg.apply(this, L);
//                 }
//             } else if (typeof r == 'string') {
//                 if (typeof u == 'function')
//                     Q[r] = u;
//                 else if (typeof u == 'string' && Q[u])
//                     Q[r] = Q[u];
//             }

//             return this
//         },
//         V: function () {
//             console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
//             return this
//         },
//         go: function (u) {
//             location.hash = '#' + u;
//             return this
//         }
//     };
//     return Q;
// }(this, document);

