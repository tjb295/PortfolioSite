/* Model for Project Type, holds information of a project post */
export interface Project {
  _id: string;
  title: string;
  tagline: string;
  overview: string;
  design: string;
  code: string;
  future: string;
  /*Image Paths*/
  titleImg: Array<string>;
  projectImg: Array<string>;
  designImg: Array<string>;
  technologyImg: Array<string>;
}
