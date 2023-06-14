import React from "react";
import Button from "../../components/common/button";
import apis from "../../services/apis";
import { useEffect, useState } from "react";
import { UserProps } from "../../services/model.types";

const AboutMe = () => {
  const [user, setUser] = useState<UserProps>();
  const getUser = async () => {
    const [fetchData, error] = await apis.users.retrieve();
    if (!error) {
      setUser(fetchData);
    } else {
      alert(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="page-container bg-primary-10">
      <div className="responsive-container">
        <div className="grid lg:grid-flow-col">
          <div className="mb-10 px-4">
            <img src={user?.profile?.url}></img>
          </div>
          <div className="px-4 pb-16 2xl:p-16">
            <h2 className="text-[35px] xl:text[40px] 2xl:text-[50px] font-light leading-[60px] my-9">
              {user?.aboutMe}
            </h2>
            <p style={{ whiteSpace: "pre-line" }} className="mb-4">
              {user?.description}
            </p>
            <span className="font-mrsSaint text-[90px] lowercase">
              {user?.lastName}
            </span>
            <p className="text-[17px] mb-4 capitalize">{user?.title}</p>
            <div className="w-44">
              <Button variant="secondary">MORE ABOUT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
