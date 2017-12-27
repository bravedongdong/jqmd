<template>
  <div class="right">
    <div class="top">
      <i class="fa fa-navicon" @click="$store.commit('CHANGE_FULLSCREEN')"></i>
      <i class="fa fa-save" @click="save" v-if="$store.state.recent_file"></i>
      <i class="fa fa-edit" @click="showbars=!showbars" v-if="$store.state.recent_file"></i>
    </div>
    <div class="editor">
      <mavon-editor v-model="value" style="width:100%;height:100%" :toolbars="toolbars" :toolbarsFlag="showbars" :default_open="'preview'" />
    </div>
  </div>
</template>
<script>
  const fs = require("fs");
  const { dialog } = require("electron").remote;
  // const winURL =
  //   process.env.NODE_ENV === "development"
  //     ? `http://localhost:9080`
  //     : `file://${__dirname}/index.html`;

  export default {
    data() {
      return {
        value: "",
        showbars: false,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: false, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: false, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
      };
    },
    computed: {
      path() {
        return this.$store.state.recent_file;
      }
    },
    methods: {
      // open_new_window() {
      //   let newwindow = new BrowserWindow({
      //     height: 600,
      //     useContentSize: true,
      //     width: 1100
      //   });
      //   newwindow.loadURL(winURL);
      // },
      inputfile(e) {
        dialog.showOpenDialog(
          {
            // properties: ["openfile"],
            filters: [
              {
                name: "Custom File Type",
                extensions: ["md"]
              }
            ]
          },
          file => {
            if (file) {
              this.$store.commit("CHANGE_FILE", file);
              this.open_file(file[0]);
            }
          }
        );
      },
      open_file(file) {
        if (file) {
          fs.readFile(
            this.path,
            { flag: "r+", encoding: "utf8" },
            (err, data) => {
              if (err) {
                alert(err);
                return;
              } else {
                this.isopen = true;
                this.value = data;
              }
            }
          );
        }
      },
      savefile(path) {
        fs.writeFile(path, this.value, { flag: "w" }, err => {
          if (err) {
            console.error(err);
          } else {
            alert("保存成功");
          }
        });
      },
      other_save() {
        let options = {
          title: "另存为",
          filters: [{ name: "markdown", extensions: ["md"] }]
        };
        dialog.showSaveDialog(options, filename => {
          if (filename) {
            this.path = filename;
            this.savefile(this.path);
          }
        });
      },
      save() {
        if (this.path != "新建文档") {
          this.savefile(this.path);
        } else {
          this.other_save();
        }
      }
    },
    created() {
      this.$root.bus.$on("open", i => {
        this.open_file(i);
      });
    }
  };
</script>
<style scoped>
  .right {
    flex: 1 0 400px;
    order: 3;
    display: flex;
    flex-flow: column nowrap;
    transition: all 1s ease;
  }
  .top {
    flex: 0 0 30px;
    line-height: 30px;
    font-size: 18px;
    order: 1;
    padding-left: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    user-select: none;
  }
  .top > .fa {
    font-size: 18px;
    line-height: 30px;
    padding: 0 5px;
  }
  .button {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    padding: 3px 5px;
  }
  .editor {
    flex: 1;
    order: 2;
    overflow: hidden;
  }
</style>
