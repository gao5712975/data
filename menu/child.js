window.onload = function () {
    if (window.self != window.top) {
        document.addEventListener('click', function (e) {
            var t = e.target;
            if (t && t.nodeName == 'A' && t.getAttribute('data-route')) {
                e.preventDefault();
                e.stopPropagation();
                var route = t.getAttribute('data-route');
                window.top.$R.go(route);
            }
        })
    }
}