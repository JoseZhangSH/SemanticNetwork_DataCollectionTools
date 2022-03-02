<template>
  <a-tabs v-model:activeKey="activeKey" tabPosition="top">
    <a-tab-pane key="属于" tab="属于" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['属于']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group>
    </a-tab-pane>

    <a-tab-pane key="用于" tab="用于" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['用于']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group>
    </a-tab-pane>
    <a-tab-pane key="做" tab="做" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['做']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group>
    </a-tab-pane>
    <a-tab-pane key="有" tab="有" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['有']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group>
    </a-tab-pane>
    <a-tab-pane key="在" tab="在哪里" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['在']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group></a-tab-pane
    >
    <a-tab-pane key="联想到" tab="联想到" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['联想到']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group>
    </a-tab-pane>
    <a-tab-pane key="其他" tab="其他" force-render>
      <a-input-group size="large">
        <a-row :gutter="8" justify="center">
          <a-col :span="8">
            <a-input v-model:value="inputValue" @pressEnter="input">
              <template #addonAfter>
                <enter-outlined />
              </template>
            </a-input>
          </a-col>
          <a-col :span="2">
            <a-dropdown placement='topCenter'>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item
                    v-for="item in MENTION_DATA['其他']"
                    v-bind:key="item"
                  >
                    {{ item }}
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button size="large"> 备选项 </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-input-group></a-tab-pane
    >
  </a-tabs>
</template>


<script>
import { defineComponent, ref } from "vue";
import { EnterOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "App",
  props: {
    MENTION_DATA: Object,
  },
  components: {
    EnterOutlined,
  },
  setup() {
    const activeKey = ref("属于");
    const inputValue = ref("");

    return {
      activeKey,
      inputValue,
      // handleMenuClick,
    };
  },

  methods: {
    // work around for key enter event with mention component https://github.com/ant-design/ant-design/issues/7430
    input() {
      let childData = {
        rel: this.activeKey,
        node: this.inputValue.replace(/(?:\r\n|\r|\n)/g),
      };
      this.$emit("enterPress", childData, "");
      this.inputValue = "";
    },

    handleMenuClick(e) {
      let childData = {
        rel: this.activeKey,
        node: e.key,
      };
      this.$emit("enterPress", childData, "");
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