import InternalScrollableBar from './scrollable-bar';
import Item from './item';
import './style';

type ScrollableBarType = typeof InternalScrollableBar;

export interface ScrollableBarInterface extends ScrollableBarType {
  Item: typeof Item;
}

const ScrollableBar = InternalScrollableBar as ScrollableBarInterface;

ScrollableBar.Item = Item;

export * from './scrollable-bar';
export default ScrollableBar;
