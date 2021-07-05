<template>
  <div>
    <el-card>
      <el-form :inline="true" size="mini">
        <el-form-item label="菜单名称:">
          <el-input v-model.trim="query.name" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reload">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" @click="handleAdd(0)">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" row-key="id" border highlight-current-row style="width: 100%" :tree-props="{children: 'children'}">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="请求地址" prop="url" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="类型" prop="type">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">目录</span>
            <span v-if="scope.row.type===2">菜单</span>
            <span v-if="scope.row.type===3">按钮</span>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <!--          <i :class="scope.row.icon" />-->
            <span>{{ scope.row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleAdd(scope.row.id)">新增</el-button>
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <edit :title="edit.title" :visible="edit.visible" :form-data="edit.formData" :remote-close="remoteClose" />
  </div>
</template>

<script>
import menuApi from '@/api/menu.js'
import Edit from '@/views/menu/edit'

export default {
  name: 'Menu',
  components: { Edit },
  data() {
    return {
      query: {},
      list: [],
      // 编辑
      edit: {
        title: '编辑',
        visible: false,
        formData: {}
      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      menuApi.getList(this.query).then(response => {
        const resp = response.data
        console.log('resp', resp)
        this.list = resp
      })
    },
    // 新增
    handleAdd(id) {
      this.edit.formData.parentId = id
      this.edit.visible = true
      this.edit.title = '新增'
    },
    // 编辑
    handleEdit(id) {
      menuApi.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.title = '编辑'
          this.edit.visible = true
        }
      })
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuApi.deleteById(id).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 重置
    reload() {
      this.query = {}
      this.fetchData()
    },
    // 弹框
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    }
  }
}
</script>

<style  lang="scss" scoped>
.el-card{
  margin-top: 20px;
}
</style>
