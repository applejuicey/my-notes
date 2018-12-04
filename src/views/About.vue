<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="editor-container">
      <el-row>

        <el-col :span="10">
          <div>
            <h1>markdown</h1>
            <h1>https://ovenslove.github.io/vue-mdEditor/#/</h1>
            <label>
              <textarea v-model="markdownInput" cols="100" rows="50"></textarea>
            </label>
          </div>
        </el-col>

        <el-col :span="10">
          <div>
            <h1>preview</h1>
            <div id="previewSection" v-html="compiledMarkdown"></div>
          </div>
        </el-col>

        <el-col :span="4">
          <div>
            <h1>add annotation</h1>
            <div>
              <button @click="loadAnnotationSpans">加载</button>
              <ul v-for="(item, index) in annotationSpansArray">
                <li>
                  {{index}} {{item.innerText}}
                </li>
              </ul>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        markdownInput: '[白痴](是一种傻逼 "annotation")\n' +
            '## header2\n' +
            '[白痴1](是一种傻逼1 "annotation")\n' +
            '[白痴2](是一种傻逼2 "annotation")\n' +
            '#### header4\n' +
            '[白痴3](是一种傻逼3 "annotation")\n' +
            '[白痴4](是一种傻逼4 "annotion")',
        // 用于保存marked.js的选项：
        markedJSOptions: {
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false,
        },
        // 用于保存所有注释:
        annotations: [
          {
            host: 'no1',
            content: 'no1 de word',
          },
          {
            host: 'no2',
            content: 'no2 de word',
          },
          {
            host: 'no3',
            content: 'no3 de word',
          },
          {
            host: 'no4',
            content: 'no4 de word',
          },
        ],
        // 用于保存所有的有注释的span对应的元素
        annotationSpansArray: [],
        // 用于保存在preview中显示的HTML
        previewHTML: '',
        // 用于保存最终存入数据库以及显示在页面上的HTML
        finalHTML: '',
      }
    },
    computed : {

      // 将markdown语法使用marked.js转换为HTML
      compiledMarkdown: function () {
        let this_vm = this;
        // 引入Marked.js
        let marked = require('marked');
        // 载入部分选项设置
        marked.setOptions(this_vm.markedJSOptions);

        // 自定义renderer
        let renderer = new marked.Renderer();
        // 自定义link
        renderer.link = function (href, title, text) {
          let className = 'annotation';
          // 判断这个是注释还是正常的title
          if (title === 'annotation') {
            // 当用户传入的title为annotation时，判断为注释
            return `
              <span class="${className}"><b>${text}</b></span>
            `;
          } else {
            // 正常的title
            return `
            <a href="${href}" title="${title}">${text}</a>
            `;
          }
        };

        // 将markdown语法使用marked.js转换为HTML
        let result = marked(this_vm.markdownInput, { renderer: renderer });
        this_vm.previewHTML = result;
        return result;
      },

    },
    mounted () {

      // 挂载时设置导航栏索引
      this.setTopNavActiveIndex();

      // DOM加载完成后为每个有注释的span添加一个click事件
      // let this_vm = this;
      // this_vm.$nextTick(() => {
      //
      //   for (let i = 0; i < this_vm.noteDetail.annotations.length; i++) {
      //     let annotationObject = {
      //       spanID: 'annotation' + (i + 1), //生成有注释的那个span的ID
      //       annotationHost: this_vm.noteDetail.annotations[i].annotationHost,
      //       annotationContent: this_vm.noteDetail.annotations[i].annotationContent,
      //     };
      //     // 为每一个有注释的span添加click事件
      //     document.getElementById(annotationObject.spanID).addEventListener('click', this_vm.displayAnnotation.bind(annotationObject, annotationObject));
      //   }
      //
      // });

    },
    methods: {

      // 设置顶部导航栏索引，关于页为2
      setTopNavActiveIndex: function () {
        let this_vm = this;
        this_vm.$store.dispatch('setTopNavActiveIndex', '2');
      },

      // 显示注释
      showAnnotation() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      // 加载preview中所有带有注释的span
      loadAnnotationSpans: function () {
        let this_vm = this;
        let annotationSpansArray = document.getElementsByClassName('annotation');
        this_vm.annotationSpansArray = annotationSpansArray;
        console.log(this_vm.annotationSpansArray);
      },

    },
  }
</script>

<style scoped>
  .editor-container {
    overflow-y: scroll;
    height: 60vh;
  }
</style>