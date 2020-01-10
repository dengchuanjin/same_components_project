import Vue from "vue";

export default Vue.component('anchored-heading', {
  render: function (createElement) {
    // 创建 kebab-case 风格的 ID
    var headingId = this.$slots.default;

    return createElement(
      'h' + (this.level ? this.level : ''),
      [
        createElement('a', {
          class:{
            clearfix: true,
            isBlock: true
          },
          on: {
            click: this.onClone
          },
          attrs: {
            name: headingId,
            href: 'javascript:;'
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      default: () => 1,
      required: false
    }
  },
  methods: {
    onClone() {
      console.log(2);
      
    }
  }
})

