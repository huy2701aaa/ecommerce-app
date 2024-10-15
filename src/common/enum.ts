export enum SCREEN_ENUM {
  PRODUCT = "product",
  CATEGORY = "category",
  ORDER = "order",
  COMMENT = "comment",
  DASHBOARD = "dashboard",
}

export enum ACTION_ENUM {
  CREATE = "create",
  UPDATE = "update",
}

export enum ORDER_STATUS {
  PENDING = "pending",
  DELIVERY = "delivery",
  SUCCESS = "success",
  CANCEL = "cancel",
}

export enum ORDER_TYPE {
  NORMAL = "normal",
  ONLINE = "paypal",
}
