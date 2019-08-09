<template>
  <div id="wrap">
    <div class="uploadBox">
      <span>选择文件</span>
      <input type="file" multiple ref="uploadFile" @change="changeFile">
    </div>
    <ul class="changedFiles">
      <li v-for="(item, index) in fileList" :key="index">
        <div class="fileInfo">
          <strong>{{item.name}}</strong>
          <em>100%</em>
        </div>
        <div class="proBar"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        fileList: [],//选中的文件列表
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      //上传文件
      uploadFile() {

      },
      //选择文件
      changeFile() {
        this.fileList = this.$refs.uploadFile.files;

      },

    }
  }
</script>
<style scoped>

  #wrap {
    width: 500px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 5px #ccc inset;
    margin: 100px auto;
  }

  .uploadBox {
    font: 700 16px/50px "微软雅黑";
    position: relative;
    padding-left: 10px;
    box-shadow: 0 0 5px #ccc inset;
    color: #444;
  }

  .uploadBox input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:  100%;
    opacity: 0;
    cursor: pointer;
  }

  .changedFiles {
    margin-top: 10px;
    box-shadow: 0 0 5px #ccc inset;
    font: 14px/24px "微软雅黑";
    color: #666;
  }

  .changedFiles li {
    padding: 10px 5px;
    position: relative;
  }

  .fileInfo {
    background-color: transparent;
    position: relative;
    z-index: 1;
  }
  
  .fileInfo strong {
    display: inline-block;
    width: 80%;
    height: 100%;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 5px;
    vertical-align: middle;
  }

  .fileInfo em {
    display: inline-block;
    width: 20%;
    text-align: right;
    vertical-align: middle;
  }

  .proBar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10%;
    background-color: #409EFF;
    z-index: 0;
    opacity: .2;
  }

  .proBar.success {
    background-color: green;
  }

  .proBar.error {
    background-color: red;
  }

</style>
