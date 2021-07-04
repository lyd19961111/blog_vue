<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="600px">
    <el-form ref="formData" status-icon :model="formData" label-width="100px" label-position="right" style="width:500px">
      <el-form-item label="广告图片" prop="imageUrl">
        <el-upload class="avatar-uploader" accept="image/*" action="" :show-file-list="false" :http-request="uploadMainImg">
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="广告连接" prop="advertUrl">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="跳转方式" prop="advertTarget">
        <el-select v-model="formData.advertTarget" clearable style="width: 185px">
          <el-option label="新窗口打开" value="_blank" />
          <el-option label="当前窗口打开" value="_self" />
        </el-select>
      </el-form-item>
      <el-form-item label="广告位置" prop="position">
        <el-input v-model="formData.position" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" style="width: 300px" :min="1" :max="10000" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button size="mini" type="primary" @click="submit('formData')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import advertApi from '@/api/advert.js'
export default {
  name: 'Edit',
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
    oldImageUrl: {
      type: String,
      default: ''
    }, // 修改前照片
    remoteClose: {
      type: Function,
      default: function() {}
    }// 关闭窗口
  },
  methods: {
    handleClose() {
      this.$refs['formData'].resetFields()
      this.remoteClose()
    },
    // 提交表单
    submit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (this.formData.id) {
            advertApi.update(this.formData).then(response => {
              if (response.code === 20000) {
                this.$message.success('更新成功')
                this.handleClose()
              }
            })
          } else {
            advertApi.add(this.formData).then(response => {
              if (response.code === 20000) {
                this.$message.success('保存成功')
                this.handleClose()
              }
            })
          }
        }
      })
    },

    // 上传主图
    uploadMainImg(file) {
      // console.log('file', file)
      // 封装表单对象
      const data = new FormData()
      data.append('file', file.file)
      // 发送请求上传
      advertApi.uploadImg(data).then(response => {
        // 防止图片多次上传，上传成功后，把原来的图片删掉
        this.deleteImg()
        this.formData.imageUrl = response.data
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    deleteImg() {
      // 防止上传表单没有提交，这样就不能把进去到修改页面时最初的照片删除，如果删除，下次就找不到图片
      if (this.formData.imageUrl && this.formData.imageUrl !== this.oldImageUrl) {
        advertApi.deleteImg(this.formData.imageUrl)
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover{
  border-color:#409EFF;
}
.avatar-uploader-icon{
  font-size: 28px;
  color:#8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar{
  width: 178px;
  height: 178px;
  display: block;
}
</style>
