<template>
  <div class="left-nav">

    <el-menu default-active="2" @open="handleOpen" @close="handleClose">

      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>

        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>

      <template v-for="(object, index) in sectionTitlesArray">
        <el-menu-item :index="index + 2 + ''" @click="scrollToID(object.sectionTitleID)">
          <i class="el-icon-menu"></i>
          <span slot="title">
            {{object.sectionTitleText}}
          </span>
        </el-menu-item>
      </template>

    </el-menu>

  </div>
</template>

<script>
  export default {
    name: 'left-nav',
    props: {
      // noteDetail: {
      //   required: true,
      //   type: Object,
      // },
    },
    data() {
      return {
        sectionTitlesArray: [],
      };
    },
    computed: {

    },
    mounted () {

      let this_vm = this;

      // 在DOM更新之后执行：
      this_vm.$nextTick(() => {

        this_vm.sectionTitlesArray = this.$store.state.sectionTitlesArray;

      });

    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      scrollToID: function (id) {
        console.log('scroll to id:', id);
        document.getElementById(id).scrollIntoView();
      },

    },
  }
</script>

<style scoped>
 .left-nav {
   overflow-y: scroll;
   height: 70vh;
 }
</style>