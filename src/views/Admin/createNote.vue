<template>
  <div class="create-note">

    <div class="editor-container">
      <el-row>

        <el-col :span="12">
          <!--<h1>https://ovenslove.github.io/vue-mdEditor/#/</h1>-->
          <div class="markdown-container">

            <h1>笔记编辑器</h1>

            <el-form ref="form" :model="noteDetail" class="markdown-editor-form">
              <el-form-item label="笔记标题:">
                <el-input v-model="noteDetail.title" placeholder="请输入笔记标题"></el-input>
              </el-form-item>
              <el-form-item label="作者:">
                <el-input v-model="noteDetail.author" placeholder="请输入笔记作者"></el-input>
              </el-form-item>
              <el-form-item label="标签:" class="tag-container" prop="tag">
                <el-input placeholder="请输入标签名称" v-model="tempTag" @keyup.enter.native="addTag" @blur="addTag">
                  <el-button slot="append" icon="el-icon-check" type="primary" @click="addTag"></el-button>
                </el-input>
                当前标签:
                <template v-for="(tag, index) in noteDetail.tags">
                  <el-tag closable @close="removeTag(tag)">{{tag}}</el-tag>&nbsp;
                </template>
              </el-form-item>
              <template v-for="(section, index) in noteDetail.noteContent">
                <el-form-item :label="'Section' + (index + 1) + '标题:'">
                  <el-input v-model="section.sectionTitle" placeholder="请输入Section标题">
                    <i slot="suffix" class="el-input__icon el-icon-plus" @click.prevent="addSection(section)"></i>
                    <i slot="suffix" class="el-input__icon el-icon-delete" @click.prevent="removeSection(section)"></i>
                  </el-input>
                </el-form-item>
                <el-form-item :label="'Section' + (index + 1) + '内容:'">
                  <el-input type="textarea" v-model="section.sectionContent" autosize placeholder="使用Markdown语法编辑Section内容"></el-input>
                </el-form-item>
              </template>

              <el-form-item>
                <el-button type="success">保存</el-button>
                <el-button type="primary" @click="submitNote">提交</el-button>
                <el-button>返回笔记管理</el-button>
              </el-form-item>
            </el-form>

          </div>
        </el-col>

        <el-col :span="12">
          <div class="preview-container">
            <h1>笔记预览</h1>
            <note-renderer :noteDetail="noteDetail"></note-renderer>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
  import NoteRenderer from '@/components/note-components/NoteRenderer.vue';
  export default {
    name: 'admin-create-note',
    components: {
      NoteRenderer,
    },
    data () {
      return {

        // 用于存储整个笔记的数据
        noteDetail: {
          title: '',
          author: '',
          tags: [],
          noteContent: [
            {
              sectionTitle: '## ',
              sectionContent: '',
            },
          ],
        },
        // 用于存储用户当前输入的标签
        tempTag: '',

      }
    },
    computed : {

    },
    mounted () {


    },
    methods: {

      // 为笔记增加一个标签
      addTag: function () {
        let this_vm = this;
        // 不允许为空
        if (this_vm.tempTag === '') {
          this_vm.$message({
            showClose: true,
            message: '请输入合法的标签名称' ,
            type: 'error',
          });
          return;
        }
        // 在已经添加的标签中查找有无重复，没有则添加
        if (this_vm.noteDetail.tags.indexOf(this_vm.tempTag) === -1) {
          // index不存在，即无重复，则添加
          this_vm.noteDetail.tags.push(this_vm.tempTag);
          // 添加后清空tempTag
          this_vm.tempTag = '';
          this_vm.$message({
            showClose: true,
            message: '成功添加了"' + this_vm.tempTag + '"的标签' ,
            type: 'success',
          });
        } else {
          // 有重复
          this_vm.$message({
            showClose: true,
            message: '已经添加过"' + this_vm.tempTag + '"的标签' ,
            type: 'error',
          });
        }
      },

      // 为笔记删除一个标签
      removeTag: function (tag) {
        let this_vm = this;
        // 获取当前点击的tag的index
        let tagIndex = this_vm.noteDetail.tags.indexOf(tag);
        if (tagIndex !== -1) {
          // 从找到的那个位置开始，删除一个元素
          let deletedElementsArray = this_vm.noteDetail.tags.splice(tagIndex, 1);
          this_vm.$message({
            showClose: true,
            message: '成功删除标签"' + deletedElementsArray[0] + '"！' ,
            type: 'success',
          });
        }
      },

      // 为笔记增加一个section
      addSection: function (section) {
        let this_vm = this;
        // 获取当前点击的section的index
        let sectionIndex = this_vm.noteDetail.noteContent.indexOf(section) + 1;
        if (sectionIndex !== -1) {
          // 从找到的那个位置开始，在其下方增加一个元素
          this_vm.noteDetail.noteContent.splice(sectionIndex, 0, {
            sectionTitle: '## ',
            sectionContent: '',
            key: Date.now(),
          });
          this_vm.$message({
            showClose: true,
            message: '成功在标题为"' + section.sectionTitle + '"的Section之后新增一个Section！' ,
            type: 'success',
          });
        }
      },

      // 为笔记删除某个section
      removeSection(section) {
        let this_vm = this;
        // 判断noteContent里面有没有section，如果只有一个，不允许删除
        if (this_vm.noteDetail.noteContent.length === 1) {
          this_vm.$message({
            showClose: true,
            message: '笔记中不能少于一个Section，删除失败！',
            type: 'error',
          });
          return;
        }
        // 防止误删：判断当前点击的section里是否有内容
        if (section.sectionContent !=='') {
          this_vm.$confirm('该section中有内容，请确认是否删除！', '接下来你是不是要删我了', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 获取当前点击的section的index
            let sectionIndex = this_vm.noteDetail.noteContent.indexOf(section);
            if (sectionIndex !== -1) {
              // 从找到的那个位置开始，删除一个元素
              let deletedElementsArray = this_vm.noteDetail.noteContent.splice(sectionIndex, 1);
              this_vm.$message({
                showClose: true,
                message: '成功删除标题为"' + deletedElementsArray[0].sectionTitle + '"的Section！' ,
                type: 'success',
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          // 获取当前点击的section的index
          let sectionIndex = this_vm.noteDetail.noteContent.indexOf(section);
          if (sectionIndex !== -1) {
            // 从找到的那个位置开始，删除一个元素
            let deletedElementsArray = this_vm.noteDetail.noteContent.splice(sectionIndex, 1);
            this_vm.$message({
              showClose: true,
              message: '成功删除标题为"' + deletedElementsArray[0].sectionTitle + '"的Section！' ,
              type: 'success',
            });
          }
        }
      },

      // 提交笔记
      submitNote: function () {
        let this_vm = this;
        console.log(this_vm.noteDetail);
        this_vm.$message({
          showClose: true,
          message: '成功提交一篇笔记！（暂时保存在console中，请手动复制！copy(temp1)）' ,
          type: 'success',
        });
      },

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
  .markdown-editor-form {
    margin: 10px 10px 0 10px;
  }
  .tag-container {
    text-align: left;
  }
  .preview-container {
    height: 88vh;
    overflow-y: scroll;
  }
  .preview-container h1 {
    margin: 5px 0 5px 0;
    font-weight: lighter;
    font-size: xx-large;
  }
</style>