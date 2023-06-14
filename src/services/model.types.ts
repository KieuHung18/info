export interface UserProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  intro?: string;
  title?: string;
  phone?: string;
  address?: string;
  aboutMe?: string;
  description?: string;
  profile?: ImageProps;
  metadata?: UserMetadata[];
}
export interface ArtworkProps {
  image: ImageProps;
  name?: string;
  feature?: boolean;
}
export interface ProjectProps {
  id?: string;
  name?: string;
  description?: string;
  content?: string;
  feature?: boolean;
}
export interface ImageProps {
  publicId: string;
  url: string;
}
export interface SectionItem {
  name?: string;
  experience?: number;
}
export interface UserMetadata {
  section?: string;
  sectionItems?: SectionItem[];
}
