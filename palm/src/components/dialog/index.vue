<template>
  <div class="dialog" v-show="isShow" @touchmove.prevent>
    <div :class="['dialog-in', {'shrink' : !isContentShow}]">
      <div :class="['content']">
        <div class="txt-block">
          <p class="title">报名成功</p>
          <p class="desc">可联系客服获取报名结果</p>
          <p class="desc">客服微信号</p>
          <div class="input-line">
            <input id="clipInput" readonly :value="serviceAccount" />
            <button
              class="clipboardBtn"
              data-clipboard-target="#clipInput"
              :clstag="qdTrack('copy')"
            >点击复制客服微信</button>
          </div>
        </div>
      </div>

      <div class="close-line">
        <i class="close" @click="close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {
  qdTrack
} from '@jdpay/jdpay_utils'
import ClipboardJS from 'clipboard'
import Fetoast from '../toast'
export default {
  name: '',
  components: {},
  data () {
    return {
      isShow: false,
      isContentShow: false, // 内容区展示
      animationTime: 400, // 动画延时
      isInitClipboardFn: false
    }
  },
  props: {
    serviceAccount: {
      type: String,
      default: 'palmdrive666666'
    }
  },
  created () { },
  mounted () { },
  methods: {
    qdTrack,
    // 弹窗的显示
    show () {
      this.isShow = true
      this.isContentShow = true
      this.clipboardFn()
    },
    // 弹窗的关闭
    close () {
      // this.pageUnfixed()
      this.isContentShow = false
      setTimeout(() => {
        this.isShow = false
      }, this.animationTime)
    },
    goJump (type) {
      this.$emit('goJump', type)
      this.close()
    },
    // 复制字符串到剪切板
    clipboardFn () {
      if (this.isInitClipboardFn) return
      let clipboard = new ClipboardJS('.clipboardBtn')
      clipboard.on('success', function (e) {
        console.info('Action:', e.action)
        console.info('Text:', e.text)
        console.info('Trigger:', e.trigger)
        e.clearSelection()
        if (e.text) {
          Fetoast('客服微信已复制')
        }
      })
      clipboard.on('error', function (e) {
        console.error('Action:', e.action)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.dialog {
  width: 100%;
  // height: 100vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 11;
  .dialog-in{
    display: inline-block;
    // width: 690rem/$r;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: normal 0.4s forwards;
    &.shrink{
      animation: shrink 0.4s forwards;
    }
  }
  .content{
    background-color: white;
    border-radius: 10rem/$r;
    width: 500rem/$r;
    padding: 30rem/$r;
    .txt-block{
      text-align: center;
      font-size: 0;
      color: #002d24;
      .title{
        font-size: 36rem/$r;
        margin-bottom: 6rem/$r;
      }
      .desc{
        font-size: 26rem/$r;
      }
      #clipInput{
        text-align: center;
        font-size: 32rem/$r;
      }
      .clipboardBtn{
        padding: 0 18rem/$r;
        margin-top: 6rem/$r;
        outline: none;
        border: none;
        background-color: #face00;
        height: 60rem/$r;
        line-height: 60rem/$r;
        border-radius: 30rem/$r;
      }
    }
  }

  .close-line{
    text-align: center;
    margin-top: 30rem/$r;
    .close{
      display: inline-block;
      width: 60rem/$r;
      height: 60rem/$r;
      background-image: url('//storage.jd.com/19718team/images/icon_close.png');
      background-size: 100% 100%;
    }
  }
}
@keyframes normal
{
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes shrink
{
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(0);
  }
}
@keyframes shine {
  from {
    transform:rotate(deg);
  }
  to {
   transform:rotate(360deg);
  }
}

</style>
