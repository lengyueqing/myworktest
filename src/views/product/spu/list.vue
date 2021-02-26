<template>
  <div>
    <el-card>
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary"
                 icon="el-icon-plus"
                 style="margin-bottom: 10px">添加属性SPU</el-button>
      <el-table :data="spuInfoList"
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="80px"
                         align="center">
        </el-table-column>
        <el-table-column prop="spuName"
                         label="SPU名称"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column prop="description"
                         label="SPU描述"
                         width="200"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template>
            <HintButton title="添加SKU"
                        size="mini"
                        type="primary" />
            <HintButton title="修改SPU"
                        size="mini"
                        type="primary" />
            <HintButton title="查看SKU"
                        size="mini"
                        type="info" />
            <HintButton title="删除SPU"
                        size="mini"
                        type="danger" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SpuList',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 5,
      total: 0,
      spuInfoList: [],
    }
  },
  methods: {
    //获取spuInfoList的数据方法
    async getSpuInfoList(page = 1) {
      this.page = page
      const catgoryId = this.category3Id
      const res = await this.$API.spu.getSpuInfoList(
        page,
        this.limit,
        catgoryId
      )
      if (res.code === 200) {
        console.log(res)
        const { records, total } = res.data
        //保存数据
        this.spuInfoList = records
        this.total = total
      }
    },
    //分发的自定义事件，获取对应的分类Id数据
    changeCategory(categoryId) {
      //分类信息的组件某个下拉框中内容改变后触发事件，调用该回调函数
      if (categoryId.category1Id) {
        //清空数据，只有三级分类的时候有
        this.spuInfoList = []
        this.category2Id = ''
        this.category3Id = ''
        this.total = 0
        this.category1Id = categoryId.category1Id
      } else if (categoryId.category2Id) {
        this.spuInfoList = []
        this.total = 0
        this.category3Id = ''
        this.category2Id = categoryId.category2Id
      } else {
        this.category3Id = categoryId.category3Id
        this.getSpuInfoList()
      }
    },
  },
}
</script>

<style>
</style>
