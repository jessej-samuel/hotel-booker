type HotelMetaData = {
  _id: string;
  name: string;
  location: string;
  email: string;
  password: string;
  K: {
    count: number;
    cost: number;
    _id: string;
  };
  KAC: {
    count: number;
    cost: number;
    _id: string;
  };
  D: {
    count: number;
    cost: number;
    _id: string;
  };
  DAC: {
    count: number;
    cost: number;
    _id: string;
  };
  S: {
    count: number;
    cost: number;
    _id: string;
  };
  SAC: {
    count: number;
    cost: number;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RoomAvailabilityType = {
  [key: string]: number;
};

type OrderType = {
  K: {
    count: number;
  };
  KAC: {
    count: number;
  };
  D: {
    count: number;
  };
  DAC: {
    count: number;
  };
  S: {
    count: number;
  };
  SAC: {
    count: number;
  };
  _id: string;
  userId: string;
  hotelId: {
    _id: string;
    name: string;
    location: string;
    email: string;
    password: string;
    K: {
      count: number;
      cost: number;
      _id: string;
    };
    KAC: {
      count: number;
      cost: number;
      _id: string;
    };
    D: {
      count: number;
      cost: number;
      _id: string;
    };
    DAC: {
      count: number;
      cost: number;
      _id: string;
    };
    S: {
      count: number;
      cost: number;
      _id: string;
    };
    SAC: {
      count: number;
      cost: number;
      _id: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  userName: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type OrderAdminType = {
  K: {
    count: number;
  };
  KAC: {
    count: number;
  };
  D: {
    count: number;
  };
  DAC: {
    count: number;
  };
  S: {
    count: number;
  };
  SAC: {
    count: number;
  };
  _id: string;
  userId: string;
  hotelId: {
    _id: string;
    name: string;
    location: string;
    email: string;
    password: string;
    K: {
      count: number;
      cost: number;
      _id: string;
    };
    KAC: {
      count: number;
      cost: number;
      _id: string;
    };
    D: {
      count: number;
      cost: number;
      _id: string;
    };
    DAC: {
      count: number;
      cost: number;
      _id: string;
    };
    S: {
      count: number;
      cost: number;
      _id: string;
    };
    SAC: {
      count: number;
      cost: number;
      _id: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  userName: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { HotelMetaData, RoomAvailabilityType, OrderType, OrderAdminType };
