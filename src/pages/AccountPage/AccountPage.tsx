// import styles from "AccountPage.module.css";
import { useUser } from "../../contexts/userContext";
import { useState, useEffect } from "react";
import styles from "./AccountPage.module.css";
import avatar from "../../assets/avatar.png";
import { toast } from "react-toastify";

interface UserProfile {
  username: string;
  gmail: string;
  name: string;
  phone: string;
  address: string;
}

export default function AccountPage() {
  const { username } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    phone: "",
    address: "",
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://backend-movie-app-0pio.onrender.com/user/${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setFormData({
          name: data.data.name || "",
          gmail: data.data.gmail || "",
          phone: data.data.phone || "",
          address: data.data.address || "",
        });
        setUserProfile(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || "",
      gmail: userProfile?.gmail || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
    });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        `https://backend-movie-app-0pio.onrender.com/user/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const data = await response.json();
      if (data.data.modifiedCount === 0 && data.data.matchedCount > 0) {
        toast.error("No changes were made.");
      } else if (data.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        setUserProfile({ ...userProfile!, ...formData });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles["user-info-wrapper"]}>
      <div className={styles["user-info"]}>
        <div className={styles["user-basic-info"]}>
          <img src={avatar} alt="avatar" />
          <div className={styles["user-basic-info-text"]}>
            <div className={styles["user-username"]}>
              {userProfile?.username || "Unknown"}
            </div>
            <div className={styles["user-email"]}>
              {userProfile?.gmail || "No email available"}
            </div>
          </div>
        </div>

        <div className={styles["user-form-info"]}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Gmail
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleInputChange}
              placeholder="Enter your gmail"
            />
          </label>

          <label>
            Phone number
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </label>

          <label>
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </label>
        </div>

        <div className={styles["confirm-button"]}>
          <button onClick={handleCancel} className={styles["cancel-btn"]}>
            Cancel
          </button>
          <button onClick={handleUpdateUser} className={styles["change-btn"]}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
