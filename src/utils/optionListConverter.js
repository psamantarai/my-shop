import { kebabToCapitalize } from "./textConverter";

export function optionListConverter(list) {
  let ans = list
    .map((value) => ({
      value: value,
      label: kebabToCapitalize(value),
    }))
    .sort((a, b) => {
      const labelA = a.label.toLowerCase();
      const labelB = b.label.toLowerCase();
      return labelA.localeCompare(labelB);
    });

  return ans;
}
