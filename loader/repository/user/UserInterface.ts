// ** New User Interface ** //
export interface INewUser {
  id?: number;
  fullName: string;
  username: string;
  email: string;
  password: string;
}

// ** User Interface ** //
export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  user_id: number;
  username: string;
  email: string;
  password: string;
  reset_password_token: string;
  reset_password_expires: Date;
  status: string;
  bio: string;
  joined_date: Date;
  last_login: Date;
  last_logout: Date;
  last_activity: Date;
  role: string;
  avatarUrl: string;
  profile_picture: string;
  user_registration_id: number;
  created_at: Date;
  updated_at: Date;
}