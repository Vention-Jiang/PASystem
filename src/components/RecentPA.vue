<template>
  <div class="wraper">
    <el-select v-model="dialog.status" placeholder="请选择类别" @change="statusChangeHandler(dialog)">
      <el-option
        v-for="item in statusOptions" :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table :data="showUserData" border type="index" style="width: 100%" @selection-change="handleSelectionChange">

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
        prop="status"
        label="状态"
        min-width="150"
        align="right">
      </el-table-column>
      <el-table-column
        min-width="50"
        align="center"
        type="selection">
      </el-table-column>
      
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        align="center">
        <template scope="scope">          
          <el-button @click.native.prevent="rowDetail(scope.$index, showUserData)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialog.title" v-model="dialog.dialogVisible" size="large" :close-on-click-modal="dialog.closeOnClickModal">
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
              <el-table :data="showPAData" border type="index" style="width: 100%" :default-sort = "{prop: 'fieldTitle', order: 'descending'}">

                <el-table-column
                  prop="fieldTitle"
                  label="考核项目"
                  min-width="100"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="item"
                  label="细分项目"
                  min-width="100"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="maxscore"
                  label="满分"
                  min-width="50"
                  align="right">
                </el-table-column>
                <el-table-column
                  prop="standard"
                  label="评分标准"
                  min-width="200"
                  align="right">
                </el-table-column>
                <el-table-column
                  prop="subscore"
                  label="分数"
                  width="100"
                  align="center">
                </el-table-column>
              </el-table>
              <p>总分：{{score}}</p>
            </div>
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
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
          uid: '',
          name: '李四',
          dept: '企划部',
          pos: '设计师',
          index : 0,
          status : '',
          season: '1'
        },
        showUserData:[{
            id: '1',
            season: '1',
            name: '李四',
            dept: '企划部',
            pos: '设计师',
            email: 'l4@legendfinance.cn',
            status: '2'
          },{
            id: '2',
            season: '1',
            name: '王五',
            dept: '市场部',
            pos: '总经理',
            email: 'w5@legendfinance.cn',
            status: '0'
          },{
            id: '3',
            season: '1',
            name: '赵六',
            dept: 'IT技术部',
            pos: '工程师',
            email: 'z6@legendfinance.cn',
            status: '1'
          },{
            id: '4',
            season: '1',
            name: '周七',
            dept: '人事行政部',
            pos: '人事经理',
            email: 'z7@legendfinance.cn',
            status: '2'
          },{
            id: '5',
            season: '1',
            name: '钱八',
            dept: '市场部',
            pos: '经理',
            email: 'q8@legendfinance.cn',
            status: '2'
          }],
        showPAData:[],
        userData: [
          {
            id: '1',
            season: '1',
            name: '李四',
            dept: '企划部',
            pos: '设计师',
            email: 'l4@legendfinance.cn',
            status: '2'
          },{
            id: '2',
            season: '1',
            name: '王五',
            dept: '市场部',
            pos: '总经理',
            email: 'w5@legendfinance.cn',
            status: '0'
          },{
            id: '3',
            season: '1',
            name: '赵六',
            dept: 'IT技术部',
            pos: '工程师',
            email: 'z6@legendfinance.cn',
            status: '1'
          },{
            id: '4',
            season: '1',
            name: '周七',
            dept: '人事行政部',
            pos: '人事经理',
            email: 'z7@legendfinance.cn',
            status: '2'
          },{
            id: '5',
            season: '1',
            name: '钱八',
            dept: '市场部',
            pos: '经理',
            email: 'q8@legendfinance.cn',
            status: '2'
          },{
            id: '1',
            season: '2',
            name: '李四',
            dept: '企划部',
            pos: '设计师',
            email: 'l4@legendfinance.cn',
            status: '2'
          },{
            id: '2',
            season: '2',
            name: '王五',
            dept: '市场部',
            pos: '总经理',
            email: 'w5@legendfinance.cn',
            status: '2'
          },{
            id: '3',
            season: '3',
            name: '赵六',
            dept: 'IT技术部',
            pos: '工程师',
            email: 'z6@legendfinance.cn',
            status: '2'
          },{
            id: '4',
            season: '3',
            name: '周七',
            dept: '人事行政部',
            pos: '人事经理',
            email: 'z7@legendfinance.cn',
            status: '2'
          },{
            id: '5',
            season: '4',
            name: '钱八',
            dept: '市场部',
            pos: '经理',
            email: 'q8@legendfinance.cn',
            status: '2'
          },
        ],

        PAData: [{
          id: '1',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '出勤率',
          maxscore: '10',
          standard: '出勤率=100% - 10分，90%〈出勤率〈100% - 5分，出勤率〈90% - 0分',
          uid: '1',
          season: '1',
          subscore: 5
        },{
          id: '2',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '精神面貌',
          maxscore: '2.5',
          standard: '每日遵守公司规定职业形象，则为满分，有任何违反，则0分',
          uid: '1',
          season: '1',
          subscore: 2.5
        },{
          id: '3',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '行为规范',
          maxscore: '2.5',
          standard: '每日遵守公司日常规章制度，则为满分，有任何违反，则0分',
          uid: '1',
          season: '1',
          subscore: 2.5
        },{
          id: '4',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '工作质量',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '1',
          season: '1',
          subscore: 3
        },{
          id: '5',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '响应时间',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '1',
          season: '1',
          subscore: 5
        },{
          id: '6',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '沟通能力',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '1',
          season: '1',
          subscore: 3
        },{
          id: '7',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作效率',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分',
          uid: '1',
          season: '1',
          subscore: 30
        },{
          id: '8',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作质量',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分',
          uid: '1',
          season: '1',
          subscore: 25
        },{
          id: '1',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '出勤率',
          maxscore: '10',
          standard: '出勤率=100% - 10分，90%〈出勤率〈100% - 5分，出勤率〈90% - 0分',
          uid: '3',
          season: '1',
          subscore: 5
        },{
          id: '2',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '精神面貌',
          maxscore: '2.5',
          standard: '每日遵守公司规定职业形象，则为满分，有任何违反，则0分',
          uid: '3',
          season: '1',
          subscore: 2.5
        },{
          id: '3',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '行为规范',
          maxscore: '2.5',
          standard: '每日遵守公司日常规章制度，则为满分，有任何违反，则0分',
          uid: '3',
          season: '1',
          subscore: 2.5
        },{
          id: '4',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '工作质量',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '3',
          season: '1',
          subscore: 3
        },{
          id: '5',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '响应时间',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '3',
          season: '1',
          subscore: 5
        },{
          id: '6',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '沟通能力',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分',
          uid: '3',
          season: '1',
          subscore: 3
        },{
          id: '7',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作效率',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分',
          uid: '1',
          season: '2',
          subscore: 30
        },{
          id: '8',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作质量',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分',
          uid: '1',
          season: '2',
          subscore: 25
        }],
        score:0,
        statusOptions: [{
            value: '0',
            label: '未填写'
          },{
            value: '1',
            label: '已保存未完成'
          },{
            value: '2',
            label: '已完成'
          }],

        multipleSelection: [],

      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      posChangeHandler(){
        this.dialog.dept = this.userSelectedOptions[0];
        this.dialog.pos = this.userSelectedOptions[1];
      },
      statusChangeHandler(dialog){
        let self = this;
        self.showUserData = [];
        let status = dialog.status;
        this.userData.forEach(function(value, index, array) {
          if(value.status == status && value.season == '1'){
            self.showUserData.push(value);
          }
        });
      },

      rowDetail(index, rows) {
        let self= this;
        self.showPAData = [];
        self.score = 0;
        let season = rows[index].season;
        let uid = rows[index].id;
        let showPAData = {
          fieldTitle: '',
          item: '',
          maxscore: '',
          standard: '',
          subscore: ''
        }
        this.dialog.dialogVisible = true;
        this.dialog.name =rows[index].name;
        this.dialog.dept =rows[index].dept;
        this.dialog.pos =rows[index].pos;
        this.PAData.forEach(function(value, index, array) {
          if(value.season == season && value.uid == uid){
            self.showPAData.push(value);
            self.score = self.score + value.subscore;
          }
        });
        
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