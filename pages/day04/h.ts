import { VNode, vnode } from './vnode'
export function h( options : VNode ): VNode {
  let {sel, data, children, text } = options
  let childrens:any = []
  if(children){
    Array.of(children).map((child ,index)=>{
      childrens[index] = vnode(undefined,undefined, child, undefined, undefined)
    })
  }
  return vnode(sel,data,childrens, text, undefined)
}
export default h;