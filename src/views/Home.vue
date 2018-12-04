<template>
  <div class="home">

    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>this is home</h1>

    <el-row>

      <!--内容区1的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'no1'" :noteTitleLinkArray="noteTitleLinkArray.type1"></content-card>
        </div>
      </el-col>
      <!--内容区1的卡片end-->

      <!--内容区2的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'no2'" :noteTitleLinkArray="noteTitleLinkArray.type2"></content-card>
        </div>
      </el-col>
      <!--内容区2的卡片end-->

    </el-row>

    <el-row>

      <!--内容区3的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'no3'" :noteTitleLinkArray="noteTitleLinkArray.type3"></content-card>
        </div>
      </el-col>
      <!--内容区3的卡片end-->

      <!--内容区4的卡片-->
      <el-col :span="12">
        <div class="card-container">
          <content-card :cardName="'no4'" :noteTitleLinkArray="noteTitleLinkArray.type4"></content-card>
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
  data() {
    return {

      noteTitleLinkArray: {
        type1: [],
        type2: [],
        type3: [],
        type4: [],
      }, // 存放从服务器拉取到的笔记标题连接的信息，包含4个类型
      loadingsArray: [],  //存储loadings的数组

    };
  },
  mounted () {

    let this_vm = this;

    // 挂载时设置导航栏索引
    this_vm.setTopNavActiveIndex();

    // 挂载时为每个card获取一个loading实例
    for (let i = 0; i < 4; i++) {
      this_vm.loadingsArray[i] = this_vm.$loading({
        target: document.querySelectorAll('.card-container')[i],
        lock: true,
      });
    }

    // 挂载时拉取笔记标题连接的信息
    this_vm.getNoteTitleLinkArray();

  },
  methods: {

    // 设置顶部导航栏索引，主页为1
    setTopNavActiveIndex: function () {
      let this_vm = this;
      this_vm.$store.dispatch('setTopNavActiveIndex', '1');
    },

    // 拉取笔记标题连接的信息
    getNoteTitleLinkArray() {
      let this_vm = this;
      this_vm.axios({
        method: 'get',
        url: 'https://easy-mock.com/mock/5bebe7bc3e54131e11d49398/mynotesdev/api/getType1NoteTitleLinkArray'
      }).then(function (response) {
        console.log(response);
        this_vm.noteTitleLinkArray = response.data.data.noteTitleLinkArray;
        // 拉取并存储成功后关闭loading遮罩
        setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            this_vm.loadingsArray[i].close();
          }
        }, 1000);
      }).catch(function (error) {
        console.log(error)
      })
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