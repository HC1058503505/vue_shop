<template>
    <div>
        <el-breadcrumb class="users_breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="roles_table">
            <el-table :data="roles" stripe>
                <el-table-column type="expand" width="50">
                    <template slot-scope="scope">
                        <el-row v-for="item in scope.row.children" v-bind:key="item.id">
                            <el-col :span="6" class="role1">
                                <el-tag type="success">
                                    {{item.authName}}
                                </el-tag>
                            </el-col>

                            <el-col :span="6" class="role2">
                                <el-tag type="info" v-for="item1 in item.children" v-bind:key="item1.id">
                                    {{item1.authName}}
                                </el-tag>
                            </el-col>

                            <el-col :span="12" class="role3">
                                <el-tag type="warning" v-for="item2 in item.children" v-bind:key="item2.id">
                                    {{item2.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="角色" property="roleName">
                </el-table-column>
                <el-table-column label="角色描述" property="roleDesc">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      roles: []
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        return
      }
      this.roles = res.data
      this.$message.success(res.meta.msg)
    }
  }
}
</script>

<style lang="less" scoped>
.roles_table {
    margin-top: 20px;
}

.role2 {
    display: inline-flex;
    flex-direction: row;
}
</style>
