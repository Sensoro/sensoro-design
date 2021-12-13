import { getRenderText } from './';

describe('getRenderText', () => {
  it('空字符串', () => {
    expect(getRenderText('')).toEqual('-');
  });

  it('字符串', () => {
    expect(getRenderText('test')).toEqual('test');
  });

  it('数组', () => {
    expect(getRenderText([])).toEqual('-');
    expect(getRenderText([1, '1'])).toEqual('-');
  });

  it('对象', () => {
    expect(getRenderText({})).toEqual('-');
    expect(getRenderText({ a: 1, b: '1' })).toEqual('-');
  });

  it('数字', () => {
    expect(getRenderText(1)).toEqual(1);
    expect(getRenderText(0)).toEqual(0);
    expect(getRenderText(-1)).toEqual(-1);
  });

  it('方法', () => {
    expect(getRenderText(() => {})).toEqual('-');
  });

  it('NaN', () => {
    expect(getRenderText(NaN)).toEqual('-');
  });

  it('null', () => {
    expect(getRenderText(null)).toEqual('-');
  });

  it('undefined', () => {
    expect(getRenderText(undefined)).toEqual('-');
  });
});
