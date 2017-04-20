<template>
  <div class="wraper">
    <el-table :data="userData" border type="index" style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="部门"
        min-width="150"
        align="right">
      </el-table-column>
      <el-table-column
        prop="pos"
        label="职位"
        min-width="150"
        align="right">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        align="center">
        <template scope="scope">
          <el-button @click.native.prevent="rowDetail(scope.$index, userData)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="rowDelete(scope.$index, userData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click.native.prevent="userAdd()">新增</el-button>
    <el-dialog :title="dialog.title" v-model="dialog.dialogVisible" size="small" :close-on-click-modal="dialog.closeOnClickModal">
      <span>
        <el-row>
          <el-col :span="6">
            <div class="grid-left" style="background-color:#eee;min-height:500px;">
              <img :src="logo" alt="" width="100">
              <p>{{dialog.name}}</p>
              <p>{{dialog.dept}} {{dialog.pos}}</p>
              
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-main" style="background-color:#ddd;min-height:500px;">
              <el-form ref="form" :model="dialog" label-width="120px">
                <h3>用户个人设置</h3>
                <el-form-item label="用户名">
                  <el-input v-model="dialog.name" placeholder="用户名">{{dialog.name}}</el-input>
                </el-form-item>
                <el-form-item label="电子邮件地址">
                  <el-input v-model="dialog.email" placeholder="电子邮件地址">{{dialog.email}}</el-input>
                </el-form-item>
                <el-form-item label="部门与职务">
                  <el-cascader
                    :options="posOptions"
                    v-model="userSelectedOptions"
                    @change="posChangeHandler()">
                  </el-cascader>
                </el-form-item>
              </el-form>
              <el-form ref="form" :model="dialog" label-width="120px" v-show="dialog.authVisible">
                <h3>考核评价设置</h3>
                <el-form-item label="被评价人">
                  <el-select v-model="dialog.tid" placeholder="请选择被评价人" @change="tidChangeHandler(dialog)">
                    <el-option
                      v-for="item in toOptions" :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


                <el-form-item label="态度考核">
                  <el-checkbox-group v-model="dialog.pid">
                    <el-checkbox label="1" name="type">出勤率</el-checkbox>
                    <el-checkbox label="2" name="type">精神面貌</el-checkbox>
                    <el-checkbox label="3" name="type">行为规范</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="协调部门评价">
                  <el-checkbox-group v-model="dialog.pid">
                    <el-checkbox label="4" name="type">工作质量</el-checkbox>
                    <el-checkbox label="5" name="type">响应时间</el-checkbox>
                    <el-checkbox label="6" name="type">沟通能力</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="核心职责评价">
                  <el-checkbox-group v-model="dialog.pid">
                    <el-checkbox label="7" name="type">工作效率</el-checkbox>
                    <el-checkbox label="8" name="type">工作质量</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

              </el-form>
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="apply(dialog)" v-show="dialog.authVisible">应 用</el-button>
        <el-button type="primary" @click="update(dialog)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        dialog: {
          title: "",
          dialogVisible: false,
          authVisible: false,
          closeOnClickModal : false, 
          type : "",
          id: '',
          name: '李四',
          dept: '企划部',
          pos: '设计师',
          email: '',
          fid : '',
          tid : 1,
          pid : ['1','2','3'],
          index : 0
        },

        newUserData: {
          id: '',
          name: '',
          dept : '',
          pos : '',
          email: ''
        },

        newAuthData:{
          fid : '',
          tid : '',
          pid : []
        },

        userData: [
          {
            id: '1',
            name: '李四',
            dept: '企划部',
            pos: '设计师',
            email: 'l4@legendfinance.cn'
          },{
            id: '2',
            name: '王五',
            dept: '市场部',
            pos: '总经理',
            email: 'w5@legendfinance.cn'
          },{
            id: '3',
            name: '赵六',
            dept: 'IT技术部',
            pos: '工程师',
            email: 'z6@legendfinance.cn'
          },{
            id: '4',
            name: '周七',
            dept: '人事行政部',
            pos: '人事经理',
            email: 'z7@legendfinance.cn'
          },{
            id: '5',
            name: '钱八',
            dept: '市场部',
            pos: '经理',
            email: 'q8@legendfinance.cn'
          }
        ],

        authData: [{
          fid : '1',
          tid : '1',
          pid : ['1','2','5','8']
        },{
          fid : '1',
          tid : '2',
          pid : ['1','3','4','6']
        }],

        posOptions: [
          {
            value: 'IT技术部',
            label: 'IT技术部',
            children: [{
              value: '工程师',
              label: '工程师'
            }, {
              value: '总监',
              label: '总监'
            }]
          }, 
          {
            value: '市场部',
            label: '市场部',
            children: [{
              value: '总经理',
              label: '总经理'
            }, {
              value: '经理',
              label: '经理'
            }]
          },
          {
            value: '人力行政部',
            label: '人力行政部',
            children: [{
              value: '总监',
              label: '总监'
            }, {
              value: '经理',
              label: '经理'
            }]
          },
          {
            value: '企划部',
            label: '企划部',
            children: [{
              value: '总监',
              label: '总监'
            }, {
              value: '设计师',
              label: '设计师'
            }]
          }
        ],
        userSelectedOptions: ['企划部', '设计师'],

        toOptions: [{
            value: '1',
            label: '黄金糕'
          },{
            value: '2',
            label: '双皮奶'
          },{
            value: '3',
            label: '蚵仔煎'
          },{
            value: '4',
            label: '龙须面'
          },{
            value: '5',
            label: '北京烤鸭'
        }],
        toValue: '',

      }
    },
    methods:{
      posChangeHandler(){
        this.dialog.dept = this.userSelectedOptions[0];
        this.dialog.pos = this.userSelectedOptions[1];
      },
      tidChangeHandler(dialog){
        let id = this.dialog.id;
        let tid = this.dialog.tid;
        let pid = [];
        this.authData.forEach(function(value, index, array) {if(value.fid == id && value.tid == tid){
            pid = value.pid;
          }
        });
        this.dialog.pid = pid;
      },
      apply(dialog) {
        let self = this;
        let flag = 1;
        this.newUserData = {
          id : dialog.id,
          name: dialog.name,
          dept : dialog.dept,
          pos : dialog.pos,
          email : dialog.email
        },
        this.newAuthData = {
          fid : dialog.id,
          tid : dialog.tid,
          pid : dialog.pid
        }
        //后续需要判断fid 和tid都相同的情况下是替换而不是增加。
        this.authData.forEach(function(value, index, array) {
          if(value.fid == self.newAuthData.fid && value.tid == self.newAuthData.tid){
            value.pid = self.newAuthData.pid;
            console.log("权限已修改!");
            console.log("修改为："+value.pid);
            flag = 0;
          }
        });
        if(flag){
          this.authData.push(this.newAuthData);
          console.log("权限设定已应用!");
          console.log(this.authData);
          console.log("设置者："+this.newAuthData.fid+"对方："+this.newAuthData.tid+"权限包括："+this.newAuthData.pid);
        }
                //this.$router.push('/admin-home/login');
      },
      update(dialog) {        
        let type = dialog.type;
        let index = dialog.index;
        this.newUserData = {
          id : dialog.id,
          name: dialog.name,
          dept : dialog.dept,
          pos : dialog.pos,
          email : dialog.email
        },
        this.newAuthData = {
          fid : dialog.id,
          tid : dialog.tid,
          pid : dialog.pid
        }
        if(type=="add"){          
          this.userData.push(this.newUserData);
          console.log("新增成功！");
        }else if(type == "edit"){
          this.apply(dialog);
          this.userData[index].name = this.newUserData.name;
          this.userData[index].dept = this.newUserData.dept;
          this.userData[index].pos = this.newUserData.pos;
          this.userData[index].email = this.newUserData.email;
          console.log("修改成功！");
        }
        this.dialog.dialogVisible = false;
        console.log(this.newUserData+this.newAuthData.pid);
        //this.$router.push('/admin-home/login');
      },
      rowDetail(index, rows) {
        
        let id = this.userData[index].id;
        let name = this.userData[index].name;
        let dept = this.userData[index].dept;
        let pos = this.userData[index].pos;
        let email = this.userData[index].email;
        let pid = [];
        this.authData.forEach(function(value, index, array) {if(value.fid == id && value.tid == '1'){
            pid = value.pid;
          }
        });
        this.dialog = {
          title : "编辑",
          dialogVisible : true,
          closeOnClickModal : false, 
          authVisible: true,
          type : "edit",
          id: id,
          name: name,
          dept: dept,
          pos: pos,
          email: email,
          fid : id,
          tid : '1',
          pid : pid,
          index : index
        }

        //console.log("detail"+index, rows);
      },
      userAdd() {
        this.dialog = {
          title : "新增",
          dialogVisible : true,
          closeOnClickModal : false,
          authVisible: false, 
          type : "add",
          name: '',
          dept: '',
          pos: '',
          fid : '',
          tid : '1',
          pid : [],
          index : 0
        }
      },
      rowDelete(index, rows) {
        console.log("delete"+index, rows);
        rows.splice(index, 1);
      },
    },
    computed: {
        logo(){
          const avatar = 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256';
          return avatar;
        }
      }
  }
</script>