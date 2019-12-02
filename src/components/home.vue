<template>
    <div class="home_component">
      <el-container class="el_container">
        <el-header class="el_header">
          <div>
            <img src="../assets/imgs/gushicijianshang_pink.png" alt="诗词文斋">
            <span>诗词管理系统</span>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px" class="el_aside">Aside</el-aside>
          <el-main class="el_main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
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
.home_component {
  height: 100%;
}

.el_container {
  height: 100%;
}

.el_header {
  background-color: #373d41;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  img {
    height: auto;
    width: 80px;
  }

  span {
    color: aliceblue;
    font-size: 20px;
  }
}

.el_aside {
  background-color: aquamarine;
}

.el_main {
  background-color: antiquewhite;
}
</style>
