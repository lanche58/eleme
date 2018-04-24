/*
 * 功能：解析URL参数
 * @example http://192.168.71.18:8080/?id=12321&key=yes#/
 * @return Object {id:12321,key:yes}
 */
export function urlParse(){
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg); // arr ['?id=12321','&key=yes'];
	if (arr){
		let tempArr = [];
		let key = '';
		let value = '';
		arr.forEach((item) => {
			tempArr = item.substring(1).split('=');
			key = decodeURIComponent(tempArr[0]);
			value = decodeURIComponent(tempArr[1]);
			obj[key] = value;
		});
	}
	return obj;
}
