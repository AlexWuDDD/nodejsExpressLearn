var foo = require("foo");
var nav = require("nav");
/*nodejs默认会在当前目录下找，如果没有，会去node_modules找*/

console.log(foo.str);
console.log(nav.str);