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
            <div v-if="checkNoteID" style="height: inherit">
              <note-renderer :noteDetail="noteDetail"></note-renderer>
            </div>
            <div v-else style="height: inherit">
              you have entered an error ID
            </div>
          </div>
        </el-col>
        <!--笔记内容区end-->

      </div>

      <!--当左侧导航栏需要关闭（leftCatalogNavStatus为false）时渲染:-->
      <div v-else class="content-container-closed">

        <!--笔记内容区-->
        <el-col :span="24">
          <div class="content-note-renderer-container">
            <div v-if="checkNoteID" style="height: inherit">
              <note-renderer :noteDetail="noteDetail"></note-renderer>
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
          leftCatalogNavStatus: false,  //左侧导航栏状态，默认收起
          rightColumnStatus: false, //左侧栏状态，默认收起
        },
        noteDetail: {}, //存储拉取到的笔记信息
        loadingsArray: [],  //存储loadings的数组

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

      // 挂载时为noteRow获取一个loading实例
      this_vm.loadingsArray[0] = this_vm.$loading({
          target: document.querySelector('.content-note-renderer-container'),
          lock: true,
        });

      // 挂载时从router中获得noteID并从服务器拉取这条笔记
      this_vm.getNote(this_vm.$route.params.noteid);

    },
    methods: {

      // 设置顶部导航栏索引，笔记展示页为3
      setTopNavActiveIndex: function () {
        let this_vm = this;
        this_vm.$store.dispatch('setTopNavActiveIndex', '3');
      },

      // 根据ID拉取一条笔记
      getNote(id) {
        let this_vm = this;
        let baseURL = 'https://easy-mock.com/mock/5bebe7bc3e54131e11d49398/mynotesdev/api/getNote';
        this_vm.axios({
          method: 'get',
          url: baseURL + '?noteID=' + id,
        }).then(function (response) {
          console.log(response);
          this_vm.noteDetail = response.data.data.noteDetail;
          // 拉取并存储成功后关闭loading遮罩
          setTimeout(() => {
            this_vm.loadingsArray[0].close();
          }, 1000);
        }).catch(function (error) {
          console.log(error)
        })
      }

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
  .content-container-open {
    height: 81vh;
  }
  .content-container-closed {
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