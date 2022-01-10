import React from "react";
import RootModelHeader from "./RootModelHeader";
import  classNames  from 'classnames';

export default function RootModel({ children,hideHeader,className,bcWhite }) {
  const rootModelClassnames = classNames('root-model-wrap',className)
  const rootModelWrapClassnames = classNames('root-model',{'bcWhite':bcWhite})
  return (
    <div className={rootModelClassnames}>
      <div className={rootModelWrapClassnames}>
         <RootModelHeader hideHeader= {hideHeader}/>
        {children}
      </div>
    </div>
  );
}
