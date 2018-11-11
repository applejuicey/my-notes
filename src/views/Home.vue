<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>this is home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  mounted: function () {

    // 挂载时设置导航栏索引
    this.setTopNavActiveIndex();

  },
  methods: {

    // 设置顶部导航栏索引，主页为1
    setTopNavActiveIndex: function () {
      let this_vm = this;
      this_vm.$store.dispatch('setTopNavActiveIndex', '1');
    },

  },
}
</script>
