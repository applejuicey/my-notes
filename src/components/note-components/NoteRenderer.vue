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
          <el-col :span="24">
            <div>{{noteDetail.publishTime}}</div>
            <div>{{noteDetail.author}}</div>
            <div>{{noteDetail.clickedCounter}}</div>
            <div>{{noteDetail.tag}}</div>
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
          <el-row>
            <el-col :span="24">
              <div v-html="convertMarkdownToHTML(section.sectionTitle)" class="sectionTitle"></div>
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

        // 在视图更新之后，获取所有class="sectionTitle"元素的textContent，组装成数组，使用vuex存储，供左侧导航栏使用
        let sectionTitleElementsArray = document.getElementsByClassName('sectionTitle');
        console.log(sectionTitleElementsArray);
        let sectionTitlesArray = [];
        for (let i = 0; i < sectionTitleElementsArray.length; i++) {
          console.log(sectionTitleElementsArray[i].children[0].id);
          console.log(sectionTitleElementsArray[i].textContent);
          sectionTitlesArray.push({
            sectionTitleText: sectionTitleElementsArray[i].textContent,
            sectionTitleID: sectionTitleElementsArray[i].children[0].id,
          });
        }
        this_vm.setSectionTitlesArray(sectionTitlesArray);
      });

    },
    methods: {

      // 将markdown语法转换为HTML
      convertMarkdownToHTML: function (markdownString) {
        let this_vm = this;
        return this_vm.marked(markdownString);
      },

      // 在DOM更新后将所有section的title存储到vuex中
      setSectionTitlesArray: function (array) {
        let this_vm = this;
        this_vm.$store.dispatch('setSectionTitlesArray', array);
      },

    },
  }
</script>

<style scoped>

</style>