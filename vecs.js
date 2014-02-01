function prod(a,b) {
  if (typeof a != typeof b || typeof a != 'object') return null;
  function id_sort(i,j) {return i.id-j.id};
  var as=a.slice().sort(id_sort), bs=b.slice().sort(id_sort);
  var prod=0;
  while (as.length && bs.length) {
    var a_i=as.shift(), b_i=bs.shift();
    while (a_i.id < b_i.id) a_i=as.shift();
    while (a_i.id > b_i.id) b_i=bs.shift();
    if (a_i.id == b_i.id && a_i.x && b_i.x) prod+=a_i.x*b_i.x;
  }
  return prod;
}

prod(); // null
prod([],[]); // 0
var a=[{id:1, x:1}, {id:2, x:1}]
prod(a,a); // 2
var b=[{id:2, x:1}, {id:1, x:1}]
prod(a,b); // 2
prod(b,a); // 2
var c=[];
for (i=1; i<10; i++) c.push({id:i, x:i});



