<template>
  <div class="edit-note">

    <div class="editor-container">
      <el-row>

        <el-col :span="12">
          <div class="markdown-container">

            <h1>编辑笔记{{this.$route.params.noteid}}</h1>

          </div>
        </el-col>

        <el-col :span="12">
          <div class="preview-container">
            <h1>笔记预览</h1>
            <note-renderer :noteID="noteID"></note-renderer>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
  import { OpenOrCreateAnIndexedDB, getARecordThroughKey } from '@/config/indexedDB/indexedDB.js';
  import NoteRenderer from '@/components/note-display-components/NoteRenderer.vue';
  export default {
    name: 'admin-edit-note',
    components: {
      NoteRenderer,
    },
    data() {
      return {
        input: 1,
        noteID: this.$route.params.noteid,
      };
    },
    watch: {

    },
    mounted () {

      // 根据route中ID判断笔记是来自于服务器的还是来自于浏览器数据库的
      // 如果是来自于浏览器数据库的，直接通过数据库操作方法获取，保存到data里，编辑完成后可以暂存，也可以提交
      // 如果是来自于服务器的，先保存下来到data里，编辑完成后可以暂存，也可以提交


    },
    methods: {


    },
  }
</script>

<style scoped>
  .editor-container {
    height: 88vh;
  }
  .markdown-container {
    height: 88vh;
    overflow-y: scroll;
  }
  .markdown-container h1 {
    margin: 5px 0 5px 0;
    font-weight: lighter;
    font-size: xx-large;
  }
  .preview-container {
    height: 88vh;
  }
  .preview-container h1 {
    margin: 5px 0 5px 0;
    font-weight: lighter;
    font-size: xx-large;
  }
</style>