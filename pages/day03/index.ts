// (()=>{
//   // function compile(node: Element | any, vm: any){
//   //   // nodeType https://www.w3school.com.cn/jsref/prop_node_nodetype.asp
//   //   const reg = /\{\{(.*)\}\}/;
//   //   const { nodeType, nodeValue } = node;
//   //   // 节点类型为元素
//   //   if(nodeType === 1){
//   //     const attr = node.attributes;
//   //     for(let i=0;i<attr.length;i++){
//   //       const { nodeName, nodeValue } = attr[i]
//   //       if(nodeName === "v-model"){
//   //         node.value = vm[nodeValue];
//   //         node.removeAttribute('v-model');
//   //       }
//   //     }
//   //   }
//   //   // 节点类型为text
//   //   if(nodeType === 3){
//   //     if(reg.test(nodeValue)){
//   //       let name = RegExp.$1;
//   //       name = name.trim();
//   //       node.nodeValue = vm[name]
//   //     }
//   //   }
//   // }
//   // function nodeToFragment(node: Node) {
//   //   const flag = document.createDocumentFragment();
//   //   let child:ChildNode = null;
//   //   while(child = node.firstChild){
//   //     compile(child,null)
//   //     flag.appendChild(child)
//   //   }
//   //   return flag;
//   // };
//   // const root = document.getElementById('app');
//   // const dom = nodeToFragment(root);
//   // root.appendChild(dom);

//   class Vue {
//     public data: any;
//     constructor(options:any) {
//       this.data = options.data;
//       this.observe(this.data, this);
//     }
//     observe(data:any, vm:any) : any {
//       new Proxy(data, {
//         get: (target, key:string, receiver) => {
//           return Reflect.get(vm, key, receiver);
//         },
//         set: (target, key:string, value, receiver) => {
//           console.dir(key)
//           return Reflect.set(vm, key, value, receiver);
//         }
//       })
     
//     }
//   }
//   const vm = new Vue({
//     data: {
//       name: 1
//     }
//   })
//   vm.data.name = 1
// })();



