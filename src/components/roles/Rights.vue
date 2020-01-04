<template>
    <div>
        <el-breadcrumb class="users_breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="rights_table">
            <el-table :data="rights" stripe>
                <el-table-column type="index" width="50">
                </el-table-column>

                <el-table-column label="权限名" property="authName">
                </el-table-column>
                <el-table-column label="路径" property="path">
                </el-table-column>
                <el-table-column label="等级" property="level">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="info" v-else-if="scope.row.level === '1'">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    async loadRights () {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      console.log(res)
      this.rights = res.data
      this.$message.success(res.meta.msg)
    }
  }
}
</script>

<style lang="less" scoped>
.rights_table {
    margin-top: 20px;
}
</style>
