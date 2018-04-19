export function formatDate(now,fmt){
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(now.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let obj = {
		'M+': now.getMonth() + 1,
		'd+': now.getDate(),
		'h+': now.getHours(),
		'm+': now.getMinutes(),
		's+': now.getSeconds()
	};
	for (let i in obj){
		if (new RegExp('(' + i + ')').test(fmt)){
			let str = obj[i] + '';
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str)); 
		}
	}
	return fmt;
}

function padLeftZero(str){
	return ('00' + str).substr(str.length);
}
