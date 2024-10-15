import type { ORDER_STATUS, ORDER_TYPE } from "./enum";

export type TColor = {
  label: string;
  value: string;
};

export type TProduct = {
  id?: number;
  name: string;
  description: string;
  image: string;
  color: string;
  size: string;
  oldPrice: string;
  newPrice: string;
  sold: number;
  stock: number;
  categoryId: number | null;
  video?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TCart = {
  product: TProduct;
  quantity: number;
};

export type TPropsCart = {
  size?: string;
  color?: string;
};

export type TCategory = {
  id?: number;
  name: string;
  productNumber: number;
  products?: TProduct[];
  image: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TComment = {
  id?: number;
  user?: {
    userName?: string;
    email?: string;
  };
  productId?: number;
  content?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TUser = {
  id?: number;
  userName?: string;
  email?: string;
  status?: string;
  userRoles?: any[];
  userInfo: {
    avatar?: string;
    address?: string;
    phoneNumber?: string;
  };
  accessToken?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TRegister = {
  userName: string;
  email: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TOrder = {
  id?: number;
  totalMoney: string;
  userNote: string;
  paymentType: ORDER_TYPE;
  orderDetails?: [
    {
      orderId?: number;
      product?: TProduct;
      quantity?: number;
      color?: string;
      size?: string;
      createdAt?: string;
    }
  ];
  user?: {
    email?: string;
    userName?: string;
    id?: string;
    userInfo?: {
      address?: string;
      phoneNumber?: string;
      avatar?: string;
    };
  };
  orderStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TParamsOrder = {
  orderStatus: ORDER_STATUS;
};

export type TOrderDetails = {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  orderStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TError = {
  error: string;
  statusCode: number;
  message: string;
};

export type TResult = {
  statusCode: number;
  message: string;
  data: any;
};

export type TChart = {
  labels?: string[];
  series?: number[];
};

export type TProductParams = {
  q?: string | null;
  size?: string | null;
  color?: string | null;
  price?: string | null;
  categoryId?: string | null;
};

export type TUserInfo = {
  userName?: string;
  address?: string;
  phoneNumber?: string;
};

export type TStatus = {
  orderStatus: string;
};
