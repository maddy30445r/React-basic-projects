import React, { useEffect, useState } from "react";
const arr = [
  { name: "Madhur", balance: 2 },
  { name: "TEST", balance: -5 },
];

export default function App() {
  const [show, setshow] = useState(false);

  const [users, setusers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || arr
  );
  const [selected, setselected] = useState({});

  // useEffect(() => {
  //   localStorage.setItem('users', JSON.stringify(arr))

  // },[])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function handlesplit(newbalance) {
    setusers(
      users.map((user) =>
        user.name == selected.name
          ? { ...user, balance: user.balance + newbalance }
          : user
      )
    );
    setshow(false);
    setselected({});
  }
  function handleselect(selecteduser) {
    if (selected.name == selecteduser.name) {
      setselected({});
      setshow(false);
      return;
    }
    setshow(true);

    setselected(selecteduser);
  }
  function handleadduser(userfromform) {
    setusers([...users, userfromform]);
  }
  function handleclear() {
    setusers(arr);
    localStorage.clear();
  }
  return (
    <>
      <Logo />
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-start py-10  px-10 ">
        <div className="px-10">
          <USerList
            // handleshow={setshow}
            users={users}
            handleselect={handleselect}
            selected={selected}
          />

          <Formadd handleuser={handleadduser} selected={selected} />
          <div>
            <button
              onClick={handleclear}
              className="bg-orange-300 px-2 rounded-lg text-sm  mt-4 border-2 py-1 border-black">
              Clear List
            </button>
          </div>
        </div>
        {
          <Split
            show={show}
            selected={selected}
            key={selected.name}
            handlesplit={handlesplit}
          />
        }
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="font-playright text-3xl text-orange-300 underline sm:text-5xl text-center py-4">
      🍕 Eat - n -split 🍔
    </div>
  );
}

function USerList({ users, handleselect, selected }) {
  return (
    <ul className=" userlist  rounded-md w-[320px] border-2 bg-orange-100 max-h-[400px] overflow-y-auto">
      {users.map((user, index) => (
        <User user={user} index={index} key={user.name} selected={selected}>
          <button
            onClick={() => handleselect(user)}
            className="bg-orange-300 px-2 rounded-lg text-sm border-2 py-1 border-black">
            {selected.name == user.name ? "Remove" : "Select"}
          </button>
        </User>
      ))}
    </ul>
  );
}

function User({ user, index, children, selected }) {
  return (
    <li
      className={`py-3 px-4 flex items-center gap-6 cursor-pointer border-bottom-1 mx ${
        selected.name == user.name ? "bg-orange-200" : null
      }`}>
      <span>
        <img
          className="w-10 rounded-full"
          src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
          alt=""
        />
      </span>

      <span className="flex flex-col">
        <span className={`${user.name.length < 7 ? "text-2xl" : "text-xl"}`}>
          {user.name}
        </span>

        <span
          className={`text-xs whitespace-nowrap ${
            user.balance > 0 && "text-green-600"
          }
       ${user.balance < 0 && "text-red-600"}
        `}>
          {user.balance > 0
            ? `${user.name} owes you ${user.balance}$`
            : user.balance < 0
            ? `You owe ${user.name} ${Math.abs(user.balance)}$`
            : "You both are even"}{" "}
        </span>
      </span>

      <span className="grow"></span>
      {children}
    </li>
  );
}

function Formadd({ handleuser, selected }) {
  const [query, setquery] = useState("");

  function handlequery(e) {
    if (query.length > 9) {
      return;
    }
    setquery(e.target.value);
  }

  function handleadduser(e) {
    e.preventDefault();
    const newuser = { name: query, balance: 0 };
    // setuser([...users, {name:query}]);
    handleuser(newuser);

    setquery("");
  }
  return (
    <form
      className="mt-8 border-2 w-[300px] rounded-md px-2 py-2 bg-orange-100"
      onSubmit={handleadduser}>
      <input
        value={query}
        onChange={handlequery}
        type="text "
        className="px-2 rounded-md"
        placeholder="Enter Name"
      />
      <button
        className="bg-orange-300 px-3 rounded-lg py-1 ml-5 border-2 border-black"
        type="submit">
        Add
      </button>
    </form>
  );
}

function Split({ selected, handlesplit, show }) {
  const [bill, setbill] = useState(0);
  const [yourexp, setyourexp] = useState(0);
  const [whopaid, setwhopaid] = useState("friend");

  function handleexpense(e) {
    if (Number(e.target.value) > Number(bill)) return;
    setyourexp(e.target.value);
  }

  function handlesplitting() {
    const newbalance = whopaid == "you" ? bill - yourexp : -yourexp;
    handlesplit(newbalance);
  }

  return (
    <>
      {show && (
        <div
          className="w-screen sm:max-w-[400px] min-h-[400px] rounded-md bg-orange-100 px-4
     py-3 flex flex-col gap-3 items-start">
          <h1 className="mx-auto text-2xl underline">
            Split the bill With {selected.name}
          </h1>
          <div className="ml-5 flex gap-5 mt-7">
            <label className="text-lg" htmlFor="Bill">
              Total Bill: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <span className="grow"></span>
            <input
              id="Bill"
              value={bill}
              onChange={(e) => {
                if (e.target.value < 0) return;
                setbill(e.target.value);
              }}
              className="bg-orange-200 rounded-lg px-2 w-[30%]"
              type="text"
            />
          </div>
          <div className="ml-5 flex gap-5 mt-7">
            <label className="text-lg" htmlFor="yours">
              Your Expense:
            </label>
            <span className="grow"></span>
            <input
              value={yourexp}
              onChange={handleexpense}
              id="yours"
              className="bg-orange-200 rounded-lg px-2 w-[30%]"
              type="text"
            />
          </div>
          <div className="ml-5 flex gap-5 mt-7">
            <label className="text-lg" htmlFor="his">
              {selected.name}'s expense:
            </label>
            <span className="grow"></span>
            <input
              value={bill - yourexp}
              disabled
              id="his"
              className="bg-orange-200 rounded-lg px-2 w-[30%]"
              type="text"
            />
          </div>
          <div className="ml-5 flex gap-5 mt-7">
            <label className="text-lg whitespace-nowrap" htmlFor="his">
              Who paid the bill:
            </label>
            <span className="grow"></span>

            <select
              value={whopaid}
              onChange={(e) => setwhopaid(e.target.value)}
              className="rounded-lg   bg-orange-200  px-3 w-[100px]">
              <option className="" value="you">
                You
              </option>
              <option value="friend">{selected.name}</option>
            </select>
          </div>

          <div className="ml-5 mt-6 px-2 py-1 rounded-md bg-orange-300 border-2 border-black">
            <button onClick={handlesplitting}>Done</button>
          </div>
        </div>
      )}
    </>
  );
}
