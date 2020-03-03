<template>
  <div id="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="form"
        size="medium "
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="show">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="margin-top-19 block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateEmail,
  validatePass,
  validateC
} from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      if (!validateEmail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20为的数字字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
      if (this.type == "登录") {
        callback();
      }
      this.ruleForm.passwords = stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.ruleForm.password != this.ruleForm.passwords) {
        callback(new Error("两次密码不一样"));
      } else {
        callback();
      }
    };
    //验证码
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateC(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { text: "登录", current: true },
        { text: "注册", current: false }
      ],
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      show: false,
      type: "登录"
    };
  },
  // 生命周期创建完成时
  created() {},
  //生命周期挂载完成时
  mounted() {},
  //定义函数
  methods: {
    toggleMneu(data) {
      this.menuTab.forEach(ele => {
        ele.current = false;
      });
      data.current = true;
      if (data.text === "注册") {
        this.show = true;
        this.type = "注册";
      } else {
        this.type = "登录";
        this.show = false;
      }
    },
    // 表单方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
//scoped作用是只在当前文件有效
#login {
  background-color: #344a5f;
  // vh单位代表当前页面可视区域窗口的百分比~！！
  height: 100vh;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #ffffff;
    // 改变鼠标选中时的手势
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.form {
  margin-top: 29px;
  .item-form {
    margin-bottom: 13px;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
  }
  .block {
    width: 100%;
    display: block;
  }
}
</style>
