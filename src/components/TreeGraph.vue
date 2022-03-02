<template>
  <div
    id="container"
    :style="{ width: '100%', height: '800px', background: '#F0F2F5' }"
  ></div>
</template>

<script>
import G6 from "@antv/g6";
// const graph;
// import Util from "@antv/g6";

export default {
  name: "TreeGraph",
  props: {
    graphdata: Object,
    checkStatus: String,
  },
  // setup(props, context) {
  //   // Attribute (非响应式对象)
  //   console.log(context.attrs);

  //   // 插槽 (非响应式对象)
  //   console.log(context.slots);

  //   // 触发事件 (方法)
  //   console.log(context.emit);
  // },

  mounted() {
    this.drawGraph();
  },
  methods: {
    addChildren(child) {
      // var d = new Date();
      // var second = String(d.getSeconds());

      if (typeof this.graph.findById(child["id"]) == "undefined") {
        const data = {
          id: child["id"],
          label: child["label"],
          feature_type: child["feature_type"],
        };
        this.graph.addChild(data, "root");

        if (this.checkStatus == "checked") {
          this.graph.setItemState(
            this.graph.findById("root"),
            "unchecked",
            false
          );
        } else {
          this.graph.setItemState(
            this.graph.findById("root"),
            "unchecked",
            true
          );
        }
      }
    },
    // showLabel() {
    //   // console.log("showLabel");
    //   // this.graph.updateItem(item, model);
    //   const item = this.graph.findById("root");
    //   this.graph.setItemState(item, "unchecked", false);
    // },

    drawGraph() {
      // const data = this.graphdata;
      const container = document.getElementById("container");

      // TO DO
      // node text editing

      if (container) {
        const width = container.clientWidth * 0.8;
        const height = container.clientHeight;
        const graph = new G6.TreeGraph({
          container: container,
          width: width,
          height: height,
          fitView: true,
          fitViewPadding: [ 40, 40, 40, 40 ],
          // modes: { default: ["drag-canvas", "zoom-canvas"] },

          defaultEdge: {
            type: "cubic-horizontal",
            style: {
              lineWidth: 2,
            },
          },
          layout: {
            type: "compactBox",
            direction: "H",
            getSide: (node) => {
              let arr = ["属于", "用于", "做"];
              // console.log(node.data.feature_type)
              if (arr.indexOf(node.data.feature_type) >= 0) return "left";
              return "right";
            },
            // getHeight: () => {
            //   return 16;
            // },
            // // getWidth: (node) => {
            // //   return node.level === 0
            // //     ? Util.getTextSize(node.label, 16)[0] + 12
            // //     : Util.getTextSize(node.label, 12)[0];
            // // },
            getVGap: () => {
              return 8;
            },
            getHGap: () => {
              return 80;
            },
            // getSide: (node) => {
            //   return node.data.direction;
            // },
          },
        });

        this.graph = graph;

        graph.node(function (node) {
          if (node.id == "root") {
            return {
              id: node.id,
              type: "image",
              size: [150, 100],
              labelCfg: {
                style: {
                  fill: "#000",
                  fontFamily: "Helvetica",
                },
              },
              stateStyles: {
                unchecked: {
                  "text-shape": {
                    opacity: 0,
                  },
                },
              },
            };
          } else {
            return {
              id: node.id,
              type: "rect",
              style: {
                fill: "#fff",
                stroke: "#0050b3",
                lineWidth: 2,
                radius: 8,
              },
              labelCfg: {
                style: {
                  fill: "#000",
                  fontFamily: "Helvetica",
                },
              },
            };
          }
        });

        graph.edge(function (edge) {
          // console.log(graph.findDataById(edge.target).feature_type);

          return {
            type: "cubic-horizontal",
            label: graph.findDataById(edge.target).feature_type,
            style: {
              lineWidth: 2,
            },
            labelCfg: {
              style: {
                fontSize: 8,
                fill: "#666",
                fontFamily: "Helvetica",
              },
            },
          };
        });

        graph.data(this.graphdata);
        graph.render();
        graph.fitView();

        graph.setItemState(graph.findById("root"), "unchecked", true);
      }
    },
  },
  watch: {
    graphdata: function () {
      // console.log('good');
      this.graph.changeData(this.graphdata);
      if (this.checkStatus == "checked") {
        this.graph.setItemState(
          this.graph.findById("root"),
          "unchecked",
          false
        );
      } else {
        this.graph.setItemState(this.graph.findById("root"), "unchecked", true);
      }
    },
    checkStatus: function () {
      if (this.checkStatus == "checked") {
        this.graph.setItemState(
          this.graph.findById("root"),
          "unchecked",
          false
        );
      } else {
        this.graph.setItemState(this.graph.findById("root"), "unchecked", true);
      }
    },
  },
};
</script>

<style>
#TreeGraph {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
