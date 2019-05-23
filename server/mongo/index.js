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
    // 随机生成3-6位
    let str = await this.randomUrl(true, 3, 6)
    let isHas = await this.query(str)
    if (isHas.status) {
     this.save(body)
    } else {
      let data = {
        long_url: body,
        short_url: str,
      }
      const m = new shortUrl(data)
      let res = await m.save()
      return {
        status: 1,
        msg: res
      }
    }
  }

  async randomUrl (isRandom, min, max) {
    let str = '',
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(isRandom){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
  }
}
module.exports = new Mongodb()