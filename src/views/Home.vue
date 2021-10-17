<template>
  <div class="home">
    <el-header class="el-row is-align-middle is-justify-space-between">
      <!-- Header content -->
      <h3 class=" color">办公室日常信息管理系统</h3>
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
              <template
                v-for="(item,index) in menuData"
                :key="index"
              >
                <el-menu-item
                  :index="(index+1).toString()"
                  @click="changeMenu(index)"
                >
                  <i :class="item.iconClass"></i>
                  <template v-slot:title>
                    <span>{{item.menuName}}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 主要内容 -->
      <el-main>
        <transition name="el-fade-in-linear">
          <FileManage v-show="menuData[2].menuShow"></FileManage>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FileManage from "components/FileManage.vue";
export default {
  components: {
    FileManage,
  },
  data() {
    return {
      circleUrl:
        "https://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png@1280w_1l_2o_100sh.png",
      currentRow: null,
      uname: "",
      menuData: [
        { menuName: "考勤管理", iconClass: "el-icon-s-check", menuShow: false },
        {
          menuName: "会议记录管理",
          iconClass: "el-icon-chat-line-round",
          menuShow: false,
        },
        { menuName: "文件管理", iconClass: "el-icon-document", menuShow: true },
        {
          menuName: "办公室日常事务管理",
          iconClass: "el-icon-s-claim",
          menuShow: false,
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu(index) {
     for(let i = 0; i < this.menuData.length; i++) {
       this.menuData[i].menuShow = false
     }
      this.menuData[index].menuShow = true
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
  height: calc(100vh - 60px);
}
</style>
