Office.initialize = () => {
  document.getElementById("run").onclick = run;
};
function mark_range(context){
  const range = context.workbook.getSelectedRange();
  range.format.fill.color = "green";
  return context.sync();
}
export function run() {
  try {
    Excel.run(mark_range)
  } catch (error) {
    console.error(error);
  }
}
