import * as React from 'react';
import { Input } from 'antd';

export interface InputProps {
  data:any;
  updateSettingData:any;
  title: string;
  defaultText: string;
}
export interface InputState {
  title: string;
  defaultText: string;
}
class InputComponent extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = { ...this.props.data.settingData};
  }
  render() {  
    return ( 
      <div>
        <span>
          {this.state.title} 预览
        </span>
        <Input placeholder={this.state.defaultText} />

      </div>
     );
  }
}
 







export default InputComponent;