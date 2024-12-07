import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";

function PopUp(props) {
  return (props.trigger) ? (
    <div className={`${styles["popup"]}`}>
      <div className={`${styles["popup-inner"]}`}>
        {
          props.children
        }
      </div>
    </div>
  ) : "";
}

function Admin() {
  const [users, setUsers] = useState([]);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupBan, setPopupBan] = useState(false);
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [haveUpdate, setHaveUpdate] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("update");
    async function fetchUsers() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchUsers();
  }, [haveUpdate]);

  async function getAllUsers() {
    const res = await fetch("https://backend-movie-app-0pio.onrender.com/user", {
      method: "GET",
    });
    const data = await res.json();
    return data.data.userList.filter(user => !user.isBanned);
  }

  async function handleBan() {
    setPopupBan(false);
    const res = await fetch(`https://backend-movie-app-0pio.onrender.com/user/${username}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: description }),
    });
    const data = await res.json();
    console.log("delete", data);
    setHaveUpdate(!haveUpdate);
  }

  async function handleUpdate() {
    setPopupEdit(false);
    const res = await fetch(
      `https://backend-movie-app-0pio.onrender.com/user/${username}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail: gmail,
          address: address,
          phone: phone,
        }),
      }
    );
    const data = await res.json();
    console.log("update", data);
    setHaveUpdate(!haveUpdate);
  }

  return (
    <>
      <div className={`${styles["section-admin"]}`}>
        {/*Edit*/}
        <PopUp trigger={popupEdit}>
          <form className={`${styles["text-center"]}`} onSubmit={e => e.preventDefault()}>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Email"
                className={`${styles["form-input"]}`}
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
              />
            </div>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Address"
                className={`${styles["form-input"]}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Phone"
                className={`${styles["form-input"]}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              className={`${styles["button-exit"]}`}
              onClick={() => setPopupEdit(false)}>Exit
            </button>
            <button
              type="submit"
              className={`${styles["button-save"]}`}
              onClick={handleUpdate}>Save
            </button>
          </form>
        </PopUp>
        {/*Ban*/}
        <PopUp trigger={popupBan}>
          <form className={`${styles["text-center"]}`} onSubmit={e => e.preventDefault()}>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Description"
                className={`${styles["form-input"]}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className={`${styles["button-exit"]}`}
              onClick={() => setPopupBan(false)}>Exit
            </button>
            <button
              type="submit"
              className={`${styles["button-save"]}`}
              onClick={handleBan}>Ban
            </button>
          </form>
        </PopUp>

        <table className={`${styles["table"]}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((user, index) => {
              if (index % 2 === 0) {
                return (
                  <tr className={`${styles["evenLine"]}`}>
                    <td>{index}</td>
                    <td>{user.username}</td>
                    <td>{user.gmail}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className={`${styles["edit"]}`} onClick={() => {
                        setPopupEdit(true)
                        setUsername(user.username)
                        setGmail(user.gmail)
                        setAddress(user.address)
                        setPhone(user.phone)
                      }}>Edit
                      </button>
                      <button
                        className={`${styles["delete"]}`} onClick={() => {
                        setPopupBan(true)
                        setUsername(user.username)
                      }}>Delete
                      </button>
                    </td>
                  </tr>
                )
              }
              return (
                <tr className={`${styles["oddLine"]}`}>
                <td>{index}</td>
                  <td>{user.username}</td>
                  <td>{user.gmail}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className={`${styles["edit"]}`} onClick={() => {
                      setPopupEdit(true)
                      setUsername(user.username)
                      setGmail(user.gmail)
                      setAddress(user.address)
                      setPhone(user.phone)
                    }}>Edit
                    </button>
                    <button
                      className={`${styles["delete"]}`} onClick={() => {
                      setPopupBan(true)
                      setUsername(user.username)
                    }}>Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;