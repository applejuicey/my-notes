import Vue from 'vue';
import marked from 'marked';

// 自定义renderer
let renderer = new marked.Renderer();
// 为heading的ID设置一个计数器，目的是生成唯一的ID
let counter = 0;
// 自定义heading的渲染
renderer.heading = function (text, level) {
  // let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  counter = counter + 1;
  // // 根据level的不同，返回不同的ID和CLASS
  // switch(level)
  // {
  //   case 1:
  //     // 只有笔记的标题才能使用H1
  //     return `<h${level} id="noteTitle${counter}" class="noteTitle">${text}</h${level}>`;
  //   case 2:
  //     // 只有每个section的标题才能使用H2
  //     return `<h${level} id="sectionTitle${counter}" class="sectionTitle">${text}</h${level}>`;
  //   default:
  //     // 其余的情况以后再添加
  //     return `<h${level} id="heading${counter}" class="headingLevel${level}">${text}</h${level}>`;
  // }
  return `<h${level} id="markedJSHeading${counter}" class="markedJSHeadingLevel${level}">${text}</h${level}>`;
};

// 配置部分全局选项设置
let markedJSOptions = {
  renderer: renderer,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
};

// 载入上述全局选项设置
marked.setOptions(markedJSOptions);

// 全局注册marked
Vue.prototype.marked = marked;