/* Model for Project Type, holds information of a project post */
export interface Project {
  _id: string;
  type: string;
  title: string;
  languages: string;
  tagline: string;
  overview: string;
  design: string;
  code: string;
  future: string;
  github: string;
  /*Image Paths*/
  thumbNail: string;
  image: string;
  projectImg: string;
  designImg: string;
  techImg: string;
}
