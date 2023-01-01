import View from './Country/View';
import List from './Country/List';
import Prompt from './Country/Prompt';

const Result = ({ result }) => {
  if (result.length <= 10 && result.length > 1) return <List result={result} />;
  else if (result.length === 1) return <View country={result[0]} />;
  else if (result.length > 10) return <Prompt />;
};

export default Result;
