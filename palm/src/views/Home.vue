<template>
  <main class="CONTAINER">
    <img src="https://storage.jd.com/2020plam/images/img_header.png" alt class="img_header" />
    <div class="main">
      <div class="input_block">
        <div class="input_item">
          <input type="text" v-model="wxAccount" placeholder="微信号/手机号" />
        </div>
        <div class="input_item">
          <input type="text" v-model="grade" placeholder="所在年级" />
        </div>
        <div class="input_item">
          <input type="text" v-model="country" placeholder="留学计划申请国家或地区" />
        </div>
      </div>
      <div class="agreement_line">
        <i
          :class="[isAgree ? 'agree': '']"
          @click="agreeProtocol"
          :clstag="qdTrack('agreeProtocol')"
        ></i>
        <span class="txt" @click="agreeProtocol" :clstag="qdTrack('agreeProtocol')">我已阅读并同意</span>
        <span class="txt" @click="goHref('userProtocol')" :clstag="qdTrack('userProtocol')">《用户注册协议》</span>
        <span
          class="txt"
          @click="goHref('privacyProtocol')"
          :clstag="qdTrack('privacyProtocol')"
        >《隐私保护协议》</span>
      </div>
      <div class="btn_line">
        <button @click="willUploadInfo" :clstag="qdTrack('submit')">完成</button>
      </div>
    </div>
    <div class="rule-block">
      <div class="in">
        <div class="title">
          <span class="txt">活动规则</span>
        </div>
        <ul>
          <li v-for="(item, index) in ruleList" :key="index">{{item}}</li>
        </ul>
        <i></i>
      </div>
    </div>
    <div class="bottom-block">
      <img src="https://storage.jd.com/2020plam/images/img_bottom_logo.jpg" />
    </div>
    <Dialog ref="dialog" :serviceAccount="serviceAccount"></Dialog>
  </main>
</template>

<script>
import {
  getParams,
  qdTrack
} from '@jdpay/jdpay_utils'
import {
  apiUploadInfo
} from 'api/request'
import loading from '../components/fullLoading/index.js'
import Fetoast from '../components/toast'
import Dialog from '../components/dialog'

export default {
  name: 'home',
  components: {
    Dialog
  },

  data () {
    return {
      sourceData: window.data_source_100002795,
      ruleList: [], // 活动规则列表
      serviceAccount: '', // 客服账号
      isAgree: false, // 是否同意协议
      wxAccount: '', // 微信账号
      grade: '', // 年级
      country: '' // 留学国家或地区
    }
  },

  created () {
    this.handleSourceData()
  },

  mounted () {

  },
  watch: {
    wxAccount (newVal) {
      // console.log('wxAccount:', newVal)
      // if (newVal && newVal.length > 20) {
      //   this.wxAccount = newVal.substr(0, 20)
      // }
    }
  },
  methods: {
    qdTrack,
    // 处理配置平台数据
    handleSourceData () {
      this.serviceAccount = this.sourceData.primaryPage.serviceAccount
      this.ruleList = this.sourceData.ruleList
    },
    // 同意协议
    agreeProtocol () {
      this.isAgree = !this.isAgree
    },
    // 页面跳转
    goHref (type) {
      let url = ''
      let urlObj = this.sourceData.primaryPage
      if (type === 'userProtocol') {
        url = urlObj.userUrl
      } else if (type === 'privacyProtocol') {
        url = urlObj.privacyUrl
      }
      location.href = url
    },
    willUploadInfo () {
      let msg = ''
      if (!this.isAgree) {
        msg = '请阅读并同意《用户注册协议》《隐私保护协议》'
      } else if (!this.wxAccount) {
        msg = '请输入微信号/手机号'
      } else if (!this.grade) {
        msg = '请输入所在年级'
      } else if (!this.country) {
        msg = '请输入留学计划申请国家或地区'
      }
      if (msg) {
        Fetoast(msg)
      } else {
        this.doUploadInfo()
      }
    },
    // 提交用户信息
    async doUploadInfo () {
      let params = {
        wxAccount: this.wxAccount, // 微信账号
        grade: this.grade, // 年级
        country: this.country // 留学国家或地区
      }
      let res = {}
      try {
        loading()
        res = await apiUploadInfo(params)
        loading.close()
        if (res.code === 'F_000000') {
          this.$refs.dialog.show()
        } else if (res.code === 'F_000005') {
          Fetoast('请输入完整的信息！')
        } else {
          Fetoast('活动火爆，请稍后重试')
        }
      } catch (err) {
        loading.close()
        console.log('api catch log:', err)
        Fetoast('活动火爆，请稍后重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$r:100;
.CONTAINER {
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 7.5rem;
  min-height: 100vh;
  background-color: #71d8c5;
  background-image: url('https://storage.jd.com/2020plam/images/bg_home.png');
  background-size: 100%, contain;
  background-repeat: no-repeat;
  font-size: 0;
  .img_header{
    width: 100%;
  }
  .input_block{
    padding: 0 62rem/$r;
    font-size: 0;
    .input_item{
      position: relative;
      margin-top: 24rem/$r;
      &:nth-of-type(1){
        margin-top: 0;
      }
      &::before{
        content: "";
        position: absolute;
        display: inline-block;
        width: 10rem/$r;
        height: 10rem/$r;
        background-color: #fad000;
        border-radius: 50%;
        top: 27rem/$r;
        left: 32rem/$r;
      }
      input{
        width: 100%;
        height: 64rem/$r;
        border-radius: 32rem/$r;
        background-color: white;
        border: 1px solid #c9c9c9;
        outline: none;
        font-size: 14px;
        padding: 0 50rem/$r;
        line-height: 64rem/$r;
      }
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #636363;
      font-size: 14px;
      font-weight: bold;
      line-height: 64rem/$r;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #636363;
      font-size: 14px;
      font-weight: bold;
      line-height: 64rem/$r;
    }
  }
  .agreement_line{
    margin-top: 20rem/$r;
    i{
      display: inline-block;
      width: 24rem/$r;
      height: 24rem/$r;
      background-image: url('http://storage.jd.com/2020plam/images/icon_uncheck.png');
      background-size: 100% 100%;
      margin-right: 8rem/$r;
      vertical-align: text-top;
      &.agree{
        background-image: url('http://storage.jd.com/2020plam/images/icon_check.png');
      }
    }
    padding: 0 62rem/$r;
    font-size: 24rem/$r;
    color: white;
  }
  .btn_line{
    margin-top: 32rem/$r;
    padding: 0 62rem/$r;
    font-size: 28rem/$r;
    button{
      display: inline-block;
      border: none;
      outline: none;
      width: 100%;
      height: 84rem/$r;
      line-height: 84rem/$r;
      border-radius: 42rem/$r;
      font-size: 38rem/$r;
      font-weight: bold;
      letter-spacing: 2px;
      background-color: #face00;
      color: #002d24;
    }
  }
  .rule-block{
    margin-top: 40rem/$r;
    padding: 0 34rem/$r;
    .in{
      font-size: 0;
      padding-top: 26rem/$r;
      border-radius: 26rem/$r;
      padding-bottom: 64rem/$r;
      width: 100%;
      background-color: #3bb79f;
      color: white;
      position: relative;
      .title{
        text-align: center;
        font-size: 34rem/$r;
        font-weight: bold;
        .txt{
          &::before{
            content: "";
            display: inline-block;
            width: 28rem/$r;
            height: 4rem/$r;
            background-color: white;
            vertical-align: middle;
            margin-right: 10rem/$r;
            position: relative;
            top: -4rem/$r;
          }
          &::after{
            content: "";
            display: inline-block;
            width: 28rem/$r;
            height: 4rem/$r;
            background-color: white;
            vertical-align: middle;
            margin-left: 10rem/$r;
            position: relative;
            top: -4rem/$r;
          }
        }
      }
      ul{
        list-style: none;
        padding: 38rem/$r;
        li{
          &:nth-of-type(1) {
            margin-top: 0;
          }
          font-size: 24rem/$r;
          margin-top: 30rem/$r;
        }
      }
      i{
        display: inline-block;
        width: 235rem/$r;
        height: 151rem/$r;
        background-image: url('https://storage.jd.com/2020plam/images/icon_hat.png');
        background-size: 100% 100%;
        position: absolute;
        right: -30rem/$r;
        bottom: -40rem/$r;
      }
    }
  }
  .bottom-block{
    margin-top: 50rem/$r;
    img{
      width: 100%;
    }
  }

}
</style>
