<template>
  <div id="fullLoading" v-if="isShow" :tip="tip">
    <!-- <van-loading type="spinner" class="fe_loading"/> -->
    <span class="loading_box">
      <span class="loading_circle"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'fe-loading',
  data: function () {
    return {
      isShow: false,
      size: 'default',
      tip: ''
    }
  },

  watch: {
    isShow (newVal) {
      const _this = this
      if (!newVal) {
        window.setTimeout(function () {
          _this.destroyElement()
        }, 1000)
      }
    }
  },

  methods: {
    destroyElement () {
      this.$destroy()
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },

  mounted () {
    const _this = this
    window.setTimeout(function () {
      _this.isShow = true
    }, 0)
  }
}
</script>


<style lang="scss" scoped>
#fullLoading{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  font-size: 0;
}
// .fe_loading{
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate3d(-50%, -50%, 0);
// }
.loading_box {
    display: inline-block;
    height: 0.6rem;
    width: 0.6rem;
    margin-top: -0.05rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1MzBCQkQ0NUFGRENFMzExOUY4NDg2MjEwQ0UzNjE1MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFM0Y3NjU5RkJGMUQxMUU0QUMyMEM0Q0QzQzI2ODExMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFM0Y3NjU5RUJGMUQxMUU0QUMyMEM0Q0QzQzI2ODExMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Y2UwOGZiZi0xNjEwLTA3NGYtOTQ5ZC0xMjRlZTJlODUwOGMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NmUzNDYzNy05N2RkLTExZTQtYWViZi1iZDIyZDg5N2Y0ZTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SM3BtAAACIklEQVR42uyaSyhEURjHZ7ySR155lWIsxMZCoRTKRrKQFVaytGPLQhZkpSiPjY2NbMUGsVAslMaGGmVWkp088xz/U5/6us0dr5m61/1/9avvO9M9zfzmnDmPxh+JRHwMny+JCiiCIiiCIiiCIiiCIiiCIiiCIiiCIiiCIiiCIiiCIijCsZESz87C4XC05iawBt6lbgWnkk+DAfAktR+8gUsQAocgCHaidRwIBJwpwiayQIGq01VeBnKjPFMK6kCv1EbKHJh189R4ttSvKr/5Zh9VYAasg2THT40/hpk+4yAN5MhoaQZdatR0ggPQ8J9FnIMjS9uSSFhQ06QeTIDR/7pqZNu0X4M+sKzaRkChV5fPfnCr6l4v7yNWVd7uZRHbKq/2soiQyjO9LOJN5aleFpFsszFzhYh4/jepUuX3bhPhj/Gt/jTaVH7mNhHW3evdH/rSe4dNt4mosUgI/7KfeZCv6hU3iTAXBmOqDlp++XU82LSb1WERDKq2GbmzcOyhqwiUgArQCIZAhnp96otni+X0ae4jyqWPHjmJfsYJGHb66XML1Nq8Zg5NGzGeNR+4W96T3UjdAx1xXokSMjWqorSZi5lJOTRZI89Sp9m8pwuZYi3xXjYTNSJ2Za2/leVtTy5cLmJsmc8t37D5DXkEV2AfHMtIeknoGs//Yrtzi00RFEERFEERFEERFEERFEERFEERFEERFEERFEERFOGJ+BBgAM/2VWqwI1reAAAAAElFTkSuQmCC);
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .loading_circle {
    display: inline-block;
    width: 100%;
    height: 100%;
    animation: jm-rotate 1.6s linear 0s infinite;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1MzBCQkQ0NUFGRENFMzExOUY4NDg2MjEwQ0UzNjE1MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMUEwMkFBQUJGMUUxMUU0OEQ5QkJDOTYzQ0YzMzM1MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMUEwMkFBOUJGMUUxMUU0OEQ5QkJDOTYzQ0YzMzM1MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Y2UwOGZiZi0xNjEwLTA3NGYtOTQ5ZC0xMjRlZTJlODUwOGMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NmUzNDYzNy05N2RkLTExZTQtYWViZi1iZDIyZDg5N2Y0ZTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4hDMhjAAAJjElEQVR42sRca2wVRRSe+4C2tKVQhFJrkaev1CBBAuILI4EiGmIMUaPGX2pi4j/UPxLRxPBDQ0yM8RE1GsVHglETfNGEYNWgIYCKiiLy0GpBWkAsfVHu9Zz2G3o63d07szu3neTLvd2du7vz7TnfOXN2tqnm5mYV1vL5vLJphfrR/gn0UU+oJUwmVBMqCKWEcbQ/TZ/dhF5CJ+E44RjhL8Ih2t+e9BrC+i5durT/M6uK03hgMwiXEOYQJmJbCkiLT93KmBSQVG/0P0H4mfAdYS8hF5eEsBZJRCqVsjqJ6FdJuJJwBe54/2CxP4+/nRr9jH8ziXAdYQnhP8LXhK0gyPV47kQ4kMGmv5AwF8eUA5YE8PeTBDb1DrjCGewvgatUEabCMuRx9PfxhJWERiaEru0T+vwnqQtbuUYEGWMIiwkLqE8Gd08PPA+wnx8E/sbAbRof+0LCxYRLCbMNknn/DYTrCZ8TPoTOxNIQa40IIGMmaw3ukB64vnMsdD8QfoIpx2lM2H7gY1jdIsI1hDrhNjyGm3FDXifsiiOkccQyQ7iWMM8kgFornXQ7ff8trt5EDIBd6jPcfT73LYRZgvzzCGsITYS3tOXZnjPrcoHUt4L6Mvs1ggAFf99G+FUVv/F5d9F18J1fQLgbJOgIw9pxEeEZaJF1mOu/WxaNT7aa+k4W/s/YSXhNk2B5LF9tB+FRwqdCm1LQk/VE1nQnIiwGMIWwCnE+T335pF2EjwhfOAigH5MYasHdcIWnYZn9ZFAfDrlPghR7IjQZAYRUI1yNFVbQRv3eQSQIFFaX7Z7absIjhBaIaAp5zROIPvZEBFxwOWGFQQKHw/c5GhRzYGG6VUDP2mn/WvrcJ9yEE7vH4dpuRIAMjijLtDsARwmbkQgVDLcj3UASu8c6RC5NBuvaWiRtgaSmI467kAZTLUhoRzzvG60BR1mDsa8H+vCHIaAPhB0rjIhpyOj6hZHQBWXuSaoJI0hcB/ShQ5Cxggi4KojQdEiStVBYAs/0ttIATo+UKwRdqIM1yNZG2KAvESL6IGa6BYmYC13IgYgfMUcoONjRsACLZJBzjY9EJOFk8K5hRBgXWoEagraGU2buPooiGKsYw30Ib8I6NBm3oUg0PLPEAC9DR20NzObZoLucRBd8kGlLAhpr3EuCCE4H7ghzjXF0gTORNebB4J9xdGE09UJYgbn5S0wDzgknwuowIubo2SQixR7b6bnNdltykpbdCvx+oyCC6xm3mkTwjukiSvCUtyXKBUbCMjxGD92+EbkFj/2mpqamjCSiBlmXdov9tppQqI/cFvbdh2haWlIe9QxtFdX0u/mSiDphDYzDLoMthj6YA0sSOYzWBOJSeIywRBIxRVjDsbAM0paQKH2I+p3LYB2swPwNB4E9wioW6TyCo0WZiBZHXeqYvsXSHHicqBFEmPGbnWrwucnULVu21GZRb8gjWujCq9MJ9SDN/uZ2XRY0P5O6RwyidqvBajh/Xs5EjBf1R9aHE0F30fZBTxghJhm+s0hHN9FPy3TxenYaxRftFh1BmaR0g7gRxNVVCrlHhNnbtB4UmLROTE9jJqZT6tOu+lBIJ4KEMqi/HJD89CWUAa1VENGvEbIM1xX3qObg5IVKlwkjwfweVx8cWpuImlVMREZoRK+vswQRE0SIefdtXMJTOyUEs5wf8KQNsSzKfMB0EX2MdDqtcrlcEn+Pe005QURFFhvSIgWNPbeIS0xnZ6capZaSk65ekVpninpWQ2DZGrLZrGpoaPBiFY6tAuNn9LBF9GFKqnwRYZN+mxHHFNew5MxjKxcW0ZmFRZRiwxgfg7VJt4NCr5l1RmmAB2LkQpRTWYTMSmwo8akHYUmU3F5SUhIYXWQmaiOOMa5zGtyCD9SaRRKlH+yWYWfOt1uYJGhrYI0olGPYDNKRmFIUonRCdYjDZ4cx8PGoUHnVhDCLyGQyBQdfyDpiENOghi6S2cd3/181dL3DBF/T8Kg6BP/NJHDkKGYNImheQlgkrIHxvV7o2SWIqLINgUkLM+wWvgo1jm0xV6dQpWpdvnx5i74dxwURlWb08DXrNPexNbhO9T1YB1fj5gtr+EqW6toEEdwm29Yoo3QiqnDLJJhEjEAdgtsqNbhMMYVi7jkiTuoME880alwIiPPMk/XB17MOB+vgE65WQ5c2bz9HBAZ/RNQtOYxOLEa9Un+3tQiXO2/R50Y1sOJOE7GpsbGxTxdvZaFCRo+6pOEyymXCiPTxpCviGA8JEpiAN+SkS4laxFFBRLlpFa7RImy/qzV4ElN+1jlPEMHrwI4EEaFQx8sJMuqV5VpMF52QJBSTDNGfb+o6QQLXZV8Yck0BRU3pIiV0oXU+SJAD10TEncfEIGMN4QJBxKvKeJoXlNaxVfRAQPOIu5W+ijQ2JHiuR7BA3q8Glw7xjX522HUFlbDoIg+LihVjRtAUPc5TcJfHAh6s4nzCc0q8DUS/e4xwOpIIcXGcVxwTRPDMaJYs3MRZMRNEQBHJ4KkCrw6eJFzibZ1AhS4vDLggXi3TKSyDCwe8oiYddz2EqQ9FXELEedB7auCFF00CP/hdG/bbdMQFcfT4HWE1j4GUYR6fjjNFd3GLBDrBs+cP1MC7ZSmRI92rIp7bFBrQGZBxVmSdvPRwZtDEzNYafDdBGmsCrw5eICyBn1/cqbBEMi4R3Lrp4g+ooUuPS0BGua1eSCsoEhn8FuA2NbgyUGsdzy32FoxmlqbNWnEAFpIXFe9pCK9WxwmCp2r0U2pgUekUsZ2zZF4sttsqrDskSt1wE1nEUVi4zrpRkbSgE0MneEq9A3MIuTCOX5RdBoFUiYgIuWC2iIMo5CihG2Pgn/VB7mK6RUJL4B+vhBtsxDmVyBNexryixeWg2RhhkAd+BEXfGhxDE8LV4Vqk6ixSHRBaH/kDH/d2wj0Ii/qc+kA88IcJm20r35FEOBygA9oxSRR89RKksdjObtNFf7Pg8mcvUneb45ehpMYvubIQXq0Gn0NIAji8P09Yr8T6DlcysnFIEP1yyEBPYspeKQjRfUsZyPTycC+OQH20PSf68kBfwQA7IcQpo4QoX7Jlq+PF5htUyLtlsSwiSW0Sg+P3s4/T/iroREZoQl64B58zq/UFx8uDhFpz4Liz8kVbdoF3CS9ighgptrbjynqO63yn24H+f4OApYsZDFwJkS0kiPLuc7rPL8NvIjQrhydxtmRkkzzMLbC/C7qgrWAstEOv0kkbkes+WEUfQuIvCH/fJjV9GzL+F2AAJ2M2/0P0p6YAAAAASUVORK5CYII=);
    background-size: 100% 100%;
  }
  @keyframes jm-rotate {
    0% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
