import React, { memo, useMemo, useCallback, useState } from 'react';



export interface Props {
  data:any;
  updateSettingData:any;
}
 
export interface State {
}






const HocComponent = (WrapperComponent: any) => class A extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
       <div>
        <WrapperComponent  { ...this.props } ></WrapperComponent>
       </div>
    );
  }
}


export default HocComponent;