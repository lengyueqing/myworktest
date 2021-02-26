<template>
  <el-form inline>
    <el-form-item label="一级分类">
      <el-select placeholder="请选择"
                 v-model="category1"
                 @change="changeCategory1"
                 :disabled="isdisable">
        <el-option :label="c1.name"
                   v-for="c1 in category1List"
                   :key="c1.id"
                   :value="c1.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select placeholder="请选择"
                 v-model="category2"
                 @change="changeCategory2"
                 :disabled="isdisable">
        <el-option :label="c2.name"
                   v-for="c2 in category2List"
                   :key="c2.id"
                   :value="c2.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select placeholder="请选择"
                 v-model="category3"
                 :disabled="isdisable"
                 @change="changeCategory3">
        <el-option :label="c3.name"
                   v-for="c3 in category3List"
                   :key="c3.id"
                   :value="c3.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      category1: '',
      category2: '',
      category3: '',
      category1List: [],
      category2List: [],
      category3List: [],
      isdisable: false,
    }
  },
  mounted() {
    //获取一级分类信息的数据
    this.getCategory1List()
  },
  methods: {
    //获取一级分类的数据
    async getCategory1List() {
      const res = await this.$API.category.geCategory1()
      if (res.code === 200) {
        this.category1List = res.data
      }
    },
    //选择一级分类值时，获得二级分类列表
    async changeCategory1(category1Id) {
      this.category2 = ''
      this.category3 = ''
      this.category2List = []
      this.category3List = []
      this.$emit('changeCategory', { category1Id })
      const res = await this.$API.category.geCategory2(category1Id)
      if (res.code === 200) {
        this.category2List = res.data
      }
    },
    async changeCategory2(category2Id) {
      this.category3 = ''
      this.category3List = []
      this.$emit('changeCategory', { category2Id })
      const res = await this.$API.category.geCategory3(category2Id)
      if (res.code === 200) {
        this.category3List = res.data
      }
    },
    async changeCategory3(category3Id) {
      this.$emit('changeCategory', { category3Id })
    },
  },

}
</script>

<style>
</style>