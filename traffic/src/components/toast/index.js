import Vue from 'vue'
import toast from './index.vue'

let ToastConstructor = Vue.extend(toast)
let instance
let instances = []

const Fetoast = function(tip, duration) {
  let opts = {
    tip: tip || '努力加载中...'
  }
  // 用实例构造方法创建的实例，传入的data会追加和覆盖原有的，但是创建构造函数extend时就具有的data，现在没传也会保留，比如默认的那些data
  instance = new ToastConstructor({
    data: opts
  })
  instance.vm = instance.$mount()
  instance.dom = instance.vm.$el
  instance.id = 'toast'
  document.body.appendChild(instance.dom)
  instances.push(instance)
  setTimeout(() => {
    Fetoast.close()
  }, duration || 3000)
}
Fetoast.close = function(id, afterClose) {
  id = 'toast'
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances[i].$set(instances[i].$data, 'isShow', false)
      instances.splice(i, 1)
      break
    }
  }
  setTimeout(function() {
    let toastDom = document.getElementById('toast')
    if (toastDom && toastDom.parentNode) {
      toastDom.parentNode.removeChild(toastDom)
    }
  }, 500)
}

export default Fetoast
