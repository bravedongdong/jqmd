<template>
  <div class="center" ref="container" style="flexBasis: 200px;">
    <div class="top">
      <i class="fa fa-plus-square-o" @click="new_file"></i>
    </div>
    <ul>
      <li v-if="!filter_list.length">当前目录没有md文档</li>
      <li v-for="i in filter_list" :key="i" @click="open(i)" :class="{active:i==$store.state.recent_file}">
        <i class="fa fa-file-text-o"></i>&nbsp;{{i|file_name}}</li>
    </ul>
    <div class="drag" @mousedown="dragstart"></div>
  </div>
</template>
<script>
  const fs = require("fs");
  const { dialog } = require("electron").remote;
  export default {
    filters: {
      file_name(val) {
        let arr = val.split("/");
        arr = arr[arr.length - 1].split("\\");
        return arr[arr.length - 1];
      }
    },
    computed: {
      filter_list() {
        return this.$store.state.recent_list.filter(item => {
          let n = item.split(".");
          if (n[n.length - 1] === "md") {
            return true;
          }
        });
      }
    },
    methods: {
      open(i) {
        this.$store.commit("CHANGE_FILE", i);
        this.$root.bus.$emit("open", i);
      },
      new_file() {
        let options = {
          title: "新建",
          filters: [{ name: "markdown", extensions: ["md"] }]
        };
        dialog.showSaveDialog(options, filename => {
          if (filename) {
            this.path = filename;
            this.savefile(this.path);
          }
        });
      },
      savefile(path) {
        fs.writeFile(path, "", { flag: "w" }, err => {
          if (err) {
            console.error(err);
          } else {
            let dir = this.$store.state.recent_folder,
              files = [];
            fs
              .readdirSync(dir)
              .map(i => `${dir}/${i}`)
              .forEach(i => {
                if (!fs.statSync(i).isDirectory()) {
                  files.push(i);
                }
              });
            this.$store.commit("CHANGE_FILELIST", files);
            alert("保存成功");
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
    }
  };
</script>
<style scoped>
  .center {
    position: relative;
    flex: 0 1 200px;
    order: 2;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .drag {
    position: absolute;
    top: 0;
    right: -5px;
    z-index: 1000;
    width: 10px;
    height: 100%;
    cursor: w-resize;
  }
  .top {
    flex: 0 0 30px;
    line-height: 30px;
    font-size: 18px;
    padding: 0 10px;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    user-select: none;
  }
  .top > .fa {
    cursor: pointer;
  }
  ul {
    flex: 1 1 auto;
    margin-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
  }
  li {
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid #eee;
    padding-left: 5px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  li.active {
    background: #ccc;
  }
</style>
