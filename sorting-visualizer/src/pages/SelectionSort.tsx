import AlgorithmTemplate from "../components/AlgorithmTemplate";
import { selectionSort } from "../algorithms/selectionSort";

const SelectionSortPage = () => {
  return <AlgorithmTemplate algorithm={selectionSort} />;
};

export default SelectionSortPage;
