<template>
  <div>
      <router-view></router-view>
  </div>


</template>

<script>

export default {
  name: 'App',
  components: {
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.github-markdown-body {
    padding: 0 !important;;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
    cursor: pointer;
}
::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 2.5px #3d445e;
    background: #3d445e;
}
::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 2.5px #3d445e;
    border-radius: 5px;
    background: #ededed;
}


</style>
