<template>
    <a-form layout="horizontal" >
      <a-form-item
        label="记录语义特征"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 8 }"
        name="记录语义特征"
        v-bind="inputValue"
       
      >
        <div @keyup.enter="enterPress">
          <a-mentions
            rows="1"
            placement="top"
            v-model:value="value"
            placeholder="请输入以 属于 | 用于 | 做 | 有 | 在 | 联想到 开头的语义特征 "
            :prefix="['属于', '用于', '做', '有', '在', '联想到']"
            @search="onSearch"
          >
            <a-mentions-option
              v-for="value in options"
              :key="value"
              :value="value"
            >
              {{ value }}
            </a-mentions-option>
          </a-mentions>
        </div>
      </a-form-item>
    </a-form>
</template>


<script>
// const { ipcRenderer } = require("electron");
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  props: {
    MENTION_DATA: Object,
  },
  setup(props) {
    // console.log(props.MENTION_DATA);
    const prefix = ref("属于");
    const value = ref("");
    const inputValue = ref("");

    const options = computed(() => {
      return props.MENTION_DATA[prefix.value] || [];
    });
    const onSearch = (_, val) => {
      prefix.value = val;
    };

    return {
      inputValue,
      value,
      options,
      onSearch,
    };
  },

  methods: {
    // work around for key enter event with mention component https://github.com/ant-design/ant-design/issues/7430
    enterPress() {
      // console.log("enterPress");
      this.$emit("enterPress", this.value.replace(/(?:\r\n|\r|\n)/g, ""));
      this.value = "";
    },
  },
  mounted() {},
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>