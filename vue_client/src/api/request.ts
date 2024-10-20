import axios from "axios";
import { ElMessage } from 'element-plus';
const api = axios.create(
	{ 
		baseURL: "/api", //这里配置的是后端服务提供的接口
		timeout: 5000, 
		withCredentials: true,
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		}
	}
);

// 响应拦截器
api.interceptors.response.use(
	(response) => {
	  // 正常响应时的处理
	  return response;
	},
	(error) => {
	  // 处理错误响应
	  if (error.response) {
		const { status, data } = error.response;
  
		// 提取响应中的 code 和 msg
		const { code, msg } = data;
		// 根据 code 和 msg 做不同的处理
		if (status === 401 || code === 401) {
		  console.error('未授权错误，请登录');
		  ElMessage.error(msg || '未授权，请登录后重试');
		} else {
		  console.error(`错误 ${code || status}：${msg}`);
		  ElMessage.error(`错误：${msg || '请求失败，请稍后重试'}`);
		}
	  } else {
		console.error('无法连接到服务器');
		ElMessage.error('网络错误，请检查您的网络连接');
	  }
  
	  return Promise.reject(error);
	}
  );
//全局请求拦截
//表示所有的网络请求都会先走这个方法
//我们可以在它里面添加一些自定义的内容
/*api.interceptors.request.use(
	function (config) {
	  console.group('全局请求拦截')
	  console.log(config)
	  console.groupEnd()
	  config.headers.token = '12345'//例如可以在请求头里面设置token值，token变量名前后端约定
	  return config;
	},
	function (err) {
	  return Promise.reject(err);
	},
  )

//全局响应拦截
//表示所有网络请求返回数据之后都会先执行此方法
//此处可以根据服务器返回的状态码做相应的处理
//如根据请求状态码404/401/500等做相应的处理，页面跳转等
api.interceptors.response.use(function (response) {
	console.log('全局响应拦截');
	console.log(response)
	console.groupEnd()
	return response
  }),function (err: any) {
	return Promise.reject(err)
  
  }
*/
export default api;
