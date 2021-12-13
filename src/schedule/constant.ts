export enum WEEK {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
  sunday = 7
}

type WeekConfig = {
  [key in WEEK]: { text: string };
};

export const weekConfig: WeekConfig = {
  [WEEK.monday]: { text: '周一' },
  [WEEK.tuesday]: { text: '周二' },
  [WEEK.wednesday]: { text: '周三' },
  [WEEK.thursday]: { text: '周四' },
  [WEEK.friday]: { text: '周五' },
  [WEEK.saturday]: { text: '周六' },
  [WEEK.sunday]: { text: '周日' }
};

// 最大值
export const MAX_TIME = 24 * 60 - 1;
// 最小值
export const MIN_TIME = 0;
// 标记点
export const marks: number[] = [0, 3, 6, 9, 12, 15, 18, 21, 24];
