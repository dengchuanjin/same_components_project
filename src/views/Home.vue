<template>
  <div id="wrap">
    <upLoadFile @getFile="getFile" @getErr="getErr" multiple></upLoadFile>
    <img :src="item" v-for="(item, index) in imageList" height="100" style="display: block;" :key="index" alt="">
  </div>
</template>

<script>
import upLoadFile from "@/components/PC/UpLoadFile";

export default {
  name: "Home",
  components: {
    upLoadFile
  },
  data() {
    return {
      imageList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    getFile(url) {
      this.imageList.push(url);
    },
    getErr(err) {
      console.log(err);
    },
  }
};
</script>

<style scoped>
  #wrap {
    margin: 100px auto;
    width: 500px;
  }
</style>