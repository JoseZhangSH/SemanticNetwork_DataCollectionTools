<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }">
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-space>
            <a-button @click="download" size="large">下载结果</a-button>

          </a-space>

        </a-col>
                <a-col :span="4">
            <div width="170px">
            <a-progress
              type="line"
              :percent="Math.round(((currentStep + 1) / steps.length) * 100)"
              :strokeWidth="10"
            />
          </div>

        </a-col>

        <a-col :span="4">
          <a-radio-group
            @change="steps[currentStep].status = 'checked'"
            v-model:value="steps[currentStep].result"
            button-style="solid"
            size="large"
          >
            <a-radio-button value="success">成功</a-radio-button>
            <a-radio-button value="fail">失败</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="4">
          <a-space>
            <a-button @click="countdown" size="large">开始倒计时</a-button>

            <a-button
              type="default"
              size="large"
              @click="currentStep--"
              :disabled="currentStep === 0"
              >上一个概念</a-button
            >
            <a-button
              type="primary"
              size="large"
              @click="next"
              :disabled="currentStep === 2"
              >下一个概念 {{ steps[currentStep].countdown }}</a-button
            >
          </a-space>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-content>
        <div
          class="container"
          :style="{ padding: '24px', background: '#fff', minHeight: '1300px' }"
        >
          <a-space direction="vertical">
            <a-image
              :width="1000"
              :src="steps[currentStep].image"
              style="display: inline-block"
            />
            <!-- <p style="width: 100%; font-size: 32px">
              {{ steps[currentStep].name }}
            </p> -->
          </a-space>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!--<input v-model="steps[currentStep].image"/>-->
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
const { ipcRenderer } = require("electron");

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const value1 = ref("fail");
    return {
      value1,
    };
  },

  data() {
    return {
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      currentStep: 0,
      steps: [
        // {
        //   image: "",
        //   name: "aaaaaaa",
        //   countdown: 20,
        //   result: "fail",
        //   status:"unchecked",
        //   // ...
        // },
        // {
        //   image: "",
        //   name: "vvvvvvv",
        //   countdown: 20,
        //   result: "fail",
        //   status:"unchecked",
        //   // ...
        // },
        // {
        //   image: "",
        //   name: "qqqqqq",
        //   countdown: 20,
        //   result: "fail",
        //   status:"unchecked",
        //   // ...
        // },
      ],
    };
  },
  methods: {
    countdown() {
      setInterval(() => {
        if (this.steps[this.currentStep].status == "unchecked") {
          if (this.currentStep <= 2) {
            if (
              this.steps[this.currentStep].countdown > 0 &&
              this.steps[this.currentStep].countdown <= 20
            ) {
              this.steps[this.currentStep].countdown--;
            } else if (this.steps[this.currentStep].countdown == 0) {
              this.steps[this.currentStep].status = "checked";
              if (this.currentStep != 2) {
                this.currentStep++;
              }
            }
          }
        }
      }, 1000);
    },

    next() {
      if (this.steps[this.currentStep].status == "unchecked") {
        this.steps[this.currentStep].status = "checked";
        // this.steps[this.currentStep].result = "success";
      }
      this.currentStep++;
    },

    download() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(this.steps);
      let filename = "data.json";
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
    const content = ipcRenderer.sendSync(
      "readFile",
      "../public/test_picture-naming.json"
    );
    const obj = JSON.parse(content);
    obj.steps.forEach((element) => {
      this.steps.push(element);
    });

    console.log(this.steps[this.currentStep].image);
    // console.log(obj.currentStep);
  },

  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        this.windowHeight = window.fullHeight;
      })();
    };
  },

  watch: {
    windowHeight(val) {
      console.log("实时屏幕高度：", val, this.windowHeight);
    },
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
}
.container {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>