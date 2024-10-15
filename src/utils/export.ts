import { saveAs } from "file-saver";
import { unparse } from "papaparse";

export const exportToExcel = (data: any) => {
  const csv = unparse(data);

  const bom = "\ufeff";

  const blob = new Blob([bom, csv], { type: "text/csv" });

  saveAs(blob, `data.csv`);
};
