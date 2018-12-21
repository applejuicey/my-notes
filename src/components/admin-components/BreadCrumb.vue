<template>
  <div class="bread-crumb">
    <el-breadcrumb class="el-bread-crumb-container">
      <el-breadcrumb-item separator-class="el-icon-arrow-right" v-for = "(matchedItem,index) in breadCrumbPath" :key = 'index' :to="{ name: matchedItem.name }">
        {{matchedItem.meta.displayedName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        breadCrumbPath: [],
      }
    },
    watch:{
      // 监听路由，当路由变化时设置breadCrumb
      $route() {
        this.setBreadCrumbPath();
      }
    },
    created() {
      // 组件创建时设置breadCrumb
      this.setBreadCrumbPath();
    },
    methods:{

      // 根据route信息，填充breadCrumb路径
      setBreadCrumbPath: function () {
        let this_vm = this;
        // 获取当前路由匹配的路径的数组
        let tempArray = this_vm.$route.matched;
        tempArray.forEach((item) => {
          // 根据meta中的属性判断是否是RouterView，如果是，则需要为其写入一个name属性
          if (item.meta.isRouterView === true) {
            // 如果是则用其默认children代替
            // 把path转化为数组，剔除第一个元素/，最后将数组转化为字符串作为name
            let pathToNameArray = item.path.split('');
            pathToNameArray.shift();
            item.name = pathToNameArray.join('');
          }
        });
        this_vm.breadCrumbPath = tempArray;
      },

    },
    mounted() {

    },
  }
</script>

<style scoped>
  .bread-crumb {
    height: inherit;
    text-align: left;
  }
  .el-bread-crumb-container {
    display: inline-block;
    vertical-align: bottom;
  }
</style>