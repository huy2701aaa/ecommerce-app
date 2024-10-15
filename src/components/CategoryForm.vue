<script lang="ts" setup>
import { ACTION_ENUM } from "@/common/enum";
import type { TCategory, TColor } from "@/common/type";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import BaseUpload from "@/base/BaseUpload.vue";
import { useCategory } from "@/composables/useCategory";
import { useCategoryStore } from "@/stores/category";
import type { FormInstance, FormRules } from "element-plus";

const appStore = useAppStore();
const categoryStore = useCategoryStore();

const { createCategory, getCategoryList, updateCategory } = useCategory();
const { singleCategory } = storeToRefs(categoryStore);

const { actionType } = storeToRefs(appStore);

const actionText = computed(() =>
  actionType.value === ACTION_ENUM.CREATE ? "Tạo" : "Cập nhật"
);

const ruleFormRef = ref<FormInstance>()

const handleCloseForm = () => {
  appStore.setIsShowActionForm(false);
  appStore.setIsShowOverlay(false);
};

const ruleForm = reactive<TCategory>({
  name: "",
  image: "",
  productNumber: 0,
})

const rules = reactive<FormRules<TCategory>>({
  name: [
    { required: true, message: 'Tên danh mục không được bỏ trống', trigger: ['change', 'blur'] },
  ],
  image: [
    { required: true, message: 'Ảnh không được bỏ trống', trigger: ['change', 'blur'] },
  ],
})



const handleChangeFile = (url: string) => {
  ruleForm.image = url;
};

const handleSubmit = async () => {
  await ruleFormRef?.value?.validate(async (valid, fields) => {
    if (valid) {
      actionType.value === ACTION_ENUM.CREATE
        ? await createCategory(ruleForm)
        : await updateCategory(ruleForm, singleCategory.value.id as number);
      await getCategoryList();

      handleCloseForm();
    } else {
      console.log('error submit!', fields)
    }
  })
};

watch(
  () => singleCategory.value,
  () => {
    ruleForm.name = singleCategory.value.name
    ruleForm.image = singleCategory.value.image
  }
);

onUnmounted(() => {
  categoryStore.setSingleCategory({
    name: "",
    image: "",
    productNumber: 0,
  });

  appStore.setActionType(ACTION_ENUM.CREATE);
});
</script>

<template>
  <el-card class="category-form-container">
    <div class="top">
      <h2>{{ actionText }} danh mục</h2>
      <el-icon style="cursor: pointer; font-size: 16px" @click="handleCloseForm">
        <CloseBold />
      </el-icon>
    </div>
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="Tên danh mục" label-position="top" prop="name">
        <el-input v-model="ruleForm.name" placeholder="Nhập tên danh mục" />
      </el-form-item>

      <el-form-item label="Ảnh danh mục" label-position="top" prop="image">
        <BaseUpload @change="handleChangeFile" :url="ruleForm.image" />
      </el-form-item>

      <div class="bottom">
        <el-button type="info" @click="handleCloseForm">Hủy</el-button>
        <el-button type="success" @click="handleSubmit">{{
          actionType === ACTION_ENUM.CREATE ? "Thêm" : "Sửa"
        }}</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.category-form-container {
  width: 30vw;
  height: 50vh;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-icon {
      cursor: pointer;
      font-size: 25px;
    }
  }

  .el-form {
    margin-top: 30px;
    position: relative;

    .el-input {
      height: 40px;
    }

    .bottom {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      right: 0;
      bottom: 4px;

      .el-button {
        height: 50px;
        width: 120px;
      }
    }
  }
}

.category-form-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.category-form-container::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.category-form-container::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.562);
}
</style>
