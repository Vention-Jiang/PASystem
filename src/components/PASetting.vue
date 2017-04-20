<template>
  <div class="wraper">
    <el-table :data="PAData" border type="index" style="width: 100%">
    
      <el-table-column
        prop="fieldTitle"
        label="考核项目"
        min-width="100"
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
        fixed="right"
        label="操作"
        width="100"
        align="center">
        <template scope="scope">
          <el-button @click.native.prevent="rowDetail(scope.$index, PAData)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="rowDelete(scope.$index, PAData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="paAdd()">新增</el-button>
    <el-dialog :title="dialog.title" v-model="dialog.dialogVisible" size="small" :close-on-click-modal="dialog.closeOnClickModal">
      <span>
        <el-form>
        <el-form-item label="考核项目">
            <el-input placeholder="请输入考核项目名称" :value="dialog.fieldTitle" v-model="dialog.fieldTitle"></el-input>
          </el-form-item>
          <el-form-item label="细分项目">
            <el-input placeholder="请输入细分项目名称" :value="dialog.item" v-model="dialog.item"></el-input>
          </el-form-item>
          <el-form-item label="满分">
            <el-input placeholder="请输入满分分数" :value="dialog.maxscore" v-model="dialog.maxscore"></el-input>
          </el-form-item>
          <el-form-item label="评分标准">
            <el-input placeholder="请输入评分标准" :value="dialog.standard" v-model="dialog.standard"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
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
          closeOnClickModal : false, 
          type : "",
          item:'',
          maxscore: '',
          standard: '',
          index : 0
        },
        newData:{
          fieldid: '',
          fieldTitle: '',
          item:'',
          maxscore: '',
          standard: '',
        },
        PAData: [{
          id: '1',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '出勤率',
          maxscore: '10',
          standard: '出勤率=100% - 10分，90%〈出勤率〈100% - 5分，出勤率〈90% - 0分'
        },{
          id: '2',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '精神面貌',
          maxscore: '2.5',
          standard: '每日遵守公司规定职业形象，则为满分，有任何违反，则0分'
        },{
          id: '3',
          fieldid: '1',
          fieldTitle: '态度考核',
          item: '行为规范',
          maxscore: '2.5',
          standard: '每日遵守公司日常规章制度，则为满分，有任何违反，则0分'
        },{
          id: '4',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '工作质量',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分'
        },{
          id: '5',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '响应时间',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分'
        },{
          id: '6',
          fieldid: '2',
          fieldTitle: '协调部门评价',
          item: '沟通能力',
          maxscore: '5',
          standard: '优5分，良3分，中1分，差0分'
        },{
          id: '7',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作效率',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分'
        },{
          id: '8',
          fieldid: '3',
          fieldTitle: '核心职责工作任务',
          item: '工作质量',
          maxscore: '35',
          standard: '优35分，良30分，中25分，差0分'
        }],
      }
    },
    methods:{
      rowDetail(index, rows) {
        let fieldTitle = this.PAData[index].fieldTitle;
        let item = this.PAData[index].item;
        let maxscore = this.PAData[index].maxscore;
        let standard = this.PAData[index].standard;
        this.dialog = {
          title : "新增",
          dialogVisible : true,
          closeOnClickModal : false, 
          type : "edit",
          fieldTitle: fieldTitle,
          item:item,
          maxscore: maxscore,
          standard: standard,
          index : index
        }
        //console.log("detail"+index, rows);
      },
      update(dialog) {
        this.dialog.dialogVisible = false;
        let type = dialog.type;
        let index = dialog.index;
        let newData = {
          fieldTitle: dialog.fieldTitle,
          item: dialog.item,
          maxscore : dialog.maxscore,
          standard : dialog.standard
        }
        if(type=="add"){          
          this.PAData.push(newData);
        }else if(type == "edit"){
          this.PAData[index].fieldTitle = newData.fieldTitle;
          this.PAData[index].item = newData.item;
          this.PAData[index].maxscore = newData.maxscore;
          this.PAData[index].standard = newData.standard;
        }
        
        console.log("detail"+newData.item+this.dialog.item);
        //this.$router.push('/admin-home/login');
      },
      paAdd() {
        this.dialog = {
          title : "新增",
          dialogVisible : true,
          closeOnClickModal : false, 
          type : "add",
          fieldTitle: '',
          item:'',
          maxscore: '',
          standard: ''
        }

        //this.$router.push('/admin-home/login');
      },
      rowDelete(index, rows) {
        console.log("delete"+index, rows);
        rows.splice(index, 1);
      },
    },
    computed: {
        
      }
  }
</script>