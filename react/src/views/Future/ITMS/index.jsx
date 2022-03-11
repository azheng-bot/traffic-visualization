import react, { useState, useEffect } from "react";
import "./index.less";
import { getLaws } from "../../../api/knowLedgeModule";

function Index() {
  const [currentPage, setCurrentPage] = useState(0)


  return (
    <div className="future-carbon">
      <div className={["prev-btn", currentPage == 0 ? 'disable' : ''].join(' ')} onClick={() => currentPage != 0 && setCurrentPage(currentPage - 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>
      <div className={["next-btn", currentPage == 2 ? 'disable' : ''].join(' ')} onClick={() => currentPage != 2 && setCurrentPage(currentPage + 1)}>
        <img src="/image/others/next.png" alt="" />
      </div>
      <div className={["page-1", currentPage == 0 ? 'active' : ''].join(' ')}>
        <div className="title">My Page 1</div>
      </div>
      <div className={["page-2", currentPage == 1 ? 'active' : ''].join(' ')}>
        <div className="title">My Page 2</div>
      </div>
      <div className={["page-3", currentPage == 2 ? 'active' : ''].join(' ')}>
        <div className="title">My Page 3</div>
      </div>
    </div>
  )
}

export default Index;
