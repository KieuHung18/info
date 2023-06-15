import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import PageSeperator from "../../components/icons/page separator";
import Pagination from "../../components/common/pagination";
import { ArtworkProps } from "../../services/model.types";
import apis from "../../services/apis";
import { ITEMS_PER_PAGE } from "../constant ";
import { sortFetureFirst } from "../../utils/sortFeatureFirst";

const Artworks = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [detailArtUrl, setDetailArtUrl] = useState("");
  const [artworks, setArtworks] = useState<ArtworkProps[]>([]);
  const arts = artworks
    .slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((artwork, i) => {
      return (
        <div className="p-4" key={i}>
          <ArtworkCard
            artwork={artwork}
            handleShowDetail={() => {
              setDetailArtUrl(artwork.image.url);
            }}
          />
        </div>
      );
    });
  const getArtworks = async () => {
    const [fetchData, error] = await apis.artworks.list();
    if (error) {
      alert(error.message);
    } else {
      const featureFirst = sortFetureFirst(fetchData);
      setArtworks(featureFirst);
    }
  };
  useEffect(() => {
    getArtworks();
  }, []);
  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <div className="page-container bg-primary-10 md:pb-16">
      <div className="responsive-container block pt-16 pb-56 md:pb-64">
        <div className="title-section">
          <span className="page-title">Artwork</span>
          <h2 className="page-sub-title">Latest Art</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row h-full">
          {arts}
        </div>
        <DetailArtModal url={detailArtUrl} />
        <Pagination
          handleCurrentPage={handleCurrentPage}
          numberOfPages={Math.ceil(artworks.length / ITEMS_PER_PAGE)}
        />
      </div>
      <PageSeperator className="fill-primary-5" />
    </div>
  );
};

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="w-fit">
      <button
        className={clsx(
          "h-12 min-w-fit duration-300 flex items-center justify-center text-neutral-light bg-neutral-light bg-opacity-30 hover:bg-opacity-40 py-2 px-12 font-muli text-[18px]"
        )}
        {...props}
        data-te-toggle="modal"
        data-te-target="#artwork"
      >
        View Artwork
      </button>
      <div className="w-full h-[2px] bg-neutral-light mt-1"></div>
    </div>
  );
};

const ArtworkCard = (props: {
  artwork: ArtworkProps;
  handleShowDetail: (url: string) => void;
}) => {
  const handleShowDetail = () => {
    props.handleShowDetail(props.artwork.image.url);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${props.artwork.image.url})`,
      }}
      className="bg-cover flex h-full group"
    >
      <div className="p-10 self-end  duration-300 -translate-x-8 opacity-0  group-hover:-translate-x-0 group-hover:visible group-hover:opacity-100">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {props.artwork.name}
        </h5>
        <Button onClick={handleShowDetail} />
      </div>
    </div>
  );
};

const DetailArtModal = (props: { url: string }) => {
  const [zoom, setZoom] = useState(true);
  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm"
        id="artwork"
      >
        <div
          data-te-modal-dialog-ref
          className="translate-y-[-50px] duration-300 h-full flex max-w-fit mx-auto"
        >
          <button
            className="rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none absolute right-8"
            type="button"
            data-te-modal-dismiss
            aria-label="Close"
          >
            <FontAwesomeIcon size="lg" icon={faClose} />
          </button>
          <div className=" my-auto align-middle">
            <TransformWrapper>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  <div
                    className={clsx(
                      zoom ? "cursor-zoom-in" : "cursor-zoom-out"
                    )}
                    onClick={() => {
                      if (zoom) {
                        zoomIn();
                      } else {
                        zoomOut();
                      }
                      setZoom(!zoom);
                    }}
                  >
                    <TransformComponent>
                      <img
                        className="max-h-screen"
                        src={props.url}
                        alt="artwork"
                      />
                    </TransformComponent>
                  </div>
                </React.Fragment>
              )}
            </TransformWrapper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artworks;
