import store from '../store'
import {
  isPlain,
  stringify,
  parse
} from '../util/assist'
import {
  currentUid
} from '../helper/soul_helper'

function addApp() {
  let pageSoul = store.getters['dragModule/pageSoul']
  if(isPlain(pageSoul)){
    return void this.$Message.error('can\'t save empty app,please drop Frame into middle area');
  }

  pageSoul.maxUid = currentUid()

  this.opModel.pageSoul = stringify(pageSoul)
  this.$http.post('app/add', this.opModel).then(res => {
    if (res.data.code === 10000) {
      this.$Message.success('saved')
    } else {
      this.$Message.error('save failed')
    }
  })
}

function delApp(id) {
  this.$http.get('app/del/' + id).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('deleted')
    } else {
      this.$Message.error('delete failed')
    }
  })
}

function updateApp() {
  let pageSoul = store.getters['dragModule/pageSoul']
  pageSoul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(pageSoul)
  this.$http.post('app/update', this.opModel).then(res => {
    if (res.data.code === 10000) {
      this.$Message.success('saved')
    } else {
      this.$Message.error('save failed')
    }
  })
}

function getAppList({appName,token},fn) {
  this.http.post('app/appList',{name:appName}).then(res => {
    if (res.data.code === 10000) {
      this.controls = res.data.data
      if(fn){
        fn.call(this,res.data.data)
      }
    } else {
      this.$Message.error('query failed')
    }
  })
}

function getTableAppList() {
  this.$http.post('app/tableAppList', this.searchInput).then(res => {
    if (res.data.code === 10000) {
      let data = res.data.data
      this.searchInput.total = data.total
      this.tableData = data.list
    } else {
      this.$Message.error('query failed')
    }
  })
}

function getRichApp(id, fn) {
  this.$http.get('app/richApp/' + id).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    } else {
      this.$Message.error('query failed')
    }
  })
}

export {
  addApp,
  delApp,
  updateApp,
  getAppList,
  getTableAppList,
  getRichApp
}
