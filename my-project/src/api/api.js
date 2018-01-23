export default {
	// 判断是否已绑定手机号
	checkBindMobile:'/sjy/user/checkBindMobile',
	// 获取省市区
	getAddress:'sjy/common/getAreaByPid',
	// 根据id查找
	getAddId:'sjy/receiverAddress/get',
	// 添加收货地址
	addAddress:'sjy/receiverAddress/add',
	// 修改收货地址
	updateAddress:'sjy/receiverAddress/update',
	// 获取收货地址
	addressList:'sjy/receiverAddress/list',
	// 删除收货地址
	deleteAddress:'sjy/receiverAddress/delete',
	// 设为默认地址
	setDefault:'sjy/receiverAddress/setDefault',
	// 远程验证手机号是否绑定
	validateMobile:'sjy/user/validateMobile',
	// 发送手机验证码
	sendValidateCode:'sjy/user/sendValidateCode',
	// 验证验证码是否正确
	validateMobileCode:'sjy/user/validateMobileCode',
	// 提交绑定手机号
	bindMobile:'sjy/user/bindMobile',
	// 我的
	myInfo:'sjy/user/myInfo',
	// 我的消息列表
	messageList:'sjy/user/queryMessage',
	// 设置
	setting:'sjy/user/setting',
	// 数据服务
	dataService:'sjy/dataService/list',
	// 购买数据服务页面
	numOrder:'sjy/dataService/buy',
	// 购买数据服务页面
	payNum:'sjy/dataService/pay',
	// 商品列表
	goodsList:'sjy/goods/list',
	// 筛选列表
	categoryList:'sjy/goodsCategory/goodsCategoryList',
	// 商品详情
	detail:'sjy/goods/detail',
	// 农场信息
	farmInfo:'sjy/goods/environment',
	// 微信jsjdk配置信息
	configApi:'sjy/common/initApp',
	// 订单信息
	orderInfo:'sjy/order/buy',
	// 订单支付
	orderPay:'sjy/order/pay',
	// 订单列表
	orderList:'sjy/order/list',
	// 订单详情
	orderDetail:'sjy/order/detail',
	// 数关
	scanRecord:'sjy/scanRecord/findData',
	// 订单详情支付
	payAgain:'sjy/order/payAgain'
}