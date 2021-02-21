<template>
  <div>
    <el-button type="primary"
               icon="el-icon-plus"
               style="margin-bottom: 20px"
               @click="showAdd">添加</el-button>
    <el-table :data="trademarkList"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       width="80px"
                       align="center">
      </el-table-column>
      <el-table-column prop="tmName"
                       label="品牌名称"
                       align="center">

      </el-table-column>
      <el-table-column prop="logoUrl"
                       label="品牌LOGO"
                       align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl"
               style="width:100px;height:60px">
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="fixTrademark(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteTrademark(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title='添加品牌'
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="ruleForm"
               style="width:80%">
        <el-form-item label="品牌名称"
                      prop="tmName"
                      :label-width="formLabelWidth">
          <el-input v-model="form.tmName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO"
                      prop="logoUrl"
                      :label-width="formLabelWidth">
          <el-upload class="avatar-uploader"
                     action="/dev-api/admin/product/fileUpload"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <div class="el-upload__tip"
                 slot="tip">只能上传jpg/png文件，且不超过2M</div>
            <img v-if="form.logoUrl"
                 :src="form.logoUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <template>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="getTrademark"
                     :current-page="currentPage1"
                     :page-sizes="[3, 4, 5, 6]"
                     :page-size="limit"
                     layout="prev, pager, next, jumper,->, sizes,total"
                     :total="total"
                     style="text-align:center;margin-top:25px">
      </el-pagination>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      page: 1, // 页码
      formLabelWidth: '100px',
      currentPage1: 1,
      limit: 3, // 每页条数
      total: 1, // 数据总数
      trademarkList: [], // 品牌列表
      dialogFormVisible: false,
      form: {
        tmName: '',
        logoUrl: '',
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
          },
        ],
        logoUrl: [
          { required: true, message: '请上传品牌图片', trigger: 'change' },
        ],
      },
    }
  },
  mounted() {
    this.getTrademark()
  },
  methods: {
    //删除
    deleteTrademark(row) {
      this.$confirm(`是否删除${row.tmName}`, '删除操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$API.trademark.deleteTrademark(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          //更新数据
          this.getTrademark(
            this.trademarkList.length === 1 && this.page > 1
              ? this.page - 1
              : this.page
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //点击修改按钮
    fixTrademark(trademark) {
      this.form = { ...trademark }
      this.dialogFormVisible = true
    },
    //点击添加按钮
    showAdd() {
      //显示对话框
      this.dialogFormVisible = true
      //初始化数据
      this.form = {
        tmName: '',
        logoUrl: '',
      }
      //清空表单验证
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    //点击确定按钮
    addUpdate() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        const res = await this.$API.trademark.addorUpdateTrademark(this.form)
        //调用接口
        if (res.code === 200) {
          this.$message.success(
            `${this.form.id ? '修改品牌成功' : '添加品牌成功'}`
          )
          //关闭对话框
          this.dialogFormVisible = false
          //刷新品牌数据
          this.getTrademark(this.form.id ? this.page : 1)
        }
      })
    },
    //获取品牌
    async getTrademark(page = 1) {
      this.page = page
      const res = await this.$API.trademark.getTrademarkList(page, this.limit)
      if (res.code === 200) {
        this.trademarkList = res.data.records
        this.total = res.data.total
      }
    },
    //每页显示多少条
    handleSizeChange(limit) {
      this.limit = limit
      this.getTrademark()
    },
    //更新上传图片的地址
    handleAvatarSuccess(res, file) {
      //res.data是图片地址
      this.form.logoUrl = res.data
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
    //限制图片的大小和格式
    beforeAvatarUpload(file) {
      //const isJPG = file.type === 'image/jpeg'
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
