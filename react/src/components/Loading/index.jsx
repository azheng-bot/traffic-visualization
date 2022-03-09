import react from "react";
import { LineScale } from "@alex_xu/react-loading";
import "./index.less";
function Loading({ color, size, text, textColor, textOffset }) {
  return (
    <div className="loading">
      <LineScale
        color={color}
        size={size}
        text={text}
        textColor={textColor}
        textOffset={textOffset}
      />
    </div>
  );
}
Loading.defaultProps = {
  color: "06c",
  size: 4,
  text: "",
  textColor: "",
  textOffset: 0,
};
export default Loading;
