import React from "react";
import Button from "../../components/common/button";
import apis from "../../services/apis";
import { useEffect, useState } from "react";
import { UserMetadata, UserProps } from "../../services/model.types";
import PageSeperator from "../../components/icons/page separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
      <div className="responsive-container pb-10">
        <div className="grid lg:grid-flow-col">
          <div className="pt-2 px-4 m-auto">
            <img src={user?.profile?.url}></img>
          </div>
          <div className="px-4 pb-16 2xl:p-16">
            <h2 className="text-[35px] xl:text[40px] 2xl:text-[50px] font-light leading-[60px] my-9">
              {user?.aboutMe}
            </h2>
            <p style={{ whiteSpace: "pre-line" }} className="mb-4">
              {user?.description}
            </p>
            <span className="font-creattion text-[70px] lowercase">
              {user?.firstName}
              {user?.lastName}
            </span>
            <p className="text-[17px] mb-4 capitalize">{user?.title}</p>
            {user?.metadata?.length ? (
              <>
                <div className="w-44">
                  <Button
                    variant="secondary"
                    data-te-toggle="modal"
                    data-te-target="#more-about"
                  >
                    MORE ABOUT
                  </Button>
                </div>
                <MoreAboutModal userMetadata={user.metadata} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <PageSeperator className="fill-primary-5" />
    </div>
  );
};
const MoreAboutModal = (props: { userMetadata: UserMetadata[] }) => {
  const moreAbout = props.userMetadata.map((metadata, i) => {
    return (
      <div key={"user-metadata-" + i} className="w-[220px] mb-1">
        <h4>{metadata.section}</h4>
        {metadata.sectionItems?.map((sectionItem, i) => {
          return (
            <div key={"section-item-" + i} className="ml-8">
              {sectionItem.name}
              {sectionItem.experience && (
                <div className="bg-primary-15 w-full p-2 rounded-full">
                  <div
                    style={{ width: `${sectionItem.experience}%` }}
                    className="bg-primary-20 rounded-full h-2"
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-brightness-50"
        id="more-about"
      >
        <div
          data-te-modal-dialog-ref
          className="translate-y-[-50px] duration-300 h-full w-fit bg-primary-5 mx-auto px-10"
        >
          <button
            className="rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none block ml-auto py-5"
            type="button"
            data-te-modal-dismiss
            aria-label="Close"
          >
            <FontAwesomeIcon size="lg" icon={faClose} />
          </button>
          <div className="bg-primary-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row h-fit p-7">
            {moreAbout}
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutMe;
