<template>
  <div class="login">
    <info :ruleForm="contextInfo" @on-behavior="onLogin" @refreshVerify="refreshVerify" />
  </div>
</template>

<script lang="ts">

import { reactive, onBeforeMount ,getCurrentInstance} from "vue";
import info, { ContextProps } from "../components/info/index.vue";
import { getVerify, getLogin,getUserInfo } from "/@/api/user";
import { useRouter } from "vue-router";
import { storageSession } from "/@/utils/storage";
import { warnMessage, successMessage } from "/@/utils/message";
export default {
  name: "login",
  components: {
    info
  },
  setup() {

    const router = useRouter();
    
    // 刷新验证码
    const refreshGetVerify = async () => {
      let { svg } = await getVerify();
      contextInfo.svg = svg;
    };

    const contextInfo: ContextProps = reactive({
      username: "",
      password: "",
      verify: null,
      svg: null
    });

    const toPage = (info: Object): void => {
        console.log(JSON.stringify(info))
      storageSession.setItem("info", info);
      router.push("/");
    };

    // 登录
    const onLogin = async () => {

      let { username, password} = contextInfo;
      let { status, data } = await getLogin({
        username: username,
        password: password,
      });
      successMessage(data)
      if (status===200){
          let { status, data } = await getUserInfo({
              username: username,
              password: password,
          });

          if(status===200){
              toPage({
                  info: data,
              })
          }

      }
     /* code === 0
        ? successMessage(msg) &&
          toPage({
            username: username,
            accessToken
          })
        : warnMessage(msg);*/
    };

    const refreshVerify = (): void => {
      refreshGetVerify();
    };

    onBeforeMount(() => {
      // refreshGetVerify();
    });

    return {
      contextInfo,
      onLogin,
      router,
      toPage,
      refreshVerify
    };
  }
};
</script>
