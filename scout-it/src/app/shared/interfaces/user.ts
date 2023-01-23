export interface IUser {
  username?: string;
  fullname?: string;
  id?: string;
  mail?: string;
  type?: string;
  profile_picture?: string;
  verified?: boolean;
  phone?: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  key?: number;
  address?: string;
  country?: string;
  city?: string;
  description?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  followers?: string[];
  workTypes: {
    freelance: boolean;
    halfDay: boolean;
    fullDay: boolean;
  };
  workPlace: { home: boolean; office: boolean };
  quote: string,
  detailedDescription: string,
  websites: { name: string, url: string }[]
}
