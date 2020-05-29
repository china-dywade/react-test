import * as React from 'react';
export interface HeaderProps {
  
}
 
export interface HeaderState {
  
}
 
class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
  }
  render() { 
    return ( 
          <header>
            我是common head
          </header>
    );
  }
}
 
export default Header;