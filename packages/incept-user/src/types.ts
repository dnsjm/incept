//local
import type SessionType from './Session';

//--------------------------------------------------------------------//
// Permission Types

export type Route = { method: string, route: string };
export type Permission = string | Route;
export type PermissionList = Record<string, Permission[]>;

//--------------------------------------------------------------------//
// Session Class Types

export type SessionData = Record<string, any> & { 
  id: string, 
  name: string,
  image?: string,
  roles: string[]
};
export type Session = SessionData & {
  token: string
};

//--------------------------------------------------------------------//
// Server Types

export type SessionPlugin = SessionType;
export type SessionConfig = { 
  session: {
    name: string,
    seed: string,
    access: PermissionList,
    auth: {
      name: string,
      logo: string,
      '2fa': {},
      captcha: {},
      username: boolean,
      email: boolean,
      phone: boolean,
      password: {
        min: number,
        max: number,
        upper: boolean,
        lower: boolean,
        number: boolean,
        special: boolean
      }
    }
  }
};

//--------------------------------------------------------------------//
// Page Types

export type SignupInput = {
  name: string,
  username?: string,
  email?: string,
  phone?: string,
  secret: string
};

export type SigninInput = {
  username?: string,
  email?: string,
  phone?: string,
  secret: string
};

export type SigninType = 'username' | 'email' | 'phone';

//--------------------------------------------------------------------//
// Model Types

export type Profile = {
  id: string;
  name: string;
  image?: string;
  type: string;
  roles: string[];
  tags: string[];
  references?: Record<string, string | number | boolean | null>;
  active: boolean;
  created: Date;
  updated: Date;
};
export type ProfileExtended = Profile;
export type ProfileInput = {
  id?: string;
  name: string;
  image?: string;
  type?: string;
  roles: string[];
  tags?: string[];
  references?: Record<string, string | number | boolean | null>;
  active?: boolean;
  created?: Date;
  updated?: Date;
};
export type Auth = {
  id: string;
  profileId: string;
  type: string;
  token: string;
  secret: string;
  verified: boolean;
  consumed: Date;
  active: boolean;
  created: Date;
  updated: Date;
};
export type AuthExtended = Auth & {
  profile: Profile;
};
export type AuthInput = {
  id?: string;
  profileId: string;
  type?: string;
  token: string;
  secret: string;
  verified?: boolean;
  consumed?: Date;
  active?: boolean;
  created?: Date;
  updated?: Date;
};
export type ProfileAuth = Profile & { auth: Record<string, Auth> };