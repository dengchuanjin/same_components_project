<template>
  <div id="wrap">
    <scroll-bar @down="addData" :loading="isLoading" >
      <ul>
        <li v-for="(item, index) in num" :key="index">这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容 》》》{{index}}</li>
      </ul>
    </scroll-bar>
  </div>
</template>

<script>
import ScrollBar from "@/components/PC/ScrollBar";
export default {
  name: "ScrollTemplate",
  components: {
    ScrollBar
  },
  data() {
    return {
      num: 50,
      isLoading: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 添加数据
    addData() {
      this.isLoading = true;      
      setTimeout(() => {
        this.num += 10;
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
#wrap {
  height: 500px;
  width: 1000px;
  margin: 100px auto 0;
  box-shadow: 0 0 10px #ccc;
  padding: 10px;
}
</style>