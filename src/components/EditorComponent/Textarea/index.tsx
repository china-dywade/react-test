
import * as React from 'react';
import { Input } from 'antd';
import SettingData from '../../SettingData';
const { TextArea } = Input;
export interface InputProps {
  data: any;
  updateSettingData: any;
  title: string;
  defaultText: string;
}
export interface InputState {
  title: string;
  defaultText: string;
}
class TextareaComponent extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = { ...this.props.data.settingData };
  }
  getIntance = () => {
    let _this = this;
    return {
      name: '多行文本设置项',
      settingCom: [
        {
          type: 'Set/inputDefalut',
          props: {
            title: '多行文本名称',
            value: _this.state.title,
            callBack: (v: string) => {
              _this.setState({
                title: v
              })
              // 传给父组件 更新 store;
              _this.props.updateSettingData(_this.state);
            }
          }
        },
        {
          type: 'Set/inputDefalut',
          props: {
            title: '多行文本默认名称',
            value: _this.state.defaultText,
            callBack: (v: string) => {
              _this.setState({
                defaultText: v
              })
              // 传给父组件 更新 store;
              _this.props.updateSettingData(_this.state);
            }
          }
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <span>
          {this.state.title}
        </span>
        <TextArea
          placeholder={this.state.defaultText}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />

      </div>
    );
  }
}

export default TextareaComponent;