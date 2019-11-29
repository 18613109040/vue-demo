
(()=>{
  var obj: any = new Proxy({name:2},{
    get: (target, key:string, receiver) => {
      return Reflect.get(target, key, receiver);
    },
    set: (target, key:string, value, receiver) => {
      console.log(`setting ${key}=${value}`);
      return Reflect.set(target, key, value, receiver);
    }
  })
  obj.name = '张三';
})();
