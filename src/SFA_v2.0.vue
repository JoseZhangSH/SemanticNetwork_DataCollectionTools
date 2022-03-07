<template>
  <a-layout>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#fff',
        padding: 10,
      }"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-space>
            <a-button @click="download" size="large">下载结果</a-button>
          </a-space>
        </a-col>
        <a-col :span="4">
          <div width="150px">
            <a-progress
              type="line"
              :percent="Math.round(((currentStep + 1) / steps.length) * 100)"
              :strokeWidth="10"
            />
          </div>
        </a-col>

        <a-col :span="4">
          <a-radio-group
            @change="check"
            v-model:value="steps[currentStep].result"
            button-style="solid"
            size="large"
          >
            <text>命名结果 </text>
            <a-radio-button value="success">成功</a-radio-button>
            <a-radio-button value="fail">失败</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="4">
          <a-space>
            <a-button
              type="default"
              size="large"
              @click="last"
              :disabled="currentStep === 0"
              >上一个概念</a-button
            >
            <a-button
              type="primary"
              size="large"
              @click="next"
              :disabled="currentStep === steps.length - 1"
              >下一个概念</a-button
            >
          </a-space>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>

  <TreeGraph
    :graphdata="steps[currentStep].graph"
    :checkStatus="steps[currentStep].status"
    ref="tree"
  />
  <!-- <a-typography-title :level="3" style="width: 100%"
    >这个概念属于__？用于__？能够做__？有__特点？常出现在__？联想到__？</a-typography-title
  > -->
  <Input
    :MENTION_DATA="steps[currentStep].mention"
    @enter-press="addChildren"
    ref="input"
  />
</template>

<script>
// const { ipcRenderer } = require("electron");
import TreeGraph from "./components/TreeGraph.vue";
import Input from "./components/Input.vue";
import Data from "./components/test_SFA.json";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    TreeGraph,
    Input,
  },

  data() {
    return {
      currentStep: 0,
      steps: [],
    };
  },
  computed: {
    Data() {
      return Data;
    },
  },
  methods: {
    next() {
      // if (this.steps[this.currentStep].status == "unchecked") {
      //   this.steps[this.currentStep].status = "checked";
      //   // this.steps[this.currentStep].result = "success";
      // }
      this.currentStep++;
      this.$refs.input.inputInitialize();
    },
    last() {
      this.currentStep--;
      this.$refs.input.inputInitialize();
    },
    check() {
      this.steps[this.currentStep].status = "checked";
      // console.log("checked");
      // this.$refs.tree.showLabel();
    },
    addChildren(n) {
      this.$refs.tree.addChildren({
        id: n.node,
        label: n.node,
        feature_type: n.rel,
      });
      // this.value = "";
    },
    download() {
      var d = new Date();
      var year = String(d.getFullYear());
      var month = String(d.getMonth() + 1);
      var date = String(d.getDate());
      var hour = String(d.getHours());
      var minute = String(d.getMinutes());

      // credit: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(this);
      let filename =
        "SFA_" +
        year +
        "-" +
        month +
        "-" +
        date +
        "-" +
        hour +
        "-" +
        minute +
        ".json";
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
  },
  beforeMount() {
    Data.steps.forEach((element) => {
      this.steps.push(element);
    });
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
