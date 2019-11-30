/**
 * 极简双向绑定的实现
 * 通过es6 Proxy 实现
 * 
 */

// document.getElementById('app').insertBefore(document.getElementById('input'),document.getElementById('name'))
// (()=>{
//   var obj: any = new Proxy({},{
//     get: (target, key:string, receiver) => {
//       return Reflect.get(target, key, receiver);
//     },
//     set: (target, key:string, value, receiver) => {
//       console.log(`setting ${key}=${value}`);
//       document.getElementById('name').innerHTML = value
//       return Reflect.set(target, key, value, receiver);
//     }
//   })
//   document.addEventListener('keyup', (e:any)=>{
//     obj.name = e.target.value;
//   })
// })();
