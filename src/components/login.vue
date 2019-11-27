<template>
    <div class="login_com">
        <div class="login_box">
            <div class="portrait_box">
                <img class="login_portrait" src="../assets/logo.png">
            </div>
             <!-- 登录表单区域 -->
            <el-form class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="username">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login'
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
    }
}
</style>
