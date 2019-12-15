<template>
    <div class="home_component">
      <el-container class="el_container">
        <el-header class="el_header">
          <div class='nav_header'>
            <img src="../assets/imgs/gushicijianshang_pink.png" alt="诗词文斋">
            <span>诗词管理系统</span>
          </div>
          <el-button type="info" @click="logout">
            退出
          </el-button>
        </el-header>
        <el-container>
          <el-aside :width="isCollapse ? '64px' : '200px'" class="el_aside">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu  class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      background-color="#373d41"
                      text-color="#fff"
                      active-text-color="#d4237a"
                      unique-opened
                      :collapse="isCollapse"
                      :collapse-transition="false"
                      :default-active="active_index"
                      router>
              <el-submenu :index="menu.id + ''" :key="menu.id" v-for="menu in menulists">
                <template slot="title">
                  <i :class="iconsObj[menu.id]"></i>
                  <span>{{ menu.authName }}</span>
                </template>
                <el-menu-item :index="'/' + sub.path" v-for="sub in menu.children" :key="sub.id" @click="saveSubMenuState('/' + sub.path, menu.authName + '|' + sub.authName)">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ sub.authName }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
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
  data () {
    return {
      menulists: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      active_index: '/users',
      breadPaths: ''
    }
  },
  async created () {
    const { data: res } = await this.$http.get('menus')
    if (res.meta.status !== 200) {
      return
    }
    this.menulists = res.data
    this.active_index = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse: function () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen: function () {

    },
    handleClose: function () {

    },
    saveSubMenuState: function (path, breadpcaths) {
      this.breadPaths = breadpcaths
      window.sessionStorage.setItem('activePath', path)
      this.active_index = path
      console.log(path)
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
  display: inline-flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  .nav_header {
    display: inline-flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
    }

    span {
      padding-left: 20px;
      color: aliceblue;
      font-size: 20px;
    }
  }
}

.el_aside {
  background-color: #373d41;
}

.el_main {
  background-color: antiquewhite;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  letter-spacing: 0.2em;
  font-size: 10px;
  line-height: 24px;
  color: #ffff;
  text-align: center;
  cursor: pointer;
}
</style>
