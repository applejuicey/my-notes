<template>
  <div class="notes-management">
    admin-note-management
    管理所有笔记
    <content-card :cardName="'no3'" :noteTitleLinkArray="noteTitleLinks.type1"></content-card>
  </div>
</template>

<script>
  import ContentCard from '@/components/ContentCard.vue';
  export default {
    name: 'home',
    components: {
      ContentCard,
    },
    data() {
      return {

        noteTitleLinks: {}, // 存放从服务器拉取到的笔记标题连接的信息，包含4个类型
        loadingsArray: [],  //存储loadings的数组

      };
    },
    mounted () {

      let this_vm = this;

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

      // 拉取笔记标题连接的信息
      getNoteTitleLinkArray() {
        let this_vm = this;
        let axiosResult = this_vm.axios({
          method: 'get',
          url: 'https://easy-mock.com/mock/5bebe7bc3e54131e11d49398/mynotesdev/api/getType1NoteTitleLinkArray'
        }).then(function (response) {
          console.log(response);
          this_vm.noteTitleLinks = response.data.data.noteTitleLinkArray;
          this_vm.$notify({
            title: '成功',
            message: '成功从服务器获取笔记标题信息',
            type: 'success'
          });
          return true;
        }).catch(function (error) {
          console.log(error);
          this_vm.$notify({
            title: '失败',
            message: '从服务器获取笔记标题信息失败，原因为:' + error,
            type: 'error'
          });
          return false;
        });

        // 拉取结束后关闭loading遮罩
        setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            this_vm.loadingsArray[i].close();
          }
        }, 1000);
      },

    },
  }
</script>

<style scoped>

</style>