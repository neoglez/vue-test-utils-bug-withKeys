# vue-test-utils-bug-withKeys

This repo explores the possibility that Vue Test Utils (VTU) contains a bug that does not allow tests passing successfully, when using Vue Js [`h()` render function](https://vuejs.org/api/render-function.html) and [withKeys](https://github.com/vuejs/core/blob/9c304bfe7942a20264235865b4bb5f6e53fdee0d/packages/runtime-dom/src/directives/vOn.ts#L60).

The repo contains two parts: the first part is the functionality itself, i.e., by running `npm run serve:universal` an application launches where the user can enter keyboard characters in a form input. When the user presses other key than Escape (Keyboard event with `key = "Escape"`), the text `"You did not press the Esc key"` is displayed. If the user does press Escape, the text reads `"You just pressed the Esc key"`.

The second part is a VTU test that attempt to test exactly that functionality. `npm run test` runs the test.

Some recommendations has been done by VTU members to make the test pass, e.g., see [this comment](https://github.com/vuejs/test-utils/issues/1852#issuecomment-1309186816). The problem is that if those changes are applied, the test passes, however the component does not work any more.

The expected behavior is to have both functionality (part one: `npm run serve:universal`) and test passing (part two: `npm run test`) successfully executed.

Special attention has to be taken when changing line 40 in HelloWorld.js since replacing `escape` by `Escape` breaks the functionality. The same situation in line 31 in HelloWorld.js: replacing `Escape` by `escape` breaks the component (an issue with Vue Js?).