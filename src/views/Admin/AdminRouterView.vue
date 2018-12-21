<template>
  <div class="admin-router-view">

    <el-row>
      <el-col :span="24" class="bread-crumb-container">
        <bread-crumb></bread-crumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="router-view-container">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import BreadCrumb from '@/components/admin-components/BreadCrumb.vue';
  export default {
    name: 'admin-router-view',
    components: {
      BreadCrumb,
    },
    data() {
      return {

      }
    },
    watch:{

    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

    },
  }
</script>

<style scoped>
  .admin-router-view {
    height: 88vh;
    overflow: hidden;
  }
  .bread-crumb-container {
    height: 5vh;
    max-height: 40px;
  }
  .router-view-container {
    height: 83vh;
  }
</style>