'use strict';
var array = [1,2,3];

function qwe(_array,_arr,_index){
    var array = _array;
    var arr = _arr || [];
    var index = ++_index || 1;
    _arr && (array = _arr)
    for(let i = 1,j = array.length;i < j;i++){
        for(let a = i+1,b = _array.length;a < b;a++){
            arr.push(array[i] + '' + _array[a]);
        }
    }
    while (index < _array.length-1){
        qwe(_array,arr,index)
    }
    return arr;
}

console.info(qwe(array));