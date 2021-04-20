<template>
  <div>

      <transition name="el-zoom-in-top">
        <div v-show="!isCollapse"  :style="isCollapse?'background:#545c64;height: 0px;':'background:#343a40;height: 50px;'">
        <el-button

              type="primary"
              style="
              color:#fff;
              font-weight:bold;background:rgba(5,6,99,0);border:rgba(5,6,99,0);height: 50px;width:100%;font-size: 20px">
        QuickWord</el-button>
        </div>
      </transition>
  <el-scrollbar>

    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#bfcbd9"
      :unique-opened="false"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
      @select="menuSelect"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import SidebarItem from "./SidebarItem.vue";
import { algorithm } from "../../../utils/algorithm";
import { useDynamicRoutesHook } from "../tag/tagsHook";

export default defineComponent({
  name: "sidebar",
  components: { SidebarItem },
  setup() {
    const router = useRouter().options.routes;

    const store = useStore();

    const route = useRoute();

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    const { dynamicRouteTags } = useDynamicRoutesHook();

    const menuSelect = (indexPath: string): void => {
      let parentPath = "";
      let parentPathIndex = indexPath.lastIndexOf("/");
      if (parentPathIndex > 0) {
        parentPath = indexPath.slice(0, parentPathIndex);
      }
      dynamicRouteTags(indexPath, parentPath);
    };

    return {
      routes: computed(() => algorithm.increaseIndexes(router)),
      activeMenu,
      isCollapse: computed(() => !store.getters.sidebar.opened),
      menuSelect,
    };
  },
});
</script>
