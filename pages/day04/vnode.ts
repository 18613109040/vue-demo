export type Key = string | number;

export interface VNode {
  sel:  string| undefined;
  data?: VNodeData | undefined;
  children?: Array<VNode|string> | undefined;
  elm?: Node | undefined;
  text?: string | undefined;
  key?: Key;
}
export interface VNodeData {
  props?: Object;
  key?: Key
}

export function vnode(sel: string| undefined,
                      data: VNodeData | undefined,
                      children: Array<string> | undefined,
                      text: string | undefined,
                      elm :Node | undefined
  ): VNode {
    const key = data === undefined ? undefined: data.key;
    return { sel, data, children, text, elm ,key }
  }

export default vnode;