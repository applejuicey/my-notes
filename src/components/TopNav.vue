<template>
  <div class="top-nav">

    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">

      <el-menu-item index="1">
        <router-link to="/" tag="span">首页</router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link :to="{name: 'about', params: { }}" tag="span">关于</router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link :to="{name: 'noteDisplay', params: { noteid: 1235}}" tag="span">NoteDisplay id=123</router-link>
      </el-menu-item>

      <!--<el-submenu index="2">-->
        <!--<template slot="title">我的工作台</template>-->
        <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
        <!--<el-submenu index="2-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
          <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->

    </el-menu>

  </div>
</template>

<script>
  export default {
    name: 'top-nav',
    props: {

    },
    data() {
      return {

      };
    },
    computed: {

      // 从state中读取顶部导航栏索引
      activeIndex: function () {
        let this_vm = this;
        return this_vm.$store.state.topNavActiveIndex;
      },

    },
    methods: {

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }

    },
  }
</script>

<style scoped>

</style>