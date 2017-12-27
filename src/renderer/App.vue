<template>
  <div id="app">
    <div class="main">
      <left_part class="left" v-show="!$store.state.fullscreen" />
      <second_part class="center" v-show="!$store.state.fullscreen" />
      <right_part class="right" />
    </div>
    <div class="bottom">{{$store.state.recent_file}}</div>
  </div>
</template>

<script>
  import left_part from "./components/left_part";
  import second_part from "./components/second_part";
  import right_part from "./components/right_part";
  export default {
    name: "jqmd",
    components: {
      left_part,
      second_part,
      right_part
    }
  };
</script>
<style>
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
  ul,
  li {
    list-style: none;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #cccccc;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: #999999;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: #cccccc;
    border-radius: 6px;
  }
</style>

<style scoped>
  .main {
    flex: 1;
    order: 2;
    display: flex;
    flex-flow: row nowrap;
  }
  .bottom {
    flex: 0 0 20px;
    order: 3;
    padding-left: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
