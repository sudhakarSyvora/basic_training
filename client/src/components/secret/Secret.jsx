import React, { useEffect, useState } from "react";

export default function Secret() {
  const [user, setUser] = useState();

  const handleLogout = async () => {
    try {
    const res=  await fetch("http://localhost:5000/logout", { credentials: "include" });
    if (res.ok) {
      window.location.href = "/";
    }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/getUser", {
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/";
        }
        const data = await res.json();

        setUser(data);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <div>Hi, {user.name}</div>
          <img
            referrerPolicy="no-referrer"
            src={user.picture}
            alt="User Profile"
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </div>
  );
}
