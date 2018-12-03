<template>
  <div class="note-list">

    <template v-for="noteTitleItem in noteTitleLinkArray">
      <div class="note-title-container">
        <router-link :to="{name: 'noteDisplay', params: { noteid: noteTitleItem.noteID }}" tag="span" class="note-title-link">
          {{noteTitleItem.noteTitle}}
        </router-link>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'note-list',
    props: {
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
    mounted () {

    },
    methods: {

    },
  }
</script>

<style scoped>
  .note-list {
    text-align: left;
  }
  .note-title-container {
    margin: 4px 0;
  }
  .note-title-link {
    cursor: pointer;
  }
  .note-title-link:hover {
    background-color: #AFEEEE;
  }
</style>