<template>
  <div class="note-display">

    <el-row>
      <el-col :span="24">

        <!--顶部工具栏-->
        <div class="top-tool-bar-container">
          <el-form :inline="true" :model="topToolBar" class="demo-form-inline">
            <el-form-item label="左侧导航">
              <el-switch v-model="topToolBar.leftCatalogNavStatus"></el-switch>
            </el-form-item>
            <el-form-item label="右侧广告">
              <el-switch v-model="topToolBar.rightColumnStatus"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <!--顶部工具栏end-->

      </el-col>
    </el-row>

    <el-row>

      <!--当左侧导航栏需要展开（leftCatalogNavStatus为true）时渲染:-->
      <div v-if="topToolBar.leftCatalogNavStatus" class="content-container-open">

        <!--左侧导航栏-->
        <el-col :span="6">
          <div class="content-left-nav-container">
            <left-catalog-nav></left-catalog-nav>
          </div>
        </el-col>
        <!--左侧导航栏end-->

        <!--笔记内容区-->
        <el-col :span="18">
          <div class="content-note-renderer-container">
            <h1>This is a note display page</h1>
            <div v-if="checkNoteID">
              you are reading note: id={{ $route.params.noteid}}
              <note-renderer :noteDetail="noteDetail"></note-renderer>
            </div>
            <div v-else>
              you have entered an error ID
            </div>
          </div>
        </el-col>
        <!--笔记内容区end-->

      </div>

      <!--当左侧导航栏需要关闭（leftCatalogNavStatus为false）时渲染:-->
      <div v-else class="content-container-closed">

        <!--笔记内容区-->
        <el-col :span="24">
          <div>
            <h1>This is a note display page</h1>
            <div v-if="checkNoteID">
              you are reading note: id={{ $route.params.noteid}}
              <note-renderer :noteDetail="noteDetail"></note-renderer>
            </div>
            <div v-else>
              you have entered an error ID
            </div>
          </div>
        </el-col>
        <!--笔记内容区end-->

      </div>

    </el-row>

  </div>
</template>

<script>
  import LeftCatalogNav from '@/components/note-components/LeftCatalogNav.vue';
  import NoteRenderer from '@/components/note-components/NoteRenderer.vue';
  export default {
    name: 'note-display',
    components: {
      LeftCatalogNav,
      NoteRenderer,
    },
    data () {
      return {

        topToolBar: {
          leftCatalogNavStatus: false,  //左侧导航栏状态，默认收起
          rightColumnStatus: false, //左侧栏状态，默认收起
        },
        noteDetail: {
          title: 'Vue2.0学习——axios用法详解',
          publishTime: '2018年05月16日 16:16:02',
          author: '啦啦啦987321',
          clickedCounter: '2604',
          tag: 'Vue axios',
          noteContent: [
            {
              sectionTitle: `
快速?参  考
========================`,
              sectionContent: `This guide is a very brief overview, with examples, of the syntax that [Markdown] supports.  It is itself written in Markdown and you can copy the samples over to the left-hand pane for experimentation.  It's shown as *text* and not *rendered HTML*.

[Markdown]: http://daringfireball.net/projects/markdown/`,
            },
            {
              sectionTitle:  `Simple Text Formatting
======================`,
              sectionContent: `First thing is first.  You can use *stars* or _underscores_ for italics.  **Double stars** and __double underscores__ do bold.  ***Three together*** do ___both___.

Paragraphs are pretty easy too.  Just have a blank line between chunks of text.

> This chunk of text is in a block quote.  Its multiple lines will all be
> indended a bit from the rest of the text.
>
> > Multiple levels of block quotes also work.

Sometimes you want to include some code, such as when you are explaining how \`<h1>\` HTML tags work, or maybe you are a programmer and you are discussing \`someMethod()\`.

If you want to include some code and have
newlines preserved, indent the line with a tab
or at least four spaces.
    Extra spaces work here too.
This is also called preformatted text and it is useful for showing examples.
The text will stay as text, so any *markdown* or <u>HTML</u> you add will
not show up formatted.  This way you can show markdown examples in a
markdown document.

>     You can also use preformatted text with your blockquotes
>     as long as you add at least five spaces.`,
            },
            {
              sectionTitle:  `Headings
========`,
              sectionContent: `There are a couple of ways to make headings.  Using three or more equals signs on a line under a heading makes it into an "h1" style.  Three or more hyphens under a line makes it "h2" (slightly smaller).  You can also use multiple pound symbols before and after a heading.  Pounds after the title are ignored.  Here's some examples:

This is H1
==========

This is H2
----------

# This is H1
## This is H2
### This is H3 with some extra pounds ###
#### You get the idea ####
##### I don't need extra pounds at the end
###### H6 is the max`,
            },
            {
              sectionTitle:  `Links
=====`,
              sectionContent: `Let's link to a few sites.  First, let's use the bare URL, like <http://www.github.com>.  Great for text, but ugly for HTML.
Next is an inline link to [Google](http://www.google.com).  A little nicer.
This is a reference-style link to [Wikipedia] [1].
Lastly, here's a pretty link to [Yahoo].  The reference-style and pretty links both automatically use the links defined below, but they could be defined *anywhere* in the markdown and are removed from the HTML.  The names are also case insensitive, so you can use [YaHoO] and have it link properly.

[1]: http://www.wikipedia.org/
[Yahoo]: http://www.yahoo.com/

Title attributes may be added to links by adding text after a link.
This is the [inline link](http://www.bing.com "Bing") with a "Bing" title.
You can also go to [W3C] [2] and maybe visit a [friend].

[2]: http://w3c.org (The W3C puts out specs for web-based things)
[Friend]: http://facebook.com/ "Facebook!"

Email addresses in plain text are not linked: test@example.com.
Email addresses wrapped in angle brackets are linked: <test@example.com>.
They are also obfuscated so that email harvesting spam robots hopefully won't get them.`,
            },
            {
              sectionTitle:  `Lists
=====`,
              sectionContent: `* This is a bulleted list
* Great for shopping lists
- You can also use hyphens
+ Or plus symbols

The above is an "unordered" list.  Now, on for a bit of order.

1. Numbered lists are also easy
2. Just start with a number
3738762. However, the actual number doesn't matter when converted to HTML.
1.  This will still show up as 4.

You might want a few advanced lists:

- This top-level list is wrapped in paragraph tags
- This generates an extra space between each top-level item.

- You do it by adding a blank line

- This nested list also has blank lines between the list items.

- How to create nested lists
1.  Start your regular list
2.  Indent nested lists with four spaces
3.  Further nesting means you should indent with four more spaces
    * This line is indented with eight spaces.

- List items can be quite lengthy.  You can keep typing and either continue
them on the next line with no indentation.

- Alternately, if that looks ugly, you can also
indent the next line a bit for a prettier look.

- You can put large blocks of text in your list by just indenting with four spaces.

This is formatted the same as code, but you can inspect the HTML
and find that it's just wrapped in a \`<p>\` tag and *won't* be shown
as preformatted text.

You can keep adding more and more paragraphs to a single
list item by adding the traditional blank line and then keep
on indenting the paragraphs with four spaces.  You really need
to only indent the first line, but that looks ugly.

- Lists support blockquotes

> Just like this example here.  By the way, you can
> nest lists inside blockquotes!
> - Fantastic!

- Lists support preformatted text

    You just need to indent eight spaces.`,
            },
            {
              sectionTitle:  `Even More
=========`,
              sectionContent: `Horizontal Rule
---------------

If you need a horizontal rule you just need to put at least three hyphens, asterisks, or underscores on a line by themselves.  You can also even put spaces between the characters.

---
****************************
_ _ _ _ _ _ _

Those three all produced horizontal lines.  Keep in mind that three hyphens under any text turns that text into a heading, so add a blank like if you use hyphens.

Images
------

Images work exactly like links, but they have exclamation points in front.  They work with references and titles too.

![Google Logo](http://www.google.com/images/errors/logo_sm.gif) and ![Happy].

[Happy]: http://www.wpclipart.com/smiley/simple_smiley/smiley_face_simple_green_small.png ("Smiley face")


Inline HTML
-----------

If markdown is too limiting, you can just insert your own <strike>crazy</strike> HTML.  Span-level HTML <u>can *still* use markdown</u>.  Block level elements must be separated from text by a blank line and must not have any spaces before the opening and closing HTML.

<div style='font-family: "Comic Sans", sans-serif;'>
It is a pity, but markdown does **not** work in here for most markdown parsers.  [Marked] handles it pretty well.
</div>
`,
            },

          ],
        },
      }
    },
    computed : {

      checkNoteID: function () {
        if (isNaN(this.$route.params.noteid)) {
          // 传入的noteid不是数字
          return false;
        } else {
          // 传入的noteid没问题
          return true;
        }
      },

    },
    mounted: function () {

      // 挂载时设置导航栏索引
      this.setTopNavActiveIndex();

    },
    methods: {

      // 设置顶部导航栏索引，笔记展示页为3
      setTopNavActiveIndex: function () {
        let this_vm = this;
        this_vm.$store.dispatch('setTopNavActiveIndex', '3');
      },

    },
  }
</script>

<style scoped>
  .note-display {
    height: inherit;
  }
  .top-tool-bar-container {
    text-align: left;
  }
  .content-container-closed {
    overflow-y: scroll;
    height: 70vh;
  }
  .content-left-nav-container {
    text-align: left;
  }
  .content-note-renderer-container {
    overflow-y: scroll;
    height: 70vh;
  }
</style>