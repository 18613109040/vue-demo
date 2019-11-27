interface IData {
  [key:string]: string;
}
interface IVue{
  data?: IData;
  $data?: IData;
}

export {
   IData,
   IVue
}