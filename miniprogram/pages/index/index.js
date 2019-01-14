import Safe from '../../models/Safe'
import { Safes } from '../../collections/Safes'

const app = getApp()

Page({
  data: {
    theme: '',
    keyword: '',
    safes: [],
    safe: {},
    form: {
      show: false,
    },
    message: {
      notFound: '搜索不到数据',
      notData: '暂无数据，您可以进行创建',
    },
  },

  onLoad() { 
    app.pageLoad()
    this.getSafes()
  },

  onShow() {
    app.pageShow()
    this.setData({ theme: app.globalData.theme })
  },

  onPullDownRefresh() {
    this.getSafes().then(() => wx.stopPullDownRefresh())
    this.searchSafes()
  },

  setKeyword(e) {
    const keyword = e.detail.value
    this.setData({ keyword })
    this.searchSafes()
  },

  setFormProp(e) {
    let prop = e.currentTarget.dataset.prop
    let safe = this.data.safe
    safe[prop] = e.detail.value
    
    if (['length'].includes(prop)) {
      safe._toast(`密码长度为${e.detail.value}`)
    }

    if (['elements', 'length'].includes(prop)) {
      safe.generate()
    }

    if (['password'].includes(prop)) {
      safe.setEncryptedPassword(e.detail.value)
    }

    this.setData({ safe: safe })
  },

  showForm(safe) {
    this.setData({
      safe,
      keyword: '',
      form: { show: true }
    })
  },

  cancelForm() {
    this.setData({form: { show: false }})
  },

  submitForm(e) {
    const safe = e.detail.safe
    
    if(!Safes.valid(safe)) {
      return 
    }

    let option = safe._id ? 'edit' : 'add'
    
    Safes[option](safe)
      .then(safes => this.setData( { safes }))
      .then(() => this.cancelForm())
  },

  getSafes() {
    return Safes.get().then(safes => this.setData({ safes }))
  },

  searchSafes() {
    const keyword = this.data.keyword
    Safes.search(keyword).then(safes => this.setData({ safes }))
  },

  checkValidEndAt() {
    const validEndAt = parseInt(wx.getStorageSync('validEndAt') || 0)
    const now = (new Date).getTime()

    if (now < validEndAt) {
      return true
    }

    wx.navigateTo({ url: 'pages/valid/index' })

    return false
  },

  toggleSafe(e) {
    const safe = e.detail.safe
    if(this.checkValidEndAt()) {
      Safes.toggle(safe).then(safes => this.setData({ safes }))
    }
  },

  copySafe(e) {
    const safe = e.detail.safe
    if(this.checkValidEndAt()) {
      wx.setClipboardData({
        data: safe.password,
      })
    }
  },

  addSafe() {
    this.showForm(new Safe({ name: this.data.keyword }))
  },

  editSafe(e) {
    const safe = e.detail.safe
    this.showForm(Safes.find(safe._id))
  },

  delSafe(e) {
    const safe = e.detail.safe
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: res => res.cancel ||
        Safes.remove(safe)
          .then(safes => this.setData({ safes }))
    })
  },
})
