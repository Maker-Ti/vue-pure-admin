<template>
  <div class="navbar">
    <Hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <screenfull />
     <!-- <div class="inter" :title="langs ? '中文' : '英文'" @click="toggleLang">
        <img :src="langs ? ch : en" />
      </div>-->
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="roundIcon" src="http://127.0.0.1:8080/user/image?name=rect.png" />
          <i class="el-icon-caret-bottom"></i>

        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item style="text-align: center">
              Sign in <span style="font-weight:bold;font-size: 16px">{{ usename }}</span>
            </el-dropdown-item>
            <el-divider style=""></el-divider>
            <el-dropdown-item  icon="el-icon-switch-button" @click="logout">
              {{ $t("LoginOut") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import Breadcrumb from "/@/components/BreadCrumb";
import Hamburger from "/@/components/HamBurger";
import screenfull from "../components/screenfull/index.vue";
import { useMapGetters } from "../store";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { storageSession } from "/@/utils/storage";
import { useI18n } from "vue-i18n";
import ch from "/@/assets/ch.png";
import en from "/@/assets/en.png";
import favicon from "/favicon.ico";
export default defineComponent({
  name: "Navbar",
  components: {
    Breadcrumb,
    Hamburger,
    screenfull,
  },
  setup() {
    let langs = ref(true);

    const store = useStore();
    const router = useRouter();

    let usename = storageSession.getItem("info").username;

    const { locale } = useI18n();

    // 国际化语言切换
    const toggleLang = (): void => {
      langs.value = !langs.value;
      langs.value ? (locale.value = "ch") : (locale.value = "en");
    };

    // 退出登录
    const logout = (): void => {
      storageSession.removeItem("info");
      router.push("/login");
    };

    onMounted(() => {
      document
        .querySelector(".el-dropdown__popper")
        ?.setAttribute("class", "resetTop");
      document
        .querySelector(".el-popper__arrow")
        ?.setAttribute("class", "hidden");
    });

    return {
      // @ts-ignore
      ...useMapGetters(["sidebar"]),
      toggleSideBar() {
        store.dispatch("app/toggleSideBar");
      },
      langs,
      usename,
      toggleLang,
      logout,
      ch,
      en,
      favicon
    };
  },
});
</script>

<style lang="scss" scoped>
  .el-divider{
    margin:0 ;
  }

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    .inter {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 5px;
      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
      img {
        width: 25px;
      }
    }
    .el-dropdown-link {
      padding-left: 5px;
      padding-right: 5px;
      width: 45px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 20px;
      p {
        font-size: 13px;
      }
      &:hover {
        background: #f0f0f0;
      }
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}
// single element-plus reset
.el-dropdown-menu__item {
  font-size: 13px;
  padding: 0 10px;
}
.el-dropdown-menu {
  border-radius: 5px;
  padding-top: 5px;

padding-bottom: 5px}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #fff;
  background: #409EFF;

}
</style>
