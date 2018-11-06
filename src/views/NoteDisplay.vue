<template>
  <div class="note-display">
    <h1>This is a note display page</h1>
    <div v-if="checkNoteID">
      you are reading note: id={{ $route.params.noteid}}
    </div>
    <div v-else>
      you have entered an error ID
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoteDisplay',
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
  }
</script>

<style scoped>

</style>