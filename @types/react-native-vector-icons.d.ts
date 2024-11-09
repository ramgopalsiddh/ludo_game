
  
  declare module 'react-native-vector-icons/MaterialIcons' {
    import { IconProps } from 'react-native-vector-icons/Icon';
    import { Component } from 'react';
    export default class Icon extends Component<IconProps> {}
  }
  
  // You can add more icon sets in a similar fashion if needed.
  
  declare module 'react-native-vector-icons/FontAwesome' {
    import { IconProps } from 'react-native-vector-icons/Icon';
    import { Component } from 'react';
    export default class Icon extends Component<IconProps> {}
  }
  