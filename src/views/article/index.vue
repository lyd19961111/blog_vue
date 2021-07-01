<template>
  <div>
    <el-card>
      <!--      条件查询-->
      <el-form :inline="true" size="mini">
        <el-form-item label="文章标题:">
          <el-input v-model.trim="searchForm.title" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="searchForm.status" clearable filterable placeholder="请选择">
            <el-option :value="1" label="未审核" />
            <el-option :value="2" label="审核通过" />
            <el-option :value="3" label="审核未通过" />
            <el-option :value="0" label="已删除" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <!--      table表格-->
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="序号" type="index" />
        <el-table-column prop="title" label="文章标题" />
        <el-table-column prop="viewCount" label="浏览量" />
        <el-table-column prop="thumhup" label="点赞数" />
        <el-table-column prop="ispublic" label="是否公开">
          <template slot-scope="scope" prop="scope.row.ispublic">
            <el-tag :type="scope.row.ispublic===0?'danger':'success'">{{ scope.row.ispublic|articlePublic }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope" prop="scope.row.status">
            <el-tag :type="typeStatus(scope.row.status)">{{ scope.row.status|articleStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="最后更新时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openView(scope.row.id)">查看</el-button>
            <el-button v-show="scope.row.status===1" size="mini" type="success" @click="openAudit(scope.row.id)">审核</el-button>
            <el-button v-show="scope.row.status !==0" size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <!--    审核弹框-->
    <audit :id="audit.id" :is-audit="audit.isAudit" :title="audit.title" :visible="audit.visible" @handleclose="handleclose" />
  </div>
</template>

<script>
import articleApi from '@/api/article'
import Audit from '@/views/article/audit'
export default {
  name: 'Article',
  components: { Audit },
  filters: {
    articlePublic(val) {
      if (val === 1) {
        return '公开'
      }
      return '不公开'
    },
    articleStatus(val) {
      switch (val) {
        case 0:
          return '已删除'
        case 1:
          return '未审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核未通过'
      }
    }
  },
  data() {
    return {
      searchForm: {}, // 条件查询
      tableData: [],
      queryInfo: {
        query: '',
        current: 1,
        size: 20
      },
      total: 0,
      audit: { // 子组件中引用
        id: null,
        isAudit: true,
        visible: false,
        title: ''
      }
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    typeStatus(status) {
      switch (status) {
        case 0:
          return 'danger'
        case 1:
          return 'primary'
        case 2:
          return 'success'
        case 3:
          return 'info'
      }
    },
    getList() {
      articleApi.getlist(this.searchForm, this.queryInfo.current, this.queryInfo.size).then(response => {
        const resp = response.data
        this.tableData = resp.records
        this.total = resp.total
      })
    },
    handleSizeChange(val) {
      this.queryInfo.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryInfo.current = val
      this.getList()
    },
    handleclose(val) {
      this.audit.visible = val
    },
    // 打开审核弹框
    openAudit(id) {
      this.audit.id = id
      this.audit.isAudit = true
      this.audit.title = '审核文章'
      this.audit.visible = true
    },
    // 查看
    openView(id) {
      this.audit.id = id
      this.audit.isAudit = false
      this.audit.title = '审核文章'
      this.audit.visible = true
    },
    // 删除
    handleDelete(id) {
      this.$confirm('是否进行删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.deleteById(id).then(response => {
          this.$message.success('删除成功')
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

