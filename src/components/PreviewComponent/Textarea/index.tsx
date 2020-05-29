
import * as React from 'react';
import { Input } from 'antd';
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