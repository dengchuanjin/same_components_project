<template>
  <div id="wrap">
    <div class="uploadBox">
      <span>选择文件</span>
      <input type="file" ref="uploadFile" @change="changeFile" :multiple="isMultiple" />
    </div>
    <ul class="changedFiles" v-if="fileList.length">
      <li v-for="(item, index) in updateList" :key="index">
        <div class="fileInfo">
          <strong>{{item.name}}</strong>
          <span>
            <i v-show="item.loading"></i>
            <em :class="{error: !item.state}" v-show="!item.loading">{{item.stateName}}</em>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getNewStr, deepClone } from "@/assets/js/public";
import { log } from "util";
import { setTimeout } from "timers";

export default {
  name: "index",
  props: {
    //多选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [], //选中的文件列表
      isMultiple: true,
      updateList: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    //选择文件
    changeFile() {
      let fileList = this.$refs.uploadFile.files;
      for (let i = 0; i < fileList.length; i++) {
        fileList[i].state = false;
        fileList[i].stateName = "";
        fileList[i].loading = true;
        this.fileList.push(deepClone(fileList[i]));
        this.updateData();
        let num = this.fileList.length - 1;
        this.uploadFile(this.fileList[num]).then(
          data => {
            this.$emit("getFile", data);
          },
          err => {
            this.$emit("getErr", err);
          }
        );
      }
    },
    //更新数据
    updateData() {
      this.updateList = [];
      this.updateList = deepClone(this.fileList);
    },
    //上传文件
    uploadFile(file) {
      return new Promise((relove, reject) => {
        var fd = new FormData();
        fd.append("file", file);
        //创建AJAX对象
        var xhr = new XMLHttpRequest();
        //请求条件
        xhr.open("POST", getNewStr + "/OSSFile/PostToHuileyou");
        //发送请求参数
        xhr.send(fd);
        //返回值
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            if (obj.resultcode == 200) {
              file.state = true;
              file.stateName = "上传成功";
              file.loading = false;
              console.log(this.fileList);
              this.updateData();
              relove(obj.data);
            } else {
              file.state = false;
              file.stateName = "上传失败";
              file.loading = false;
              this.updateData();
              reject(obj.resultcontent);
            }
          }
        };
      });
    },
    //重置上传列表
    resetList() {
      this.updateList = [];
      this.fileList = [];
    },
  }
};
</script>
<style scoped>
#wrap {
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 5px #ccc inset;
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
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.changedFiles {
  margin-top: 10px;
  font: 14px/24px "微软雅黑";
  color: #666;
}

.changedFiles li {
  padding: 10px 5px;
  position: relative;
  box-shadow: 0 0 5px #ccc inset;
  margin-bottom: 3px;
}

.changedFiles li:last-of-type {
  margin-bottom: 0;
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

.fileInfo span {
  display: inline-block;
  width: 20%;
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
}

.fileInfo i {
  float: right;
  height: 24px;
  width: 24px;
  background: url("./img/loading.png") no-repeat;
  background-size: 100%;
  animation: rotateLoading 0.7s infinite linear;
}

.fileInfo em {
  color: #0c84ff;
}

.fileInfo em.error {
  color: red;
}

@keyframes rotateLoading {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
