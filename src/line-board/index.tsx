import Point from './point';
import connect from './connect';
import { useLineRender, useLineBoardContext } from './context';

class LineBoard {
  public static Point: typeof Point;
  public static connect: typeof connect;
  public static useLineBoardContext: typeof useLineBoardContext;
  public static useLineRender: typeof useLineRender;
}

LineBoard.Point = Point;
LineBoard.connect = connect;
LineBoard.useLineRender = useLineRender;
LineBoard.useLineBoardContext = useLineBoardContext;

export default LineBoard;
