import InternalInput from './input';
import InternalSearch from './search';

type InternalInput = typeof InternalInput;

interface Input extends InternalInput {
  Search: typeof InternalSearch;
}

const Input: Input = InternalInput as Input;

Input.Search = InternalSearch;

export default Input;
