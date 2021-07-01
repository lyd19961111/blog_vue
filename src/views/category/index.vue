<template>
  <div>
    <el-card>
      <!--      搜索框-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model.trim="searchForm.name" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="searchForm.status" clearable filterable placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.code" :label="item.name" :value="item.code" />
            <!--            <el-option label="禁用" value="0" />-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getList()">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetForm('searchFormRef')">重置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addbtn">新增</el-button>
        </el-form-item>
      </el-form>
      <!--      table表格-->
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="序号" width="180" type="index" />
        <el-table-column prop="name" label="分类名称" width="180" />
        <el-table-column prop="sort" label="排序" width="180" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status===0?'danger':'success'">{{ scope.row.status|Status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页-->
      <el-pagination
        :current-page="queryInfo.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--    编辑弹出框-->
    <common-dialog-vue :title="edittitle" :form-data="editForm" :dialog-form-visible="editVisable" @handleclose="edithandleClose" @handleSubmit="handleEdit" />
    <!--    新增弹出框-->
    <common-dialog-vue :title="addtitle" :form-data="addForm" :dialog-form-visible="addVisable" @handleclose="addhandleClose" @handleSubmit="handleAdd" />
  </div>
</template>

<script>
import categoryApi from '@/api/category.js'
import CommonDialogVue from '@/components/commonDialog/commonDialog'

// 下拉框
const statusOptions = [
  { code: 0, name: '禁用' },
  { code: 1, name: '正常' }
]
export default {
  name: 'Category',
  components: { CommonDialogVue },
  filters: {
    Status: function(val) {
      if (val === 0) {
        return '禁用'
      }
      return '正常'
    }
  },
  data() {
    return {
      // 搜索框
      searchForm: {
      },
      // 条件查询
      statusOptions,
      // table
      tableData: [],
      queryInfo: {
        query: '',
        current: 1,
        size: 20
      },
      total: 0, // 总记录条数,
      editVisable: false, // 编辑弹出框
      editForm: {},
      edittitle: '编辑',
      addtitle: '新增', // 新增
      addForm: {
        name: '',
        status: '',
        sort: '',
        remark: ''
      },
      addVisable: false// 新增按钮弹出框
    }
  },
  created() {
    // 获取列表
    this.getList()
  },
  methods: {
    getList() {
      categoryApi.getList(this.queryInfo).then(response => {
        const resp = response.data
        this.tableData = resp.records
        this.total = resp.total
        console.log(response)
      })
    },
    // 处理页数
    handleSizeChange(val) {
      this.queryInfo.size = val
      this.getList()
    },
    // 处理当前页
    handleCurrentChange(val) {
      this.queryInfo.current = val
      this.getList()
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 编辑操作
    edit(id) {
      this.editVisable = true
      categoryApi.getById(id).then(response => {
        this.$message.success('查询成功')
        const resp = response.data
        this.editForm = resp
      })
    },
    // 新增按钮
    addbtn() {
      this.addVisable = true
    },
    edithandleClose(val) {
      this.editVisable = val
    },
    addhandleClose(val) {
      this.addVisable = val
    },
    handleAdd(formName) {
      categoryApi.add(formName).then(response => {
        this.$message.success('新增成功')
        console.log('新增成功', response)
        this.addVisable = false
        this.getList()
      })
    },
    handleEdit(formName) {
      categoryApi.update(formName).then(response => {
        this.$message.success('更新成功')
        console.log('更新成功', response)
        this.editForm = false
        this.getList()
      })
    },
    // 删除
    del(id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        categoryApi.deleteById(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
