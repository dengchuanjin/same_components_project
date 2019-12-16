<template>
  <div id="scrollBarWrap" ref="scrollBarWrap">
    <section
      class="scrollBody"
      ref="scrollBody"
      @mousewheel.stop.prevent="whellScrollBody"
      :style="{ transform: `translateY(-${scrollBodyObj.translateY}px)` }"
    >
      <slot></slot>
    </section>
    <div
      class="slider"
      ref="slider"
      :style="[{ height: sliderObj.height + 'px' }, { top: sliderObj.top + 'px' }]"
      @mousedown="downSlider"
      @mouseup="upSlider"
    ></div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "ScrollBar",
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      barWrapObj: {
        height: 0
      },
      scrollBodyObj: {
        height: 0,
        translateY: 0,
        maxTranslateY: 0
      },
      sliderObj: {
        height: 0,
        top: 0,
        maxTop: 0,
        downTop: 0
      },
      lastNum: 0
    };
  },
  watch: {
    loading(val) {
      if( val ) {
        this.initEl();
      }      
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.initEl();
    });
  },
  methods: {
    // 滑块按下
    downSlider(ev) {
      let e = ev || event;
      this.sliderObj.downTop = e.clientY;
      document.addEventListener("mousemove", this.moveSlider);
      document.addEventListener("mouseup", () => {
        this.lastNum = this.sliderObj.top;
        document.removeEventListener("mousemove", this.moveSlider);
      });
    },

    // 移动滑块
    moveSlider(ev) {
      let e = ev || event;
      let num = e.clientY - this.sliderObj.downTop + this.lastNum;
      let translateY = 0;
      if (num < 0) {
        num = 0;
      }
      if (num > this.sliderObj.maxTop) {
        num = this.sliderObj.maxTop;
        this.scrollToDown();
      }
      translateY =
        this.scrollBodyObj.maxTranslateY *
        (this.sliderObj.top / this.sliderObj.maxTop);

      if( this.lastNum ) {
        
      }

      this.sliderObj.top = num;
      this.scrollBodyObj.translateY = translateY;
    },

    // 滑块抬起
    upSlider() {},

    // 滚动内容体
    whellScrollBody(ev) {
      let e = ev || event;
      if (e.deltaY > 0) {
        this.scrollBodyObj.translateY += 10;
        if (this.scrollBodyObj.translateY > this.scrollBodyObj.maxTranslateY) {
          this.scrollBodyObj.translateY = this.scrollBodyObj.maxTranslateY;
          this.scrollToDown();
        }
      } else if (e.deltaY < 0) {
        this.scrollBodyObj.translateY -= 10;
        if (this.scrollBodyObj.translateY < 0) {
          this.scrollBodyObj.translateY = 0;
        }
      }
      this.sliderObj.top = this.sliderObj.maxTop * (this.scrollBodyObj.translateY / this.scrollBodyObj.maxTranslateY);
      this.lastNum = this.sliderObj.top;
    },

    // 设置滚动位置
    setScrollPosition(val) {
      
    },

    // 滚动到底部
    scrollToDown() {
      if( !this.loading ) {
        console.log(1);
           
        // this.$emit('down');
      }
    },

    // 初始化元素
    initEl() {      
      let scrollBarWrap = this.$refs.scrollBarWrap;
      if (scrollBarWrap) {
        this.barWrapObj.height = scrollBarWrap.clientHeight;
      }

      let scrollBody = this.$refs.scrollBody;
      if (scrollBody) {
        this.scrollBodyObj.height = scrollBody.clientHeight;
        this.scrollBodyObj.maxTranslateY =
          scrollBody.clientHeight - this.barWrapObj.height;
      }

      if (scrollBarWrap && scrollBody) {
        let num = this.scrollBodyObj.height / this.barWrapObj.height; // 计算滚动条高度占外框高度的比例
        if (num <= 1) {
          this.sliderObj.height = 0;
          this.sliderObj.maxTop = 0;
          return;
        }
        this.sliderObj.height = this.barWrapObj.height / num;
        this.sliderObj.maxTop = Math.floor(
          this.barWrapObj.height - this.sliderObj.height
        );
        this.sliderObj.top = this.sliderObj.maxTop * (this.scrollBodyObj.translateY / this.scrollBodyObj.maxTranslateY);
      }
    }
  }
};
</script>
<style scoped>
#scrollBarWrap {
  position: relative;
  height: 100%;
  overflow: hidden;
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.slider {
  width: 10px;
  height: 0px;
  background-color: #ccc;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 5px;
  transition: height 0.1s linear;
  cursor: pointer;
}

.slider:active,
.slider:hover {
  box-shadow: 0 0 10px #ccc;
}
</style>