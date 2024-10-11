export type BannerData = {
  bannerId: number;
  placeId: string;
  description: string;
  bannerImg: string;
  title: string;
};
export type BannerResponse = {
  banners: [BannerData];
};
export type InfluencerData = {
  influencerId: number;
  influencerName: string;
  influencerImgUrl: string;
  influencerJob: string;
  likes?: boolean;
};

export type SpotData = {
  videoId: number;
  videoAlias: string;
  videoUrl: string;
  place: {
    placeId: number;
    placeName: string;
  };
};
export type PageableData = {
  totalPages: 0;
  totalElements: 0;
  size: 0;
  content: [SpotData];
  number: 0;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  numberOfElements: 0;
  pageable: {
    offset: 0;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true;
    };
    paged: true;
    pageNumber: 0;
    pageSize: 0;
    unpaged: true;
  };
  first: true;
  last: true;
  empty: true;
};

export type AddressData = {
  address1: string;
  address2: string;
  address3: string;
};

export type PlaceData = {
  placeId: number;
  placeName: string;
  address: AddressData;
  category?: string;
  influencerName: string;
  longitude?: string;
  latitude?: string;
  likes: boolean;
};

export type LocationData = {
  topLeftLongitude: number;
  topLeftLatitude: number;
  bottomRightLongitude: number;
  bottomRightLatitude: number;
};

export type FilterParams = {
  categories: string[];
  influencers: string[];
};

export type PlaceList = {
  places: PlaceInfo[];
};

export type PlaceInfo = {
  placeId: number;
  placeName: string;
  address: AddressData;
  category: string;
  influencerName: string;
  longitude: string;
  latitude: string;
  likes: boolean;
  facilityInfo: FacilityInfo;
  menuInfos: {
    menuImgUrls: [string];
    menuList: [Menu];
    timeExp: Date;
  };
  openHour: OpenHourData;
  placeLikes: PlaceLikes;
  videoUrl: string;
};

export type PlaceLikes = {
  like: number;
  dislike: number;
};

export type FacilityInfo = {
  wifi?: string;
  pet?: string;
  parking?: string;
  forDisabled?: string;
  nursery?: string;
  smokingRoom?: string;
};

export type Menu = {
  price: string;
  recommend: boolean;
  menu: string;
};

export type ReviewData = {
  reviewId?: number;
  likes: boolean;
  comment: string;
  userNickname: string;
  createdDate: Date;
};

export type OpenHourData = {
  periodList: {
    timeName: string;
    timeSE: string;
    dayOfWeek: string;
  }[];
  offdayList: {
    holidayName: string;
    weekAndDay: string;
    temporaryHolidays: boolean;
  }[];
};
export type RequestInfluencerLike = {
  influencerId: number;
  likes: boolean;
};
export type UserInfoData = {
  nickname: string;
};
export type InfluencerResponse = {
  influencers: [InfluencerData];
};
export type UserPlaceData = {
  placeId: number;
  placeName: string;
  imageUrl: string;
  influencer: string;
  likes: boolean;
};
export type UserPlaceResponse = {
  places: [UserPlaceData];
};
export type RequestPlaceLike = {
  placeId: number;
  likes: boolean;
};
export type UserReviewData = {
  reviewId: number;
  userNickname: string;
  place: {
    placeId: number;
    imgUrl: string;
    address: {
      address1: string;
      address2: string;
      address3: string;
    };
  };
  likes: boolean;
  comment: string;
  createdDate: Date;
};
export type UserReviewResponse = {
  reviews: [UserReviewData];
};
