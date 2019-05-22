const mongoose = require('./db')
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  long_url: String,
  short_url: String,
  date: { // 创建时间
    type: Date,
    default: Date.now()
  },
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
});

const shortUrl = mongoose.model('short_url', shortUrlSchema);

class Mongodb {
  constructor() {

  }
  // 查询
  async query(body) {
    let res = await shortUrl.findOne({ short_url: body, dele: false }, {
      long_url: 1,
      short_url: 1,
      date: 1
    });
    if (res) {
      return {
        status: 1,
        msg: res
      }
    } else {
      return {
        status: 0,
        msg: '查询失败'
      }
    }
  }

  // 添加
  async save(body) {
    let isHas = await query(body.short_url)
    if (isHas) {
      return {
        status: 0,
        msg: '已存在'
      }
    } else {
      const m = new shortUrl(body)
      let res = await m.save()
      return {
        status: 1,
        msg: res
      }
    }
  }
}
module.exports = new Mongodb()