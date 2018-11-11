<template>
  <div class="note-display">

    <el-row>

      <!--左侧导航栏-->
      <el-col :span="6">
        <div>
          <left-nav></left-nav>
        </div>
      </el-col>
      <!--左侧导航栏end-->

      <!--笔记内容区-->
      <el-col :span="18">
        <div>
          <h1>This is a note display page</h1>
          <div v-if="checkNoteID">
            you are reading note: id={{ $route.params.noteid}}
          </div>
          <div v-else>
            you have entered an error ID
          </div>
        </div>
      </el-col>
      <!--笔记内容区end-->

    </el-row>

  </div>
</template>

<script>
  import LeftNav from '@/components/LeftNav.vue';
  export default {
    name: 'note-display',
    components: {
      LeftNav,
    },
    computed : {

      checkNoteID: function () {
        if (isNaN(this.$route.params.noteid)) {
          // 传入的noteid不是数字
          return false;
        } else {
          // 传入的noteid没问题
          return true;
        }
      },

    },
    mounted: function () {

      // 挂载时设置导航栏索引
      this.setTopNavActiveIndex();

    },
    methods: {

      // 设置顶部导航栏索引，笔记展示页为3
      setTopNavActiveIndex: function () {
        let this_vm = this;
        this_vm.$store.dispatch('setTopNavActiveIndex', '3');
      },

    },
  }
</script>

<style scoped>

</style>