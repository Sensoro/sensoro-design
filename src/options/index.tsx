import InternalOptions from './options';
import Item from './item';
import './style';

export { default as LinkOption } from './link-options';
export { default as ButtonOption } from './button-options';

type InternalOptionsType = typeof InternalOptions;

interface Options extends InternalOptionsType {
  Item: typeof Item;
}
const Options: Options = InternalOptions as Options;
Options.Item = Item;

export default Options;
