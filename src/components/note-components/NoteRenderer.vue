<template>
  <div class="note-renderer">

    i am a note renderer
    <el-row class="note-header">
      <el-col :span="24">

        <el-row class="note-header-title">
          <el-col :span="24">
            <h1>{{noteDetail.title}}</h1>
          </el-col>
        </el-row>

        <el-row class="note-header-briefInfo">
          <el-col :span="24">
            <div>{{noteDetail.publishTime}}</div>
            <div>{{noteDetail.author}}</div>
            <div>{{noteDetail.clickedCounter}}</div>
            <div>{{noteDetail.tag}}</div>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

    <el-row class="note-body">
      <el-col :span="24">

        <template v-for="(section, index) in noteDetail.noteContent">
          <el-row class="note-section">

            <!--笔记内容区-->
            <el-col :span="18" class="note-section-left">
              <h2 class="note-section-title">{{section.sectionTitle}}</h2>
              <div class="note-section-content">{{section.sectionContent}}</div>
            </el-col>
            <!--笔记内容区end-->

            <!--右侧区域-->
            <el-col :span="6" class="note-section-right">
              <div>{{index}}</div>
              <div>{{section.sectionAnnotation}}</div>
            </el-col>
            <!--右侧区域end-->

          </el-row>
        </template>

      </el-col>
    </el-row>



  </div>
</template>

<script>
  export default {
    name: 'note-renderer',
    components: {

    },
    data() {
      return {

        noteDetail: {
          title: 'Vue2.0学习——axios用法详解',
          publishTime: '2018年05月16日 16:16:02',
          author: '啦啦啦987321',
          clickedCounter: '2604',
          tag: 'Vue axios',
          noteContent: [
            {
              sectionTitle: '',
              sectionContent: '原来vue更新到2.0之后,尤大就宣告不再对vue-resource更新,而是推荐的axios。在github上，41503个start，而vue-resource只有8000个，看来群众的眼睛是雪亮的，尤大的眼睛也是雪亮的。下面记录一下axios的使用。\n' +
                  '\n' +
                  'github 地址：https://github.com/mzabriskie/axios\n',
              sectionAnnotation: 'asdhfuhilubrsdagar',
            },
            {
              sectionTitle: '功能特性',
              sectionContent: '在浏览器中发送 XMLHttpRequests 请求',
              sectionAnnotation: '45789789gdfgfg',
            },
            {
              sectionTitle: '浏览器支持',
              sectionContent: '客户端支持保护安全免受 XSRF 攻击',
              sectionAnnotation: 'kjclxvbio7863478bv',
            },
            {
              sectionTitle: '浏览器支持',
              sectionContent: '客户端支持保护安全免受 XSRF 攻击',
              sectionAnnotation: 'kjclxvbio7863478bv',
            },
            {
              sectionTitle: '浏览器支持',
              sectionContent: '客户端支持保护安全免受 XSRF 攻击',
              sectionAnnotation: 'kjclxvbio7863478bv',
            },
            {
              sectionTitle: '浏览器支持',
              sectionContent: '客户端支持保护安全免受 XSRF 攻击',
              sectionAnnotation: 'kjclxvbio7863478bv',
            },
            {
              sectionTitle: '浏览器支持',
              sectionContent: '客户端支持保护安全免受 XSRF 攻击',
              sectionAnnotation: 'kjclxvbio7863478bv',
            },
          ],
        },

      };
    },
    computed : {


    },
    mounted: function () {


    },
    methods: {


    },
  }
</script>

<style scoped>

</style>