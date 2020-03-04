<template>
  <div
    class="jv-swipe-item"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'jv-swipe-item',

  data () {
    return {
      offset: 0
    }
  },
  computed: {
    style () {
      return {
        width: this.$parent.width + 'px',
        transform: `translate(${this.offset}px, 0)`
      }
    }
  },

  beforeCreate () {
    this.$parent.swipes.push(this)
  },

  destroyed () {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  }
}
</script>
<style lang="scss" scoped>
$jv-swipe-indicator: .06rem;
.jv-swipe {
  background-color: #000;
  overflow: hidden;
  position: relative;
  user-select: none;

  &-item {
    float: left;
    height: 100%;
  }

  &__track {
    height: 100%;
    overflow: hidden;
  }

  &__indicators {
    left: 50%;
    bottom: .1rem;
    position: absolute;
    height: $jv-swipe-indicator;
    transform: translate3d(-50%, 0, 0);

    > i {
      border-radius: 100%;
      vertical-align: top;
      display: inline-block;
      background-color: rgba(255,255,255,.4);
      width: $jv-swipe-indicator;
      height: $jv-swipe-indicator;
      &:not(:last-child) {
        margin-right: $jv-swipe-indicator;
      }
    }
    .jv-swipe__indicator {
      &--active {
        background-color: rgba(255,255,255,1);
      }
    }
  }
}

</style>

