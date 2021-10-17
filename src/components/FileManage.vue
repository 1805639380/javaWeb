<template>
  <div>

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
  </div>
</template>

<script>
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
              this.getFileData.call(this);
            } else {
              this.$message.error("服务器繁忙，请稍后再试！");
            }
          });
      } else {
        this.$message.error("请填写完信息！");
      }
      console.log("submit!");
    },
    handleEdit(index, row) {
      this.$confirm(
        `
        <label class="el-form-item__label">文件类型:</label>
        <input class="el-input__inner" id="file_type" value="${row.file_type}" placeholder="文件类型"/>
        <label class="el-form-item__label">文件名称:</label>
        <input class="el-input__inner" id="file_name" value="${row.file_name}" placeholder="文件类型"/>
        <label class="el-form-item__label">文件路径:</label>
        <input class="el-input__inner" id="file_location" value="${row.file_location}" placeholder="文件类型"/>
      `,
        "修改文件",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "放弃修改",
        }
      )
        .then(() => {
          let fileType = document.querySelector("#file_type").value;
          let fileName = document.querySelector("#file_name").value;
          let fileLocation = document.querySelector("#file_location").value;
          fetch("/api/fileUpdateServlet", {
            method: "post",
            body: `file_id=${row.file_id}&file_name=${fileName}&file_type=${fileType}&file_location=${fileLocation}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status == "0") {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.getFileData.call(this)
              }else {
                  this.$message.error('服务器繁忙，请稍后再试！')
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃修改",
          });
        });
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
                this.getFileData.call(this);
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
    // 获取文件管理数据
    function getFileData() {
      fetch("/api/fileSelectServlet")
        .then((res) => res.json())
        .then((res) => {
          this.fileData = res.data;
        });
    }
    this.getFileData = getFileData;
    getFileData.call(this);
  },
};
</script>

<style scoped>
.table {
  text-align: center;
}
</style>