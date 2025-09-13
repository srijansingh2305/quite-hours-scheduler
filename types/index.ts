export interface QuietHour {
  _id?: string;
  userId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  emailSent?: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}