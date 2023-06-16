import React, { useEffect, useState } from "react";
import PageSeperator from "../../components/icons/page separator";
import { useParams } from "react-router-dom";
import apis from "../../services/apis";
import { ProjectProps } from "../../services/model.types";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectProps>({});
  const getProject = async () => {
    if (id) {
      const [fetchData, error] = await apis.projects.get(id);
      console.log(fetchData, error);
      if (error) {
        navigate("/projects");
        alert(error.message);
      } else {
        setProject(fetchData);
      }
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div className="page-container bg-primary-5 md:pb-16">
      <div className="responsive-container block pt-16 pb-10">
        <div className="title-section">
          <span className="page-title">Project</span>
          <h4 className="page-sub-title">{project.name}</h4>
          <div className="text-start">
            <br></br>
            {project.content && (
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            )}
          </div>
        </div>
      </div>
      <PageSeperator className="fill-primary-10" />
    </div>
  );
};
export default ProjectDetail;
