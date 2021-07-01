<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="handleClose">
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right" :options="options">
      <el-form-item label="标签名称:" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="分类名称:" prop="categoryId">
        <el-select v-model="formData.categoryId" clearable filterable placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CommonDialogVue',
  props: {
    formData: {
      type: Object,
      default() {
        () => ({})
      }
    },
    title: {
      type: String,
      default: ''
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        () => ([])
      }
    }
  },
  methods: {
    // 关闭
    handleClose() {
      const val = false
      this.$emit('handleclose', val)
    },
    // 确定
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error('错误')
        } else {
          this.$emit('handleSubmit', this.formData)
        }
      })
    }
  }
}
</script>

<style scoped />

