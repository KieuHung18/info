import { backendRequest } from "./request";
export default {
  apps: {},
  users: {
    retrieve() {
      const path = `/users`;
      return backendRequest("GET", path);
    },
  },
  artworks: {
    list() {
      const path = `/artworks`;
      return backendRequest("GET", path);
    },
  },
  projects: {
    get(projectId: string) {
      const path = `/projects/${projectId}`;
      return backendRequest("GET", path);
    },
    list() {
      const path = `/projects`;
      return backendRequest("GET", path);
    },
  },
};
