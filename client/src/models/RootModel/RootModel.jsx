import React from "react";
import RootModelHeader from "./RootModelHeader";
import  classNames  from 'classnames';

export default function RootModel({ children,hideHeader,className,bcWhite,navigateTo }) {
  const rootModelClassnames = classNames('root-model-wrap',className)
  const rootModelWrapClassnames = classNames('root-model',{'bcWhite':bcWhite})
  return (
    <div className={rootModelClassnames}>
      <div className={rootModelWrapClassnames}>
         {!hideHeader && <RootModelHeader hideHeader= {hideHeader} navigateTo={navigateTo}/>}
        {children}
      </div>
    </div>
  );
}
