<template>
  <div class="wraper"> 
    <div id="title">
      <img :height="vpheight"/>
    </div>
    <div class="title-text">
      <h1>传奇金融绩效考核系统</h1>
    </div>
    <div class="login-form">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户端" name="user">用户端登陆</el-tab-pane>
        <el-tab-pane label="管理端" name="admin">管理端登陆</el-tab-pane>
      

        <el-form :label-position="labelPosition" :model="userLogin" v-if="activeName === 'user'">
          <el-form-item >
            <el-input v-model="userLogin.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userLogin.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUserSubmit" class="submit">登入</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" class="forgetPass">忘记密码？</el-button>
          </el-form-item>
        </el-form>

        <el-form :label-position="labelPosition" :model="adminLogin" v-if="activeName === 'admin'">
          <el-form-item >
            <el-input v-model="adminLogin.name" placeholder="请输入管理员用户名"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input v-model="adminLogin.password" placeholder="请输入管理员密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onAdminSubmit" class="submit">登入</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" class="forgetPass">忘记密码？</el-button>
          </el-form-item>
        </el-form>
      </el-tabs>
      
    </div>
    


<!--       <div>
        <img :src="logo" alt="">
      </div>  -->     
  </div>

</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      activeName: 'user',
      userLogin: {
        name: '',
        password: ''
      },
      adminLogin: {
        name: '',
        password: ''
      }
    }
  },
  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onUserSubmit() {
      this.$message({
        type: 'success',
        message: '登入成功!'
      });
      this.$router.push({ path: 'user-home' });
      console.log('User submit!');
    },
    onAdminSubmit() {
      this.$message({
        type: 'success',
        message: '登入成功!'
      });
      this.$router.push({ path: 'admin-home' });
      console.log('Admin submit!');
    }
  },
  computed: {
    vpheight () {      
      var vpheight = window.innerHeight;
      console.log(vpheight);
      return vpheight/2-290;
    },    
  }
}
</script>

<style>
.login-form{  
  max-width: 400px;
  margin: 0px auto;
}
.title-text h1{
  margin-bottom: 36px;
  font-size: 24px;
}
.el-form-item {
  margin-bottom: 12px;
}
.submit,.forgetPass{
  width: 100%;
}
.el-tab-pane{
  margin-top: 10px;
}
.el-form{
  padding: 30px 0 0 0;
}
.forgetPass{
  width: auto;
  float: right;
}

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: 768px) {
  .login-form{
    width: 400px;
    max-width: 768px;
  }
  .title-text h1{
    font-size: 30px;
  }
  
}
/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: 992px) { 
  .login-form{
    max-width: 768px;
  }
  .title-text h1{
    font-size: 32px;
    margin-bottom: 60px;
  }
}
/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: 1200px) { 
  .login-form{
    max-width: 768px;
  }
}
</style>