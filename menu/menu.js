// window hash标志 iframe ID _hash 默认hash 没有注册的路由就会跳到这个默认的路由上
!function(win,key,frame,_hash){
    function Route(){
        this.regex = {};
        this.data = {};
    }

    var _self = win.top.$R = new Route();

    Route.prototype.changeState = function (hash) {
        if(hash){
            var url = this.getUrl(hash);
            var iframe =document.getElementById(frame);
            iframe.contentWindow.location.replace(url);
            return true;
        }
    };

    Route.prototype.getHash = function(){
        var r = '#' + key;
        return location.hash.substr(r.length + 1);
    };

    Route.prototype.getUrl = function (hash) {
        return this.regex[hash]
    };

    //name url 
    Route.prototype.reg = function(o){
        if(o instanceof Array){
            for(var i = 0,j = o.length;i<j;i++){
                var r = o[i];
                if(!r.name || !r.url) continue;
                this.regex[r.name] = r.url;
            }
        }else{
            if(!o.name || !o.url) return this;
            this.regex[o.name] = o.url;
        }
        return this;
    };

    Route.prototype.listen = function () {
        win.top.onhashchange = function(event){
            var hash = _self.getHash();
            if(_self.getUrl(hash)){
                _self.changeState(hash);
            }
        }
    };

    Route.prototype.start = function (parent) {
        var a;
        if(parent){
            a = win.top.document.querySelectorAll(parent + ' a[data-route]');
        }else{
            a = win.top.document.querySelectorAll('a[data-route]');
        }
        if(a && a.length > 0){
            for(var i = 0,j = a.length;i<j;i++){
                var _a = a[i];
                var r = _a.getAttribute('data-route');
                _a.setAttribute('href','#' + key + '/' + r);
            }
        }
        var hash = _self.getHash();
        if(_self.getUrl(hash)){
            _self.changeState(hash);
        }else{
            _self.changeState(_hash);
            top.location.hash =  key + '/' + _hash;
        }
        _self.listen();
    };

    Route.prototype.go = function (hash, data) {
        if(_self.getUrl(hash)){
            top.location.hash = '#' + key + '/' + hash;
            _self.data = data;
        }
    }
}(this.top,'!','iframe','a');


//全局hash路由控制
// var route = {
//     search:{},
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
//     change: function (url,data) {
//         this.routeReg.test(url) && (top.location.hash = url,this.search = data);
//     }
// };
/*
var Q = function (W, D, M, HTML, hash, view, arg, LL, i, index, Regex, Q) {
    HTML = D.getElementsByTagName('html')[0];
    Regex = [];
    onhashchange = function () {
        Q.hash = hash = location.hash;

        arg = hash.split('/');

        i = Regex.length;
        while (i--)
            if (LL = hash.match(Regex[i])) {
                arg[0] = Regex[i];
                break;
            }

        if (!Q[arg[0]])
            arg[0] = index;

        if (Q.pop)
            Q.pop.apply(W, arg);

        Q.lash = view = arg.shift();

        HTML.setAttribute('view', view);

        Q[view].apply(W, arg);
    };
    Q = {
        init: function (o) {

            index = o.index || 'V';

            if (o.pop && typeof o.pop == 'function')
                Q.pop = o.pop;

            onhashchange();

            return this
        },
        reg: function (r, u) {
            if (!r)
                return;

            if (u == undefined)
                u = function () {};

            if (r instanceof RegExp) {
                Q[r] = u;
                Regex.push(r);
            } else if (r instanceof Array) { //数组注册
                for (var i in r) {
                    L = [].concat(r[i]).concat(u);
                    this.reg.apply(this, L);
                }
            } else if (typeof r == 'string') {
                if (typeof u == 'function')
                    Q[r] = u;
                else if (typeof u == 'string' && Q[u])
                    Q[r] = Q[u];
            }

            return this
        },
        V: function () {
            console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
            return this
        },
        go: function (u) {
            location.hash = '#' + u;
            return this
        }
    };
    return Q;
}(this, document);*/

