// ------------------------OPT------------------------------- //
var base_url = 'http://test.api.platform.winlesson.com' //测试
// var base_url = 'http://api.msg.platform.winlesson.com'

export default {
  base_url : base_url, // 兼容……
  // 输出：
  app: 'http://a.app.qq.com/o/simple.jsp?pkgname=gwy.winlesson.app', // 下载APP
  uploadfile: 'http://123.206.180.82/file/upload/', //上传文件
  // 用户登录接口：
  login: base_url + '/user/login', //登录-POST
  register: base_url + '/user/register/by_phone', //注册-POST
  get_verify_code: base_url + '/user/get/phone/verify_code', //获取验证码-POST
  reset: base_url + '/user/password/reset', // 重置密码-POST
  list_by_id: base_url + '/user/course/list/by_id', // 查询用户是否购买过此课程-GET
  set_info: base_url + '/user/info/set', // 更新用户基本信息-POST
  my_course: base_url + '/api/bskgk/user/my_course', // 我的课程-POST
  // 首页：
  index: base_url + '/content/operation/list', // 课程首页分类列表-GET
  by_page: base_url + '/content/operation/list/by_page', //课程首页分类页面数据-GET
  course_list: base_url + '/course/info/list', //课程课程筛选列表-GET
  // 视频：
  course_detail: base_url + '/course/info/detail', //课程简介-GET
  course_videos: base_url + '/course/chapter/videos', //视频列表-GET
  course_videos_vip: base_url + '/course/chapter/vip/videos', //视频列表-GET
  live_status: base_url + '/api/bskgk/video/live_status', //直播状态请求-POST
  add_video_record: base_url +'/api/bskgk/course/record/add',  //提交课程播放历史-api.msg.platform.winlesson.com-POST
  // 互动：
  getChatList: base_url + '/api/bskgk/chat', // 获取评论列表-POST
  // postChat:base_url + '/api/bskgk/chat/release', // 发送评论-POST
  // 钱包：
  get_voucher_list: base_url + '/api/user/voucher', // 获取优惠券
  get_balance: base_url + '/user/account/balance', // 获取余额
  // 资讯：
  get_news_index: base_url + '/info/list', //资讯首页分类列表-GET
  // 订单：
  create_order: base_url + '/api/pay/order_id/create', //创建订单
  confirm_order: base_url + '/api/pay/order/update', //确认订单
  wxcode: base_url + '/api/wx/qrcode', //微信支付：生成二维码
  change_address: base_url + '/api/bskgk/order/address/add', //更改收货地址
  add_to_mycourse: base_url + '/api/bskgk/course/subscribe', //添加到我的课程-POST(免费课程)
}
// ------------------------LIB------------------------------- //
// 获取URL参数
function getQueryString(name, str) {
  var s = str || window.location.search;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = s.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// 阻止默认事件
function stopDefault(e) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else window.event.returnValue = false;
  return false;
}
