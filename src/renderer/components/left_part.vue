<template>
  <div class="left" ref="container" style="flexBasis: 200px;">
    <div class="wrapper">
      <div class="open_box" @click="open_folder">
        <p>打开文件夹</p>
      </div>
      <ul>
        <folder_tree v-for="i in folders" :key="i" :folder="i" />
      </ul>
    </div>
    <div class="drag" @mousedown="dragstart"></div>
  </div>
</template>
<script>
  import folder_tree from "./folder_tree";
  const fs = require("fs");
  const { dialog } = require("electron").remote;
  export default {
    data() {
      return {
        folders: []
      };
    },
    methods: {
      open_folder() {
        let options = {
          title: "打开文件夹",
          properties: ["openDirectory"]
        };
        dialog.showOpenDialog(options, filename => {
          if (filename) {
            this.folders.push(filename[0]);
          }
        });
      },
      dragstart(e) {
        let x = e.pageX,
          width = this.$refs.container.clientWidth,
          self = this;
        function mousemove(ev) {
          self.$refs.container.style.flexBasis = width + ev.pageX - x + "px";
        }
        function mouseup(eve) {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      }
    },
    mounted() {},
    components: {
      folder_tree
    }
  };
</script>
<style scoped>
  .left {
    position: relative;
    flex: 0 1 200px;
    order: 1;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .drag {
    position: absolute;
    top: 0;
    right: -5px;
    width: 10px;
    height: 100%;
    z-index: 1000;
    cursor: w-resize;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .open_box {
    width: 100%;
    height: 40px;
    padding: 5px 10px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    box-sizing: border-box;
  }
  .open_box p {
    margin: 0;
    height: 30px;
    background: #557899;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  ul {
    padding-left: 5px;
  }
</style>
