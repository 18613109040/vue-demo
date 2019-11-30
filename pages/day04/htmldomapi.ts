export interface DOMAPI {
  insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node|null) => void;
  nextSibling: (node:Node) => Node|null;
  createElement: (tagName: any) => HTMLElement;
  appendChild: (node: Node, child: Node) => void;
  createTextNode: (text: string) => Text;
}
function insertBefore(parentNode: Node, newNode: Node, referenceNode: Node|null):void{
  parentNode.insertBefore(newNode,referenceNode)
}
function nextSibling(node: Node): Node| null{
  return node.nextSibling;
}
function createElement(tagName: any):HTMLElement {
  return document.createElement(tagName);
}
function appendChild(node: Node, child: Node): void {
  node.appendChild(child);
}
function createTextNode(text: string): Text {
  return document.createTextNode(text);
}
export const htmlDomApi:DOMAPI = {
  insertBefore,
  nextSibling,
  createElement,
  appendChild,
  createTextNode
};
export default htmlDomApi;