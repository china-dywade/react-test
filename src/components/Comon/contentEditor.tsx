import * as React from 'react';
import { Input } from 'antd';

import { closest } from '../../utils'
export interface InputProps {
  data: any;
  checked:boolean;
  updateSettingData:any;
}
export interface InputState {
  title: string;
}
class InputComponent extends React.Component<InputProps, InputState> {

  myRef: any = null;
  constructor(props: InputProps) {
    super(props);
    this.state = {...this.props.data};
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      title: nextProps.data.title
    })
  }

  documentClick = (e: any) => {
   
  
    if (closest(e.target, '.contentEditorable__span') || e.target.className == "contentEditorable__span") {
      this.myRef.focus();
    } else {
      this.myRef.blur();
    }
  }
  componentDidMount() {
    this.myRef.addEventListener('click', this.documentClick);
  }

  componentWillUnmount() {
    this.myRef.removeEventListener("click", this.documentClick)
  }

  titleChange = () => {

    this.setState({
      title: this.myRef.innerHTML
    }, () => {
      this.props.updateSettingData(this.state);
    })

  }

  render() {

    return (
 
          <span
            contentEditable={this.props.checked}
            className='contentEditorable__span'
            ref={ref => this.myRef = ref}
            dangerouslySetInnerHTML={{ __html: `${this.state.title}` }}
            suppressContentEditableWarning
            // onSelect={ this.titleChange}  
            onBlur={this.titleChange}

          >
          </span>
   
    )
  }
}








export default InputComponent;