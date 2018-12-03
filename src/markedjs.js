import Vue from 'vue';
import marked from 'marked';

// 自定义renderer
let renderer = new marked.Renderer();
// 为heading的ID设置一个计数器
let counter = 0;
// console.log('set counter!:', counter);
// 自定义heading的渲染
renderer.heading = function (text, level) {
  // let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  // console.log('use counter:', counter);
  counter = counter + 1;
  return `<h${level} id="heading${counter}" class="headingLevel${level}">${text}</h${level}>`;
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