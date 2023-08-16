import React, { useContext, useEffect, useState } from "react";
import "../CSS/UpdateUserInfo.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faIdCardClip,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Dropzone from "react-dropzone";

export default function UpdateUserInfo() {
  const cookies = new Cookies();

  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const { online_shop_cookies, set_online_shop_cookies } = useContext(Context);

  const navigate = useNavigate();

  const { userData } = cookies.get("online_shop_cookies");
  async function updateUserInfo() {
    if (!name) return alert("please enter you name");
    if (!userImage) return alert("please select a image");
    const formData = new FormData();
    formData.append("image", userImage);
    const requestedData = {
      userData,
      name,
    };
    try {
      const req = await axios.post(
        "http://localhost:5000/update/user/info",
        formData,
        {
          params: requestedData,
          headers: { "Content-Type": "multipar/form-data" },
        }
      );
      const data = req.data;
      console.log(data);
      if (data) {
        // setUserData(data);
        // cookies.set("userData", data);
        cookies.set("online_shop_cookies", {
          ...online_shop_cookies,
          userData: data,
        });
        set_online_shop_cookies({ ...online_shop_cookies, userData: data });
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    console.log(userImage);
  }, [userImage]);
  return (
    <div className="updateUserInfo">
      <h1>Update Your Details</h1>
      <label>
        <FontAwesomeIcon icon={faIdCardClip} className="name-icon" />
        <p>What's your name</p>
        <input
          type="text"
          placeholder={userData.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <FontAwesomeIcon icon={faImage} />
        <p>Profile Image</p>
        <Dropzone onDrop={(acceptedFiles) => setUserImage(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </label>

      <button onClick={updateUserInfo}>
        Save Updated Details
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}
