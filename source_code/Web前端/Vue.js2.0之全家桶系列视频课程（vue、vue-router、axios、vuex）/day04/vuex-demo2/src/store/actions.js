
import types from './types.js'

const actions={
	incrementAsync({commit,state}){
		//异步操作
		var p=new Promise((resolve,reject) => {
			setTimeout(() => {
				resolve();
			},3000);
		});

		p.then(() => {
			commit(types.INCREMENT);
		}).catch(() => {
			console.log('异步操作');
		});
	}
}

export default actions;