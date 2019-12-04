var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
var h = require('snabbdom/h').default;

class Vue {
  public data : any ;
  constructor(options:any){
    const vm: any = this;
    this.data = this.initState(vm);
    this.initRender(vm);
  }
  initRender(vm:any) {
    console.dir(vm)
    patch()
  }
  initState(vm:any){
    const proxyObj =  new Proxy(vm.options.data, {
      get: (target, key:string, receiver) => {
        return Reflect.get(target, key, receiver);
      },
      set: (target, key:string, value, receiver) => {
        console.log(`setting ${key}=${value}`);
        return Reflect.set(target, key, value, receiver);
      }
    })
    return proxyObj;
  }
}

const vm = new Vue({
  el: '#app',
  data: {
    name: 'zs'
  },
  render(){
    return h()
  }
})
console.dir(vm.data.name='sss')