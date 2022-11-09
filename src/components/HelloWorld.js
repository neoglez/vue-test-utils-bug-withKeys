import { defineComponent, h, withKeys } from "vue";

function data() {
  return {
    currentInputValue: "",
    inputInfoFlag: false
  }
}

export const vueComponent = defineComponent({
  data,
  emits: {
    /**@param { string } testEmitted */
    testEmitted(testEmitted) {
      return true;
    },
  },
  props: {
    testProp: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    /**
     * 
     * @param {KeyboardEvent} event 
     */
    setInputInfo(event) {
      if (event.key === 'Escape') {
        this.inputInfoFlag = true;
      } else {
        this.inputInfoFlag = false;
      }
    }
  },
  render() {

    return [
      h('div', {}, "Click the input. Then press esc. Under the input will appear a note confirming that you press escape."),
      h('span', { class: "span-with-keys", onKeyup: withKeys(/** @param { KeyboardEvent } event */(event) => { this.setInputInfo(event); }, ['escape']) }, h("input", {
        value: this.currentInputValue,
        onInput: (/** @type { KeyboardEvent & { currentTarget: { value: string } } } */ event) => { this.currentInputValue = event.currentTarget?.value; this.setInputInfo((event)) }
      }
      )),
      h('p', { class: "test-input-info" }, this.inputInfoFlag ? "You just press the Esc key" : "You did not press the Esc key"),
    ];
  }
});