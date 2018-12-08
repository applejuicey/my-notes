<template>
  <div class="home">

    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <h1>this is home</h1>

    <el-row>

      <!--内容区1的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'原创'" :category="categoryArray[0]"></content-card>
        </div>
      </el-col>
      <!--内容区1的卡片end-->

      <!--内容区2的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'修改整理'" :category="categoryArray[1]"></content-card>
        </div>
      </el-col>
      <!--内容区2的卡片end-->

    </el-row>

    <el-row>

      <!--内容区3的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'转载'" :category="categoryArray[2]"></content-card>
        </div>
      </el-col>
      <!--内容区3的卡片end-->

    </el-row>


  </div>
</template>

<script>
// @ is an alias to /src
import ContentCard from '@/components/ContentCard.vue';
export default {
  name: 'home',
  components: {
    ContentCard,
  },
  data() {
    return {

      // 存放card中笔记标题的分类
      categoryArray: ['original', 'rewrited', 'copied'],

    };
  },
  mounted () {

    let this_vm = this;

    // 挂载时设置导航栏索引
    this_vm.setTopNavActiveIndex();

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

<style scoped>
  .home {
    overflow-y: scroll;
    height: inherit;
  }
</style>