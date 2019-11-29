<template>
    <div class="home_component">
        <el-button @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
