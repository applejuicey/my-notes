<template>
  <div class="main-content">

    <el-row>

      <!--左侧导航栏-->
      <el-col :span="6">
        <div>
          <left-nav></left-nav>
        </div>
      </el-col>
      <!--左侧导航栏end-->

      <!--router-view内容区-->
      <el-col :span="18">
        <div>
          <router-view/>
        </div>
      </el-col>
      <!--router-view内容区end-->

    </el-row>


  </div>
</template>

<script>
  import LeftNav from '@/components/LeftNav.vue';
  export default {
    name: 'main-content',
    components: {
      LeftNav,
    },
  }
</script>

<style scoped>

</style>