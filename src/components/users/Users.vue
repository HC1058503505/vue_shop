<template>
    <div>
        <el-breadcrumb class="users_breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户信息" v-model="queryInfo.query" clearable @clear="loadUsers">
                        <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>

             <el-table
                :data="users"
                border
                stripe
                style="width: 100%"
                class="uses_table">
                <el-table-column
                type="index"
                width="80">
                </el-table-column>
                <el-table-column prop="id" label="用户id">
                </el-table-column>

                <el-table-column prop="username" label="用户名">
                </el-table-column>

                <el-table-column prop="role_name" label="权限">
                </el-table-column>

                <el-table-column prop="mobile" label="手机号">
                </el-table-column>

                <el-table-column prop="email" label="邮箱">
                </el-table-column>

                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                        @change="mgStateChange(scope.row)"
                        v-model="scope.row.mg_state">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                            <el-tooltip :enterable="false" effect="dark" content="编辑用户信息" placement="top">
                                <el-button class="user_caozuo_edit_btn" size="mini" type="primary" icon="el-icon-edit" @click="showEditUserDialog(scope.row)">
                                </el-button>
                            </el-tooltip>

                            <el-tooltip :enterable="false" effect="dark" content="删除用户" placement="top">
                                <el-button class="user_caozuo_delete_btn" size="mini" type="warning" icon="el-icon-delete" @click="deleteUser(scope.row)">
                                </el-button>
                            </el-tooltip>

                            <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
                                <el-button class="user_caozuo_setting_btn" size="mini" type="danger" icon="el-icon-setting" @click="settingRole(scope.row)">
                                </el-button>
                            </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!----分页-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

        <!--添加用户弹窗-->
        <el-dialog title="添加用户弹窗" :visible.sync="dialogFormVisible" @close="dialogCloseAction">
          <el-form :model="form" :rules="formRules" ref="form">
            <!-----------用户名--------------->
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
              <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <!-----------密码--------------->
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <!-----------邮箱--------------->
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <!-----------手机号--------------->
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
              <el-input v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAddUser">取 消</el-button>
            <el-button type="primary" @click="sureAddUser">确 定</el-button>
          </div>
        </el-dialog>

        <!---修改用户弹窗----->
        <el-dialog title="修改用户信息弹窗" :visible.sync="editDialogFormVisible" @close="dialogCloseAction">
          <el-form :model="editForm" :rules="formRules" ref="edituserForm">
            <!-----------用户名--------------->
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
              <el-input v-model="editForm.username" auto-complete="off" disabled></el-input>
            </el-form-item>
            <!-----------邮箱--------------->
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="editForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <!-----------手机号--------------->
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
              <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancleEditUser">取 消</el-button>
            <el-button type="primary" @click="sureEditUser">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    var emailReg = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (reg.test(value)) {
        return callback()
      }

      callback(new Error('请输入正确的邮箱'))
    }

    var mobileReg = (rule, value, callback) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        return callback()
      }

      callback(new Error('请输入正确的手机号'))
    }

    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      users: [],
      pagenum: 1,
      pagesize: 1,
      total: 0,
      querystring: '',
      dialogFormVisible: false,
      editDialogFormVisible: false,
      editForm: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      formRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { validator: emailReg, trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileReg, trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res)
      this.users = res.data.users
      this.queryInfo.pagenum = res.data.pagenum
      this.total = res.data.total
    },
    handleSizeChange (size) {
      this.queryInfo.pagesize = size
      this.loadUsers()
    },
    handleCurrentChange (current) {
      this.queryInfo.pagenum = current
      this.loadUsers()
    },
    async mgStateChange (userinfo) {
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        this.$message.error('更新用户状态失败')
        return
      }
      this.$message.success('更新用户状态成功')
    },
    querychange (input) {
      console.log(input)
      this.querystring = input
    },
    searchAction () {
      this.loadUsers()
    },
    addUser () {
      this.dialogFormVisible = true
    },
    dialogCloseAction () {
      this.$refs.form.resetFields()
    },
    cancleAddUser () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    sureAddUser () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return
        }

        const { data: res } = await this.$http.post('users', this.form)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
          return
        }
        this.$refs.form.resetFields()
        this.dialogFormVisible = false
        this.loadUsers()
        this.$message.success('添加用户成功')
      })
    },
    async deleteUser (user) {
      if (!user) {
        this.$message.error('用户不存在，删除失败')
        return
      }

      const { data: res } = await this.$http.delete(`users/${user.id}`)
      if (res.meta.status !== 200) {
        console.log(res)
        this.$message.error(res.meta.msg)
        return
      }
      this.$message.success('删除成功')
      this.loadUsers()
    },
    settingRole (user) {
      // 分配角色
    },
    showEditUserDialog (user) {
      this.editForm = user
      this.editDialogFormVisible = true
    },
    cancleEditUser () {
      this.editDialogFormVisible = false
      this.$refs.edituserForm.resetFields()
    },
    sureEditUser () {
      console.log(this.editForm.id)
      this.$refs.edituserForm.validate(async (valid) => {
        if (!valid) {
          return
        }
        let params = { email: this.editForm.email, mobile: this.editForm.mobile }
        const { data: res } = await this.$http.put(`users/${this.editForm.id}`, params)
        if (res.meta.status !== 200) {
          this.$message.error('修改用户信息失败')
          return
        }

        this.$refs.edituserForm.resetFields()
        this.editDialogFormVisible = false
        this.loadUsers()
        this.$message.success('修改用户信息成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.users_breadcrumb {
    margin-bottom: 20px;
}
.box-card {
    box-shadow: 0px 0px 0px black !important;
}

.uses_table {
    margin-top: 10px;
    margin-bottom: 10px;
}
el_button {
    margin: 10px !important;
}
</style>
