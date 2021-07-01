<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" width="70%">
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right">
      <el-form-item label="标题">
        <el-input v-model="formData.title" readonly />
      </el-form-item>
      <el-form-item label="标签：">
        <el-cascader
          v-model="formData.labelIds"
          style="display: block"
          disabled
          :options="labelOptions"
          :props="{multiple:true,emitPath:false,children:'labelList',value:'id',label:'name', expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="主图">
        <img :src="formData.imageUrl" class="avatar" style="width:178px;height:178px;display: block">
      </el-form-item>
      <el-form-item label="是否公开">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="0">不公开</el-radio>
          <el-radio :label="1">公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.summary" type="textarea" :autosize="{minRows:2}" readonly />
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor ref="md" v-model="formData.mdContent" :editable="false" />
      </el-form-item>
      <el-form-item v-if="isAudit" align="center">
        <el-button type="primary" @click="auditSuccess()">审核通过</el-button>
        <el-button type="danger" @click="auditFail()">审核不通过</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import articleApi from '@/api/article.js'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'AuditVue',
  components: { mavonEditor },
  props: {
    id: null, // 文章id
    isAudit: {
      type: Boolean,
      default: false
    }, // 是否为审核页面，false为详情页
    visible: {
      // 弹出隐藏
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelOptions: [], // 所有标签数组
      formData: {}// 表单数据
    }
  },
  watch: {
    // 监听visible变化
    visible(val) {
      if (val) {
        this.getArticleById()
        this.getLabelOptions()
      }
    }
  },
  methods: {
    getLabelOptions() {
      articleApi.getCategoryAndLabel().then(response => {
        this.labelOptions = response.data
      })
    },
    // 查询文章详情
    getArticleById() {
      // 通过id查询数据
      articleApi.getById(this.id).then(response => {
        this.formData = response.data
      })
    },
    handleClose() {
      this.$emit('handleclose', false)
    },
    // 审核通过
    auditSuccess() {
      this.$confirm('确定审核通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        articleApi.auditSuccess(this.id).then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '审核通过提交成功!'
          })
          // 关闭窗口
          this.handleClose()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 审核不通过
    auditFail() {
      this.$confirm('确定审核不通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        articleApi.auditFail(this.id).then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '审核不通过提交成功!'
          })
          // 关闭窗口
          this.handleClose()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleChange() {

    }
  }
}
</script>

<style scoped>

</style>
