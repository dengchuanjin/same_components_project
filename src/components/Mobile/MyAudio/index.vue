<template>
  <div id="audiowrap" class="clearfix">
    <audio :src="url" ref="audio"></audio>
    <div class="playIcon" :class="{ playing: isPlay }" @click="autoPlay">
      <i></i>
    </div>
    <div class="borderBarWrap">
      <div class="borderBar">
        <div class="bar" ref="bar" @click="clickBar">
          <div class="completeBar" :style="[{ width: nowWidth + '%' }]">
            <i
              class="slider"
              ref="slider"
              @touchstart.stop="startSlider"
              @touchend.stop="endSlider"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="time">
      <span class="nowTime">{{timeObj.nowTime}}</span>
      <span class="allTime">{{timeObj.allTime}}</span>
    </div>
  </div>
</template>
<script>
import { toZear2 } from "@/assets/js/public";

export default {
  name: "MyAudio",
  props: {
    url: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      isPlay: false,
      nowWidth: 0,
      audioObj: "",
      timeObj: {
        nowTime: "00:00",
        allTime: "00:00"
      },
      timer: null,
      isTouch: false,
      barObj: {
        width: 0,
        left: 0
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.audioObj = this.$refs.audio;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.audioObj.addEventListener("pause", () => {
        if (this.audioObj.paused) {
          this.isPlay = false;
        }
      });
      this.audioObj.addEventListener("canplay", () => {
        this.timeObj.allTime = this.formatTime(this.audioObj.duration);
      });

      let el = this.$refs.bar;
      if (el) {
        this.barObj.left = el.offsetLeft;
        this.barObj.width = el.clientWidth;
      }
    });
  },
  methods: {
    // 点击进度条
    clickBar(ev) {
      if (!this.audioObj.duration) {
        return;
      }
      let e = ev || event;
      this.nowWidth = Math.floor((e.offsetX / this.barObj.width) * 100);
      this.audioObj.currentTime = Math.floor(
        this.audioObj.duration * (this.nowWidth / 100)
      );
      this.timeObj.nowTime = this.formatTime(this.audioObj.currentTime);
    },

    // 按下滑块
    startSlider(ev) {
      if (!this.audioObj.duration) {
        return;
      }
      let e = ev || event;
      let self = e.target;
      document.ontouchmove = e => {        
        let nowL = e.touches[0].clientX - this.barObj.left;
        if (nowL <= 0) {
          this.nowWidth = 0;
          return;
        }
        if (nowL >= this.barObj.width) {
          this.nowWidth = 100;
          return;
        }
        this.nowWidth = Math.floor((nowL / this.barObj.width) * 100);
      };
    },

    // 抬起滑块
    endSlider() {
      document.ontouchmove = null;
      this.audioObj.currentTime = Math.floor(
        this.audioObj.duration * (this.nowWidth / 100)
      );
      this.timeObj.nowTime = this.formatTime(this.audioObj.currentTime);
    },

    // 播放暂停
    autoPlay() {
      if (this.audioObj) {
        if (this.isPlay) {
          this.audioObj.pause();
          window.clearInterval(this.timer);
        } else {
          if (!this.audioObj.duration) {
            this.$toast.fail("音频解析错误!");
            return;
          }
          this.closeOpen();
          this.audioObj.play();
        }
        this.isPlay = !this.isPlay;
        this.updateBar();
      }
    },

    //关闭所有audio
    closeOpen() {
      let audioArr = document.querySelectorAll("audio");
      for (let i = 0; i < audioArr.length; i++) {
        audioArr[i].pause();
      }
    },

    // 格式化时间返回 00:00
    formatTime(val) {
      if (val) {
        return (
          toZear2(Math.floor(val / 60)) + ":" + toZear2(Math.floor(val % 60))
        );
      }
      return "00:00";
    },

    // 监听进度条
    updateBar() {
      window.clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.timeObj.nowTime = this.formatTime(this.audioObj.currentTime);
        this.nowWidth = Math.floor(
          (Math.floor(this.audioObj.currentTime) /
            Math.floor(this.audioObj.duration)) *
            100
        );
        if (this.timeObj.nowTime >= this.timeObj.allTime) {
          window.clearInterval(this.timer);
          this.audioObj.currentTime = 0;
          this.timeObj.nowTime = this.formatTime(this.audioObj.currentTime);
          this.nowWidth = 0;
          this.audioObj.pause();
          this.isPlay = false;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
@function r($px) {
  @return $px/30 * 1rem;
}
#audiowrap {
  padding: r(20);
  // background-color: #f0f0f0;
  // border-radius: r(45);
  position: relative;
}

.playIcon {
  float: left;
  width: r(50);
  height: r(50);
}

.playIcon > i {
  display: block;
  width: 100%;
  height: 100%;
  background: url("./img/stopPlay.png") no-repeat 0 0/100% 100%;
}

.playing > i {
  background: url("./img/play.png") no-repeat 0 0/100% 100%;
}

.borderBarWrap {
  overflow: hidden;
  padding: 0 r(20) r(20) r(20);
}

.borderBar {
  float: left;
  width: 100%;
  padding-top: r(22);
}

.bar {
  height: r(6);
  background-color: #dcdcdc;
}

.completeBar {
  height: 100%;
  background-color: #1296db;
  position: relative;
}

.slider {
  position: absolute;
  right: r(-20);
  top: r(-17);
  height: r(40);
  width: r(40);
  padding: r(10);
}

.slider:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: r(20);
  background-color: #1234db;
}

.time {
  font-size: r(24);
  line-height: r(30);
  font-family: "思源黑体";
  color: #333;
}

.nowTime {
  position: absolute;
  left: r(90);
  top: r(60);
}

.allTime {
  position: absolute;
  right: r(30);
  top: r(60);
}
</style>