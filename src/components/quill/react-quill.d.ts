// react-quill.d.ts  
declare module 'react-quill' {  
  import { Component } from 'react';  

  export interface QuillOptions {  
    value?: string;  
    onChange?: (content: string, delta: any, source: string, editor: any) => void;  
    modules?: any;  
    formats?: string[];  
    theme?: string;  
    placeholder?: string;  
    readOnly?: boolean;  
    bounds?: string;  
    scrollingContainer?: string;  
  }  

  export default class ReactQuill extends Component<QuillOptions> {}  
}