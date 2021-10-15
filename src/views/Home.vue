<template>
  <div class="home">
      <el-header height="" class="el-row is-align-middle is-justify-space-between">
        <!-- Header content -->
        <h3 class=" color">办公室日常管理系统</h3>
        <div class="userinfo el-row is-align-middle">
          <div class="avatar">
            <el-avatar :size="size" :src="circleUrl"></el-avatar>
          </div>
          <div class="username"><p>欢迎</p></div>
        </div>
      </el-header>
    <el-container>
      <el-aside width="250px">
        <!-- aside content -->
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template v-slot:title>
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template v-slot:title>分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template v-slot:title>选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <template v-slot:title>
                  <span>导航二</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="3"
              >
                <i class="el-icon-document"></i>
                <template v-slot:title>
                  <span>导航三</span>
                </template>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <template v-slot:title>
                  <span>导航四</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 主要内容 -->
      <el-main>
       
        <div class="table">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            border
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              property="date"
              label="日期"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="address"
              label="地址"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentRow: null,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #f7f7f7;
}
.el-header {
  background-color: #fff;
  color: #444;
}
.el-menu {
  height: 100vh;
}
.table {
  text-align: center;
}
</style>
