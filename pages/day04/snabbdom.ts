import vnode, { VNode } from './vnode'
import domApi from './htmldomapi' 
type VNodeQueue = VNode[];
type KeyToIndexMap = {[key: string]: number};
class SnabbDom{
  constructor(){

  }

  init() {

  }
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
  createKeyToOldIdx(children: VNode[], beginIdx: number, endIdx: number): KeyToIndexMap{
    const map: KeyToIndexMap = {};
    for(let i = beginIdx; i<=endIdx; ++i){
      const key = children[i].key;
      if(key){
        map[key] = i;
      }
    }
    return map;
  }
  // 创建Element
  createElm(vnode: VNode, insertedVnodeQueue:VNodeQueue){
    let { children, sel, text } = vnode;
    if(sel){
      const hashIdx = sel.indexOf('#');
      const dotIdx = sel.indexOf('.',hashIdx);
      const hash = hashIdx>0?hashIdx:sel.length;
      const dot = dotIdx>0?dotIdx:sel.length;
      const tag = hashIdx>=0 || dotIdx >= 0 ? sel.slice(0,Math.min(hash,dot)): sel;
      const elm = vnode.elm = domApi.createElement(tag);
      if(hash<dot) elm.setAttribute('id', sel.slice(hash+1,dot));
      if(dotIdx>0) elm.setAttribute('class', sel.slice(dot+1).replace(/\./g, ''));
      if(children&&Array.isArray(children)&&children.length>0){
        for(let i = 0;i< children.length;i++){
          if(children[i]){
            // @ts-ignore
            domApi.appendChild(elm, this.createElm(children[i] as VNode, insertedVnodeQueue))
          }
        }
      }
      if(text){
        domApi.appendChild(elm,domApi.createTextNode(text))
      }
    }else{
      if(text){
        vnode.elm = domApi.createTextNode(text)
      }
    }
    return vnode.elm;
  }
  // 更新
  updataChildren(parentElm: Node,oldChildren: VNode[], newChildren: VNode[], insertedVnodeQueue: VNodeQueue){
    let oldStartIdx:number = 0;
    let oldEndIdx:number = oldChildren.length-1;
    let oldStartVnode: VNode = oldChildren[0];
    let oldEndVnode: VNode = oldChildren[oldEndIdx];

    let newStartIdx:number = 0;
    let newEndIdx:number = newChildren.length-1;
    let newStartVnode: VNode = newChildren[0];
    let newEndVnode: VNode = newChildren[newEndIdx];

    let oldKeyToIdx: KeyToIndexMap|undefined;
    let idxInOld: number;

    while(oldStartIdx<=oldEndIdx && newStartIdx <= newEndIdx){
      if(oldStartVnode === null){
        oldStartVnode = oldChildren[++oldStartIdx];
      }else if(oldEndVnode === null){
        oldEndVnode = oldChildren[--oldEndIdx];
      }else if(newStartVnode === null){
        newStartVnode = newChildren[++newStartIdx];
      }else if(newEndVnode === null){
        newEndVnode = newChildren[--newEndIdx];
      }else if(this.someVnode(oldStartVnode, newStartVnode)){
        this.patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);
        oldStartVnode = oldChildren[++oldStartIdx];
        newStartVnode = newChildren[++newStartIdx];
      }else if(this.someVnode(oldEndVnode,newEndVnode)){
        this.patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);
        oldEndVnode = oldChildren[--oldEndIdx];
        newEndVnode = newChildren[--newEndIdx];
      }else if(this.someVnode(oldStartVnode,newEndVnode)){
        this.patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);
        // @ts-ignore
        domApi.insertBefore(parentElm, oldStartVnode.elm, domApi.nextSibling(oldEndVnode.elm) )
        oldStartVnode = oldChildren[++oldStartIdx];
        newEndVnode = newChildren[--newEndIdx];
      }else if(this.someVnode(oldEndVnode,newStartVnode)) {
        this.patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        // @ts-ignore
        domApi.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldChildren[--oldEndIdx];
        newStartVnode = newChildren[++newStartIdx];
      }else{
        if(!oldKeyToIdx){
          oldKeyToIdx = this.createKeyToOldIdx(oldChildren, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
        // 创建新的Element
        if(!idxInOld){
          // domApi.insertBefore(parentElm,this.createElm())
        }
      }
    }


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