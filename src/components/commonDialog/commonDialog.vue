<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="handleClose">
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right">
      <el-form-item label="分类名称:" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000" />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" />
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

