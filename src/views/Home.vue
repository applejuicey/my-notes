<template>
  <div class="home">

    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>this is home</h1>

    <el-row>

      <!--内容区1的卡片-->
      <el-col :span="12">
        <div>
          <content-card :cardName="'no1'"></content-card>
        </div>
      </el-col>
      <!--内容区1的卡片end-->

      <!--内容区2的卡片-->
      <el-col :span="12">
        <div>
          <content-card :cardName="'no2'"></content-card>
        </div>
      </el-col>
      <!--内容区2的卡片end-->

    </el-row>

    <el-row>

      <!--内容区3的卡片-->
      <el-col :span="12">
        <div>
          <content-card :cardName="'no3'"></content-card>
        </div>
      </el-col>
      <!--内容区3的卡片end-->

      <!--内容区4的卡片-->
      <el-col :span="12">
        <div>
          <content-card :cardName="'no4'"></content-card>
        </div>
      </el-col>
      <!--内容区4的卡片end-->

    </el-row>


  </div>
</template>

<script>
// @ is an alias to /src
import ContentCard from '@/components/ContentCard.vue'
export default {
  name: 'home',
  components: {
    ContentCard,
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
