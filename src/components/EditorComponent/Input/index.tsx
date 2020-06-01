import * as React from 'react';
import { Input } from 'antd';
import ContentEditorable from '../../Comon/contentEditor'

export interface InputProps {
  data:any;
  updateSettingData:any;
  title: string;
  defaultText: string;
  setSettingData:any;
  index:number;
  mounted:any;
}
export interface InputState {
  title: string;
  defaultText: string;
  isMust: any;
}
class InputComponent extends React.Component<InputProps, InputState> {

  constructor(props: InputProps) {
    super(props);
    this.state = { ...this.props.data.settingData};
    // let obj = this.getIntance();
    // this.props.setSettingData(obj);
  }

  // componentDidMount() {
  //   this.props.mounted()
  // }
  


  updateSettingData = (state:any) => {
    this.setState({
      title: state.title
    }, () => {
        this.unDatedSet(this.state);
    })
  }


  unDatedSet = (state:any) => {
    let obj = this.getIntance();
    // this.props.mounted(this.props.index);
    this.props.setSettingData(obj, state, this.props.index);
    this.props.updateSettingData(state); 
  }



  getIntance = () => {
    let _this = this;
    return {
      name: '单行文本设置项',
      settingCom: [
        {
          type: 'Set/isMust',
          props: {
            title: '是否必填',
            value: _this.state.isMust,
            callBack: (v: any) => {
              _this.setState({
                isMust: v
              }, () => {
                // 传给父组件 更新 store;
                // _this.props.updateSettingData(_this.state);
                _this.unDatedSet(_this.state);
              })

            }
          }
        },
        {
          type: 'Set/inputDefalut',
          props: {
            title: '单行文本默认名称',
            value: _this.state.defaultText,
            callBack: (v: string) => {

              _this.setState((state)=>({
                defaultText: v
              }),()=>{
                  // 传给父组件 更新 store;
                  _this.unDatedSet(_this.state);
              })  
            }
          }
        }
      ]
    }
  }

  render() {  
 
    return ( 
      
      <div className="INPUT__CONTANER" >
        <div className={this.props.data.checked? 'title__focus title__container' : "title__container"}>
          <ContentEditorable updateSettingData={this.updateSettingData} data={this.state} checked={ this.props.data.checked } />
          {
            this.state.isMust ? <span className={this.state.isMust ? 'red' : ''}>*</span> : null
          }
        </div>   
        <Input placeholder={this.state.defaultText} readOnly/>       
      </div>
     );
  }
}
 






export default InputComponent;
