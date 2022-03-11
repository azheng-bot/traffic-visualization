import react from "react";
import { LineScale } from "@alex_xu/react-loading";
import { CSSTransition } from "react-transition-group";
import "./index.less";
function Loading({
  color,
  size,
  text,
  textColor,
  textOffset,
  opacity,
  num,
  flagLoading,
  heightNum,
}) {
  return (
    <CSSTransition
      // <!-- in表示是否出现 timeout表示动画延时 -->
      in={flagLoading}
      timeout={1000}
      // <!-- classNames是钩子名，为后面的class名前缀 -->
      classNames="test"
      // <!-- unmountOnExit表示元素隐藏则相应的DOM被移除 -->
      unmountOnExit
      // <!-- appear设为true表示进场动画,CSS中有对应类名 -->
      appear={true}
      // <!--以下为动画钩子函数, 与CSS中相对应-->
      onEnter={(el) => {}}
      onEntering={(el) => {}}
      onEntered={(el) => {}}
      onExit={(el) => {}}
      onExiting={(el) => {}}
      onExited={(el) => {}}
    >
      <div
        className="loading"
        style={{ opacity: opacity, zIndex: num, height: heightNum }}
      >
        <LineScale
          color={color}
          size={size}
          text={text}
          textColor={textColor}
          textOffset={textOffset}
        />
      </div>
    </CSSTransition>
  );
}
Loading.defaultProps = {
  color: "06c",
  size: 4,
  text: "",
  textColor: "",
  textOffset: 0,
  opacity: 1,
  num: 100,
};
export default Loading;
