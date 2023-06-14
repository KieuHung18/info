import React from "react";
import PageSeperator from "../../components/icons/page separator";
import Button from "../../components/common/button";
import { useEffect, useState } from "react";
import apis from "../../services/apis";
import { UserProps } from "../../services/model.types";

const Home = () => {
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
    <div className="page-container bg-primary-5">
      <div className="responsive-container">
        <div className="px-4 pb-16">
          <h2 className="text-[14px] tracking-[4px] md:text-[16px] md:tracking-[8px] lg:text-[18px] font-sans capitalize">
            I Am {user?.firstName} {user?.middleName} {user?.lastName}
          </h2>
          <h2 className="text-[35px] sm:[text-50px] md:text-[60px] lg:text-[90px] xl:text-[100px] capitalize">
            {user?.intro}
          </h2>
          <div className="w-44 flex">
            <Button variant="secondary">Contact Me</Button>
          </div>
        </div>
      </div>
      <PageSeperator className="fill-primary-10" />
    </div>
  );
};

export default Home;
