/**
 * Created by moka on 16-9-8.
 */
~function(r, K, z, L) {
        var b = r.document,
            p = function() {
                if (b.currentScript) return b.currentScript;
                for (var a = b.getElementsByTagName("script"), n = a.length - 1; 0 <= n; n--) {
                    var c = a[n];
                    if ("interactive" === c.readyState) return c
                }
                return a[a.length - 1]
            }(),
            t = p.getAttribute("sid") || 0,
            q = "" + (new Date).getTime() + Math.floor(1E3 * Math.random()),
            w = b.location,
            A = function(a) {
                try {
                    a = top.document.URL
                } catch (b) {}
                return a
            }(b.URL),
            M = function(a) {
                try {
                    a = top.document.referrer
                } catch (b) {}
                return a
            }(b.referrer),
            N = function(a) {
                try {
                    a = top.document.title
                } catch (b) {}
                return a || ""
            }(b.title);
        w.hostname || A.match(/^https?:\/\/([^\/?#&:]+)/i);
        w.hash && w.hash.substr(1) || A.split("#");
        w.search && w.search.substr(1) || A.split("?");
        navigator.userAgent.toLowerCase();
        (function() {
            var a = "",
                n;
            n = b.getElementsByTagName("meta");
            try {
                n = top.document.getElementsByTagName("meta")
            } catch (f) {}
            for (var c = n.length, l; c--;) if (l = n[c], /keyw/i.test(l.name)) {
                a = (l.content || N).replace(/[\u03B6]+/g, "!$");
                break
            }
            return a || ""
        })();
        var J = (navigator.userAgent.match(/MSIE([^;]+)/i) || [])[1] || 100,
            F = function(a) {
                var b = /^\s+|\s+$|\r\n|\r|\n/g;
                try {
                    return (new Function("return (" + a.replace(b, "") + ")"))()
                } catch (c) {}
                return a
            },
            u = function(a, b) {
                for (var c = /<%(.+?)%>/g, l = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, f = "with(obj) { var r=[];\n", k = 0, m, d = function(a, c) {
                    c ? f += a.match(l) ? a + "\n" : "r.push(" + a + ");\n" : f += "" != a ? 'r.push("' + a.replace(/"/g, '\\"') + '");\n' : "";
                    return d
                }; match = c.exec(a);) d(a.slice(k, match.index))(match[1], !0), k = match.index + match[0].length;
                d(a.substr(k, a.length - k));
                f = (f + 'return r.join(""); }').replace(/[\r\t\n]/g, " ");
                try {
                    m = (new Function("obj", f)).apply(b, [b])
                } catch (O) {
                    console.error("'" + O.message + "'", " in \n\nCode:\n", f, "\n")
                }
                return m
            },
            D = function(a) {
                a && a.parentNode && "BODY" != a.tagName.toUpperCase() && a.parentNode.removeChild(a)
            },
            P = function(a, b) {
                return a.currentStyle ? a.currentStyle[b] : getComputedStyle(a, !1)[b]
            },
            E = function(a, b, c) {
                c = c || {};
                c.time = c.time || 700;
                c.fn = c.fn || null;
                c.type = c.type || "ease-out";
                var l = {},
                    f = {},
                    k = Math.round(c.time / 30),
                    m = 0,
                    d;
                for (d in b) l[d] = parseFloat(P(a, d)) || 0, f[d] = b[d] - l[d];
                clearInterval(a.timer);
                a.timer = setInterval(function() {
                    m++;
                    for (var d in b) {
                        switch (c.type) {
                            case "linear":
                                var e = m / k,
                                    e = l[d] + f[d] * e;
                                break;
                            case "ease-in":
                                e = m / k;
                                e = l[d] + f[d] * e * e * e;
                                break;
                            case "ease-out":
                                e = 1 - m / k;
                                e = l[d] + f[d] * (1 - e * e * e);
                                break;
                            case "ease":
                                .5 >= m / k ? (e = m / k * 1.5, e = l[d] + f[d] * e * e * e) : E(a, b, {
                                    time: c.time / 2,
                                    fn: c.fn
                                })
                        }
                        "opacity" == d ? (a.style.opacity = e, a.style.filter = "alpha(opacity=" + 100 * e + ")") : a.style[d] = e + "px"
                    }
                    m == k && (clearInterval(a.timer), c.fn && c.fn())
                }, 30)
            },
            v = function(a) {
                if (a) return a;
                setTimeout(arguments.callee, 64)
            }(b.body);
        z.init = function() {
            var a = this;
            L && a.croDomain(K, {
                d: "xinhuanetv2",
                url: A,
                ref: M,
                sid: t,
                r: q,
                bt: window._ycads_bt || ""
            }, function(b) {
                b = b || {};
                0 == b.code && a.render(b)
            })
        };
        z.croDomain = function(a, n, c) {
            var l, f, k = r.postMessage,
                m = "YCADS_IFR_" + q,
                d = b.createElement("form"),
                p = b.createDocumentFragment(),
                e = function() {
                    var a = b.createElement("iframe");
                    try {
                        a = b.createElement("<iframe name='" + m + "'>")
                    } catch (g) {
                        a.name = m
                    }
                    return p.appendChild(a), a.setAttribute("_state", 0), a
                }(),
                t = function(a) {
                    try {
                        f = F((a || r.event).data || ""), f.r == q && (e.setAttribute("_state", 2), c(f), D(d))
                    } catch (g) {}
                },
                g = function() {
                    if (1 == e.getAttribute("_state")) try {
                        f = F(e.contentWindow.name), f.r == q && (e.setAttribute("_state", 2), c(f), D(d))
                    } catch (a) {} else 0 == e.getAttribute("_state") && setTimeout(function() {
                        try {
                            e.contentWindow.location.replace("about:blank")
                        } catch (a) {}
                        e.setAttribute("_state", 1)
                    }, r.opera ? 3E3 : 36)
                };~
                function() {
                    d.style.display = "none";
                    d.action = a;
                    d.target = m;
                    d.id = "YCADS_FORM_" + q;
                    d.method = "post";
                    if (n && "object" == typeof n) for (var c in n) if (n.hasOwnProperty(c)) {
                        try {
                            l = b.createElement('<input type="hidden" name=\'' + c + "'>")
                        } catch (f) {
                            l = b.createElement("input"), l.type = "hidden"
                        }
                        p.appendChild(l);
                        l.name = c;
                        l.id = c;
                        l.value = n[c]
                    }
                    r.addEventListener ? (r.addEventListener("message", t, !1), k || e.addEventListener("load", g, !1)) : (r.attachEvent("onmessage", t), k || e.attachEvent("onload", g));
                    v.insertBefore(d, v.firstChild);
                    d.appendChild(p);
                    d.submit();
                    e.removeAttribute("name")
                }()
        };
        z.render = function(a, n) {
            var c = String(a.ct),
                l = a.n,
                f = a.w,
                k = a.h,
                m = a.u,
                d = a.c,
                w = a.e,
                e = function(a, c) {
                    var f = r.innerHeight || b.documentElement.clientHeight || b.body.clientHeight,
                        d = r.innerWidth || b.documentElement.clientWidth || b.body.clientWidth,
                        e = b.documentElement.scrollTop || b.body.scrollTop,
                        h = b.documentElement.scrollLeft || b.body.scrollLeft;
                    1 == c ? (E(a, {
                        top: e + f / 2
                    }), a.style.left = h + "px") : 2 == c ? (E(a, {
                        top: e + f / 2
                    }), a.style.left = h + d - a.offsetWidth + "px") : 3 == c && (a.style.top = e + f - a.offsetHeight + "px", a.style.left = h + d - a.offsetWidth + "px")
                },
                x = function(a, b, f, d, e) {
                    var h = "",
                        k = '<img height="<%height%>" width="<%width%>" border="0" src="<%src%>" style="width:<%width%>px;height:<%height%>px;line-height:<%height%>px;display:block;" />';
                    b = u('<a href="<%link%>" target="<%target%>" id="<%id%>" style="position:absolute;width:<%width%>px;height:<%height%>px;cursor:pointer;outline:none;background-color:#fff;opacity:0;filter:alpha(opacity=0);"></a>', {
                        link: b,
                        target: "_blank",
                        id: "YCADS_MASK_" + q,
                        width: d,
                        height: e
                    });
                    k = u(k, {
                        height: e,
                        width: d,
                        src: a
                    });
                    switch (String(f)) {
                        case "0":
                            h += b + k;
                            break;
                        case "1":
                            f = h;
                            h = b;
                            a = u('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" align="middle" width="<%width%>" height="<%height%>"><param name="allowScriptAccess" value="always" /><param name="movie" value="<%src%>"/><param name="quality" value="high"/><param name="bgcolor" value="#000"/><param name="height" value="<%height%>" /><param name="width" value="<%width%>" /><param name="FlashVars" value="<%bar%>" /><param name="allowFullScreen" value="<%full%>" /><param name="wmode" value="<%wmode%>" /><embed src="<%src%>" quality="high" bgcolor="#000" width="<%width%>" height="<%height%>" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowscriptaccess="always" loop="true" allowfullscreen="<%full%>" flashvars="<%bar%>" wmode="<%wmode%>"></embed></object>', {
                                src: a,
                                width: d,
                                height: e,
                                bar: !1,
                                wmode: "transparent",
                                full: !1
                            });
                            h = f + (h + a);
                            break;
                        case "2":
                            h += b + "";
                            break;
                        case "3":
                            d = h;
                            text = u((10 == c ? "<style>#YCADS" + t + "_" + q + " a:hover{color:#fca22c !important;text-decoration:underline;}</style>" : "") + '<%for(var i=0;i<e.length;i++){%><a href="<%e[i].link%>" target="<%target%>" title="<%e[i].text%>" style="<%style%>"><%e[i].text%></a><%}%>', {
                                e: a,
                                target: "_blank",
                                style: "display:inline-block;line-height:24px;padding:0 5px;margin-right:5px;font-family:simsun;font-size:14px;color:#535353;text-decoration: none;"
                            });
                            h = d + text;
                            break;
                        case "4":
                            d = h, e = "<style>#YCADS" + t + "_" + q + " img{-moz-transition:-moz-transform .3s ease;-ms-transition:-ms-transform .3s ease;transition:transform .3s ease;}#YCADS" + t + "_" + q + " img:hover{-webkit-transform:scale(1.1); -moz-transform:scale(1.1); -ms-transform:scale(1.1); transform:scale(1.1)}</style>", e = [17 == c ? e : "", "<%for(var i=0;i<e.length;i++){%>", 17 == c ? '<a href="<%e[i].link%>" title="<%e[i].text%>" target="<%target%>" style="display:block;line-height:30px;font-size:22px;color:#000;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-decoration:none;font-family:\'\u5fae\u8f6f\u96c5\u9ed1\';"><%e[i].text%></a>' : "", '<div style="position:relative;margin-bottom:10px;padding-left:<%width%>px;"><a href="<%e[i].link%>" target="<%target%>" style="position:absolute;top:0;left:0;overflow:hidden;width:<%width%>px;height:<%height%>px;"><img title="<%e[i].text%>" src="<%e[i].img%>" border="0" width="<%width%>" height="<%height%>" /></a><div style="height:<%height%>px;line-height:24px;margin:0px 0px 0px 10px;overflow: hidden;color: #666;font-size:14px;">', 17 == c ? "" : '<a href="<%e[i].link%>" title="<%e[i].text%>" target="<%target%>" style="display:block;line-height:30px;font-size:22px;color:#000;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-decoration:none;font-family:\'\u5fae\u8f6f\u96c5\u9ed1\';"><%e[i].text%></a>', "<div><%e[i].desc%>", 17 == c ? "" : ' [<a style="color:#666;text-decoration: none;" href="<%e[i].link%>" target="_blank">\u8be6\u60c5</a>]', "</div></div></div><%}%>"].join(""), text = u(e, {
                                e: a,
                                width: 138,
                                height: 90,
                                target: "_blank"
                            }), h = d + text
                    }
                    return h && "undefined" != h ? h : "\u6570\u636e\u5904\u7406\u5f02\u5e38"
                };
            5 == c && r._ycads_bt ? c = 100 : "";
            (0 < m.length || 0 < w.length) && ~
                function() {
                    var g, n, z = ['<html><head><style>*{margin:0;padding:0;border:0}body,html{background-color:transparent;overflow:hidden;width:100%;height:100%}a{cursor:pointer;text-decoration:none;outline:none;hide-focus:expression(this.hideFocus=true);box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;overflow:hidden}</style></head><body oncontextmenu="return false">', "</body></html>"],
                        A = '<script type="text/javascript">self._ycads_bt=1;\x3c/script><script sid="' + t + '" type="text/javascript" src="' + p.src + '" >\x3c/script>',
                        F = "titlebar=no,location=no,directories=no,status=no,menubar=no,scrollbar=no,resizable=no,copyhistory=yes,left=" + (r.screen.width / 2 - f[0] / 2) + ",top=" + (r.screen.height / 2 - k[0] / 2) + ",width=" + f[0] + ",height=" + k[0],
                        h = 'position:relative;z-index:100;width:<%width=="auto"?"100%":width+"px"%>;height:<%height=="auto"?"auto":height+"px"%>;overflow:hidden;display:block;background-color:#F2F8FA;margin:0 auto;';
                    if (3 == c) g = b.createElement("div"), h += "position:fixed;_position:absolute;z-index:2147483647;bottom:0;right:0;", g.insertAdjacentHTML("beforeend", x(m[0], d[0], l, f[0], k[0]) + '<div onclick="document.body.removeChild(this.parentNode)" style="position:absolute;top:0;right:0;height:18px;line-height:18px;width:18px;text-align:center;font-size:18px;font-family:simsun;background-color:#ccc;opacity:0.8;cursor: pointer;"> &times; </div>'), g.style.cssText = u(h, {
                        height: k[0],
                        width: f[0]
                    }), g.id = "YCADS" + t + "_" + q, v.insertBefore(g, v.firstChild), 8 > J &&
                    function() {
                        e(g, 3);
                        r.onresize = r.onscroll = function() {
                            e(g, 3)
                        }
                    }();
                    else if (5 == c) n = r.open("about:blank", "_blank", F), function() {
                        n ? (n.name = z.join(A), n.location.href = "javascript:void(~function(l){l.open();l.write(self.name);l.close()}(document))") : setTimeout(arguments.callee, 100)
                    }();
                    else if (8 != c) if (9 == c) {
                        var y = b.createElement("div");
                        g = b.createElement("div");
                        g.insertAdjacentHTML("beforeend", x(m[0], d[0], l, f[0], k[0]));
                        g.style.cssText = u(h, {
                            height: k[0],
                            width: f[0]
                        });
                        g.id = "YCADS" + t + "_fix_" + q;
                        p.parentNode && p.parentNode.insertBefore(g, p);
                        0 == a["default"] && 0 == a.urgent && (y.insertAdjacentHTML("beforeend", x(m[1], d[1], l, f[1], k[1])), y.style.cssText = u(h + "position:absolute;z-index:2147483647;top:0;left:50%;margin-left:<%-width/2%>px;", {
                            height: 0,
                            width: f[1]
                        }), y.id = "YCADS" + t + "_top_" + q, v.insertBefore(y, v.firstChild), E(y, {
                            height: k[1]
                        }, {
                            fn: function() {
                                setTimeout(function() {
                                    E(y, {
                                        height: 0
                                    }, {
                                        fn: function() {
                                            v.removeChild(y)
                                        }
                                    })
                                }, 3600)
                            }
                        }))
                    } else if (10 == c || 19 == c) h += "background-color:transparent;", g = b.createElement("div"), g.insertAdjacentHTML("beforeend", x(w, "", 3)), 19 == c && (h += "display:inline-block;"), g.style.cssText = u(h, {
                        height: k[0],
                        width: f[0]
                    }), g.id = "YCADS" + t + "_" + q, p.parentNode && p.parentNode.insertBefore(g, p);
                    else if (17 == c || 20 == c) h += "background-color:transparent;", g = b.createElement("div"), g.insertAdjacentHTML("beforeend", x(w, "", 4)), g.style.cssText = u(h, {
                        height: "auto",
                        width: "auto"
                    }), g.id = "YCADS" + t + "_" + q, p.parentNode && p.parentNode.insertBefore(g, p);
                    else if (11 == c) {
                        var B = b.createElement("div"),
                            C = b.createElement("div"),
                            h = h + "position:fixed;_position:absolute;z-index:2147483647;top:50%;margin-top:<%-height/2%>px;<%style%>";
                        B.insertAdjacentHTML("beforeend", x(m[0], d[0], l, f[0], k[0]) + '<div onclick="document.body.removeChild(this.parentNode)" style="position:absolute;top:0;right:0;height:18px;line-height:18px;width:18px;text-align:center;font-size:18px;font-family:simsun;background-color:#ccc;opacity:0.8;cursor: pointer;"> &times; </div>');
                        B.style.cssText = u(h, {
                            height: k[0],
                            width: f[0],
                            style: "left:0;"
                        });
                        C.insertAdjacentHTML("beforeend", x(m[1], d[1], l, f[1], k[1]) + '<div onclick="document.body.removeChild(this.parentNode)" style="position:absolute;top:0;right:0;height:18px;line-height:18px;width:18px;text-align:center;font-size:18px;font-family:simsun;background-color:#ccc;opacity:0.8;cursor: pointer;"> &times; </div>');
                        C.style.cssText = u(h, {
                            height: k[1],
                            width: f[1],
                            style: "right:0;"
                        });
                        B.id = "YCADS" + t + "_l_" + q;
                        v.insertBefore(B, v.firstChild);
                        C.id = "YCADS" + t + "_r_" + q;
                        v.insertBefore(C, v.firstChild);
                        8 > J &&
                        function() {
                            e(B, 1);
                            e(C, 2);
                            r.onresize = r.onscroll = function() {
                                e(B, 1);
                                e(C, 2)
                            }
                        }()
                    } else if (13 == c) {
                        var G = 1,
                            H = 1,
                            I, D = function() {
                                var a = (b.documentElement.clientHeight || b.body.clientHeight) - g.offsetHeight,
                                    c = g.offsetLeft + G,
                                    d = g.offsetTop + H;
                                if (c > (b.documentElement.clientWidth || b.body.clientWidth) - g.offsetWidth || 0 > c) G *= -1;
                                if (d > a || 0 > d) H *= -1;
                                g.style.left = c + "px";
                                g.style.top = d + "px"
                            };
                        g = b.createElement("div");
                        h += "position:fixed;_position:absolute;z-index:2147483647;left:0;top:0;";
                        g.insertAdjacentHTML("beforeend", x(m[0], d[0], l, f[0], k[0]) + '<div onclick="document.body.removeChild(this.parentNode)" style="position:absolute;top:0;right:0;height:18px;line-height:18px;width:18px;text-align:center;font-size:18px;font-family:simsun;background-color:#ccc;opacity:0.8;cursor: pointer;"> &times; </div>');
                        g.style.cssText = u(h, {
                            height: k[0],
                            width: f[0]
                        });
                        g.id = "YCADS" + t + "_" + q;
                        v.insertBefore(g, v.firstChild);
                        I = setInterval(D, 45);
                        g.onmouseover = function() {
                            clearInterval(I)
                        };
                        g.onmouseout = function() {
                            I = setInterval(D, 50)
                        }
                    } else g = b.createElement("div"), g.insertAdjacentHTML("beforeend", x(m[0], d[0], l, f[0], k[0])), g.style.cssText = u(h, {
                        height: k[0],
                        width: f[0]
                    }), g.id = "YCADS" + t + "_" + q, p.parentNode && p.parentNode.insertBefore(g, p)
                }()
        };
        z.init()
    }(window, "http://m3.xinhuanet.com/s?", {
        v: "20160908.001"
    }, 1);