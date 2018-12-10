<template>
  <div class="admin-login">
    admin-login
    <div>
      <h1>登录前</h1>
    </div>
    <div>
      <h1>登陆后</h1>
      <router-link :to="{name: 'createNote'}">新建笔记</router-link>
      <br>
      <router-link :to="{name: 'notesManagement'}">管理笔记</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>