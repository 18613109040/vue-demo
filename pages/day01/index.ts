var snabbdom = require('snabbdom');
var h = require('snabbdom/h').default;
var patch = snabbdom.init([
  // Init patch function with chosen modules
  require("snabbdom/modules/class").default, // makes it easy to toggle classes
  require("snabbdom/modules/props").default, // for setting properties on DOM elements
  require("snabbdom/modules/style").default, // handles styling on elements with support for animations
  require("snabbdom/modules/eventlisteners").default // attaches event listeners
]);

var app = document.getElementById("app");

class Vue {
  public vm: { $options?: any } ={

  };
  public sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: (a?: any, b?: any, c?: any)=> {},
    set: (a?: any, b?: any, c?: any)=> {}
  }
  constructor(options:any){
    const {el,data,render} = options;
    this.vm.$options = Object.assign({},options,{ _isVue: true} )
    this.init(this.vm);
  }
  init(vm:any){
    this.initState(vm)
    this.initRender(vm)
  }
  
  initState(vm:any){
    this.initData(vm)
  }
  initData(vm:any){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data() : data||{};
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
      const key = keys[i]
      if(!this.isReserved(key))
        this.proxy(vm, `_data`, key)
    }
  }
  initRender(vm:any){
    let render = vm.$options.render.call(this.vm);
    patch(app, render)
  }
  isReserved (str: string): boolean {
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
  }
  proxy (target: Object, sourceKey: string, key: string) {
    this.sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    }
    this.sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, this.sharedPropertyDefinition)
  }
}

new Vue({
  el: 'app',
  data: {
    title: '张三'
  },
  render(){
    // @ts-ignore
    return h('div', {
      'on': {
        // 'click': this.clickFn
      },
    }, this.title)
  }
})
