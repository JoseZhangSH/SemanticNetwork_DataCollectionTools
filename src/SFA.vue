<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }">
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-space>
            <a-button @click="download" size="large">下载结果</a-button>
            <a-button @click="countdown" size="large">开始倒计时</a-button>
          </a-space>
        </a-col>
        <a-col :span="4">
          <a-space>
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
        <a-row type="flex" justify="space-between">
          <a-col :flex="4">
            <div
              class="container"
              :style="{
                padding: '24px',
                minHeight: windowHeight + 'px',
              }"
            >
              <a-space direction="vertical">
                <a-image
                  :src="steps[currentStep].image"
                  style="width: 600px; display: inline-block"
                />
                <p style="width: 100%; font-size: 32px">
                  {{ steps[currentStep].name }}
                </p>
              </a-space>
            </div>
          </a-col>
          <a-col :flex="4">
            <a-space direction="vertical" :size="8">
              <div class="input-block">
                <a-space direction="vertical" align="start" :size="8">
                  <a-typography-title :level="4" style="width: 100%"
                    >图片命名</a-typography-title
                  >
                  <a-radio-group
                    @change="steps[currentStep].status = 'checked'"
                    v-model:value="steps[currentStep].result"
                    button-style="solid"
                    size="large"
                  >
                    <a-radio-button value="success">成功</a-radio-button>
                    <a-radio-button value="fail">失败</a-radio-button>
                  </a-radio-group>
                </a-space>
              </div>

              <div class="input-block">
                <a-space direction="vertical" align="start" :size="8">
                  <a-typography-title :level="4"
                    >语义特征分析</a-typography-title
                  >
                  <a-textarea
                    v-model:value="steps[currentStep].response"
                    placeholder="输入患者生成的语义特征"
                    :auto-size="{ minRows: 5, maxRows: 20 }"
                    style="width: 320px"
                  />
                  <a-tabs v-model:activeKey="activeKey" tabPosition='left'>
                    <a-tab-pane key="1" tab="是" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[1].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                    <a-tab-pane key="2" tab="有" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[5].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                    <a-tab-pane key="3" tab="可以" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[0].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                    <a-tab-pane key="4" tab="需要" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[3].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                    <a-tab-pane key="5" tab="像" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[4].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                    <a-tab-pane key="6" tab="其他" forceRender=true>
                      <a-table
                        :dataSource="steps[currentStep].tab[2].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                    /></a-tab-pane>
                  </a-tabs>
                </a-space>
              </div>
            </a-space>
          </a-col>
        </a-row>
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
    // const activeKey = ref("3");

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (selected, selectedRows) => {
        if (selectedRows == true) {
          this.steps[this.currentStep].dataSource[selected.key - 1].status =
            "Yes";
        } else {
          this.steps[this.currentStep].dataSource[selected.key - 1].status =
            "No";
        }

        console.log(selected.key, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

    return {
      value1,
      activeKey: ref("5"),
      rowSelection,
    };
  },

  data() {
    return {
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      currentStep: 0,
      columns: [
        {
          title: "语义特征名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "线索度",
          dataIndex: "cue_validity",
          key: "cue_validity",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cue_validity - b.cue_validity,
        },
        {
          title: "相关概念",
          dataIndex: "related_concepts",
          key: "related_concepts",
        },
        {
          title: "混淆特征",
          dataIndex: "confused_feature",
          key: "confused_feature",
        },
        // {
        //   title: "掌握状态",
        //   dataIndex: "status",
        //   key: "status",
        // },
      ],
      steps: [],
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
      "/Users/zhanghexin/aphasia_viz/src/assets/test_SFA.json"
    );
    const obj = JSON.parse(content);
    obj.steps.forEach((element) => {
      this.steps.push(element);
      console.log(element);
    });

    // console.log(this.steps[this.currentStep].image);
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
.input-block {
  width: auto;
  align-items: flex-start;
  display: flex;
  padding: 24px;
  margin-top: 24px;
  background-color: white;
}
</style>