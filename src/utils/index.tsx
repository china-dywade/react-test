

export  function getClass(o:any) { //判断数据类型
  return Object.prototype.toString.call(o).slice(8, -1);
}



// 函数节流
export  function throttle2(method:any, duration:any){
   // 当前时间间隔内是否有方法执行,设置一个开关标识
   var runFlag = false;
   // 返回一个事件处理函数
   return function(e:any) {
     // 判断当前是否有方法执行,有则什么都不做,若为true,则跳出
     if(runFlag){
       return false;
      }
     // 开始执行
      runFlag = true;
      // 添加定时器,在到达时间间隔时重置锁的状态
      setTimeout(function(){
          method(e);
          // 执行完毕后,声明当前没有正在执行的方法,方便下一个时间调用
          runFlag = false;
      }, duration)
   }
}



export  function copyfn(obj:any) {
  var result:any, oClass:any = getClass(obj);

  if (oClass == "Object") result = {}; //判断传入的如果是对象，继续遍历
  else if (oClass == "Array") result = []; //判断传入的如果是数组，继续遍历
  else return obj; //如果是基本数据类型就直接返回

  for (var i in obj) {
    var copy = obj[i];

    if (getClass(copy) == "Object") result[i] = copyfn(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
    else if (getClass(copy) == "Array") result[i] = copyfn(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
    else result[i] = copy; //基本数据类型则赋值给属性
  }

  return result;
}


export function closest  (el: any, selector: any)  {

  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {

    if (matchesSelector.call(el, selector)) {

      break;

    }

    el = el.parentElement;

  }
  return el;
}

