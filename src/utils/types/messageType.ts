export type msgType = {
  owner: string;
  comments: string[];
  title: string;
  id: number;
  timestamp: number;
};

export type commentType = {
  owner: string;
  content: string;
  title: string;
  msgID: number;
  timestamp: number;
};
