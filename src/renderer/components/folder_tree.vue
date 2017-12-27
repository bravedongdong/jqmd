<template>
  <li>
    <p @click="open_folder" :class="{active:folder==$store.state.recent_folder}">
      <i class="fa fa-plus-square" v-if="has_children&&!show_children"></i>
      <i class="fa fa-minus-square" v-if="has_children&&show_children"></i>
      <i v-if="!has_children" class="nochild">&nbsp; &nbsp;</i>{{folder|folder_name}}</p>
    <ul v-if="show_children">
      <tree v-for="n in children" :key="n" :folder="n"></tree>
    </ul>
  </li>
</template>
<script>
  const os = require("os");
  const fs = require("fs");
  export default {
    name: "tree",
    data() {
      return {
        children: [],
        show_children: false,
        has_children: true
      };
    },
    filters: {
      folder_name(val) {
        let arr = val.split("/");
        arr = arr[arr.length - 1].split("\\");
        return arr[arr.length - 1];
      }
    },
    props: {
      folder: {
        require: true
      }
    },
    methods: {
      read_dir() {
        let all_children = fs
          .readdirSync(this.folder)
          .map(i => `${this.folder}/${i}`);
        let files = [],
          folder = [];
        if (all_children) {
          all_children.forEach(item => {
            if (fs.statSync(item).isDirectory()) {
              folder.push(item);
            } else {
              files.push(item);
            }
          });
        }
        this.$store.commit("CHANGE_FILELIST", files);
        this.children = folder;
        this.has_children = folder.length ? true : false;
      },
      open_folder() {
        if (this.$store.state.recent_folder == this.folder) {
          this.show_children = !this.show_children;
        } else {
          this.show_children = true;
        }
        this.$store.commit("CHANGE_FOLDER", this.folder);
        this.read_dir();
      }
    },
    created() {}
  };
</script>  
<style scoped>
  li {
    font-size: 14px;
    line-height: 14px;
  }
  .active {
    background: #ccc;
  }
  ul {
    padding-left: 20px;
  }
  p {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    height: 25px;
    line-height: 25px;
    margin: 0;
  }
  .nochild {
    border-left: 1px dotted #ddd;
  }
  p:hover {
    background: #eee;
  }
</style>
