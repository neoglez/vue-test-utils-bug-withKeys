# vue-test-utils-bug-withKeys

This repo explore the possibility that Vue Test Utils (VTU) contains a bug that does not allow paasing tests successfully, when using Vue Js [`h()` render function](https://vuejs.org/api/render-function.html) [withKeys](https://github.com/vuejs/core/blob/9c304bfe7942a20264235865b4bb5f6e53fdee0d/packages/runtime-dom/src/directives/vOn.ts#L60).

The repo contains two parts: the first part is the functionality itself, i.e., by running `npm run serve:universal` an application launches where the user can enter keyboard charachters in a from input. When the user press other key than Escape (Keyboard event with `key = "Escape"`), the text `"You did not press the Esc key"` is displayed. If the user does press Escape, the text reads `"You just pressed the Esc key"`.

The second part is a VTU test that attempt to test exactly that functionality. `npm run test` runs the test.

Some recommendations has been done by VTU members to make the test pass, e.g., see [this comment]. The problem is that if those changes are applyied, the test passes, howver the component does not work any more.

The expected behavior is to have both funtionality (part one: `npm run serve:universal`) and test passing (part two: `npm run test`) succesfuly executed.