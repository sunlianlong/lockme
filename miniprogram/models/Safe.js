import Model from './Model'
import Const from '../utils/Const'
import Crypto from '../utils/Crypto'

const rules = [
  { key: 'lowercase', reg: Const.REG_LOWERCASE, value: Const.LOWERCASE },
  { key: 'uppercase', reg: Const.REG_UPPERCASE, value: Const.UPPERCASE },
  { key: 'number',    reg: Const.REG_NUMBER,    value: Const.NUMBER    },
  { key: 'special',   reg: Const.REG_SPECIAL,   value: Const.SPECIAL   },
]

export default class Safe extends Model {
  constructor(item = {}) {
    super(item)

    this._id = item._id || null
    this.show = false
    this.name = item.name || ''
    this.note = item.note || ''
    this.account = item.account || ''
    this.publicKey = item.publicKey || ''
    this.crypto = wx.getStorageSync('crypto')
    this.encryptedPassword = item.encryptedPassword || null
    this.password = item.password || this.decrypt(this.encryptedPassword)
    this.length = this.password.length ? this.password.length : 10;
    this.elements = rules.map(i => this.password.match(i.reg) || !this.password ? i.key : '')
    
    if (!this._id && this.password == '') {
      this.generate()
    }
  }
  
  decrypt(password) {
    const crypto = this.crypto
    return crypto && password ? Crypto.sm2.doDecrypt(password, this.crypto.privateKey) : ''
  }

  encrypt(password) {
    const crypto = this.crypto
    return crypto && password ? Crypto.sm2.doEncrypt(password, this.crypto.publicKey) : ''
  }

  toJson() {
    return super.toJson({
      name: this.name,
      note: this.note,
      account: this.account,
      publicKey: this.publicKey,
      encryptedPassword: this.encrypt(this.password),
    })
  }

  toData() {
    return {
      name: this.name,
      note: this.note,
      account: this.account,
      password: this.password,
    }
  }

  generate() {
    if (this.elements.length == 0) {
      return this.toast('请至少选择一个类型');
    }

    if (this.length < 4) {
      return this.toast('长度至少为4位');
    }

    let length = 0
    let origin = ''
    let password = ''
    let random = i => i[Math.floor(Math.random() * i.length)]

    rules.forEach(i => {
      if(this.elements.includes(i.key)) {
        length++
        origin += i.value
        password += random(i.value)
      }
    })

    length = this.length - length
    for(let i = 0; i < length; i++) {
      password += random(origin)
    }

    this.password = password
    this.setEncryptedPassword(password)
    this.length = password.length
  }

  setEncryptedPassword(password) {
    this.encryptedPassword = this.encrypt(password)
  }
}
