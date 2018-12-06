<!--接受一个noteDetail对象，将其渲染为笔记-->
<!--调用该组件时，其父级元素需要设置一个height，该组件才能显示纵向滚动条-->
<template>
  <div class="note-renderer">

    <!--笔记Header-->
    <el-row class="note-header">
      <el-col :span="24">

        <!--笔记标题-->
        <el-row class="note-header-title">
          <el-col :span="24">
            <h1>{{noteDetail.title}}</h1>
          </el-col>
        </el-row>
        <!--笔记标题-->

        <!--笔记相关信息-->
        <el-row class="note-header-briefInfo">
          <el-col :span="6">
            发布时间:&nbsp;
            <span>{{noteDetail.publishTime}}</span>
          </el-col>
          <el-col :span="6">
            作者:&nbsp;
            <span>{{noteDetail.author}}</span>
          </el-col>
          <el-col :span="6">
            阅读量:&nbsp;
            <span>{{noteDetail.clickedCounter}}</span>
          </el-col>
          <el-col :span="6">
            标签:&nbsp;
            <template v-for="(tag, index) in noteDetail.tags">
              <el-tag size="mini">{{tag}}</el-tag>&nbsp;
            </template>
          </el-col>
        </el-row>
        <!--笔记相关信息-->

      </el-col>
    </el-row>
    <!--笔记Header-->

    <!--笔记body-->
    <el-row class="note-body">
      <el-col :span="24">

        <template v-for="(section, index) in noteDetail.noteContent">
          <el-row class="noteSectionRow" :id="'sectionRowNumber' + (index + 1)">
            <el-col :span="24">
              <div class="sectionTitle">
                <div class="sectionNumber">Section {{index + 1}}:</div>
                <div class="sectionHeading" v-html="convertMarkdownToHTML(section.sectionTitle)"></div>
              </div>
              <div v-html="convertMarkdownToHTML(section.sectionContent)" class="sectionContent"></div>
            </el-col>
          </el-row>
        </template>

      </el-col>
    </el-row>
    <!--笔记body-->

  </div>
</template>

<script>
  export default {
    name: 'note-renderer',
    components: {

    },
    props: {
      noteDetail: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {

      };
    },
    computed : {



    },
    mounted () {

      let this_vm = this;

      // 组件挂载时执行：


      // 在DOM更新之后执行：
      this_vm.$nextTick(() => {

        // 在视图更新之后，获取所有class="sectionHeading"元素的textContent，组装成数组，使用vuex存储，供左侧导航栏使用
        let sectionHeadingElementsArray = document.getElementsByClassName('sectionHeading');
        let sectionHeadingsArray = [];
        for (let i = 0; i < sectionHeadingElementsArray.length; i++) {
          sectionHeadingsArray.push({
            // 用于保存section的标题
            sectionHeadingText: sectionHeadingElementsArray[i].textContent,
            // 用于保存滚动的锚点元素
            sectionRowNumber: i + 1,
          });
        }
        this_vm.setSectionHeadingsArray(sectionHeadingsArray);

      });

    },
    methods: {

      // 将markdown语法转换为HTML
      convertMarkdownToHTML: function (markdownString) {
        let this_vm = this;
        return this_vm.marked(markdownString);
      },

      // 在DOM更新后将所有section的title存储到vuex中
      setSectionHeadingsArray: function (array) {
        let this_vm = this;
        this_vm.$store.dispatch('setSectionHeadingsArray', array);
      },

    },
  }
</script>

<style scoped>
  .note-renderer {
    overflow-y: scroll;
    overflow-x: hidden;
    height: inherit;
    text-align: left;
    margin: 10px 0 0 5px;
  }
  .note-header-title h1{
    text-align: center;
    font-weight: 900;
  }
  .note-header-briefInfo {
    margin: 0 10px 10px 10px;
    text-align: center;
  }
  .noteSectionRow {
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    padding: 10px;
    margin: 7px 0 7px 0;
  }
  .sectionNumber {
    font-weight: lighter;
    font-size: larger;
  }
  .sectionHeading >>> .markedJSHeadingLevel2 {
    text-align: center;
  }
  .sectionContent >>> img {
    max-width: 100%;
  }
  .sectionContent >>> pre {
    overflow: scroll;
  }
</style>