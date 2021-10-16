<template>
  <div class="reg el-col-sm-10 el-col-xs-20 el-col-lg-6">
    <h2>注册账号</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        prop="uname"
      >
        <el-input
          type="text"
          v-model="ruleForm.uname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pass"
      >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <p>已有账号？点击<router-link to="/login"><b>登录</b></router-link>
      </p>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var checkUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(/^\w{8,16}/g.test(value)) {
          fetch('/api/isExistUserServlet',{
            method: "post",
            body: `uname=${value}`,
            headers : {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }).then(res => res.json())
          .then(res => {
            if(res.status != '0') {
              callback(new Error("用户名已存在"))
            }else {
              callback();
            }
          })
      } 
      else {
        callback(new Error("用户名长度需在8~16位"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhoe = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        pass: "",
        checkPass: "",
        age: "",
        phone: "",
      },
      rules: {
        uname: [{ validator: checkUname, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhoe, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch("/api/registerServlet", {
            method: "post",
            body: `uname=${this.ruleForm.uname}&upwd=${this.ruleForm.checkPass}&sex=&phone=${this.ruleForm.phone}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              switch (parseInt(res.status)) {
                case 0:
                  this.$message({
                    message: "恭喜你，注册成功！",
                    type: "success",
                  });
                  this.$router.push('/login')
                  break;
                case 2: 
                  this.$message.error('注册失败，用户名已存在！');
                  break;
                default:
                  this.$message.error('服务器繁忙，请稍后再试！');
                  break;
              }
              console.log(res);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
h2 {
  margin-left: 50px;
  margin-bottom: 20px;
}
.reg {
  float: none;
  margin: 200px auto;
  text-align: center;
}
</style>
