<template>
  <div>
    <el-card>
      <!--      搜索框-->
      <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="标签名称:" prop="categoryName">
          <el-input v-model.trim="searchForm.categoryName" />
        </el-form-item>
        <el-form-item label="分类名称:" prop="name">
          <el-select v-model="searchForm.name" clearable filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" @click="getlist">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset('searchFormRef')">重置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <!--      table表格-->
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="序号" width="180" type="index" />
        <el-table-column prop="categoryName" label="标签名称" width="180" />
        <el-table-column prop="name" label="分类名称" width="180" />
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
    <!--    新增弹框-->
    <label-dialog :title="addtitle" :form-data="addform" :options="options" :dialog-form-visible="addVisable" @handleclose="addhandleClose" @handleSubmit="handleAdd" />
    <!--    编辑弹框-->
    <label-dialog :title="edittitle" :form-data="editform" :options="options" :dialog-form-visible="editVisable" @handleclose="edithandleClose" @handleSubmit="handleEdit" />
  </div>
</template>

<script>
import labelApi from '@/api/label'
import labelDialog from '@/components/commonDialog/labelDialog'
import categoryApi from '@/api/category'
export default {
  name: 'Label',
  components: { labelDialog },
  data() {
    return {
      searchForm: {
        categoryName: '',
        name: ''
      },
      tableData: [],
      queryInfo: {
        query: '',
        current: 1,
        size: 20
      },
      total: 0, // 总记录数
      options: [],
      addVisable: false, // 新增弹框
      addform: {},
      addtitle: '新增',
      edittitle: '编辑',
      editVisable: false, // 编辑弹框
      editform: {}
    }
  },
  created() {
    this.getlist()
    this.getnormal()
  },
  methods: {
    // 重置
    reset(formName) {
      this.$refs[formName].resetFields()
    },
    getlist() {
      labelApi.getList(this.queryInfo).then(response => {
        const resp = response.data
        this.tableData = resp.records
        this.total = resp.total
        console.log(response)
      })
    },
    getnormal() {
      labelApi.getNormalList().then(response => {
        const resp = response.data
        console.log('111', resp)
        this.options = resp.filter(item => item.status === 1)
        console.log('options', this.options)
      })
    },
    handleSizeChange(val) {
      this.queryInfo.size = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.queryInfo.current = val
      this.getlist()
    },
    // 编辑
    edit(id) {
      this.editVisable = true
      labelApi.getById(id).then(response => {
        const resp = response.data
        this.editform = resp
      })
    },
    del(id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        labelApi.deleteById(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getlist()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      this.addVisable = true
    },
    addhandleClose(val) {
      this.addVisable = val
    },
    handleAdd(data) {
      labelApi.add(data).then(response => {
        this.$message.success('新增成功')
        this.getlist()
        this.addVisable = false
      })
    },
    edithandleClose(val) {
      this.editVisable = val
    },
    handleEdit(data) {
      labelApi.update(data).then(response => {
        this.$message.success('更新成功')
        this.editVisable = false
        this.getlist()
      })
    }

  }

}
</script>

<style scoped>

</style>
