interface Params {
  page?: number;
  size?: number;
  message?: string;
  [key: string]: any;
}

interface Result<T> {
  code: number;
  data: {
    list: T[];
    total: number;
  };
  message?: number;
}

type FetchFun<T> = (params: Params) => Promise<Result<T>>;

/**
 * 将分页接口转换为获取所有的接口
 * @param fetch
 */
export default function createFetchAll<T = any>(fetch: FetchFun<T>): FetchFun<T> {
  return async function (params: Params = {}) {
    // 总数
    let allTotal = 0;
    let fetchTotal = 0;
    // 存储列表数据
    let fetchList: T[] = [];

    return new Promise(async (resolve, reject) => {
      const { page = 1, size = 1000, ...rest } = params;

      // 通过第一次分页请求
      const {
        code,
        data: { list, total },
        message
      } = await fetch({ page, size, ...rest });
      allTotal = total;
      fetchTotal += list.length;
      fetchList = fetchList.concat(list);

      // 从第二页开始
      const allPromise: Promise<Result<T>>[] = [];
      const pageSize = parseInt(total / size + 1 + '');

      for (let i = 2; i <= pageSize; ++i) {
        allPromise.push(
          fetch({
            page: i,
            size: i === pageSize ? total % size : size,
            ...rest
          })
        );
      }

      const allResult = await Promise.all(allPromise);
      for (let i = 0; i < allResult.length; ++i) {
        const {
          data: { list }
        } = allResult[i];
        fetchTotal += list.length;
        fetchList = fetchList.concat(list);
      }

      if (fetchTotal === total) {
        resolve({
          code: code,
          message: message,
          data: {
            list: fetchList,
            total: fetchTotal
          }
        });
      } else {
        reject({
          code: 500,
          message: '数据请求出错',
          data: {
            list: [],
            total: 0
          }
        });
      }
    });
  };
}
