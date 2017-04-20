<template>
  <div class="wraper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" id="nav-top">
      <div class="container">
        <img :src="logo" alt="" width="50" />
        <p>管理员 张三，您好！</p>
        <div style="float:right;">
          <el-menu-item index="psw-mod">修改密码</el-menu-item>
          <el-menu-item index="logout" @click="logout">退出登录</el-menu-item>
        </div>
      </div>
    </el-menu>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户设定" name="user-setting">
      </el-tab-pane>
      <el-tab-pane label="考核设定" name="pa-setting">
      </el-tab-pane>
      <el-tab-pane label="考核结果" name="pa-result"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeName: 'user-setting',
      
    }
  },
  created() {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      let url = tab.name;
      this.$router.push({path : '/admin-home/'+ url});
      console.log(tab, event);
    },
    
    logout(){
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功登出!'
        });
        this.$router.push('/login');
      }).catch(() => {
                 
      });
    }
  },
  computed: {
    logo(){
      const avatar = 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256';
      return avatar;
    }
  }
}
</script>

<style>
#nav-top img{
  width: 50px;
  float: left;
  margin: 5px;
}
#nav-top p{
  font-size: 14px;
  line-height: 50px;
  float: left;
  margin: 5px 0 5px 15px;
}
#nav-top .container{  
  min-width: 100%;
  max-width: 1440px;
  margin: 0px auto;
}
</style>