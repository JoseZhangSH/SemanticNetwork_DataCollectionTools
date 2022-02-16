<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: 0 }">
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-space>
            <a-button @click="download" size="large">下载结果</a-button>
            <!-- <a-button @click="countdown" size="large">开始倒计时</a-button> -->
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
              >下一个概念
            </a-button>
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
                  style="width: 960px; display: inline-block"
                />
                <p style="width: 100%; font-size: 32px" v-if="Math.random() > 0.5">
                  {{ steps[currentStep].name }}
                </p>
              </a-space>
            </div>
          </a-col>
          <a-col :flex="4">
            <a-space direction="vertical" align="end" :size="8">
              <div class="input-block">
                <a-space
                  direction="vertical"
                  align="end"
                  :size="8"
                  style="width: 960px"
                >
                  <a-typography-title :level="3" style="width: 100%"
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
                <a-space
                  direction="vertical"
                  align="end"
                  :size="8"
                  style="width: 960px"
                >
                  <!-- <span style="margin-left: 8px">
                    <a-typography-title>
                      {{ `Selected ${selectedRowKeys} items` }}
                    </a-typography-title>
                  </span> -->
                  <a-typography-title :level="3"
                    >语义特征分析</a-typography-title
                  >
                  <a-typography-title :level="5" style="width: 100%"
                    >记录患者生成的语义特征</a-typography-title
                  >
                  <a-textarea
                    v-model:value="steps[currentStep].response"
                    placeholder="输入患者生成的语义特征, 用回车键分隔"
                    :auto-size="{ minRows: 5, maxRows: 20 }"
                    style="width: 640px"
                  />
                  <a-typography-title
                    :level="5"
                    style="width: 100%; margin-top: 20px"
                    >语义特征识认</a-typography-title
                  >
                  <a-tabs v-model:activeKey="activeKey" tabPosition="right">
                    <a-tab-pane key="1" tab="是" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[1].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
                    /></a-tab-pane>
                    <a-tab-pane key="2" tab="有" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[5].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
                    /></a-tab-pane>
                    <a-tab-pane key="3" tab="可以" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[0].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
                    /></a-tab-pane>
                    <a-tab-pane key="4" tab="需要" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[3].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
                    /></a-tab-pane>
                    <a-tab-pane key="5" tab="像" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[4].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
                    /></a-tab-pane>
                    <a-tab-pane key="6" tab="其他" force-render>
                      <a-table
                        :dataSource="steps[currentStep].tab[2].dataSource"
                        :columns="columns"
                        :row-selection="rowSelection"
                        :custom-row="customRow"
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

import { defineComponent, reactive, ref, toRefs, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // const value1 = ref("fail");
    // const activeKey = ref("3");

    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });

    const selectRow = (record) => {
      const selectedRowKeys = [...state.selectedRowKeys];
      if (selectedRowKeys.indexOf(record.key) >= 0) {
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
      } else {
        selectedRowKeys.push(record.key);
      }
      state.selectedRowKeys = selectedRowKeys;
    };
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys) => {
          state.selectedRowKeys = selectedRowKeys;
        },
      };
    });
    const customRow = (record) => {
      return {
        onClick: () => {
          selectRow(record);
        },
      };
    };

    // const hasSelected = state.selectedRowKeys;

    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(
    //       `selectedRowKeys: ${selectedRowKeys}`,
    //       "selectedRows: ",
    //       selectedRows
    //     );
    //   },
    //   onSelect: (record, selected, selectedRows) => {
    //     console.log(record, selected, selectedRows);
    //     return {
    //       selectedRows,
    //     };
    //   },
    //   onSelectAll: (selected, selectedRows, changeRows) => {
    //     console.log(selected, selectedRows, changeRows);
    //   },
    // };

    // const onSelectChange = (selectedRowKeys) => {
    //   state.selectedRowKeys = selectedRowKeys;
    // };

    return {
      //   value1,
      ...toRefs(state),
      activeKey: ref("5"),
      customRow,
      rowSelection,
      //   onSelectChange,
      //   hasSelected,
    };
  },

  data() {
    return {
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      windowWidth: document.documentElement.clientWidth, //实时屏幕高度

      currentStep: 0,
      columns: [
        {
          title: "语义特征名称",
          dataIndex: "name",
          key: "name",
          align: "right",
        },
        {
          title: "线索度",
          dataIndex: "cue_validity",
          key: "cue_validity",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cue_validity - b.cue_validity,
          align: "right",
        },
        {
          title: "相关概念",
          dataIndex: "related_concepts",
          key: "related_concepts",
          align: "right",
        },
        {
          title: "混淆特征",
          dataIndex: "confused_feature",
          key: "confused_feature",
          align: "right",
        },
        // {
        //   title: "掌握状态",
        //   dataIndex: "status",
        //   key: "status",
        // align:'right',
        // },
      ],
      steps: [],
    };
  },

  watch: {
    // rowSelection() {
    //   console.log("good");
    // },
    windowHeight(val) {
      console.log("实时屏幕高度：", val, this.windowHeight);
    },
    windowWidth(val) {
      console.log("实时屏幕宽度：", val, this.windowWidth);
    },
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
    const content = ipcRenderer.sendSync(
      "readFile",
      "/Users/zhanghexin/aphasia_viz/src/assets/test_SFA.json"
    );
    const obj = JSON.parse(content);
    obj.steps.forEach((element) => {
      this.steps.push(element);
      //   console.log(element);
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
.input-block {
  width: auto;
  align-items: flex-start;
  display: flex;
  padding: 24px;
  margin-top: 24px;
  background-color: white;
}
</style>