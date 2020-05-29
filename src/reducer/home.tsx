import { object } from "prop-types";

let initState :any;
if (localStorage.getItem("jzData") ){
  let value: any = localStorage.getItem("jzData");
  initState = JSON.parse(value)
}else{
  initState = {
    mouseenterIndex:null,
    isPriview: false,
    menu: [
        {
          checked: false,
          fId:"menu-1",
          url: 'Input',
          type: 'input',
          icon: 'icon-input',
          name: '单行文本',
          saveUrl: 'Input',
          settingData: {
            defaultText: '请输入内容',
            title: '单行文本',
            isSubmit: false,
            answer: "",
            isMust: false,
            maxVal: 30,
            inputLen: '100%',
            rowLen: "100%"
          },
          list: []
        },
        {
          fId: "menu-2",
          type: 'textarea',
          url: 'Textarea',
          icon: "icon-textarea",
          saveUrl: 'Textarea',
          name: '多行文本',
          settingData: {
            defaultText: '多行文本',
            textHeight: '短',
            title: "多行文本",
            maxVal: 300,
            answer: "",
            isSubmit: false,
            isMust: false,
            rowLen: "100%"
          },
          list: []
        },


        {
          fId: "menu-3",
          type: 'radio',
          icon: 'icon-danxuankuang',
          url: 'Radio',
          saveUrl: 'Radio',
          name: '单选框',
          settingData: {
            isShowImg: false,
            type:"radio",
            typeList: [
              {
                title: '单选',
                value: 'radio'
              },
              {
                title: '多选',
                value: 'checkbox'
              }
            ],
            value: '',
            radioCol:[
              {
                title:'一列',
                value:24
              },
              {
                title: '二列',
                value: 12
              },
              {
                title: '三列',
                value: 8
              }
            ],
            cheboxVal:[],
            radioListText: [
              { imgSrc: '/static/default.png', value: '选项一', id: '1' },
              { imgSrc: '/static/default.png', value: '选项二', id: '2' },
              { imgSrc: '/static/default.png', value: '选项三', id: '3' },
              // { imgSrc: '/static/default.png', value: '选项一', id: '4' },
              // { imgSrc: '/static/default.png', value: '选项二', id: '5' },
              // { imgSrc: '/static/default.png', value: '选项三', id: '6' },
              // { imgSrc: '/static/default.png', value: '选项一', id: '7' },
              // { imgSrc: '/static/default.png', value: '选项二', id: '8' },
              // { imgSrc: '/static/default.png', value: '选项三', id: '9' }
            ],
            title: "请选择一个选项",
            answer: "",
            isSubmit: false,
            isMust: '0',
            rowLen: 24
          },
          list: []
        },



    ],
    currentSelectComponent: [],
    componentList: [],
    setOptions:{},
  }
}

export default function reducer(state: object = initState, action: any): object{
  switch (action.type) {
    case 'ADD__COMPONENT__LIST':
      return {
        ...state, componentList: action.data
      }
    break;
    case 'CHANGE__PRIVIEW__TRUE':
      return {
        ...state, isPriview: action.val
      }
    break;
    case 'ADD__CURRENT__SELECT__COMPONENT':
      return {
        ...state, currentSelectComponent: action.data
      }
      break;
    case 'SET__OPTIONS':
      return {
        ...state, setOptions: action.obj
      }
      break;
    default:
      break;
  }
  return state;
}