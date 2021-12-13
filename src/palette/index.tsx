import InternalPalette from './palette';
import Item from './item';

type InternalPalette = typeof InternalPalette;

interface Palette extends InternalPalette {
  Item: typeof Item;
}

const Palette: Palette = InternalPalette as Palette;

Palette.Item = Item;

export default Palette;
