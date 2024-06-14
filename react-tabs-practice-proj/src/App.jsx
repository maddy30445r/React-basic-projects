import React, { useState } from "react";
const obj = [
  {
    content:
      "tab1 data Lorem ipsum dolor sit amet, consectetur adipisicing elit. A explicabo in adipisci exercitationem asperiores sed eaque rem rerum veritatis tempora quod quasi ex, esse praesentium ab. Quaerat iste voluptate fugiat.",
    heading: "This is tab 1's heading",
  },
  {
    content:
      "Tab 2 data Lorem ipsum dolor sit amet, consectetur adipisicing elit. A explicabo in adipisci exercitationem asperiores sed eaque rem rerum veritatis tempora quod quasi ex, esse praesentium ab. Quaerat iste voluptate fugiat.",
    heading: "This is tab 2's heading",
  },
  {
    content:
      "Tab 3 data Lorem ipsum dolor sit amet, consectetur adipisicing elit. A explicabo in adipisci exercitationem asperiores sed eaque rem rerum veritatis tempora quod quasi ex, esse praesentium ab. Quaerat iste voluptate fugiat.",
    heading: "This is tab 3's heading",
  },
  {
    content:
      "Tab 4 data Lorem ipsum dolor sit amet, consectetur adipisicing elit. A explicabo in adipisci exercitationem asperiores sed eaque rem rerum veritatis tempora quod quasi ex, esse praesentium ab. Quaerat iste voluptate fugiat.",
    heading: "This is tab 4's heading",
  },
];

export default function App() {
  return (
    <div className="main">
      <Tabbed items={obj} />
    </div>
  );
}
function Tabbed({ items }) {
  const [activetab, setactivetab] = useState(0);

  return (
    <div className="tabparent">
      <div className="tabarea">
        <Tabs nums={0} activetab={activetab} OnClick={setactivetab} />
        <Tabs nums={1} activetab={activetab} OnClick={setactivetab} />
        <Tabs nums={2} activetab={activetab} OnClick={setactivetab} />
        <Tabs nums={3} activetab={activetab} OnClick={setactivetab} />
      </div>
      <div className="tabcontent">
        <Tabcontent key={items[activetab].heading} item={items[activetab]}>
          {" "}
        </Tabcontent>
      </div>
    </div>
  );
}

function Tabs({ nums, activetab, likes, OnClick, handlelike }) {
  // handlelike();
  return (
    <div
      onClick={() => OnClick(nums)}
      className={nums == activetab ? "tab selected" : "tab"}>
      Tab {nums + 1}
    </div>
  );
}

function Tabcontent({ item, children }) {
  // function handlelikes() {
  //   setlikes((likes) => likes + 1);
  // }

  const [likes, setlikes] = useState(0);
  const [show, setshow] = useState(false);
  return (
    <div>
      <h1>{item.heading}</h1>

      {show ? "" : item.content}

      <div className="detsshow" onClick={() => setshow((prev) => !prev)}>
        {show ? "  Show Details..." : "  Hide Detais..."}{" "}
      </div>

      <div className="heart">
        <span>{likes}</span>
        <svg
          onClick={()=>setlikes((likes) => likes + 1)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#824782"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          />
        </svg>
      </div>
    </div>
  );
}
