<template>
  <div>
    <!-- 分类组件 -->
    <el-card>
      <CategorySelector @changeCategory="changeCategory"
                        ref="cs" />
    </el-card>
    <!-- 表格数据 -->
    <el-card style="margin-top: 20px">
      <div v-if="isShow">
        <el-button type="primary"
                   icon="el-icon-plus"
                   :disabled="!category3Id"
                   style="margin-bottom: 10px"
                   @click="addAttrValue">添加属性</el-button>
        <el-table :data="attrList"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="80px"
                           align="center">
          </el-table-column>
          <el-table-column prop="attrName"
                           label="属性名称"
                           width="200"
                           align="center">
          </el-table-column>
          <el-table-column label="属性值列表">
            <template v-slot="{row}">
              <el-tag type="info"
                      v-for="attr in row.attrValueList"
                      :key="attr.id">{{attr.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="150"
                           align="center">
            <template v-slot="{row}">
              <el-button size="mini"
                         icon="el-icon-edit"
                         @click="addOrfix(row)"></el-button>
              <el-popconfirm :title="`这是一段内容确定删除${row.attrName}吗?`"
                             @onConfirm="delAttrValue(row.id)">
                <el-button size="mini"
                           slot="reference"
                           icon="el-icon-delete"
                           type="danger"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或者修改界面 -->
      <div v-else>
        <el-form inline
                 :model="formData">
          <el-form-item label="属性名称">
            <el-input type="text"
                      v-model="formData.attrName"></el-input>
          </el-form-item>
          <div>
            <el-button type="primary"
                       icon="el-icon-plus"
                       :disabled="!formData.attrName"
                       @click="addAttr">添加属性值</el-button>
            <el-button @click="isShow=true">
              取消
            </el-button>
            <el-table :data="formData.attrValueList"
                      border
                      style="width: 100%;margin-top:20px">
              <el-table-column type="index"
                               label="序号"
                               width="120px"
                               align="center">
              </el-table-column>
              <el-table-column label="属性名称">
                <template v-slot="{row}">
                  <el-input type="text"
                            v-if="row.edit"
                            size="mini"
                            ref="inputfocus"
                            v-model="row.valueName"
                            @blur="toSee(row)"
                            @keyup.enter.native="toSee(row)"
                            placeholder="请输入名称"></el-input>
                  <span v-else
                        style="width:100%;display:block"
                        @click="toedit(row)">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template v-slot="{row,$index}">
                  <el-popconfirm :title="`这是一段内容确定删除${row.valueName}吗?`"
                                 @onConfirm="delAttr($index)">
                    <el-button size="mini"
                               slot="reference"
                               icon="el-icon-delete"
                               type="danger"></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary"
                       style="margin-top: 10px"
                       @click="saveAttr"
                       :disabled="!(formData.attrValueList.length&&formData.attrName)">保存</el-button>
            <el-button style="margin-top: 10px"
                       @click="isShow=true">取消</el-button>

          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'AttrList',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShow: true,
      formData: {
        attrName: '',
        attrValueList: [],
      },
    }
  },
  methods: {
    //删除平台属性
    async delAttrValue(attrId) {
      try {
        await this.$API.attr.deleteAttrById(attrId)
        this.$message.success('删除成功')
        //刷新页面
        this.getAttrList()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    //添加主属性
    addAttrValue() {
      this.isShow = false
      this.formData = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    //保存
    async saveAttr() {
      this.formData.attrValueList = this.formData.attrValueList.filter(
        (valueList) => {
          delete valueList.edit
          return valueList.valueName.trim()
        }
      )
      //调接口
      try {
        await this.$API.attr.addOrUpdate(this.formData)
        this.$message.success('操作成功')
        //关闭界面
        this.isShow = true
        //刷新
        this.getAttrList()
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    //编辑模式
    toedit(row) {
      if (!row.hasOwnProperty('edit')) {
        this.$set(row, 'edit', true)
      } else {
        row.edit = true
      }
      this.$nextTick(() => {
        this.$refs.inputfocus.focus()
      })
    },
    //查看模式
    toSee(row) {
      const isRepear =
        this.formData.attrValueList.filter(
          (attr) => attr.valueName === row.valueName
        ).length === 2
      if (isRepear) {
        this.$message.warning('内容不能重复')
        row.valueName = ''
        return
      }
      row.edit = false
    },
    //添加属性值
    addAttr() {
      this.formData.attrValueList.push({
        valueName: '',
        attrId: this.formData.id,
        edit: true,
      })
      this.$nextTick(() => {
        this.$refs.inputfocus.focus()
      })
    },
    //删除属性值
    delAttr(index) {
      this.formData.attrValueList.splice(index, 1)
    },
    //修改或者添加按钮
    addOrfix(row) {
      this.isShow = false
      //this.formData = JSON.parse(JSON.stringify(row))
      this.formData = cloneDeep(row)
    },
    //获得平台属性的方法
    async getAttrList() {
      const res = await this.$API.attr.getAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      )
      if (res.code === 200) {
        this.attrList = res.data
      }
    },
    changeCategory(categoryId) {
      //分类信息的组件某个下拉框中内容改变后触发事件，调用该回调函数
      if (categoryId.category1Id) {
        //清空数据，只有三级分类的时候有
        this.attrList = []
        this.category2Id = ''
        this.category3Id = ''
        this.category1Id = categoryId.category1Id
      } else if (categoryId.category2Id) {
        this.attrList = []
        this.category3Id = ''
        this.category2Id = categoryId.category2Id
      } else {
        this.category3Id = categoryId.category3Id
        this.getAttrList()
      }
    },
  },
  watch: {
    isShow(val) {
      this.$refs.cs.isdisable = !val
    },
  },
}
</script>
<style>
</style>
