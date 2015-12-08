/**
 * 
 * @authors H君 (262281610@qq.com)
 * @date    2015-12-08 10:31:35
 * @version $Id$
 */


// 如果一个模块仅含值对，没有任何依赖，则在define()中定义这些值对就好了：
define({
	name:'hwg',
	age:24
})

// 如果一个模块没有任何依赖，但需要一个做setup工作的函数，则在define()中定义该函数，并将其传给define()：
// define(function(){
// 	return {
// 		name:'hwg',
// 		age:24
// 	}
// })