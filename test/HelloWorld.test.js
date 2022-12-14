import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { vueComponent as HelloWorld } from '../src/components/HelloWorld.js';

test('mount HelloComponent component', async () => {
  expect(HelloWorld).toBeTruthy();
});

test('Display input info if the user press escape', async () => {

  const inputInfo = "p.test-input-info";
  const spanWithKeys = "span.span-with-keys";

  const wrapper = mount(HelloWorld, {
    attachTo: document.body
  });


  const inputInfoWrapper = /** @type {import("@vue/test-utils").DOMWrapper<HTMLParagraphElement>} */ (wrapper.get(inputInfo));
  expect(inputInfoWrapper.isVisible()).toBe(true);

  // and the p must display the info,
  expect(inputInfoWrapper.element.innerHTML).toBe("You did not press the Esc key");

  // now press the esc,

  // These don't work:

  // await wrapper.get(spanWithKeys).trigger("keyup.esc");
  // await wrapper.get(spanWithKeys).trigger("keydown.esc");
  // await wrapper.get(spanWithKeys).trigger("keydown", { key: "Escape" });
  // await wrapper.get(spanWithKeys).trigger("keydown", { key: "escape" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { key: "esc" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { key: "escape" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { key: "Escape" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { key: "esc" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { key: "escape" });

  // await wrapper.get(spanWithKeys).trigger("keydown", { code: "27" });
  // await wrapper.get(spanWithKeys).trigger("keydown", { code: "27" });
  // await wrapper.get(spanWithKeys).trigger("keydown", { code: "27" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { code: "27" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { code: "esc" });
  // await wrapper.get(spanWithKeys).trigger("keyup", { code: "escape" });

  await wrapper.get(spanWithKeys).trigger('keyup.Escape');

  // the p must now display the right text.
  expect(inputInfoWrapper.element.innerHTML).toBe("You just pressed the Esc key");

});


