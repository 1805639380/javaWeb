<template>
  <div class="home">
    <el-header class="el-row is-align-middle is-justify-space-between">
      <!-- Header content -->
      <h3 class=" color">办公室日常管理系统</h3>
      <div class="userinfo el-row is-align-middle">
        <div class="avatar">
          <router-link to="/login">
            <el-avatar :src="circleUrl"></el-avatar>
          </router-link>
        </div>
        <div class="username">
          <p>{{uname}}欢迎</p>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <!-- aside content -->
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="3"
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
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <template v-slot:title>
                  <span>导航二</span>
                </template>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <template v-slot:title>
                  <span>文件管理</span>
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
        <el-form
          :inline="true"
          :model="formInline"
          class="form-inline"
        >
          <el-form-item label="文件类型">
            <el-input
              v-model="formInline.type"
              placeholder="文件类型"
            ></el-input>
          </el-form-item>
          <el-form-item label="文件名称">
            <el-input
              v-model="formInline.name"
              placeholder="文件名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="文件地址">
            <el-input
              v-model="formInline.location"
              placeholder="文件地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >添加</el-button>
          </el-form-item>
        </el-form>
        <div class="table">
          <el-table
            ref="singleTable"
            :data="fileData"
            highlight-current-row
            border
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              property="file_type"
              label="文件类型"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="file_name"
              label="文件名称"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="file_location"
              label="文件地址"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
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
      formInline: {
        name: "",
        type: "",
        location: "",
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      currentRow: null,
      uname: "",
      fileData: [],
    };
  },
  methods: {
    onSubmit() {
      if (
        this.formInline.name !== "" &&
        this.formInline.type !== "" &&
        this.formInline.location !== ""
      ) {
        fetch("/api/fileAddServlet", {
          method: "post",
          body: `file_type=${this.formInline.type}&file_name=${this.formInline.name}&file_location=${this.formInline.location}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getFileData.call(this)
            } else {
              this.$message.error("服务器繁忙，请稍后再试！");
            }
          });
      } else {
        this.$message.error("请填写完信息！");
      }
      console.log("submit!");
    },
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          fetch("/api/fileDeleteServlet", {
            method: "post",
            body: "file_id=" + row.file_id,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getFileData.call(this)
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败,请稍后再试！",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    // 判断用户是否登录
    fetch("/api/judgeLoginServlet", {
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "0") {
          this.uname = res.data.uname;
        } else {
          this.$message.error("您还未登录，请先登录！");
          this.$router.replace("/login");
        }
      });

    // 获取文件管理数据
    function getFileData() {
      fetch("/api/fileSelectServlet")
        .then((res) => res.json())
        .then((res) => {
          this.fileData = res.data;
        });
    }
    this.getFileData = getFileData
    getFileData.call(this)
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
