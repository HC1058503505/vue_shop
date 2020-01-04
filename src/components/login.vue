<template>
    <div class="login_com">
        <div class="login_box">
            <div class="portrait_box">
                <img class="login_portrait" src="../assets/imgs/logo.png">
            </div>
             <!-- 登录表单区域 -->
            <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginRulesForm">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" prefix-icon="iconfont icon-yonghu11" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" prefix-icon="iconfont icon-mima" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="loginAction">登录</el-button>
                    <el-button type="info" @click="resetAction">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRulesForm: {
        username: [
          { required: true, message: '请输入用户名', triggle: 'blur' },
          { min: 3, max: 15, message: '长度在6到15个字符', triggle: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', triggle: 'blur' },
          { min: 3, max: 15, message: '长度在6到15个字符', triggle: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginAction: function () {
      var that = this
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await that.$http.post('login', that.loginForm)
        if (res.meta.status !== 200) return that.$message.error('登录失败')
        this.$message.success('登录成功')
        // 保存token
        window.sessionStorage.setItem('token', res.data.token)
        that.$router.push('/home')
      })
    },
    resetAction: function () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_com {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    border: 1px solid green;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .portrait_box {
        background-color: whitesmoke;
        width: 130px;
        height: 130px;
        padding: 10px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        box-shadow: 0 0 10px #dddd;
        transform: translate(-50%, -50%);
        .login_portrait {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid white;
        }
    }

    .login_form {
        width: 100%;
        padding: 20px;
        position: absolute;
        bottom: 0px;
        box-sizing: border-box;
        .btns {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
