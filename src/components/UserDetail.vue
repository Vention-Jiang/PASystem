<template>
  <div class="wraper">
    <el-row>
      <el-col :span="6">
        <div class="grid-left" style="background-color:#eee;min-height:400px;">
          <img :src="logo" alt="" width="100">
          <p>{{userData.name}}</p>
          <el-cascader
            :options="userOptions"
            v-model="userSelectedOptions"
            @change="handleChange">
          </el-cascader>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-main" style="background-color:#ddd;min-height:400px;">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="被评价人">
              <el-select v-model="form.toValue" placeholder="请选择被评价人">
                <el-option
                  v-for="item in toOptions" :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="态度考核">
              <el-checkbox-group v-model="form.fid">
                <el-checkbox label="1" name="type">出勤率</el-checkbox>
                <el-checkbox label="2" name="type">精神面貌</el-checkbox>
                <el-checkbox label="3" name="type">行为规范</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="协调部门评价">
              <el-checkbox-group v-model="form.fid">
                <el-checkbox label="4" name="type">工作质量</el-checkbox>
                <el-checkbox label="5" name="type">响应时间</el-checkbox>
                <el-checkbox label="6" name="type">沟通能力</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="核心职责评价">
              <el-checkbox-group v-model="form.fid">
                <el-checkbox label="7" name="type">工作效率</el-checkbox>
                <el-checkbox label="8" name="type">工作质量</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">应用</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
  	return {
      userData: {
        name: '李四',
        dept: '企划部',
        pos: '设计师'
      },
      authData:[{
        fid : '',
        tid : '',
        pid : ''
      }],
      userOptions: 
      [{
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
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }],
      toValue: '',
      form: {
        fid: [],
        toValue: '',
      }
  	}
  },
  created() {

  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.userSelectedOptions=['企划部', '总监'];
      this.$router.push({path: 'user-setting'});
      console.log(this.form.fid,this.form.toValue);
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
</style>