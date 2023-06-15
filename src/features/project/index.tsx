import React, { useEffect, useState } from "react";
import PageSeperator from "../../components/icons/page separator";
import { ProjectProps } from "../../services/model.types";
import { ITEMS_PER_PAGE } from "../constant ";
import Pagination from "../../components/common/pagination";
import Button from "../../components/common/button";
import { useNavigate } from "react-router-dom";
import apis from "../../services/apis";
import { sortFetureFirst } from "../../utils/sortFeatureFirst";

const Project = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setprojects] = useState<ProjectProps[]>([]);

  const projectsList = projects
    .slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    .map((project, i) => {
      return (
        <div className="p-4" key={i}>
          <ProjectCard project={project} />
        </div>
      );
    });
  const getProjects = async () => {
    const [fetchData, error] = await apis.projects.list();
    if (error) {
      alert(error.message);
    } else {
      const featureFirst = sortFetureFirst(fetchData);
      setprojects(featureFirst);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };
  return (
    <div className="page-container bg-primary-5 md:pb-16">
      <div className="responsive-container block pt-16 pb-56 md:pb-64">
        <div className="title-section">
          <span className="page-title">Project</span>
          <h2 className="page-sub-title">My Project</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row h-fit">
          {projectsList}
        </div>
        <Pagination
          handleCurrentPage={handleCurrentPage}
          numberOfPages={Math.ceil(projects.length / ITEMS_PER_PAGE)}
        />
      </div>
      <PageSeperator className="fill-primary-10" />
    </div>
  );
};
const ProjectCard = (props: { project: ProjectProps }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/projects/" + props.project.id);
  };
  return (
    <div className="bg-primary-7 p-10">
      <h2 className="text-[28px] mt-7 mb-5">{props.project.name}</h2>
      <p className="mb-4">{props.project.description}</p>
      <Button onClick={handleOnclick} size="small">
        Read More
      </Button>
    </div>
  );
};
export default Project;
