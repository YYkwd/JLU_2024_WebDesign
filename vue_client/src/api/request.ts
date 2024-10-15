import axios from "axios";
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

//全局请求拦截
//表示所有的网络请求都会先走这个方法
//我们可以在它里面添加一些自定义的内容
api.interceptors.request.use(
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

export default api;
