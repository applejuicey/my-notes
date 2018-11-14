<template>
  <div class="content-card">

    <el-card class="box-card" shadow="always">

      <div slot="header">
        <span>{{cardName}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>

      <div>
        <note-list :noteTitleLinkArray="noteTitleLinkArray"></note-list>
      </div>

    </el-card>

  </div>
</template>

<script>
  import NoteList from '@/components/NoteList.vue'
  export default {
    name: 'content-card',
    components: {
      NoteList,
    },
    props: {
      cardName: {
        type: String,
        required: true,
      },
      noteTitleLinkArray: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {

      };
    },
    computed: {

    },
    methods: {


    },
  }
</script>

<style scoped>
  .box-card {
    margin: 5px;
  }
</style>