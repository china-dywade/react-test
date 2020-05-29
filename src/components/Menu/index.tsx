import * as React from 'react';
import { Button } from 'antd';
import { throttle2 } from '../../utils'
import { DownloadOutlined } from '@ant-design/icons';


export interface MenuProps {
  menuData:any;
  addCompont:any;
  toValue:any;
}
// 获取滚动条的高度
function  getScrollTops () {
  var scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop;
  }
  else if (document.body) {
    scroll_top = document.body.scrollTop;
  }
  return scroll_top;
}

export interface MenuState {
  getScrollTops?(): any;
}
class Menu extends React.Component<MenuProps, MenuState> {
  time:any;
  constructor(props: MenuProps) {
    super(props);
  }

  insertAfter = (newNode:any, existingNode:any,parent:any) => {
    // console.log(newNode, 'newNode', existingNode, 'existingNode', parent);
    
    // 如果父元素中的最后一个子元素 等于 现有的节点
    if (parent.lastChild === existingNode) {
      // 把现有节点放入父元素子节点后面
      // appendChild在子节点后面追加一个元素
      parent.appendChild(newNode, existingNode);
    } else {
      // .nextSibling 该属性返回指定节点后的第一个节点
      // insertBefore 第一个参数插入的节点对象，第二参数可选，在其之前插入子节点，如果不传，则在结尾插入。
      
      parent.insertBefore(newNode, existingNode.nextSibling);
      
    }
  }
  moveList = (item: any, ev: any) => {
    throttle2(this.fn(item, ev),500);
  }

  fn = (item:any,ev:any)=> {
    let down = false
    let px = ev.clientX;
    let py = ev.clientY;
    let isDrop = false;
    let isflage = false
    let _this = this;
    let moveWrap = document.getElementById("moveWrap");
    let wrapList = document.getElementById("wrap__list");
    let list = document.querySelector(".com__list");
    let dom = ev.target.cloneNode(true);
    let wrapListStyle: any;
    let domli: any;
    let  mouseDownAndUpTimer:any = null;
    let  onMouseDownFlag = false;
    mouseDownAndUpTimer = setTimeout(function () {
      // OnMouseDown Code in here
      onMouseDownFlag = true;
      if (moveWrap) {
        down = true
        moveWrap.innerHTML = "";
        moveWrap.style.transition = 'none';
        moveWrap.style.display = 'block';
      }
      if (wrapList) {

        wrapListStyle = {
          w: wrapList.offsetWidth,
          h: wrapList.offsetHeight,
          left: 230,
          top: wrapList.offsetTop - 74
        }
      }
    }, 200);


    document.onmousemove = function (ev) {  

      let time;
      if (!down) return;
      if (time && (Date.now() - time) < 16) return
      time = Date.now()
      if (moveWrap){
        moveWrap.appendChild(dom);
        let w = moveWrap.offsetWidth;
        let h = moveWrap.offsetHeight;
        let left = ev.clientX - (w / 2);
        let top  = ev.clientY - (h / 2);     
        let clientW = document.documentElement.clientWidth || document.body.clientWidth;
        let b2 = wrapListStyle.left;
        let r2 = wrapListStyle.top;
        let l2 = b2 + wrapListStyle.w + (w / 2);
        let t2 = r2 + wrapListStyle.h + (h / 2); 
        let client = document.documentElement.clientHeight;

        if (left < wrapListStyle.left || top < wrapListStyle.top || left > l2 || top > t2) {// 碰撞检测表示没碰上
          isDrop = false;
          if (domli) {
            domli.remove();
          }
        } else {
          isDrop = true; 
        } 
        let scrop = getScrollTops()
        
        if (client - ev.clientY < 100 && isDrop){  
          document.documentElement.scrollTop += 3; 
        }
        if (ev.clientY < 100 && isDrop){
          document.documentElement.scrollTop -= 3;
        }

        if (_this.props.toValue.e != undefined  && list && isDrop) {
          // console.log(_this.props.toValue.e,'_this.props.toValue.e_this.props.toValue.e');
          
          if (domli){
            domli.remove();
          }
        
          domli = _this.props.toValue.e.cloneNode(true);
          domli.id = "";
          domli.innerHTML = "";
          domli.style.height = '113px';
          domli.style.border = "1px dashed #2672ff";
          domli.style.transition = "all .1s cubic-bezier(.2,0,0,1) 0s";
          if (top <= _this.props.toValue.h) {
            list && list.insertBefore(domli, _this.props.toValue.e)

          } else {
            _this.insertAfter(domli, _this.props.toValue.e, list);

          }
       


          // if (top <= _this.props.toValue.h) { //  "before"
          //   _this.props.toValue.e.style.transform = `translateY(-${_this.props.toValue.e.offsetHeight})`;
          // } else { // "after"
          //   _this.props.toValue.e.style.transform = `translateY(${_this.props.toValue.e.offsetHeight})`;
          // }
     

         

        }


 
        if (left < clientW - w && left > 0) {
          moveWrap.style.left = left + 'px';
        }

        if (top < clientW - h && top > 0) {
          moveWrap.style.top = top + 'px';
        }



      }
    }
    document.onmouseup = function (ev) {

      if (onMouseDownFlag) {
        if (domli && isDrop) {
          domli.remove();
        }
        if (moveWrap) {
          if (isDrop) {
            let str = "";
            let h = moveWrap.offsetHeight;
            let top = ev.clientY - (h / 2);

            moveWrap.innerHTML = "";
            moveWrap.style.display = 'none';
            moveWrap.style.left = '0px';
            moveWrap.style.top = '0px';

            if (_this.props.toValue.index == undefined) {
              _this.props.addCompont(item);
            } else {
              if (top <= _this.props.toValue.h) {
                str = "before"
              } else {
                str = "after"
              }
              _this.props.addCompont(item, _this.props.toValue.index, str);
            }

          } else {
            let w = moveWrap.offsetWidth;
            let h = moveWrap.offsetHeight;
            moveWrap.style.left = px - w / 2 + 'px';
            moveWrap.style.top = py - h / 2 + 'px';
            moveWrap.style.transition = 'all 1s linear';
            setTimeout(() => {
              if (moveWrap) {
                moveWrap.innerHTML = "";
                moveWrap.style.display = 'none';
              }
            }, 1000);

          }

        }

        document.onmousemove = null
        document.onmousedown = null
        document.onmouseup = null







      } else {
        clearTimeout(mouseDownAndUpTimer); // 清除延迟时间
      }



      
    }
    return false;//阻止默认事件 屏蔽火狐的bug
  }

  render() { 
    return ( 
          <div className="menu__list">
              {
                this.props.menuData.map( (item:any) => {  
                  // 一定要 return ()  否则会报错
                  return (              
                    <Button  key={item.fId}  onMouseDown={this.moveList.bind(this, item)} onClick={(e) => this.props.addCompont(item)} >{item.name}</Button> 
                  ) 

                })
              }
     
     
          </div>
     );
  }
}
 
export default Menu;