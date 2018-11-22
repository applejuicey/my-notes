<template>
  <div id="app">

    <el-row>
      <el-col :span="24">

        <!--顶部导航栏-->
        <div class="top-nav-container">
          <top-nav></top-nav>
        </div>
        <!--顶部导航栏end-->

      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">

        <!--内容区-->
        <div class="main-content-container">
          <router-view/>
        </div>
        <!--内容区end-->

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import TopNav from '@/components/TopNav.vue';
  export default {
    name: 'app',
    components: {
      TopNav,
    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {

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
  .top-nav-container {
    height: 10vh;
    width: 100%;
  }
  .main-content-container {
    height: 80vh;
  }
</style>
