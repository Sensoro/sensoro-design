import moment, { MomentInput } from 'moment';

/**
 * 阻止时间冒泡和执行默认行为
 * @param e
 */
export function pauseEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * 格式化时间
 * @param time 需要格式化的时间
 * @param formatStr 格式化的模板
 */
export function formatTime(time: MomentInput, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment(time).format(format);
}

/**
 * 获取图片Base64
 * @param file
 */
export function getBase64(file: File | Blob): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
