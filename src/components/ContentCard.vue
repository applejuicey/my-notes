<!--接受cardName作为卡片名称，接受category作为卡片中笔记的分类从服务器拉取数据，渲染出笔记的连接-->
<template>
  <div class="content-card">

    <el-card class="box-card" shadow="always" :id="'cardNo' + uniqueIdentifier">

      <div slot="header">
        <span>{{cardName}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>

      <!--body的唯一ID用于Loading的target-->
      <div :id="'cardNo' + uniqueIdentifier + 'Body'" class="card-body-container">
        <template v-for="(noteTitleItem, index) in noteTitleLinkArray">
          <div class="note-title-container">
            <router-link :to="{name: 'noteDisplay', params: { noteid: noteTitleItem.noteID }}" tag="span" class="note-title-link">
              {{noteTitleItem.noteTitle}}
            </router-link>
          </div>
        </template>
      </div>

    </el-card>

  </div>
</template>

<script>
  import { contentCardAPIService } from '@/api/serviceList.js';
  export default {
    name: 'content-card',
    components: {

    },
    props: {
      cardName: {
        type: String,
        required: true,
      },
      // 用category来从服务器拉取数据
      category: {
        type: String,
        required: true,
      },
    },
    data() {
      return {

        // noteTitleLinkArray用来保存从服务器拉取到的数据
        noteTitleLinkArray: [],
        // uniqueIdentifier用来为每个card生成唯一的ID
        uniqueIdentifier: new Date().getTime(),

      };
    },
    created () {

    },
    mounted () {

      let this_vm = this;

      // 挂载时获取一个Loading的实例
      let contentCardLoading = this.$loading({
        lock: true,
        text: '正在获取笔记标题......',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 191, 255, 0.05)',
        // 以ID的方式定位loading
        target: document.querySelector('#cardNo' + this_vm.uniqueIdentifier + 'Body'),
      });

      // 挂载时调用API，并且传入Loading的实例用以关闭
      this_vm.contentCardAPIService(contentCardLoading);

    },
    computed: {


    },
    methods: {

      // 根据父组件传来的category调用API；调用成功或失败都会关闭loading
      contentCardAPIService: function (loading) {
        let this_vm = this;
        // 将category传入contentCardAPIService，获取一个promise
        contentCardAPIService(this_vm.category).then(response => {
          // 得到response后，模拟网络延迟3S
          setTimeout(() => {
            console.log(response);
            this_vm.noteTitleLinkArray = response.data.data.noteTitleLinkArray;
            loading.close();  //关闭传入的loading
          }, 3000);
        }).catch(error => {
          // 得到error后，模拟网络延迟2S
          setTimeout(() => {
            console.log(error);
            loading.close();  //关闭传入的loading
            this_vm.$message({
              message: '从服务器拉取信息失败！错误原因：' + error.message,
              type: 'error',
              duration: 2000,
              showClose: true,
            });
          }, 2000);
        });
      },

    },
  }
</script>

<style scoped>
  .box-card {
    margin: 5px;
  }
  .card-body-container {
    min-height: 40vh;
  }
  .note-title-container {
    text-align: left;
    margin: 4px 0;
  }
  .note-title-link {
    cursor: pointer;
  }
  .note-title-link:hover {
    background-color: #AFEEEE;
  }
</style>