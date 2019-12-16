<template>
  <div id="wrap">
    <van-nav-bar
      title="访客车牌号"
      left-text="返回"
      fixed
      left-arrow
      @click-left="closePopup"
      style="background-color: #1989fa;"
    />
    <section>
      <div class="plateBox">
        <strong>请输入车牌号</strong>
        <ul class="inputList">
          <li v-for="(item, index) in inputedArr" :key="index" v-show="index != 7 || item">{{item}}</li>
          <li v-show="!inputedArr[inputedArr.length - 1]"></li>
        </ul>
        <div class="submitBtn">
          <a href="javascript:;" @click="submitBtn">提交</a>
        </div>
      </div>
    </section>
    <footer>
      <ul class="dataList" :class="{isLang: isLang}">
        <li v-for="(item, index) in dataList" :key="index" @click="changeLang(item)">
          <span>{{item}}</span>
        </li>
        <li @click="deleteLang" class="deleteIcon">
          <span></span>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
const Chinese = [
  "京",
  "津",
  "沪",
  "渝",
  "冀",
  "晋",
  "辽",
  "吉",
  "黑",
  "苏",
  "浙",
  "皖",
  "闽",
  "赣",
  "鲁",
  "豫",
  "鄂",
  "湘",
  "粤",
  "琼",
  "川",
  "贵",
  "云",
  "陕",
  "甘",
  "青",
  "蒙",
  "桂",
  "宁",
  "新",
  "ABC",
  "藏",
  "使",
  "领",
  "警",
  "学",
  "港",
  "澳"
];
const English = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "中",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M"
];

export default {
  name: "DistinguishCar",
  data() {
    return {
      inputedArr: ["", "", "", "", "", "", "", ""],
      dataList: Chinese,
      isLang: false,
      langIndex: 0
    };
  },
  created() {},
  methods: {
    // 关闭弹出层
    closePopup() {
      this.$emit("closePopup");
    },

    // 选择字
    changeLang(item) {
      if (item === "ABC") {
        this.dataList = English;
        this.isLang = true;
        return;
      } else if (item === "中") {
        this.dataList = Chinese;
        this.isLang = false;
        return;
      }
      for (let i = 0; i < this.inputedArr.length; i++) {
        if (this.inputedArr[i] === "") {
          if (i == 0) {
            this.dataList = English;
            this.isLang = true;
          }
          this.langIndex = i;
          this.$set(this.inputedArr, i, item);
          break;
        }
      }
    },

    // 删除字
    deleteLang() {
      this.$set(this.inputedArr, this.langIndex, "");
      if (this.langIndex == 0) {
        this.dataList = Chinese;
        this.isLang = false;
      }
      this.langIndex--;
    },

    // 提交
    submitBtn() {
      let str = this.inputedArr.join("");
      this.$emit("carNumber", str);
    }
  }
};
</script>
<style scoped lang='scss'>
@function r($px) {
  @return $px / 30 * 1rem;
}

.van-nav-bar__title,
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #fff;
}

#wrap {
  height: 100%;
  padding: r(88) 0 r(500);
  background-color: #f5f5f5;
  position: relative;
}

section {
  height: 100%;
  padding: r(30) r(10);
}

.plateBox {
  padding: r(15) r(15) r(30);
  background-color: #fff;
  font-size: r(33);
  line-height: r(90);
  font-family: "思源黑体";
  border: 1px solid #ccc;
}

.plateBox > strong {
  display: block;
  text-align: center;
  color: #333;
  letter-spacing: r(3);
}

.inputList {
  display: flex;
  justify-content: space-between;
}

.inputList li {
  border: 1px solid #999;
  width: r(80);
  height: r(90);
  color: #333;
  text-align: center;
}

.inputList li:last-of-type {
  color: #999;
  background: url("./img/size.png") no-repeat center center;
  background-size: 80%;
}

.submitBtn {
  padding-top: r(50);
}

.submitBtn a {
  font-size: r(30);
  line-height: r(90);
  text-align: center;
  background-color: #1989fa;
  color: #fff;
  border-radius: r(10);
}

.submitBtn a:active {
  opacity: 0.7;
}

footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  font-size: r(30);
  line-height: r(80);
  font-family: "思源黑体";
  color: #333;
  padding-bottom: r(50);
}

.dataList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dataList li {
  width: r(75);
  text-align: center;
  padding: r(5);
}

.dataList li:nth-of-type(31),
.dataList li:nth-of-type(32),
.dataList li:nth-of-type(33),
.dataList li:nth-of-type(34),
.dataList li:nth-of-type(35),
.dataList li:nth-of-type(36),
.dataList li:nth-of-type(37),
.dataList li:nth-of-type(38),
.dataList li:nth-of-type(39) {
  width: r(83);
}

.isLang li:nth-of-type(31),
.isLang li:nth-of-type(32),
.isLang li:nth-of-type(33),
.isLang li:nth-of-type(34),
.isLang li:nth-of-type(35),
.isLang li:nth-of-type(36),
.isLang li:nth-of-type(37),
.isLang li:nth-of-type(38),
.isLang li:nth-of-type(39) {
  width: r(93);
}

.dataList li:active {
  opacity: 0.7;
}

.dataList span {
  display: block;
  height: 100%;
  border: 1px solid #666;
  border-radius: r(10);
}

.dataList .van-icon {
  font-size: r(30);
  line-height: r(80);
}

.deleteIcon span {
  background: url('./img/delete.png') no-repeat center center;
  background-size: 60%;
}
</style>