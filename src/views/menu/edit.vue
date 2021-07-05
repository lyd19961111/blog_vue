<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose">
    <el-form ref="formData" :model="formData" label-width="100px" style="width:400px" status-icon>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio v-if="formData.parentId!==0" :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item v-if="formData.type!==3" label="请求地址" prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item v-if="formData.type!==3" label="图标" prop="icon">
        <el-input v-model="formData.icon" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" :autosize="{minRows:2,maxRows:4}" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import menuApi from '@/api/menu.js'
export default {
  name: 'EditVue',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    remoteClose: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    // 关闭窗口
    handleClose(done) {
      this.$refs['formData'].resetFields()
      this.remoteClose()
    },
    // 提交表单
    submitForm() {
      if (this.formData.type === 3) {
        this.formData.url = ''
        this.formData.icon = ''
      }
      if (this.formData.id) {
        menuApi.update(this.formData).then(response => {
          if (response.code === 20000) {
            this.$message.success(('更新成功'))
            this.handleClose()
          }
        })
      } else {
        menuApi.add(this.formData).then(response => {
          console.log('1111')
          if (response.code === 20000) {
            this.$message.success('新增成功')
            this.handleClose()
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
