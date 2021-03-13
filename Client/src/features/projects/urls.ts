import { createPath } from "rd-url-utils";

export const PROJECTS_PAGE_URL = createPath<{}>("/projects");
export const EDIT_PAGE_URL = createPath<{id: string}, {}>("/project/:id");
