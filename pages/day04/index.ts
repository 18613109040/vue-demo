import SnabbDom from "./snabbdom";
import h from "./h";
const snabbdom = new SnabbDom();
// const oldH = h({
//   sel: 'div',
//   data: {},
//   children: [],
//   text: 'hello world'
// })
const newH = h({
  sel: "span",
  data: {},
  children: [
    h({sel:"div", children: [], text: "children1"}),
    h({sel:"div", children: [], text: "children2"})
  ],
  text: "hello world"
});
snabbdom.patch(document.getElementById("app"), newH);
// snabbdom.patch(oldNode, newH);
