import vnode, { VNode } from './vnode'
type VNodeQueue = VNode[];
class SnabbDom{
  constructor(){

  }

  init() {

  }
  // h('div', [
  //   h('input', {props: {type: 'radio', name: 'test', value: '0'},
  //               on: sharedHandler}),
  //   h('input', {props: {type: 'radio', name: 'test', value: '1'},
  //               on: sharedHandler}),
  //   h('input', {props: {type: 'radio', name: 'test', value: '2'},
  //               on: sharedHandler})
  // ]);
  // createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
  //   const { data, sel } = vnode;
  //   if(sel){

  //   }
  //   return vnode.elm
  // }
  // 判断是否是真实dom
  isVnode(vnode: any): boolean{
    return vnode.sel !== undefined;
  }
  // 真实dom 转成虚拟dom
  elementToVnode(elm: Element ): VNode {
    let { id, className, tagName } = elm;
    id = id ? `#${id}`: '';
    className = className ? `.${className.split(' ').join('.')}` : '';
    const sel = `${tagName.toLowerCase()}${id}${className}`
    return vnode(sel, {}, [], undefined, elm);
  }
  // 判断是否是相同虚拟dom
  someVnode(vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }
  patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue?: VNodeQueue) {
    const elm = vnode.elm = oldVnode.elm;
    const oldChildren = oldVnode.children;
    const children = vnode.children;
    if(oldVnode === vnode) return;
    if(vnode.text) {
      if(oldChildren && children){

      }
    }
    console.dir(elm)
  }
  patch(oldVnode: Element | VNode | any, vnode: VNode): VNode {
    let elm:Node, parent: Node | null;
    // 判断是真实dom还是虚拟dom
    if(!this.isVnode(oldVnode)){
      oldVnode = this.elementToVnode(oldVnode);
    }
    if(this.someVnode(oldVnode, vnode)){
      this.patchVnode(oldVnode,vnode)
    }else{
      elm = oldVnode.elm;
      parent = elm.parentNode;
      console.dir(elm)
    }
    // this.patchVnode(oldVnode,vnode)
    return oldVnode;
  }
}
export default SnabbDom