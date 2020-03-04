<template>
  <li class="task-item">
    <div class="info">
      <div class="name">{{info.taskName}}</div>
      <div>
        <span
          class="icon-one reward"
          v-if="info.rewardOneDesc"
        ><span class="icon"><img :src="info.rewardOneIcon"></span><span class="amount">{{info.rewardOneDesc | getAmount}}</span><span
            class="double"
            v-if="info.rewardOneMultiple"
          >x 2</span></span>
        <span
          class="reward"
          v-if="info.rewardTwoDesc"
        ><span class="icon"><img :src="info.rewardTwoIcon"></span><span class="amount">{{info.rewardTwoDesc | getAmount}}</span><span
            class="double"
            v-if="info.rewardMulTwotiple"
          >x 2</span></span>
      </div>
    </div>
    <button
      v-if="info.status === -1"
      @click="getTask"
      class="task"
    >领取任务</button>
    <button
      v-else-if="info.status === 1"
      @click="getReward"
      class="reward"
    >领取奖品</button>
    <button v-else-if="info.status === 2">已完成</button>
    <button v-else-if="info.status === 'getTask'">已领取</button>
    <button v-else-if="info.status === 0 && info.scheduleTask">{{info.scheduleNowValue}}/{{info.scheduleTargetValue}}</button>
    <button v-else-if="info.status === 0 && !info.scheduleTask">已领取</button>
  </li>
</template>

<script>
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      statusMap: {
        'getTask': '已领取',
        '-1': '领取任务',
        '0': '进行中',
        '1': '领取奖品',
        '2': '已完成'
      }
    }
  },
  watch: {},
  filters: {
    getAmount (str) {
      return parseInt(str)
    }
  },
  created () { },
  mounted () { },
  methods: {
    getTask () {
      this.$emit('getTask', this.info.missionId)
    },
    getReward () {
      this.$emit('getReward', this.info.missionId)
    }
  }
}
</script>

<style lang='scss' scoped>
$r:100;
.task-item{
  margin: 10rem/$r auto;
  width: 590rem/$r;
  min-height: 124rem/$r;
  background-image: url('../../assets/images1/bg_taskItem.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rem/$r 30rem/$r;
  .info{
    .name{
      font-size: 30rem/$r;
      color: #333;
      margin-bottom: 4rem/$r;
    }
    .reward{
      font-size: 0;
      color: #999;
      &.icon-one{
        margin-right: 20rem/$r;
      }
      .icon{
        display: inline-block;
        width: 24rem/$r;
        height: 24rem/$r;
        margin-right: 4rem/$r;
        vertical-align: sub;
        img{
          width: 100%;
        }
      }
      .amount{
        font-size: 24rem/$r;
      }
      .double{
        font-size: 24rem/$r;
      }
    }
  }
  button{
    width: 128rem/$r;
    height: 46rem/$r;
    border-radius: 23rem/$r;
    outline: none;
    border: none;
    color: white;
    background-color: #999999;
    &.task{
      background-color: #fca053;
    }
    &.reward{
      background-color: #f25c4b;
    }
  }
}
</style>
