<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  export default {
    name: 'about',
    computed : {



    },
    mounted: function () {

      // 挂载时设置导航栏索引
      this.setTopNavActiveIndex();

    },
    methods: {

      // 设置顶部导航栏索引，关于页为2
      setTopNavActiveIndex: function () {
        let this_vm = this;
        this_vm.$store.dispatch('setTopNavActiveIndex', '2');
      },

    },
  }
</script>

<style scoped>

</style>