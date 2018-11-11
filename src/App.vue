<template>
  <div id="app">


    <el-row>

      <!--顶部导航栏-->
      <el-col :span="24">
        <div>
          <top-nav></top-nav>
        </div>
      </el-col>
      <!--顶部导航栏end-->

    </el-row>


    <el-row>

      <!--内容区-->
      <el-col :span="24">
        <div>
          <main-content></main-content>
        </div>
      </el-col>
      <!--内容区end-->

    </el-row>

  </div>
</template>

<script>
  import TopNav from '@/components/TopNav.vue';
  import MainContent from '@/components/MainContent.vue';
  export default {
    name: 'app',
    components: {
      TopNav,
      MainContent,
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
