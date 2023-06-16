import React, { useEffect, useState } from "react";
import { UserProps } from "../../services/model.types";
import apis from "../../services/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import PageSeperator from "../../components/icons/page separator";
const Contact = () => {
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
  const contactItems: {
    icon: IconDefinition;
    title: string;
    content?: string;
  }[] = [
    { icon: faLocationDot, title: "Address", content: user?.address },
    { icon: faEnvelope, title: "Email", content: user?.email },
    { icon: faPhoneVolume, title: "Phone", content: user?.phone },
  ];
  const contactCards = contactItems.map((item, i) => {
    return (
      <div className="p-10 items-center text-center bg-primary-10 m-4" key={i}>
        <div className="rounded-full bg-primary-5 w-20 h-20 flex mx-auto">
          <FontAwesomeIcon
            className="m-auto"
            size="2xl"
            icon={item.icon}
          ></FontAwesomeIcon>
        </div>
        <h2 className="text-[30px] my-5">{item.title}</h2>
        <p>{item.content}</p>
      </div>
    );
  });

  return (
    <div className="page-container bg-primary-5">
      <div className="responsive-container block pt-16 pb-10">
        <div className="title-section">
          <span className="page-title">Contact</span>
          <h2 className="page-sub-title">Contact Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row h-fit">
          {contactCards}
        </div>
      </div>
      <PageSeperator className="fill-primary-10" />
    </div>
  );
};

export default Contact;
