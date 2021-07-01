<template>
  <div>
    <el-card>
      <!--      条件查询-->
      <el-form :inline="true" size="mini">
        <el-form-item label="广告标题:">
          <el-input v-model.trim="query.title" />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="query.status" clearable filterable style="width: 85px">
            <el-option v-for="item in statusOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="searchForm">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
          <el-button icon="el-icon-refresh">新增</el-button>
        </el-form-item>
      </el-form>
      <!--      table表单-->
      <el-table :data="list" border highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" />
        <el-table-column prop="title" label="广告标题" />
        <el-table-column label="广告图片">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]"
              style="width:90px;height: 60px"
            /></template></el-table-column>
        <el-table-column prop="advertUrl" label="广告链接" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status===0" type="danger">禁用</el-tag>
            <el-tag v-show="scope.row.status===1" type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页-->
      <el-pagination
        :current-page="page.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import advertApi from '@/api/advert.js'

const statusOptions = [
  { code: 0, name: '禁用' },
  { code: 1, name: '正常' }
]
export default {
  name: 'Advert',
  data() {
    return {
      list: [],
      page: { // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20 // 每页显示20条
      },
      query: {}, // 条件查询
      statusOptions
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      advertApi.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 编辑
    handleEdit(id) {

    },
    // 删除
    handleDelete(id) {

    },
    // 重置
    resetForm() {
      this.query = {}
      this.fetchData()
    },
    // 查询
    searchForm() {
      console.log('111')
    }
  }
}
</script>

<style scoped>

</style>
