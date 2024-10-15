<script setup lang="ts">
import type { TRegister } from "@/common/type";
import { useUser } from "@/composables/useUser";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";


type RuleForm = {
  userName: string,
  email: string,
  password: string,
}

const { register } = useUser();

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  email: "",
  password: "",
  userName: ""
})

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: 'Email không được bỏ trống', trigger: ['change', 'blur'] },
  ],
  password: [
    { required: true, message: 'Mật khẩu không được bỏ trống', trigger: ['change', 'blur'] },
    { min: 6, max: 30, message: 'Mật khẩu phải từ 6 -> 30 ký tự', trigger: ['change', 'blur'] },
  ],
  userName: [
    { required: true, message: 'Tên người dùng không được bỏ trống', trigger: ['change', 'blur'] },
    { min: 2, max: 30, message: 'Tên người dùng phải từ 2 -> 30 ký tự', trigger: ['change', 'blur'] },
  ],
})

const router = useRouter();

const handleRegister = async (e: Event) => {
  e.preventDefault();

  await ruleFormRef?.value?.validate(async (valid, fields) => {
    if (valid) {
      const response = await register({
        userName: ruleForm.userName,
        email: ruleForm.email,
        password: ruleForm.password,
      } as TRegister);

      if (!response) return;

      router.replace("/login");
    } else {
      console.log('error submit!', fields)
    }
  })


};
</script>

<template>
  <div class="wrapper">
    <div class="inner">
      <el-form @submit.prevent ref="ruleFormRef" :rules="rules" :model="ruleForm">
        <h3>TẠO TÀI KHOẢN</h3>
        <div class="form-holder">
          <span class="lnr lnr-phone-handset"></span>
          <el-form-item prop="userName">
            <input v-model="ruleForm.userName" type="text" class="form-control" placeholder="Tên người dùng" />
          </el-form-item>
        </div>
        <div class="form-holder">
          <span class="lnr lnr-user"></span>
          <el-form-item prop="email">
            <input v-model="ruleForm.email" type="text" class="form-control" placeholder="Email" />
          </el-form-item>
        </div>
        <div class="form-holder">
          <span class="lnr lnr-lock"></span>
          <el-form-item prop="password">
            <input v-model="ruleForm.password" type="password" class="form-control" placeholder="Mật khẩu" />
          </el-form-item>
        </div>
        <div>
          <span>Bạn đã có tài khoản ?
            <router-link to="/login">Đăng nhập</router-link></span>
        </div>
        <button @click="handleRegister">
          <span>Đăng ký</span>
        </button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 50px;
}

img {
  max-width: 100%;
}

ul {
  padding-left: 0;
  margin-bottom: 0;
}

a {
  text-decoration: none;
}

:focus {
  outline: none;
}

.inner {
  position: relative;
  width: 435px;
}

.image-1 {
  position: absolute;
  bottom: -12px;
  left: -191px;
  z-index: 99;
}

.image-2 {
  position: absolute;
  bottom: 0;
  right: -129px;
}

form {
  width: 100%;
  position: relative;
  z-index: 9;
  padding: 77px 61px 66px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

h3 {
  text-transform: uppercase;
  font-size: 25px;
  color: #333;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 33px;
}

.form-holder {
  position: relative;
  margin-bottom: 21px;

  span {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    color: #333;

    &.lnr-lock {
      left: 2px;
    }
  }
}

.form-control {
  border: none;
  border-bottom: 1px solid #e6e6e6;
  display: block;
  width: 100%;
  height: 38px;
  background: none;
  padding: 3px 42px 0px;
  color: #666;
  font-size: 16px;

  &::-webkit-input-placeholder {
    font-size: 14px;
    font-family: "Muli-Regular";
    color: #999;
    transform: translateY(1px);
  }

  &::-moz-placeholder {
    font-size: 14px;
    font-family: "Muli-Regular";
    color: #999;
    transform: translateY(1px);
  }

  &:-ms-input-placeholder {
    font-size: 14px;
    font-family: "Muli-Regular";
    color: #999;
    transform: translateY(1px);
  }

  &:-moz-placeholder {
    font-size: 14px;
    font-family: "Muli-Regular";
    color: #999;
    transform: translateY(1px);
  }

  &:focus {
    border-bottom: 1px solid #accffe;
  }
}

button {
  border: none;
  width: 100%;
  height: 49px;
  margin-top: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #99ccff;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 2px;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    z-index: 2;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(52, 152, 253, 0.25);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &:after {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  &:hover {

    &:before,
    &:after {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
}

@media (max-width: 991px) {
  .inner {
    width: 400px;
    left: 4%;
  }
}

@media (max-width: 767px) {
  .inner {
    width: 100%;
    left: 0;
  }

  .image-1,
  .image-2 {
    display: none;
  }

  form {
    padding: 35px;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
  }

  .wrapper {
    background: none;
  }
}
</style>
