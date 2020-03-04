<template>
  <div
    class="fe-drag"
    ref="feDrag"
    :style="{
      left: isNaN(left) ? 'auto': left + 'px',
      top: isNaN(top) ? 'auto': top + 'px',
      right: isNaN(right) ? 'auto': right + 'px',
      bottom: isNaN(bottom) ? 'auto': bottom + 'px',
      backgroundColor: bgColor,
      borderRadius: radius,
      zIndex: z
    }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <slot>slot</slot>
  </div>
</template>

<script>
export default {
  name: 'FeDrag',

  props: {
    initTop: { // 初始top
      type: [Number, String],
      default: 'auto'
    },
    initBottom: { // 初始Bottom
      type: [Number, String],
      default: 'auto'
    },
    initLeft: { // 初始Left
      type: [Number, String],
      default: 'auto'
    },
    initRight: { // 初始Right
      type: [Number, String],
      default: 'auto'
    },
    bgColor: { // 背景色
      type: String,
      default: 'transparent'
    },
    radius: { // 倒角
      type: String,
      default: 'none'
    },
    z: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      potTop: 0, // 触点距离滑块顶部距离
      potBottom: 0, // 触点距离滑块底部距离
      potLeft: 0, // 触点距离滑块左边距离
      potRight: 0, // 触点距离滑块右边距离
      elementW: 0, // 滑块宽度
      elementH: 0, // 滑块高度
      top: 'auto', // 滑块高距离
      bottom: 'auto', // 滑块底部距离
      left: 'auto', // 滑块左距离
      right: 'auto' // 滑块右距离
    }
  },

  created () { },

  mounted () {
    this.top = this.initTop
    this.bottom = this.initBottom
    this.left = this.initLeft
    this.right = this.initRight
  },

  methods: {
    handleTouchStart (e) {
      let pot = e.targetTouches[0]
      let clientRect = this.$refs.feDrag.getBoundingClientRect()
      let top = clientRect.top
      let left = clientRect.left
      this.potTop = pot.clientY - top
      this.potLeft = pot.clientX - left
      this.elementW = e.target.offsetWidth
      this.elementH = e.target.offsetHeight
    },
    handleTouchMove (e) {
      this.left = (e.targetTouches[0].clientX - this.potLeft)
      this.top = (e.targetTouches[0].clientY - this.potTop)
      this.right = 'auto'
      this.bottom = 'auto'
    },
    handleTouchEnd (e) {
      // 视窗宽高
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
      let clientW = document.documentElement.clientWidth || document.body.clientWidth
      if ((this.left + this.elementW / 2) > (clientW / 2)) { // 靠右
        this.left = clientW - this.elementW
      } else if (!isNaN(this.left)) { // 靠左
        this.left = 0
      }
      if (this.top < 0) { // 不超过顶
        this.top = 0
      } else if (this.top > (clientH - this.elementH)) { // 不超过底
        this.top = clientH - this.elementH
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fe-drag {
    position: fixed;
    overflow: hidden;
  }
</style>
