<template>
  <div class="note-display">

    <el-row>
      <el-col :span="24">

        <!--顶部工具栏-->
        <div class="top-tool-bar-container">
          <el-form :inline="true" :model="topToolBar" class="demo-form-inline">
            <el-form-item label="左侧导航">
              <el-switch v-model="topToolBar.leftCatalogNavStatus"></el-switch>
            </el-form-item>
            <el-form-item label="右侧广告">
              <el-switch v-model="topToolBar.rightColumnStatus"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <!--顶部工具栏end-->

      </el-col>
    </el-row>

    <el-row>

      <!--当左侧导航栏需要展开（leftCatalogNavStatus为true）时渲染:-->
      <div v-if="topToolBar.leftCatalogNavStatus" class="content-container-open">

        <!--左侧导航栏-->
        <el-col :span="6">
          <div class="content-left-nav-container">
            <left-catalog-nav></left-catalog-nav>
          </div>
        </el-col>
        <!--左侧导航栏end-->

        <!--笔记内容区-->
        <el-col :span="18">
          <div class="content-note-renderer-container">
            <h1>This is a note display page</h1>
            <div v-if="checkNoteID">
              you are reading note: id={{ $route.params.noteid}}
              <note-renderer></note-renderer>
            </div>
            <div v-else>
              you have entered an error ID
            </div>
          </div>
        </el-col>
        <!--笔记内容区end-->

      </div>

      <!--当左侧导航栏需要展开（leftCatalogNavStatus为false）时渲染:-->
      <div v-else class="content-container-closed">

        <!--笔记内容区-->
        <el-col :span="24">
          <div>
            <h1>This is a note display page</h1>
            <div v-if="checkNoteID">
              you are reading note: id={{ $route.params.noteid}}
              <note-renderer></note-renderer>
            </div>
            <div v-else>
              you have entered an error ID
            </div>
          </div>
        </el-col>
        <!--笔记内容区end-->

      </div>

    </el-row>

  </div>
</template>

<script>
  import LeftCatalogNav from '@/components/note-components/LeftCatalogNav.vue';
  import NoteRenderer from '@/components/note-components/NoteRenderer.vue';
  export default {
    name: 'note-display',
    components: {
      LeftCatalogNav,
      NoteRenderer,
    },
    data () {
      return {
        topToolBar: {
          leftCatalogNavStatus: false,  //左侧导航栏状态，默认收起
          rightColumnStatus: false, //左侧栏状态，默认收起
        }
      }
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
  .note-display {
    height: inherit;
  }
  .top-tool-bar-container {
    text-align: left;
  }
  .content-container-closed {
    overflow-y: scroll;
    height: 70vh;
  }
  .content-note-renderer-container {
    overflow-y: scroll;
    height: 70vh;
  }
</style>