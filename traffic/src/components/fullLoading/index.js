import Vue from 'vue'
import loading from './index.vue'

let LoadingConstructor = Vue.extend(loading)
let instance
let instances = []

const Loading = function(opts) {
  opts = opts || {}
  // 用实例构造方法创建的实例，传入的data会追加和覆盖原有的，但是创建构造函数extend时就具有的data，现在没传也会保留，比如默认的那些data
  instance = new LoadingConstructor({
    data: opts
  })
  instance.vm = instance.$mount()
  instance.dom = instance.vm.$el
  instance.id = 'loading'
  document.body.appendChild(instance.dom)
  instances.push(instance)
}
Loading.close = function(id, afterClose) {
  id = 'loading'
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof afterClose === 'function') {
        afterClose(instances[i])
      }
      instances[i].$set(instances[i].$data, 'isShow', false)
      instances.splice(i, 1)
      break
    }
  }
  setTimeout(function() {
    let loadingDom = document.getElementById('fullLoading')
    if (loadingDom && loadingDom.parentNode) {
      loadingDom.parentNode.removeChild(loadingDom)
    }
  }, 500)
}

export default Loading
