import Model from './Model'
import Const from '../utils/Const'
import Config from '../utils/Config'

export default class Setting extends Model {
  constructor(item = {}) {
    super(item)

    this._id = item._id || null
    this.validTime = parseInt(item.validTime || Const.VALID_TIME[1].value)
    this.authentication = item.authentication || false
    
    // 获取 openid
    if (this._id) {
      this.openid = item._openid
    } else {
      wx.cloud.callFunction({
        name: 'login',
        complete: res => this.openid = res.result.openid,
      })
    }
  }

  toJson() {
    return super.toJson({
      validTime: this.validTime,
      authentication: this.authentication,
      supportAuthentication: this.supportAuthentication,
    })
  }
}
