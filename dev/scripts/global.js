/**
 * @authors H君 (262281610@qq.com)
 * @date    2015-10-30 11:30:58
 * @version 1.0
 */


/************************************************************
 *	数量格式化
 *	num：数值
 ************************************************************/
function numFormat(num) {
	var str = '',
		w = 10000;
	if (num / (w * 10000) >= 1) {
		str = parseInt(num / (w * 10000)) + '亿';
	} else if (num / (w * 1000) >= 1) {
		str = ((num / (w * 1000))).toFixed(1) + '千万';
	} else
	if (num / (w * 100) >= 1) {
		str = parseInt(num / w) + '万';
	} else if (num / (w * 10) >= 1) {
		str = parseInt(num / w) + '万';
	} else if (num / w >= 1 && num / w < 10) {
		str = (num / w).toFixed(1) + '万';
	} else {
		str = num;
	};
	return str;
}

/*************************************************************
 *	获取当前时间
 *	var starTime="2015-10-28 16:10"
 *	var thisTime = new Date().Format("yyyy-MM-dd hh:mm"); 
 *************************************************************/
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 ch
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


/*************************************************************
 * 	将时间转换成时间戳
 *  例如：2011-03-16 16:50:43
 *************************************************************/
function transdate(endTime) {
	var date = new Date();
	date.setFullYear(endTime.substring(0, 4));
	date.setMonth(endTime.substring(5, 7) - 1);
	date.setDate(endTime.substring(8, 10));
	date.setHours(endTime.substring(11, 13));
	date.setMinutes(endTime.substring(14, 16));
	date.setSeconds(endTime.substring(17, 19));
	return Date.parse(date) / 1000;
}
/*************************************************************
 * 	时间格式化
 *	thisTime：当前时间戳
 *	passTime：创建时间戳
 *************************************************************/
function timeFormat(thisTime, passTime) {
  // console.log(thisTime)
  // console.log(passTime);

	var start = transdate(thisTime);
	var pass = transdate(passTime);
	var dTime = parseInt((start - pass) / 60);
	var year = 518400
	var month = 43200;
	var day = 1440;
	var hours = 60;
	var str = '';

	if (dTime > year) {
		var time = parseInt(dTime / year);
		str = thisTime;
	} else if (dTime > month) {
		var time = parseInt(dTime / month);
		str = time + '个月前';
	} else if (dTime > day) {
		var time = parseInt(dTime / day);
		str = time + '天前';
	} else if (dTime > hours) {
		var time = parseInt(dTime / hours);
		str = time + '小时前';
	} else {
		str = dTime + '分钟前';
	}
  if (dTime == 0) {
    str = '刚刚';
  };
	return str;
}
// alert(timeFormat('2012-02-16 16:50:43','2011-03-16 16:50:43'))
/*************************************************************
 *	获取url参数值
 *	name:参数名称
 *************************************************************/
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/*************************************************************
 *	ajax请求
 *	url:地址
 *	type:请求类型
 *	data：参数
 *	callback:回调函数
 *************************************************************/
function getAjax(url, type, data, callback) {
	$.ajax({
		url: url,
		type: type,
		dataType: 'json',
		// contentType: 'text/plain',
		data: data,
		success: callback
	});
}
