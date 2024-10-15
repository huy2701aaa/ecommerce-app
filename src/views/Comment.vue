<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { useComment } from "@/composables/useComment";
import { useCommentStore } from "@/stores/comment";
import { exportToExcel } from "@/utils/export";
import { formatDate } from "@/utils/format";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

const commentStore = useCommentStore();

const { commentList } = storeToRefs(commentStore);

const tableData = computed(() => commentList.value.map(item => {
  return {
    id: item.id,
    productId: item.productId,
    email: item.user?.email,
    content: item.content,
    image: item.image,
    createdAt: formatDate(item.createdAt as string)
  }
}));

const { getComments, deleteComment } = useComment();

const tableColumns = [

  { prop: "productId", label: "ID sản phẩm", width: "auto" },
  { prop: "email", label: "Email người dùng", width: "auto" },
  { prop: "content", label: "Nội dung", width: "auto" },
  { prop: "image", label: "Ảnh", width: "auto" },
  { prop: "createdAt", label: "Thời gian", width: "auto" },

];


const handleDelete = async (id: number) => {
  await deleteComment(id);
  await getComments();
};

const handleExportFile = () => {
  exportToExcel(commentList.value)
}

onMounted(() => getComments());
</script>

<template>
  <div class="comment-container">
    <div class="comment-list">
      <BaseTable styleValue="height: 700px" :data="tableData" :columns="tableColumns" :isHiddenComponent="true" :isHiddenUpdate="true"
        screen="bình luận" @delete="handleDelete" @export="handleExportFile" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .comment-featured {
    width: 100%;
    display: flex;
    align-items: center;

    .el-card {
      height: 200px;
      flex: 1;
      margin: 20px;
    }
  }

  .comment-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    .el-input {
      margin-bottom: 20px;
    }
  }
}
</style>
