<template>
  <div class="note-display">

    <el-row>
      <el-col :span="24">

        <!--顶部工具栏-->
        <div class="top-tool-bar-container">
          <el-form :inline="true" :model="topToolBar" class="demo-form-inline">
            <el-form-item label="左侧导航">
              <el-switch v-model="topToolBar.leftCatalogNavSpanNumber" active-value="6" inactive-value="0"></el-switch>
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

      <!--当左侧导航栏关闭时leftCatalogNavSpanNumber为0，展开时为6；右侧内容区用24-计算-->
      <div class="content-container">

        <!--左侧导航栏-->
        <el-col :span="parseInt(topToolBar.leftCatalogNavSpanNumber)">
          <div class="content-left-nav-container">
            <left-catalog-nav></left-catalog-nav>
          </div>
        </el-col>
        <!--左侧导航栏end-->

        <!--笔记内容区-->
        <el-col :span="parseInt(24 - topToolBar.leftCatalogNavSpanNumber)">
          <div class="content-note-renderer-container">
            <div v-if="checkNoteID" style="height: inherit">
              <note-renderer :noteID="noteID"></note-renderer>
            </div>
            <div v-else style="height: inherit">
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
          leftCatalogNavSpanNumber: 0,  //左侧导航栏默认收起，所以span应该为0
          rightColumnStatus: false, //左侧栏状态，默认收起
        },
        // 从路由中获取noteID
        noteID: this.$route.params.noteid,

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
    mounted () {

      let this_vm = this;

      // 挂载时设置导航栏索引
      this_vm.setTopNavActiveIndex();

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
    height: 7vh;
    border-bottom: solid 1px #e6e6e6;
  }
  .content-container {
    height: 81vh;
  }
  .content-left-nav-container {
    text-align: left;
    height: 81vh;
  }
  .content-note-renderer-container {
    height: 81vh;
  }
</style>