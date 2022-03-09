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
        <a-col :span="6">
          <a-space>
            <a-button @click="download" size="large">下载结果</a-button>
          </a-space>
        </a-col>
        <a-col :span="6">
          <div width="150px">
            <a-progress
              type="line"
              :percent="Math.round(((currentStep + 1) / steps.length) * 100)"
              :strokeWidth="10"
            />
          </div>
        </a-col>

        <a-col :span="6">
          <a-radio-group
            @change="checkPoint"
            v-model:value="steps[currentStep].result"
            button-style="solid"
            size="large"
          >
            <text>命名结果 </text>
            <a-radio-button value="success">成功</a-radio-button>
            <a-radio-button value="fail">失败</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="6">
          <a-space>
            <a-button @click="this.timerEnabled = true" size="large"
              >开始倒计时</a-button
            >

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
              >下一个概念 {{ timerCount.toFixed(1) }}</a-button
            >
          </a-space>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-content>
        <div
          class="container"
          :style="{
            padding: '24px',
            marginTop: '64px',
            background: '#fff',
            Height: '800px',
          }"
        >
          <a-space direction="vertical">
            <p>快捷键：按空格键开始/暂停倒计时，按左右方向键切换图片</p>
            <a-image
              :width="1000"
              :src="steps[currentStep].image"
              style="display: inline-block"
            />
          </a-space>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <!--<input v-model="steps[currentStep].image"/>-->
</template>

<script>
import { defineComponent, ref } from "vue";
import Data from "./components/test_picture-naming.json";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const value1 = ref("fail");
    return {
      value1,
    };
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowRight") {
        this.next();
      }
      if (e.key == "ArrowLeft") {
        this.last();
      }
      if (e.key == " ") {
        this.checkPoint();
      }
    });
  },

  data() {
    return {
      // windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      currentStep: 0,
      steps: [],
      timerCount: 20,
      timerEnabled: false,
    };
  },

  watch: {
    // windowHeight(val) {
    //   console.log("实时屏幕高度：", val, this.windowHeight);
    // },

    // https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount -= 0.1;
        }, 100);
      }
    },
    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount -= 0.1;
          }, 100);
        }
      },
      immediate: true,
    },
  },

  computed: {
    Data() {
      return Data;
    },
  },
  methods: {
    checkPoint() {
      if (this.steps[this.currentStep].status == "unchecked") {
        if (this.timerEnabled == false) {
          this.timerEnabled = true;
        } else {
          this.timerEnabled = false;
          this.steps[this.currentStep].status = "checked";
          this.steps[this.currentStep].result = "success";
          this.steps[this.currentStep].countdown = this.timerCount;
        }
      }
    },
    next() {
      if (this.steps[this.currentStep].status == "unchecked") {
        this.steps[this.currentStep].status = "checked";
      }
      this.currentStep++;
      if (this.steps[this.currentStep].status == "unchecked") {
        this.timerCount = 20;
        this.timerEnabled = true;
      } else {
        this.timerCount = this.steps[this.currentStep].countdown;
      }
      // console.log(this.steps[this.currentStep].name);
    },
    last() {
      if (this.currentStep != 0) {
        this.currentStep--;
      }
      this.timerCount = this.steps[this.currentStep].countdown;
    },

    download() {
      var d = new Date();
      var year = String(d.getFullYear());
      var month = String(d.getMonth() + 1);
      var date = String(d.getDate());
      var hour = String(d.getHours());
      var minute = String(d.getMinutes());
      // reference: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(this.steps);
      let filename =
        "PN_" +
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

  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        this.windowHeight = window.fullHeight;
      })();
    };
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